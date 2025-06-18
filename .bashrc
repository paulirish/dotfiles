


[ -n "$PS1" ] && source ~/.bash_profile

[ -f ~/.fzf.bash ] && source ~/.fzf.bash

[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"

