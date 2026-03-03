#!/bin/bash

# set -euxo pipefail

SETTINGS_FILE="$HOME/code/dotfiles/.macos"
# ---------------------

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

run_tests() {
    echo -e "🧪 Running parsing tests..."
    
    local test_cases=(
        'defaults write com.apple.print.PrintingPrefs "Quit When Finished" -bool true'
        'defaults write NSGlobalDomain AppleHighlightColor -string "1.000000 0.252792 1.000000 Other"'
        'sudo defaults write /Library/Preferences/com.apple.loginwindow AdminHostInfo HostName'
        'defaults write com.apple.finder FXInfoPanesExpanded -dict General -bool true MetaData -bool true'
    )

    local expected_domains=(
        "com.apple.print.PrintingPrefs"
        "NSGlobalDomain"
        "/Library/Preferences/com.apple.loginwindow"
        "com.apple.finder"
    )

    local expected_keys=(
        "Quit When Finished"
        "AppleHighlightColor"
        "AdminHostInfo"
        "FXInfoPanesExpanded"
    )

    for i in "${!test_cases[@]}"; do
        local line="${test_cases[$i]}"
        eval "local cmd_parts=($line)"
        
        local start_idx=2
        if [[ "${cmd_parts[0]}" == "sudo" ]]; then
            start_idx=3
        fi
        
        local domain="${cmd_parts[$start_idx]}"
        local key="${cmd_parts[$((start_idx+1))]}"
        
        echo "Test $((i+1)): $line"
        if [[ "$domain" == "${expected_domains[$i]}" && "$key" == "${expected_keys[$i]}" ]]; then
            echo -e "  ✅ ${GREEN}Passed${NC} (Domain: '$domain', Key: '$key')"
        else
            echo -e "  ❌ ${RED}Failed${NC}"
            echo "     Expected Domain: '${expected_domains[$i]}', Key: '${expected_keys[$i]}'"
            echo "     Got      Domain: '$domain', Key: '$key'"
        fi
    done
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

# Process 'defaults' commands
# We need to handle multi-line commands ending with \
current_cmd=""

while IFS= read -r line || [ -n "$line" ]; do
    # Skip comments and empty lines
    if [[ "$line" =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
        continue
    fi

    # Check if line ends with \
    if [[ "$line" == *\\ ]]; then
        # Remove the \ and append to current_cmd
        current_cmd="${current_cmd}${line%\\} "
        continue
    else
        current_cmd="${current_cmd}${line}"
    fi

    # Only process defaults write commands
    if [[ "$current_cmd" =~ ^(sudo[[:space:]]+)?defaults[[:space:]]+write ]]; then
        # Use eval to let bash correctly parse quotes and spaces into an array
        eval "cmd_parts=($current_cmd)"
        
        # Reset current_cmd for the next command
        current_cmd=""

        # Handle optional 'sudo'
        start_idx=2
        if [[ "${cmd_parts[0]}" == "sudo" ]]; then
            start_idx=3
        fi

        domain="${cmd_parts[$start_idx]}"
        key="${cmd_parts[$((start_idx+1))]}"
        
        # The rest is the value definition
        # Arrays and dicts are harder to compare strictly, so we try our best
        val_type="${cmd_parts[$((start_idx+2))]}"
        val_data="${cmd_parts[$((start_idx+3))]}"
        expected_val=""

        case "$val_type" in
          "-bool"|"-boolean")
            [[ "$val_data" == "false" || "$val_data" == "0" ]] && expected_val="0" || expected_val="1"
            ;;
          "-string")
            expected_val="$val_data"
            ;;
          "-int"|"-integer"|"-float")
            expected_val="$val_data"
            ;;
          "-dict"|"-array"|"-dict-add"|"-array-add")
             # For dicts and arrays, evaluating the exact expected string is complex 
             # because `defaults read` outputs a formatted list/dict.
             # We will just capture the raw arguments to print if they differ.
             expected_val="${cmd_parts[*]:$((start_idx+2))}"
             ;;
          *)
            # Handles cases with no type flag, e.g., "... AdminHostInfo HostName"
            expected_val="${cmd_parts[*]:$((start_idx+2))}"
            ;;
        esac

        # Construct and run the 'read' command
        read_cmd="defaults read \"$domain\" \"$key\""

        # Get the current setting, hiding "does not exist" errors
        command_output=$(eval "$read_cmd" 2>&1)
        exit_code=$?

        if [[ $exit_code -ne 0 ]]; then
            echo -e "\nChecking key: ${YELLOW}${key}${NC} : $read_cmd"
            echo "  .macos to set:  $expected_val"
            echo -e "  Failure:        ${RED}$command_output${NC}"
        else
            # Normalize boolean outputs from defaults read (it prints 1/0 or true/false depending on macOS version)
            if [[ "$val_type" == "-bool" || "$val_type" == "-boolean" ]]; then
                if [[ "$command_output" == "true" || "$command_output" == "1" ]]; then command_output="1"; fi
                if [[ "$command_output" == "false" || "$command_output" == "0" ]]; then command_output="0"; fi
            fi

            if [[ "$command_output" == "$expected_val" ]]; then
                printf " " # OK, silently skip
            elif [[ "$val_type" == "-dict" || "$val_type" == "-array" || "$val_type" == "-dict-add" || "$val_type" == "-array-add" ]]; then
                # For complex types, we just warn that a check should be manual, or print it clearly
                echo -e "\nChecking key: ${YELLOW}${key}${NC} : $read_cmd (Complex Type)"
                echo "  .macos to set:  $expected_val"
                echo -e "  Current:        ${YELLOW}${command_output}${NC}"
            else
                echo -e "\nChecking key: ${YELLOW}${key}${NC} : $read_cmd"
                echo "  .macos to set:  $expected_val"
                echo -e "  Current:        ${RED}${command_output}${NC}"
            fi
        fi
    else
        # Reset if it wasn't a defaults write command
        current_cmd=""
    fi
done < "$SETTINGS_FILE"

echo ""
