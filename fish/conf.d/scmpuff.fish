set -x SCMPUFF_GIT_CMD (which git)

if type -q hub
    set -x SCMPUFF_GIT_CMD "hub"
end


if not type -q scmpuff
    exit 1
end


alias gs=scmpuff_status

function git
    type -q $SCMPUFF_GIT_CMD; or set -x SCMPUFF_GIT_CMD (which git)

    if test (count $argv) -eq 0
        eval $SCMPUFF_GIT_CMD
        set -l s $status
        return $s
    end

    # real nasty hack to add quotes around argv to play well with completions. i still don't know.
    set -l quoted_argv
    for option in $argv
        set quoted_argv $quoted_argv "\"$option\""
    end


    switch $argv[1]
    case c commit blame log rebase merge
        eval command (scmpuff expand -- "$SCMPUFF_GIT_CMD" $argv)
    case checkout diff rm reset
        eval command (scmpuff expand --relative -- "$SCMPUFF_GIT_CMD" $argv)
    case add
        eval command (scmpuff expand -- "$SCMPUFF_GIT_CMD" $argv)
        scmpuff_status
    case '*'
        eval command "$SCMPUFF_GIT_CMD" $quoted_argv
    end
end




# # really roundabout way to get `git stash list` to show the date
# # unfortunately, there's no way to add settings to `git stash list` via config
# OKAY ACTUALLY I COULDNT GET THIS TO WORK. 
# set -x _GIT_CMD (which git)
# functions -c git oldgit # rename scmpuff's git function so I can use below
# function git -w git
#     type -q $_GIT_CMD; or set -x _GIT_CMD (which git)

#     if test $argv[1] = 'stash' -a $argv[2] = 'list'
#         set extra_args "--date=relative"
#     end

#     eval oldgit $argv $extra_args
#     return $status
# end

