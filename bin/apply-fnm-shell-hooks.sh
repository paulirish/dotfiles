#!/usr/bin/env bash
set -euo pipefail

REPO="/Users/dbachko/dev/dotfiles"
TS=$(date +%s)

add_line() {
  FILE="$1"
  LINE="$2"
  if [ -f "$FILE" ]; then
    if ! grep -Fqx "$LINE" "$FILE"; then
      cp "$FILE" "$FILE.bak.$TS" || true
      printf "\n# fnm (added by dotfiles script)\n%s\n" "$LINE" >> "$FILE"
      echo "Appended fnm to $FILE"
    else
      echo "fnm already present in $FILE"
    fi
  else
    printf "# fnm (created by dotfiles script)\n%s\n" "$LINE" > "$FILE"
    echo "Created $FILE with fnm line"
  fi
}

add_line "$HOME/.bashrc" 'eval "$(fnm env --use-on-cd --shell bash)"'
add_line "$HOME/.zshrc" 'eval "$(fnm env --use-on-cd --shell zsh)"'

mkdir -p "$HOME/.config/fish/conf.d"
ln -sf "$REPO/fish/conf.d/fnm.fish" "$HOME/.config/fish/conf.d/fnm.fish"
echo "Symlinked fish conf.d file to $HOME/.config/fish/conf.d/fnm.fish"

echo "Done. Verify by opening a new shell and running: fnm current; which npm; npm -v"
