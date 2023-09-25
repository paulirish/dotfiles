
## Chromium hacking

# improve perf of git inside of chromium checkout

# Read https://chromium.googlesource.com/chromium/src/+/HEAD/docs/mac_build_instructions.md#improving-performance-of-git-commands
# ... and do it all.
sysctl -a | egrep 'max(files|vnodes|proc)' 
# should see
#    kern.maxvnodes: 524288
#    kern.maxproc: 16704
#    kern.maxfiles: 524288
#    kern.maxfilesperproc: 524288


# Useful: https://serverfault.com/questions/502053/difference-between-ulimit-launchctl-sysctl
# launchctl limit maxfiles    # launchctl limit maxproc    

ulimit -a # though setting with ulimit is per-shell . # https://wilsonmar.github.io/maximum-limits/

# The plist files broke in ventura 13.5. https://bugs.chromium.org/p/chromium/issues/detail?id=1467777#c17
# the fix is doing running `ulimit -n 200000` like.. often? lol.




# speed up git status (to run only in chromium repo)
git config feature.manyFiles true  # https://git-scm.com/docs/git-config#Documentation/git-config.txt-featuremanyFiles
git config status.showuntrackedfiles no
git update-index --untracked-cache

# use fsmonitor
git config --local core.fsmonitor true
# dumb gitsecrets checks
git config --type=bool --add google.gitSecretsHook false
# any 'side' pushes shouldnt confuse depot_tools
git config push.autoSetupRemote false  
# fixes some awkward bug where `git cl upload` hangs forever
git config --local http.version HTTP/1.1

# also this unrelated thing
git config user.email "xxxx@chromium.org"

# see also "A Chromium Compiling Setup for DevTools Hackers"
# https://gist.github.com/paulirish/2d84a6db1b41b4020685 or devtools own WORKFLOWS.md

