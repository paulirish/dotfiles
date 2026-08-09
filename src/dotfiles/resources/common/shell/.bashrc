# ~/.bashrc — managed by dotfiles (https://github.com/mikecuoco/dotfiles)
# For interactive non-login shells.  Delegates to .bash_profile.

[ -n "$PS1" ] && [ -f "$HOME/.bash_profile" ] && source "$HOME/.bash_profile"

# Machine-local non-interactive additions (e.g. nvm, rvm, conda injections)
[ -f "$HOME/.extrarc" ] && source "$HOME/.extrarc"
