function deps --description "run gclient sync"
    env GYP_DEFINES=disable_nacl=1 gclient sync --jobs=70
end

function hooks --description "run gclient runhooks"
    env GYP_DEFINES=disable_nacl=1 gclient runhooks
end

function b --description "build chromium"
	set -l dir $HOME/chromium/src/out/Default
	# 1000 seems fairly stable, but i dont want accidental failures
    ninja -C $dir -j900 chrome blink_tests
end

function cr --description "open built chromium"
    eval $HOME/chromium/src/out/Default/Chromium.app/Contents/MacOS/Chromium
end



function bcr --description "build chromium, then open it"
    if b
        cr
    end
end

function depsbcr --description "deps, then build chromium, then open it"
    if deps
        # #     if [ "$argv[1]" = "--skipgoma" ] ...
        gom
        bcr
    end
end

function hooksbcr --description "run hooks, then build chromium, then open it"
    if hooks
        gom
        bcr
    end
end

function gom --description "run goma setup"
    set -x GOMAMAILTO /dev/null 
    set -x GOMA_OAUTH2_CONFIG_FILE /Users/paulirish/.goma_oauth2_config 
    set -x GOMA_ENABLE_REMOTE_LINK yes
    ~/goma/goma_ctl.py ensure_start
end	
