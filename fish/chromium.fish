function deps --description "run gclient sync without hooks"
    # --reset drops local changes. often great, but if making changes inside v8, you don't want to use --reset
    # also reset seems to reset branch position in the devtools-internal repo??? weird.
    gclient sync --delete_unversioned_trees --jobs=70 --nohooks
end

function depsbg --description "run gclient sync in the background"
    gclient sync --delete_unversioned_trees --jobs=70 &
end


function hooks --description "run gclient runhooks"
    gclient runhooks
end

function depshooks
    deps && hooks
end

function b --description "build chromium"
    
    ulimit -n 200000 # b/294987716

    # reclient env vars from alexnj:
    #    RBE_racing_bias=1 RBE_cas_concurrency=3000 autoninja -C out/Default chrome
    #  - racing bias is a value between 0 and 1 that determines where you prefer compilation to be. 
    #    default is set at 0.5, i.e., equal probability of something pushed to remote, vs. local. 
    #     1 pushes everything to remote, but I think it's overkill as well ... I'm now at 0.7
    #  - cas_concurrency is how many compilations in parallel. 
    #    I'm running 2000 now resulting in 22 second incremental compilation with these values
    #    i think it makes sense to tune these to your network and cpu cores

    set -l dir_default (grealpath $PWD/(git rev-parse --show-cdup)out/Default/)
    # autoninja is better than trying to set -j and -l manually.
    # and yay, nice cmd built-in, so no more need to do this:  `renice +19 -n (pgrep ninja); renice +19 -n (pgrep compiler_proxy)`
    set -l cmd "nice -n 19 autoninja -C "$dir_default" chrome"  # blink_tests  
    echo "  > $cmd"

    # start the compile
    eval $cmd

    if test $status = 0
        osascript -e 'display notification "" with title "✅ Chromium compile done"'
    else
        osascript -e 'display notification "" with title "❌ Chromium compile failed"'
    end

    # DISABLED this was cool bit also annoying
    # if test $status = 0
    #     echo ""
    #     echo "✅ Chrome build complete!  🕵️‍  Finishing blink_tests in the background..."
    #     eval "ninja -C $dir -j900 -l 48 blink_tests &"
    #     jobs
    # end
end

function dttyped --description "build devtools with typechecking"
    #                                     ↓ this changes any output paths to be click-resolvable :)
    set -l cmd "autoninja -C  out/Typed | awk '{gsub(\"../../front_end\", \"./front_end\"); gsub(\"(//build/toolchain/linux:x64)\", \"\"); print}'"
    echo " > $cmd"
    eval $cmd
end

function dtb --description "build devtools with watch_build.js - my favorite"
    cd ./(git rev-parse --show-cdup)

    # dont let vpython use a 2.7.. seems to only affect this dude
    VPYTHON_BYPASS="manually managed python not supported by chrome operations" node scripts/watch_build.js
end


# needs `brew install watchexec`. https://watchexec.github.io/
function dtbw --description "build devtools with a watch loop"    
    set -l dir_default (grealpath $PWD/(git rev-parse --show-cdup)out/Default/)
    set -l cmd "watchexec --ignore out \"autoninja -C $dir_default | awk '{gsub(\\\"../../front_end\\\", \\\"./front_end\\\"); print}'\""  
    echo "  > $cmd"
    eval $cmd
end



# https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md
#                          # Avoid the startup dialog for 'Chromium wants to use your confidential information stored in "Chromium Safe Storage" in your keychain'
#                                                                  # Avoid the startup dialog for 'Do you want the application “Chromium.app” to accept incoming network connections?'
#                                                                              # Avoid weird interaction between this experiment and CDP targets
#                                                                                                                  # it breaks devtools reload
#                                                                                                                                  # Hides blue bubble "user education" nudges
#                                                                                                                                                  # Hides Chrome for Testing bar, among others.
set -g clutch_chrome_flags "--use-mock-keychain --disable-features=MediaRouter,ProcessPerSiteUpToMainFrameThreshold,RenderDocument --ash-no-nudges --disable-infobars"

function cr --description "open built chromium (accepts runtime flags)"
    set -l dir "./$(git rev-parse --show-cdup)/out/Default"
    set -l cmd "./$dir/Chromium.app/Contents/MacOS/Chromium $clutch_chrome_flags $argv"
    echo "  > $cmd"
    eval $cmd
end

function dtcr --description "run chrome with dev devtools"
    
    # function handle_int --on-signal SIGINT
    #     echo Got SIGINT
    # end

    set -l cdup (git rev-parse --show-cdup)
    # node ./$cdup/scripts/component_server/server.js --traces &  # start in background. trap will kill on exit.

    set -l crpath "./$cdup/third_party/chrome/chrome*/Google\ Chrome\ for\ Testing.app/Contents/MacOS/Google\ Chrome\ for\ Testing"
    set -l dtpath (realpath out/Default/gen/front_end)
    if test ! -e "$dtpath/devtools_app.html"
        echo "Not found at: $dtpath/devtools_app.html"
        set dtpath (realpath out/Default/gen)
    end
    if test ! -e "$dtpath/devtools_app.html" # elsa?
        echo "Not found at: $dtpath/devtools_app.html ... \nBailing"; return 1
    end

    set -l cmd "$crpath --custom-devtools-frontend=file://$dtpath --user-data-dir=$HOME/chromium-devtools/dt-chrome-profile $clutch_chrome_flags $argv "
    echo "  > $cmd"
    eval $cmd
end





