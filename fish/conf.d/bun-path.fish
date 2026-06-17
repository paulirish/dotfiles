# Bun's official installer uses ~/.bun/bin. Homebrew installs use the normal brew path.
if test -d "$HOME/.bun/bin"
  set -gx BUN_INSTALL "$HOME/.bun"
  fish_add_path --global "$HOME/.bun/bin"
end
