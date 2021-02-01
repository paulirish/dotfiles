# usage:
# after `git pull`, a full build is now `depsbcr`
# and after changes.. a `bcr` will recompile and relaunch chrome.

function deps () {
    # --reset drops local changes. often great, but if making changes inside v8, you don't want to use --reset
    env GYP_DEFINES=disable_nacl=1 gclient sync --delete_unversioned_trees --reset 
}

function hooks () {
    env GYP_DEFINES=disable_nacl=1 gclient runhooks
}

function b () {
    local dir=./$(git rev-parse --show-cdup)/out/Default
    # autoninja will automatically determine your -j number based on CPU cores
    local cmd="ninja -C $(realpath $dir) -j900 -l 60 chrome" 
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
    local cmd="./$dir/Chromium.app/Contents/MacOS/Chromium $argv"
    echo "  > $cmd"
    eval "$cmd"
}

function dtcr () {
    local crpath="$HOME/chromium-devtools/devtools-frontend/third_party/chrome/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    local dtpath=$(realpath out/Default/resources/inspector)
    local cmd="$crpath --custom-devtools-frontend=file://$dtpath --user-data-dir=$HOME/chromium-devtools/dt-chrome-profile"
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
