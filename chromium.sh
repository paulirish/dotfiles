# usage:
# after `git pull`, a full build is now `depsbcr`
# and after changes.. a `bcr` will recompile and relaunch chrome.

function deps () {
    env GYP_DEFINES=disable_nacl=1 gclient sync
}

function hooks () {
    env GYP_DEFINES=disable_nacl=1 gclient runhooks
}

function b () {
    local dir=$(git rev-parse --show-cdup)/out/Default
    # autoninja will automatically determine your -j number based on CPU cores
    local cmd="autoninja -C \"$dir\" chrome" 
    echo "  > $cmd"
    eval "$cmd"
    if [ $? -eq 0 ]; then
        printf "\n✅ Chrome build complete!\n"
        
    fi
}

# you can also add any extra args: `cr --user-data-dir=/tmp/lol123"
function cr () {
    local dir=$(git rev-parse --show-cdup)/out/Default
    local cmd="./$dir/Chromium.app/Contents/MacOS/Chromium $argv"
    echo "  > $cmd"
    eval "$cmd"
}


function gom () {
    # these probably dont make sense for everyone.
    export GOMAMAILTO=/dev/null
    export GOMA_OAUTH2_CONFIG_FILE=$HOME/.goma_oauth2_config
    export GOMA_ENABLE_REMOTE_LINK=yes

    ~/goma/goma_ctl.py ensure_start
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
