#!/bin/bash

# set -euxo pipefail

SETTINGS_FILE="$HOME/code/dotfiles/.macos"
TEMP_DOMAIN="com.paulirish.macos-prefs-diff.temp"

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Clean up any leftover temp settings on exit
cleanup() {
    defaults delete "$TEMP_DOMAIN" > /dev/null 2>&1
}
trap cleanup EXIT

run_tests() {
    echo -e "🧪 Running parsing and comparison tests..."
    
    # 1. Test Domain/Key parsing
    local test_cases=(
        'defaults write com.apple.print.PrintingPrefs "Quit When Finished" -bool true'
        'defaults write NSGlobalDomain AppleHighlightColor -string "1.000000 0.252792 1.000000 Other"'
    )
    local expected_domains=("com.apple.print.PrintingPrefs" "NSGlobalDomain")
    local expected_keys=("Quit When Finished" "AppleHighlightColor")

    for i in "${!test_cases[@]}"; do
        eval "local cmd_parts=(${test_cases[$i]})"
        local domain="${cmd_parts[2]}"
        local key="${cmd_parts[3]}"
        if [[ "$domain" == "${expected_domains[$i]}" && "$key" == "${expected_keys[$i]}" ]]; then
            echo -e "  ✅ Test $((i+1)) (Parse): ${GREEN}Passed${NC}"
        else
            echo -e "  ❌ Test $((i+1)) (Parse): ${RED}Failed${NC} (Got Domain: '$domain', Key: '$key')"
        fi
    done

    # 2. Test Complex Type Comparison
    echo "  Testing complex type normalization..."
    local array_cmd='defaults write "$TEMP_DOMAIN" "TestArray" -array "item 1" "item 2"'
    eval "$array_cmd"
    local actual_output=$(defaults read "$TEMP_DOMAIN" "TestArray")
    
    # Simulate what we expect
    local expected_raw_args=("-array" "item 1" "item 2")
    defaults write "$TEMP_DOMAIN" "CheckKey" "${expected_raw_args[@]}"
    local expected_normalized=$(defaults read "$TEMP_DOMAIN" "CheckKey")
    
    if [[ "$actual_output" == "$expected_normalized" ]]; then
        echo -e "  ✅ Test Complex Comparison: ${GREEN}Passed${NC}"
    else
        echo -e "  ❌ Test Complex Comparison: ${RED}Failed${NC}"
    fi

    exit 0
}

if [[ "$1" == "--test" ]]; then
    run_tests
fi

if [ ! -f "$SETTINGS_FILE" ]; then
    echo -e "${RED}Error: Settings file not found at '$SETTINGS_FILE'${NC}"
    exit 1
fi

echo -e "🔍 Checking settings from '${YELLOW}${SETTINGS_FILE}${NC}'..."

current_cmd=""

while IFS= read -r line || [ -n "$line" ]; do
    if [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
        continue
    fi

    if [[ "$line" == *\\ ]]; then
        current_cmd="${current_cmd}${line%\\} "
        continue
    else
        current_cmd="${current_cmd}${line}"
    fi

    if [[ "$current_cmd" =~ ^(sudo[[:space:]]+)?defaults[[:space:]]+write ]]; then
        # Use eval to let bash correctly parse quotes and spaces into an array
        eval "cmd_parts=($current_cmd)"
        current_cmd=""

        start_idx=2
        [[ "${cmd_parts[0]}" == "sudo" ]] && start_idx=3

                domain="${cmd_parts[$start_idx]}"
                key="${cmd_parts[$((start_idx+1))]}"
        
                # Skip Dock persistent items as they are noisy and rebuilt via functions in .macos
                if [[ "$key" == "persistent-apps" || "$key" == "persistent-others" ]]; then
                    continue
                fi
                
                val_type="${cmd_parts[$((start_idx+2))]}"
        
        # Construct and run the 'read' command
        read_cmd="defaults read \"$domain\" \"$key\""
        current_val=$(eval "$read_cmd" 2>/dev/null)
        exit_code=$?

        # Normalize the expected value using the temp domain trick
        # This ensures we are comparing against the exact format 'defaults read' returns
        defaults write "$TEMP_DOMAIN" "CheckKey" "${cmd_parts[@]:$((start_idx+2))}"
        expected_val=$(defaults read "$TEMP_DOMAIN" "CheckKey" 2>/dev/null)
        
        # Special handling for booleans as 'defaults read' output varies by macOS version
        if [[ "$val_type" == "-bool" || "$val_type" == "-boolean" ]]; then
            [[ "$current_val" == "true" || "$current_val" == "1" ]] && current_val="1" || current_val="0"
            [[ "$expected_val" == "true" || "$expected_val" == "1" ]] && expected_val="1" || expected_val="0"
        fi

        if [[ $exit_code -ne 0 ]]; then
            echo -e "\nChecking key: ${YELLOW}${key}${NC} : $read_cmd"
            echo "  .macos to set:  $expected_val"
            echo -e "  Failure:        ${RED}Key does not exist${NC}"
        elif [[ "$current_val" == "$expected_val" ]]; then
            printf "." # Progress indicator
        else
            echo -e "\nChecking key: ${YELLOW}${key}${NC} : $read_cmd"
            if [[ "$expected_val" == *$'\n'* || "$current_val" == *$'\n'* ]]; then
                echo "  .macos to set:"
                echo "$expected_val" | sed 's/^/    /'
                echo -e "  Current:"
                echo -e "${RED}$current_val${NC}" | sed 's/^/    /'
            else
                echo "  .macos to set:  $expected_val"
                echo -e "  Current:        ${RED}${current_val}${NC}"
            fi
        fi
        
        # Clean up temp key for next check
        defaults delete "$TEMP_DOMAIN" "CheckKey" > /dev/null 2>&1
    else
        current_cmd=""
    fi
done < "$SETTINGS_FILE"

echo -e "\n\n✨ Done."
