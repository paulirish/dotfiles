#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SKILLS_SRC_DIR="$SCRIPT_DIR/skills"
GEMINI_TARGET_DIR="$HOME/.gemini/skills"
CLAUDE_TARGET_DIR="$HOME/.claude/skills"

# Ensure target directories exist
mkdir -p "$GEMINI_TARGET_DIR"
mkdir -p "$CLAUDE_TARGET_DIR"

if [ ! -d "$SKILLS_SRC_DIR" ]; then
    echo "Error: skills/ directory not found at $SKILLS_SRC_DIR"
    exit 1
fi

echo "Installing skills..."

for skill_path in "$SKILLS_SRC_DIR"/*/; do
    # Skip if not a directory
    [ -d "$skill_path" ] || continue
    
    # Remove trailing slash
    skill_path=${skill_path%/}
    # Get the skill name
    skill_name=$(basename "$skill_path")
    
    # --- Claude: Symlink ---
    ln -sfn "$skill_path" "$CLAUDE_TARGET_DIR/$skill_name"
    echo "Linked Claude: $skill_name -> $skill_path"

    # --- Gemini: Copy with newer-time protection ---
    GEMINI_SKILL_DEST="$GEMINI_TARGET_DIR/$skill_name"
    
    if [ -d "$GEMINI_SKILL_DEST" ] && [ ! -L "$GEMINI_SKILL_DEST" ]; then
        NEWER_FILES_EXIST=0
        
        while IFS= read -r dest_file; do
            # Skip if dest_file is empty (e.g. from empty find result)
            [ -z "$dest_file" ] && continue
            
            rel_path="${dest_file#$GEMINI_SKILL_DEST/}"
            src_file="$skill_path/$rel_path"
            
            # If dest_file is newer than src_file (or src_file doesn't exist)
            if [ "$dest_file" -nt "$src_file" ]; then
                NEWER_FILES_EXIST=1
                break
            fi
        done < <(find "$GEMINI_SKILL_DEST" -type f 2>/dev/null)

        if [ "$NEWER_FILES_EXIST" -eq 1 ]; then
            echo "Error: Found newer modifications in $GEMINI_SKILL_DEST"
            echo "--------------------------------------------------------"
            diff -ur "$skill_path" "$GEMINI_SKILL_DEST"
            echo "--------------------------------------------------------"
            echo "Aborting! Please sync these changes back to the source repository or delete the destination folder."
            exit 1
        fi
        
        # Safe to overwrite, so remove existing
        rm -rf "$GEMINI_SKILL_DEST"
    elif [ -L "$GEMINI_SKILL_DEST" ]; then
        # If it was a symlink previously, remove it
        rm -f "$GEMINI_SKILL_DEST"
    fi
    
    # Copy the directory
    cp -a "$skill_path" "$GEMINI_SKILL_DEST"
    echo "Copied Gemini: $skill_name -> $GEMINI_SKILL_DEST"
    
done

echo "Done."