function dtcrcanary --description "run chrome canary with dev devtools"
    
    # function handle_int --on-signal SIGINT
    #     echo Got SIGINT
    # end

    set -l cdup (git rev-parse --show-cdup)
    set -l crpath "/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
    set -l dtpath (realpath out/Default/gen/front_end)
    if test ! -e "$dtpath/devtools_app.html"
        echo "Not found at: $dtpath/devtools_app.html"
        set dtpath (realpath out/Default/gen)
    end
    if test ! -e "$dtpath/devtools_app.html" # elsa?
        echo "Not found at: $dtpath/devtools_app.html ... \nBailing"; return 1
    end

    set -l cmd "$crpath --custom-devtools-frontend=file://$dtpath --user-data-dir=$HOME/chromium-devtools/dt-canary-profile $clutch_chrome_flags --enable-features=\"DevToolsExplainThisResourceDogfood:aida_model_id/codey_gemit_mpp_streaming/aida_temperature/0/user_tier/TESTERS,DevToolsAiAssistancePerformanceAgentDogfood:aida_model_id/codey_gemit_mpp_streaming/aida_temperature/0/user_tier/TESTERS,DevToolsAiAssistanceFileAgentDogfood:aida_model_id/codey_gemit_mpp_streaming/aida_temperature/0/user_tier/TESTERS\" $argv "
    echo "  > $cmd"
    eval $cmd
end

function dtbcr --description "build chromium, then open it"
    if dtb
        dtcr
    end
end

function bcr --description "build chromium, then open it"
    if b
        cr
    end
end



function depsb --description "deps, then build chromium, then open it"
    if deps
        b
    end
end

function depsbcr --description "deps, then build chromium, then open it"
    if deps
        bcr
    end
end

function hooksbcr --description "run hooks, then build chromium, then open it"
    if hooks
        bcr
    end
end


function glurpgrab0
    rsync --archive --verbose --itemize-changes --compress --human-readable --delete paulirish@glurp:chromium/src/out/Mac-cross-siso/Chromium.app $HOME/chromium/src/out/Mac-cross-from-glurp/ 
end

function glurpgrab --description "dl mac-cross build from glurp"
    glurpgrab0

    maccr-flagged
end

function maccr
    set -l dtpath (realpath /Users/paulirish/chromium-devtools/devtools-frontend/out/Default/gen/front_end)
    if test ! -e "$dtpath/devtools_app.html"
        echo "Not found at: $dtpath/devtools_app.html"
        set dtpath (realpath /Users/paulirish/chromium-devtools/devtools-frontend/out/Default/gen)
    end
    if test ! -e "$dtpath/devtools_app.html" # elsa?
        echo "Not found at: $dtpath/devtools_app.html ... \nBailing"; return 1
    end

    set -l cmd "$HOME/chromium/src/out/Mac-cross-from-glurp/Chromium.app/Contents/MacOS/Chromium --user-data-dir=/tmp/glurp-mac-cross $clutch_chrome_flags --custom-devtools-frontend=file://$dtpath"
    echo "  > $cmd"
    eval $cmd
end

function crflags
    echo --password-store=basic --use-mock-keychain --disable-features=Translate,OptimizationHints,MediaRouter,ProcessPerSiteUpToMainFrameThreshold \
        --custom-devtools-frontend=file:///Users/paulirish/chromium-devtools/devtools-frontend/out/Default/gen/front_end \
        --disable-component-extensions-with-background-pages --disable-background-networking --disable-component-update \
        --disable-client-side-phishing-detection --disable-sync --metrics-recording-only --disable-default-apps --mute-audio --no-default-browser-check \
        --no-first-run --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-background-timer-throttling --disable-ipc-flooding-protection \
        --disable-hang-monitor  $clutch_chrome_flags --user-data-dir=/tmp/glurp-mac-cross   --enable-logging=stderr
    # these two are also good, but tricky to escape for inclusion here: --vmodule='device_event_log*=1' --force-fieldtrials='*BackgroundTracing/default/' 
end

function maccr-flagged
    # some dev flags plus chrome-launcher flags.
    set -l bigcmd /Users/paulirish/chromium/src/out/Mac-cross-from-glurp/Chromium.app/Contents/MacOS/Chromium (crflags)

     echo " > $bigcmd"
     eval $bigcmd
    # --v=1 
end

function git-clfastupload
    git cl upload --force --bypass-hooks -o "banned-words~skip"
end


# dt. rpp
alias rppunit 'npm test -- front_end/panels/timeline/ front_end/models/trace front_end/ui/legacy/components/perf_ui front_end/models/cpu_profile front_end/services/trace_bounds'
alias rppunit-debug 'npm test -- front_end/panels/timeline/ front_end/models/trace front_end/ui/legacy/components/perf_ui --debug'
alias rppinter 'npm run test -- test/e2e/performance/'
alias rppscreen 'third_party/node/node.py --output scripts/test/run_test_suite.js --config test/interactions/test-runner-config.json --mocha-fgrep "[screenshot]" --test-file-pattern="*/performance/**"'
alias rpplint 'node scripts/test/run_lint_check.js front_end/panels/timeline front_end/models/trace front_end/ui/legacy/components/perf_ui front_end/services/trace_bounds'
alias fjs 'git cl format --js'
alias gitclfastupload 'git-clfastupload'

function rbu
    set -l current_branch_name (git status --porcelain=v2 --branch | grep '^# branch.head' | awk '{print $3}')
    # ensure all branches have an upstream. (still no idea why they dont)
    for branch in (git branch -vv | grep -v '\[origin/main' | awk ' { print $1 }' | string trim)
        git branch --set-upstream-to=origin/main $branch
    end
    git checkout origin/main && git cl archive -f && git rebase-update && git checkout -b main origin/main && depshooks && git cl archive -f --verbose
    git checkout "$current_branch_name" && deps
end

alias upload 'git cl format --js && git status --porcelain=v2 && git cl upload'