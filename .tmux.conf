# my tmux.
# must be named `$HOME/.tmux.conf` on box where the tmux-server is running.

#######################################
#######################################
# -CC is the BEST SHIT and using it means not customizing some whack psuedo environment. instead rely on your terminal client's windows/tabs/splits. yay
# 0. use iterm or another modern terminal client
# 1. connect over shh
# 2. just run this:
#        tmux -u -CC attach || tmux -u -CC
# 3. enjoy life
#######################################
#######################################


# reload config file with ctrl b, y
bind y source-file ~/.tmux.conf \; display "tmux configs reloaded"


# todo: maybe disable bell or something?



# Automatically set window title
set-option -g status-interval 1
set-window-option -g automatic-rename on
# Fancy command to get full active command set in window (not pane) title.  https://github.com/tmux/tmux/issues/733
# The bash_prompt sets pane title to working directory. AFAIK, i cant also make pane title have the process cmd/args
set-option -g automatic-rename-format '#(ps --no-headers -t #{pane_tty} -o args -O-c | head -n1 | cut -c -100 | sed 's/bash//') 🖥 '
# Also, there's no 0:0 window/pane index BS in the title. (Yay). To ensure that, dont set any of these:
#   pane-border-format, pane-border-status, set-titles, status-interval, window-status-current-format, window-status-format
# and you'll have to create a brand new tmux session. Just doing source-file aint good enough



# persist sessions.
#   save   : Ctrl-b + Ctrl-s
#   restore: Ctrl-b + Ctrl-r
run-shell ~/code/tmux-resurrect/resurrect.tmux
run-shell ~/code/tmux-continuum/continuum.tmux

# Automatically restore last saved environment when tmux is started
set -g @continuum-restore 'on'

# this feature is deprecated but i like it. :/
set -g @resurrect-save-shell-history 'on'
