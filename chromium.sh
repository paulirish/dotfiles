# usage:
# after `git pull`, a full build is now `depsbcr`
# and after changes.. a `bcr` will recompile and relaunch chrome.

function deps () {
    # --reset drops local changes. often great, but if making changes inside v8, you don't want to use --reset
    gclient sync --delete_unversioned_trees --reset 
}

function hooks () {
    gclient runhooks
}

function b () {
    local dir=./$(git rev-parse --show-cdup)/out/Default
    # autoninja will automatically determine your -j number based on CPU cores
    local cmd="autoninja -C $(realpath $dir) chrome" 
    echo "  > $cmd"
    eval "$cmd"
    if [ $? -eq 0 ]; then
        printf "\n✅ Chrome build complete!\n"
        
    fi
}

function dtb () {
    local dir_default=$(grealpath $PWD/(git rev-parse --show-cdup)out/Default/)
    local cmd="autoninja -C "$dir_default""  
    echo "  > $cmd"
    eval $cmd
}


# you can also add any extra args: `cr --user-data-dir=/tmp/lol123"
function cr () {
    local dir=$(git rev-parse --show-cdup)/out/Default
    local cmd="./$dir/Chromium.app/Contents/MacOS/Chromium --disable-features=DialMediaRouteProvider $argv"
    echo "  > $cmd"
    eval "$cmd"
}

function dtcr () {
    local crpath="$HOME/chromium-devtools/devtools-frontend/third_party/chrome/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    local dtpath=$(realpath out/Default/gen/front_end)
    local cmd="$crpath --custom-devtools-frontend=file://$dtpath --user-data-dir=$HOME/chromium-devtools/dt-chrome-profile --disable-features=DialMediaRouteProvider $argv"
    echo "  > $cmd"
    eval $cmd
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
