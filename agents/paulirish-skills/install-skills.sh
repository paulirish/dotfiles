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

echo "Symlinking skills..."

for skill_path in "$SKILLS_SRC_DIR"/*/; do
    # Skip if not a directory
    [ -d "$skill_path" ] || continue
    
    # Remove trailing slash
    skill_path=${skill_path%/}
    # Get the skill name
    skill_name=$(basename "$skill_path")
    
    # Create symlinks (force and no-dereference to update if exists)
    ln -sfn "$skill_path" "$GEMINI_TARGET_DIR/$skill_name"
    echo "Linked Gemini: $skill_name -> $skill_path"
    
    ln -sfn "$skill_path" "$CLAUDE_TARGET_DIR/$skill_name"
    echo "Linked Claude: $skill_name -> $skill_path"
done

echo "Done."
