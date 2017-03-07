function deps --description "run gclient sync"
    env GYP_DEFINES=disable_nacl=1 gclient sync --jobs=70
end

function b --description "build chromium"
	set -l dir $HOME/chromium/src/out/Default
	# because crbug.com/695864
	ninja -C $dir -j1 generate_bindings_modules_v8_interfaces generate_bindings_core_v8_interfaces
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
        bcr
    end
end

function gom --description "run goma setup"
	env GOMAMAILTO=/dev/null env GOMA_OAUTH2_CONFIG_FILE=/Users/paulirish/.goma_oauth2_config env GOMA_ENABLE_REMOTE_LINK=yes ~/goma/goma_ctl.py ensure_start
end	
