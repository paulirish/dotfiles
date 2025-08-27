* `sh` has terrible history mgmt, just dont even try.
* `fish` is aiight but needs some love
* `bash` is better with a lot of config (like the below) -- Even then it still isn't good enough:
  - up-arrow through history goes through all sessions, and not just the current one.

```sh
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
```
