#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SKILLS_SRC_DIR="$SCRIPT_DIR/skills"
TARGET_DIR="$HOME/.gemini/skills"

# Ensure target directory exists
mkdir -p "$TARGET_DIR"

if [ ! -d "$SKILLS_SRC_DIR" ]; then
    echo "Error: skills/ directory not found at $SKILLS_SRC_DIR"
    exit 1
fi

echo "Symlinking skills to $TARGET_DIR..."

for skill_path in "$SKILLS_SRC_DIR"/*/; do
    # Skip if not a directory
    [ -d "$skill_path" ] || continue
    
    # Remove trailing slash
    skill_path=${skill_path%/}
    # Get the skill name
    skill_name=$(basename "$skill_path")
    
    # Create symlink (force and no-dereference to update if exists)
    ln -sfn "$skill_path" "$TARGET_DIR/$skill_name"
    echo "Linked: $skill_name -> $skill_path"
done

echo "Done."
