# lucid prompt
# https://github.com/mattgreen/lucid.fish


# Default appearance options. Override in config.fish if you want.
if ! set -q lucid_dirty_indicator
    set -g lucid_dirty_indicator "•"
end

if ! set -q lucid_prompt_symbol
    set -g lucid_prompt_symbol "❯"
end

if ! set -q lucid_prompt_symbol_error
    set -g lucid_prompt_symbol_error "❯"
end

if ! set -q lucid_prompt_symbol_color
    set -g lucid_prompt_symbol_color "$fish_color_normal"
end
set -g lucid_prompt_symbol_color "green"

if ! set -q lucid_prompt_symbol_error_color
    set -g lucid_prompt_symbol_error_color "$fish_color_normal"
end

# This should be set to be at least as long as lucid_dirty_indicator, due to a fish bug
if ! set -q lucid_clean_indicator
    set -g lucid_clean_indicator (string replace -r -a '.' ' ' $lucid_dirty_indicator)
end

if ! set -q lucid_cwd_color
    set -g lucid_cwd_color blue
end

if ! set -q lucid_git_color
    set -g lucid_git_color brblack
end

# State used for memoization and async calls.
set -g __lucid_cmd_id 0
set -g __lucid_git_state_cmd_id -1
set -g __lucid_git_static ""
set -g __lucid_dirty ""

# Increment a counter each time a prompt is about to be displayed.
# Enables us to distingish between redraw requests and new prompts.
function __lucid_increment_cmd_id --on-event fish_prompt
    set __lucid_cmd_id (math $__lucid_cmd_id + 1)
end

# Abort an in-flight dirty check, if any.
function __lucid_abort_check
    if set -q __lucid_check_pid
        set -l pid $__lucid_check_pid
        functions -e __lucid_on_finish_$pid
        command kill $pid >/dev/null 2>&1
        set -e __lucid_check_pid
    end
end


function fish_right_prompt
  set_color brblack
  printf ' %s ' (date +'%l:%M:%S %p, %b %d') # simpler but with a leading 0 on hours: date +'%r, %b %d')
  set_color normal
end

# https://github.com/fernzi/dotfiles/blob/c551097cd9bd872e6d71d80efb74f359377c1f08/fish/.config/fish/functions/fish_right_prompt.fish#L10
function fish_right_prompt_thing
  set_color -b black normal
  printf ' %s ' (basename (string replace -r \^$HOME \~ $PWD))

  # Git status
  set_color -b brblack normal
  git status --porcelain=v2 --branch 2>/dev/null | awk '
    $1 == "#" && $2 == "branch.head" {
      printf "  %s ", $3
      git=1
    }
    $1~/1|2/ && $2~/[^.]./ {
      staged++
    }
    $1~/1|2/ {
      modified++
    }
    $1 == "?" {
      untracked++
    }
    END {
      if (git) {
        if (staged)
          printf "•%d ", staged
        if (modified)
          printf "+%d ", modified
        if (untracked)
          printf "~%d ", untracked
        if (!(staged || modified || untracked))
          printf "✔ "
      }
    }
  '

  set_color -b normal blue
  set_color -ro
  printf ' %s ' $hostname
  set_color normal
end

# https://github.com/olemb/git-prompt/blob/e4caf57bf96e735c37ac1bf7595a8e0815d5e31d/git_prompt.fish#L7
function status_from_porcelain
    set -l text (command git status --porcelain=v2 --branch ^/dev/null)
    if [ $status -ne 0 ] >/dev/null
        return
    end

    set -l branch_oid
    set -l branch_head

    # Flags.
    set -l changes ''
    set -l untracked ''
    set -l conflict ''
    set -l ahead ''
    set -l behind ''

    for line in $text
        set -l words (string split " " $line)

        switch $words[1]
            # Why doesn't this work if the '#' case is last?
            case '#'
                switch $words[2]
                    case 'branch.oid'
                        set oid $words[3]
                    case 'branch.head'
                        set head $words[3]
                    case 'branch.ab'
                        if [ $words[3] != "+0" ]
                            set ahead '↑'
                        end
                        if [ $words[4] != "-0" ]
                            set behind '↓'
                        end
                end

            case 'u'
                set conflict '!'
            case '1' '2'
                set changes '*'
            case '?'
                set untracked '?'
        end
    end


    if [ $oid = "(initial)" ]
        set head ":initial"
    else if [ $head = "(detached)" ]
        set head ':'(string sub -l 6 $oid)
    end


    set -l color green

    if [ $conflict != '' ]
        set color red
    else if [ $changes$untracked != '' ]
        set color yellow
    end

    set -l flags $changes$untracked$conflict$ahead$behind

    if [ $flags != "" ]
       set flags " $flags"
    end

    set_color $color
    echo "[$head$flags]"

    set_color normal

