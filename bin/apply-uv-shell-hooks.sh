#!/usr/bin/env bash
set -euo pipefail

source_path="${BASH_SOURCE[0]}"
while [ -L "$source_path" ]; do
  source_dir="$(cd -P "$(dirname "$source_path")" >/dev/null 2>&1 && pwd)"
  source_path="$(readlink "$source_path")"
  [[ "$source_path" != /* ]] && source_path="$source_dir/$source_path"
done

REPO="$(cd -P "$(dirname "$source_path")/.." >/dev/null 2>&1 && pwd)"

add_line() {
  FILE="$1"
  LINE="$2"
  if [ -f "$FILE" ]; then
    if ! grep -Fqx "$LINE" "$FILE"; then
      printf "\n# uv (added by dotfiles script)\n%s\n" "$LINE" >> "$FILE"
      echo "Appended uv to $FILE"
    else
      echo "uv already present in $FILE"
    fi
  else
    printf "# uv (created by dotfiles script)\n%s\n" "$LINE" > "$FILE"
    echo "Created $FILE with uv line"
  fi
}

# Write these literally so the target shell expands its own HOME/PATH.
# shellcheck disable=SC2016
add_line "$HOME/.bashrc" 'export PATH="$HOME/.local/bin:$PATH"'
# shellcheck disable=SC2016
add_line "$HOME/.zshrc" 'export PATH="$HOME/.local/bin:$PATH"'

mkdir -p "$HOME/.config/fish/conf.d"
ln -sf "$REPO/fish/conf.d/uv.fish" "$HOME/.config/fish/conf.d/uv.fish"
echo "Symlinked fish conf.d file to $HOME/.config/fish/conf.d/uv.fish"

uv python install --default

echo "Done. Verify by opening a new shell and running: python --version; which python"
