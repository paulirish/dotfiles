# shellcheck shell=bash

# --- 1. INTERACTIVE GUARD ---
# If not running interactively, don't do anything.
[[ $- != *i* ]] && return


# PATH setup via ~/.paths
setupPATH() {
    # Credit to https://github.com/davidaurelio/dotfiles/blob/main/.profile this cute pattern.
    while read -r P; do
    P=`eval echo $P`
    if [ -d "$P" ]; then
        export PATH="$PATH:$P"
    fi
    #subread these files but strip out comments, extra whitespace, and empty lines
    done < <(tac ~/.paths ~/.paths.local 2> /dev/null | sed 's|#.*||' | sed 's/^[ \t]*//;s/[ \t]*$//' | sed '/^$/d')
}
setupPATH;

# Load our dotfiles like ~/.bash_prompt, etc…
for file in ~/.{bash_prompt,exports,aliases,functions}; do
    [ -r "$file" ] && source "$file"
done
unset file


##
## UI and Colors
##

# highlighting inside manpages and elsewhere
export LESS_TERMCAP_mb=$'\E[01;31m'       # begin blinking
export LESS_TERMCAP_md=$'\E[01;38;5;74m'  # begin bold
export LESS_TERMCAP_me=$'\E[0m'           # end mode
export LESS_TERMCAP_se=$'\E[0m'           # end standout-mode
export LESS_TERMCAP_so=$'\E[38;5;246m'    # begin standout-mode - info box
export LESS_TERMCAP_ue=$'\E[0m'           # end underline
export LESS_TERMCAP_us=$'\E[04;38;5;146m' # begin underline


# Skip line-numbers and grid. https://github.com/sharkdp/bat/blob/e608b331425ca2ce8f8d0bd37e7f90901f91eb99/src/style.rs#L27-L61
# In the future this can be `default,-numbers,-grid` but they haven't released in 18months so.....   
export BAT_STYLE="changes,header-filename,header-filesize,snip,rule"


##
## HISTORY settings... 
##

# Enable history expansion with space
# E.g. typing !!<space> will replace the !! with your last command
bind Space:magic-space

# Use standard ISO 8601 timestamp
# %F equivalent to %Y-%m-%d
# %T equivalent to %H:%M:%S (24-hours format)
export HISTTIMEFORMAT='%F %T '

# keep history up to date, across sessions, in realtime
#  http://unix.stackexchange.com/a/48113
export HISTCONTROL="ignoredups"       # no duplicate entries, but keep space-prefixed commands. (bash-sensible uses "erasedups:ignoreboth" but i think i validated this already?)
# here's the popularity amonngst other-peoples-dotfiles... (cmd: ag --nogroup --noheading --nofilename --hidden -o "HISTCONTROL.*" |  grep -E -o "(ignore|erase)[a-z:]*" | sort | uniq -c | sort -r)
#      5 ignoreboth
#      4 ignoredups
#      2 erasedups:ignoreboth
#      1 ignorespace:erasedups
#      1 ignoredups:erasedups
#      1 erasedups

export HISTSIZE=100000                          # big big history (default is 500)
export HISTFILESIZE=$HISTSIZE                   # big big history
shopt -s histappend                             # append to history, don't overwrite it
shopt -s cmdhist                                # Save multi-line commands as one command


# Enable incremental history search with up/down arrows (also Readline goodness)
# Learn more about this here: http://codeinthehole.com/writing/the-most-important-command-line-tip-incremental-history-searching-with-inputrc/
bind '"\e[A": history-search-backward'
bind '"\e[B": history-search-forward'

# Don't record some commands
export HISTIGNORE="&:[ ]*:exit:ls:bg:fg:history:clear"

# Save and reload the history after each command finishes. Also look for any conflicting prompt_command definitions!!
export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"

# ^ the only downside with this is [up] on the readline will go over all history not just this bash session.


# z beats cd most of the time. `brew install z`
if command -v brew > /dev/null; then
    zpath="$(brew --prefix)/etc/profile.d/z.sh"
    [ -s "$zpath" ] && source "$zpath"
fi;

##
## Completion…
##


if [[ -n "$ZSH_VERSION" ]]; then  # quit now if in zsh
    return 1 2> /dev/null || exit 1;
fi;

# Sourcing brew completions manually is often redundant if bash-completion@2 is installed.
# We'll comment these out and let the system handle it, but keep them for reference.
# if command -v brew > /dev/null; then
#
#     # bash completion.
#     if [ -f "$(brew --prefix)/share/bash-completion/bash_completion" ]; then
#         source "$(brew --prefix)/share/bash-completion/bash_completion";
#     elif [ -f /etc/bash_completion ]; then
#         source /etc/bash_completion;
#     fi
#
#     # homebrew completion
#     source "$(brew --prefix)/etc/bash_completion.d/brew"
#
#     # hub completion
#     if command -v hub > /dev/null; then
#         source "$(brew --prefix)/etc/bash_completion.d/hub.bash_completion.sh";
#     fi;
# fi;

# Enable tab completion for `g` by marking it as an alias for `git`
if type __git_complete &> /dev/null; then
    __git_complete g __git_main
fi;


# Enable git branch name completion. 
# curl -L https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash > ~/.git-completion.bash
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi


# Add tab completion for `defaults read|write NSGlobalDomain`
# You could just use `-g` instead, but I like being explicit
complete -W "NSGlobalDomain" defaults

##
## better `cd`'ing. (see also .inputrc)
##

# Case-insensitive globbing (used in pathname expansion)
shopt -s nocaseglob;

# Correct spelling errors in arguments supplied to cd
shopt -s cdspell;

# Autocorrect on directory names to match a glob.
shopt -s dirspell 2> /dev/null

# Turn on recursive globbing (enables ** to recurse all directories)
shopt -s globstar 2> /dev/null

# Prepend cd to a directory name if it's not an executable
shopt -s autocd 2> /dev/null

# Include filenames starting with a '.' in the results of pathname expansion.
shopt -s dotglob


# Integrations

[ -f ~/.fzf.bash ] && source ~/.fzf.bash

[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