end


function _paulirish_git_branch_str --description "Parse current Git branch name"
    set --local reliable_ref_name (
        command git symbolic-ref --short HEAD 2>/dev/null;
        or command git describe --all --exact-match HEAD 2>/dev/null
    )

    # upstream uses name-rev but its a little too human friendly for me
    # if the symbolic-ref or describe cmds fail.. ill use a revparse ref with name-rev in brackets.
    if test -n "$reliable_ref_name"
        echo $reliable_ref_name
    else
        set --local namerev (command git name-rev --name-only HEAD 2>/dev/null)
        set --local revparse (command git rev-parse --short HEAD)

        echo "$revparse [aka $namerev]"
    end

end


function _pure_prompt_git_pending_commits
    set --local git_unpushed_commits
    set --local git_unpulled_commits

    set --local has_upstream (command git rev-parse --abbrev-ref '@{upstream}' 2>/dev/null)
    if test -n "$has_upstream"  # check there is an upstream repo configured
        and test "$has_upstream" != '@{upstream}' # Fixed #179, dont check the empty repo
        command git rev-list --left-right --count 'HEAD...@{upstream}' \
        | read --local --array git_status
        set --local commit_to_push $git_status[1]
        set --local commit_to_pull $git_status[2]

        if test "$commit_to_push" -gt 0  # upstream is behind local repo
            set git_unpushed_commits (set_color brgreen) "⇡"
        end

        if test "$commit_to_pull" -gt 0  # upstream is ahead of local repo
            set git_unpulled_commits (set_color yellow) "⇣"
        end
    end

    echo "$git_unpushed_commits$git_unpulled_commits"
end


# function _paulirish_maybe_toggle_dirtystate -d "Ignore dirty state if we're in the huge Chromium repo"
#     # check if we're in a git repo.
#     if not git rev-parse &> /dev/null
#       return
#     end
#     # check if an origin remote exists
#     if not git remote get-url origin &> /dev/null
#       return
#     end
#     set -l actualurl (git remote get-url origin)
#     switch $actualurl
#       case "*chromium.googlesource.com*"
#         git config bash.showDirtyState false
#     end
# end



