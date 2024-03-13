# I've noticed this file gets called 3 times. Looks like one is from pureprompt.
# todo, investigate later.
# status stack-trace

# set fish_trace 1
# fish --debug "*" # super noisy
# fish --debug "(fish --print-debug-categories)"  and could start removing stuff.
function fish_greeting
end


# TODO: path and aliases are kinda slow to source. optimize later.
source ~/.config/fish/path.fish
source ~/.config/fish/aliases.fish
source ~/.config/fish/functions.fish
source ~/.config/fish/chromium.fish

# for things not checked into git..
if test -e "$HOME/.extra.fish";
    source ~/.extra.fish
end

# THEME PURE #
# set -g async_prompt_functions _pure_prompt_git  # run this async! dope.
# set fish_function_path $HOME/.config/fish/functions/pure/functions/ $fish_function_path
# set fish_function_path $HOME/.config/fish/functions/pure/ $fish_function_path
# source $HOME/.config/fish/functions/pure/conf.d/pure.fish

# I don't need a prompt symbol for you-got-things-in-yr-stash
set --erase pure_symbol_git_stash

# Readline colors
set -g fish_color_autosuggestion 555 yellow
set -g fish_color_command 5f87d7
set -g fish_color_comment 808080
set -g fish_color_cwd 87af5f
set -g fish_color_cwd_root 5f0000
set -g fish_color_error 870000 --bold
set -g fish_color_escape af5f5f
set -g fish_color_history_current 87afd7
set -g fish_color_host 5f87af
set -g fish_color_match d7d7d7 --background=303030
set -g fish_color_normal normal
set -g fish_color_operator d7d7d7
set -g fish_color_param 5f87af
set -g fish_color_quote d7af5f
set -g fish_color_redirection normal
set -g fish_color_search_match --background=purple
set -g fish_color_status 5f0000
set -g fish_color_user 5f875f
set -g fish_color_valid_path --underline

set -g fish_color_dimmed 555
set -g fish_color_separator 999

# Git prompt status
set -g __fish_git_prompt_showdirtystate 'yes'
set -g __fish_git_prompt_showupstream auto
set -g pure_git_untracked_dirty false

# pure
set pure_threshold_command_duration 1
set pure_separate_prompt_on_error true
set pure_begin_prompt_with_current_directory false
set -U pure_color_success (set_color green)
set -U pure_color_git_dirty (set_color cyan)

set -U pure_color_git_unpushed_commits (set_color yellow)
set -U pure_color_git_unpulled_commits (set_color brgreen)

# prompt (lucid)

set -g lucid_prompt_symbol_error_color red

# Status Chars
#set __fish_git_prompt_char_dirtystate '*'
set __fish_git_prompt_char_upstream_equal ''
set __fish_git_prompt_char_upstream_ahead '↑'
set __fish_git_prompt_char_upstream_behind '↓'
set __fish_git_prompt_color_branch yellow
set __fish_git_prompt_color_dirtystate 'red'

set __fish_git_prompt_color_upstream_ahead ffb90f
set __fish_git_prompt_color_upstream_behind blue

# Local prompt customization
set -e fish_greeting


set -g fish_pager_color_completion normal
set -g fish_pager_color_description 555 yellow
set -g fish_pager_color_prefix cyan
set -g fish_pager_color_progress cyan


# pull in all shared `export …` aka `set -gx …`
source ~/.exports

# ctrl-b invokes the fancy boi. but this doesnt really work right.
bind \cb git-recent-with-fzf-and-diff
if bind -M insert > /dev/null 2>&1
    bind -M insert \cb git-recent-with-fzf-and-diff
end

# TODO debug this
# this currently messes with newlines in my prompt. lets debug it later.
# test -e {$HOME}/.iterm2_shell_integration.fish ; and source {$HOME}/.iterm2_shell_integration.fish
