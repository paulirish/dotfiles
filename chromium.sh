#!/bin/bash

# usage:
# after `git pull`, a full build is now `depsbcr` or `deps && b && cr`
# and after changes.. a `bcr` will recompile and relaunch chrome.

# 2021 update: __dt versions of these functions are added for the chromium-devtools repo. 

function deps () {
    # --reset drops local changes. often great, but if making changes inside v8, you don't want to use --reset
    # also reset seems to reset branch position in the devtools-internal repo??? weird.
    gclient sync --delete_unversioned_trees --jobs=70
}

function hooks () {
    gclient runhooks
}

function b () {
    local dir=./$(git rev-parse --show-cdup)/out/Default
    # autoninja will automatically determine your -j number based on CPU cores
    local cmd="autoninja -C $(realpath $dir) chrome" 
    echo "  > $cmd"
    # start the compile
    eval $cmd

    if [ $? -eq 0 ]; then
        osascript -e 'display notification "" with title "✅ Chromium compile done"'
    else
        osascript -e 'display notification "" with title "❌ Chromium compile failed"'
    fi
}

function dtb () {
    local dir_default=$(realpath $PWD/$(git rev-parse --show-cdup)out/Default/)
    local cmd="autoninja -C $dir_default"
    echo "  > $cmd"
    eval $cmd
}


# https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md
#                    # Avoid the startup dialog for 'Chromium wants to use your confidential information stored in "Chromium Safe Storage" in your keychain'
#                                                          # Avoid the startup dialog for 'Do you want the application “Chromium.app” to accept incoming network connections?'
#                                                                      # Avoid weird interaction between this experiment and CDP targets
clutch_chrome_flags="--use-mock-keychain -disable-features=MediaRouter,ProcessPerSiteUpToMainFrameThreshold"


# you can also add any extra args: `cr --user-data-dir=/tmp/lol123"
# (disable DialMediaRouteProvider gets rid of that "do you want to accept incoming connections" prompt)
function cr () {
    local dir="./$(git rev-parse --show-cdup)/out/Default"
    local cmd="./$dir/Chromium.app/Contents/MacOS/Chromium $clutch_chrome_flags $argv"
    echo "  > $cmd"
    eval "$cmd"
}

function dtcr () {
    local crpath="./$(git rev-parse --show-cdup)/third_party/chrome/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    local dtpath=$(realpath out/Default/gen/front_end)
    local cmd="$crpath --custom-devtools-frontend=file://$dtpath --user-data-dir=$HOME/chromium-devtools/dt-chrome-profile $clutch_chrome_flags $argv"
    echo "  > $cmd"
    eval "$cmd"
}



function gom () {
    # these probably dont make sense for everyone.
    export GOMAMAILTO=/dev/null
    export GOMA_ENABLE_REMOTE_LINK=yes

    goma_ctl ensure_start
}

function dtbcr () {
    if dtb; then
        dtcr
    fi
}


function bcr () {
    if b; then
        cr
    fi
}


function depsb () {
    if deps; then
        gom
        b
    fi
}

function depsbcr () {
    if deps; then
        gom
        bcr
    fi
}

function hooksbcr () {
    if hooks; then
        gom
        bcr
    fi
}