function __lucid_git_status
    # Reset state if this call is *not* due to a redraw request
    set -l prev_dirty $__lucid_dirty
    if test $__lucid_cmd_id -ne $__lucid_git_state_cmd_id
        __lucid_abort_check

        set __lucid_git_state_cmd_id $__lucid_cmd_id
        set __lucid_git_static ""
        set __lucid_dirty ""
    end

    # exit early if we're not in a repo
    set --local is_git_repository (command git rev-parse --is-inside-work-tree 2>/dev/null)
    # echo "is_git_repository $is_git_repository"
    if not test -n "$is_git_repository"; return; end;

    # Fetch git position & action synchronously.
    # Memoize results to avoid recomputation on subsequent redraws.
    if test -z $__lucid_git_static
        # Determine git working directory
        set -l git_dir (command git --no-optional-locks rev-parse --absolute-git-dir 2>/dev/null)
        if test $status -ne 0
            return 1
        end

        set -l position (command git --no-optional-locks symbolic-ref --short HEAD 2>/dev/null)
        if test $status -ne 0
            # Denote detached HEAD state with short commit hash
            set position (command git --no-optional-locks rev-parse --short HEAD 2>/dev/null)
            if test $status -eq 0
                set position "@$position"
            end
        end

        # TODO: add bisect
        set -l action ""
        if test -f "$git_dir/MERGE_HEAD"
            set action "merge"
        else if test -d "$git_dir/rebase-merge"
            set action "rebase"
        else if test -d "$git_dir/rebase-apply"
            set action "rebase"
        end

        set -l state $position
        if test -n $action
            set state "$state <$action>"
        end

        set -g __lucid_git_static $state
    end

    # Fetch dirty status asynchronously.
    if test -z $__lucid_dirty
        if ! set -q __lucid_check_pid
            # command to run in background
            # btw, there's room to optimize this cmd. See my `_pure_prompt_git_dirty.fish`.
            set -l git_isdirty_cmd "git --no-optional-locks status --untracked=no --porcelain --ignore-submodules 2>/dev/null | head -n1 | count"
            set -l cmd "if test ($git_isdirty_cmd) != "0"; exit 1; else; exit 0; end"

            begin
                # Defer execution of event handlers by fish for the remainder of lexical scope.
                # This is to prevent a race between the child process exiting before we can get set up.
                block -l

                set -g __lucid_check_pid 0
                command fish --private --command "$cmd" >/dev/null 2>&1 &
                set -l pid (jobs --last --pid)

                set -g __lucid_check_pid $pid

                # Use exit code to convey dirty status to parent process.
                function __lucid_on_finish_$pid --inherit-variable pid --on-process-exit $pid
                    functions -e __lucid_on_finish_$pid

                    if set -q __lucid_check_pid
                        if test $pid -eq $__lucid_check_pid
                            switch $argv[3]
                                case 0
                                    set -g __lucid_dirty_state 0
                                    if status is-interactive
                                        commandline -f repaint
                                    end
                                case 1
                                    set -g __lucid_dirty_state 1
                                    if status is-interactive
                                        commandline -f repaint
                                    end
                                case '*'
                                    set -g __lucid_dirty_state 2
                                    if status is-interactive
                                        commandline -f repaint
                                    end
                            end
                        end
                    end
                end
            end
        end

        if set -q __lucid_dirty_state
            switch $__lucid_dirty_state
                case 0
                    set -g __lucid_dirty (set_color blue)$lucid_clean_indicator
                case 1
                    set -g __lucid_dirty (set_color cyan)$lucid_dirty_indicator
                case 2
                    set -g __lucid_dirty (set_color red)"<err>"
            end

            set -e __lucid_check_pid
            set -e __lucid_dirty_state
        end
    end

    # Render git status. When in-progress, use previous state to reduce flicker.
    set_color $lucid_git_color
    echo -n $__lucid_git_static ''

    if ! test -z $__lucid_dirty
        echo -n $__lucid_dirty
    else if ! test -z $prev_dirty
        set_color --dim $lucid_git_color  # dim the stale info
        echo -n $prev_dirty
        set_color normal
    end

    set_color normal
end

function __lucid_vi_indicator
    if [ $fish_key_bindings = "fish_vi_key_bindings" ]
        switch $fish_bind_mode
            case "insert"
                set_color green
                echo -n "[I] "
            case "default"
                set_color red
                echo -n "[N] "
            case "visual"
                set_color yellow
                echo -n "[S] "
            case "replace"
                set_color blue
                echo -n "[R] "
        end
        set_color normal
    end
end

# Suppress default mode prompt
function fish_mode_prompt
end

function fish_prompt
    set -l last_pipestatus $pipestatus
    set -l cwd (pwd | string replace "$HOME" '~')

    if test -z "$lucid_skip_newline"
        echo ''
    end

    set_color $lucid_cwd_color
    echo -sn $cwd
    set_color normal

    if test $cwd != '~'; or test -n "$lucid_git_status_in_home_directory"
        set -l git_state (__lucid_git_status)
        if test $status -eq 0
            echo -sn " $git_state"  # branch name and dirtystate
        end
    end

    echo ''
    __lucid_vi_indicator

    set -l prompt_symbol "$lucid_prompt_symbol"
    set -l prompt_symbol_color "$lucid_prompt_symbol_color"

    for status_code in $last_pipestatus
        if test "$status_code" -ne 0
            set prompt_symbol "$status_code$lucid_prompt_symbol_error"
            set prompt_symbol_color "$lucid_prompt_symbol_error_color"
            break
        end
    end

    set_color "$prompt_symbol_color"
    echo -n "$prompt_symbol "
    set_color normal
end