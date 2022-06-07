# Vendored verbatim (except for this comment)…
# from https://github.com/acomagu/fish-async-prompt/blob/b866f232a4a5ded7e16cda648648c43925c01ba0/conf.d/__async_prompt.fish
# https://github.com/acomagu/fish-async-prompt

status is-interactive
or exit 0

set -g __async_prompt_tmpdir (command mktemp -d)

# Setup after the user defined prompt functions are loaded.
function __async_prompt_setup_on_startup --on-event fish_prompt
    functions -e (status current-function)

    for func in (__async_prompt_config_functions)
        function $func -V func
            test -e $__async_prompt_tmpdir'/'$fish_pid'_'$func
            and cat $__async_prompt_tmpdir'/'$fish_pid'_'$func
        end
    end
end

not set -q async_prompt_on_variable
and set async_prompt_on_variable fish_bind_mode
function __async_prompt_fire --on-event fish_prompt (for var in $async_prompt_on_variable; printf '%s\n' --on-variable $var; end)
    set -l __async_prompt_last_pipestatus $pipestatus

    for func in (__async_prompt_config_functions)
        set -l tmpfile $__async_prompt_tmpdir'/'$fish_pid'_'$func

        if functions -q $func'_loading_indicator' && test -e $tmpfile
            read -zl last_prompt <$tmpfile
            eval (string escape -- $func'_loading_indicator' "$last_prompt") >$tmpfile
        end

        __async_prompt_config_inherit_variables | __async_prompt_last_pipestatus=$__async_prompt_last_pipestatus __async_prompt_spawn \
            $func' | read -z prompt
            echo -n $prompt >'$tmpfile
    end
end

function __async_prompt_spawn -a cmd
    set -l envs
    begin
        while read line
            switch "$line"
                case fish_bind_mode
                    echo fish_bind_mode $fish_bind_mode
                case FISH_VERSION PWD _ history 'fish_*' hostname version
                case status pipestatus
                    echo pipestatus $__async_prompt_last_pipestatus
                case SHLVL
                    set envs $envs SHLVL=$SHLVL
                case '*'
                    echo $line (string escape -- $$line)
            end
        end
    end | read -lz vars
    echo $vars | env $envs fish -c '
    function __async_prompt_signal
        kill -s "'(__async_prompt_config_internal_signal)'" '$fish_pid'
    end
    while read -a line
        test -z "$line"
        and continue

        if test "$line[1]" = pipestatus
            set -f _pipestatus $line[2..]
        else
            eval set "$line"
        end
    end

    function __async_prompt_set_status
        return $argv
    end
    if set -q _pipestatus
        switch (count $_pipestatus)
            case 1
                __async_prompt_set_status $_pipestatus[1]
            case 2
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2]
            case 3
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3]
            case 4
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4]
            case 5
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4] \
                | __async_prompt_set_status $_pipestatus[5]
            case 6
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4] \
                | __async_prompt_set_status $_pipestatus[5] \
                | __async_prompt_set_status $_pipestatus[6]
            case 7
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4] \
                | __async_prompt_set_status $_pipestatus[5] \
                | __async_prompt_set_status $_pipestatus[6] \
                | __async_prompt_set_status $_pipestatus[7]
            case 8
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4] \
                | __async_prompt_set_status $_pipestatus[5] \
                | __async_prompt_set_status $_pipestatus[6] \
                | __async_prompt_set_status $_pipestatus[7] \
                | __async_prompt_set_status $_pipestatus[8]
            default
                __async_prompt_set_status $_pipestatus[1] \
                | __async_prompt_set_status $_pipestatus[2] \
                | __async_prompt_set_status $_pipestatus[3] \
                | __async_prompt_set_status $_pipestatus[4] \
                | __async_prompt_set_status $_pipestatus[5] \
                | __async_prompt_set_status $_pipestatus[6] \
                | __async_prompt_set_status $_pipestatus[7] \
                | __async_prompt_set_status $_pipestatus[8] \
                | __async_prompt_set_status $_pipestatus[-1]
        end
    else
        true
    end
    '$cmd'
    __async_prompt_signal
    sleep 0.3
    __async_prompt_signal
    sleep 0.3
    __async_prompt_signal' &
    disown
end

function __async_prompt_config_inherit_variables
    if set -q async_prompt_inherit_variables
        if test "$async_prompt_inherit_variables" = all
            set -ng
        else
            for item in $async_prompt_inherit_variables
                echo $item
            end
        end
    else
        echo status
        echo pipestatus
        echo SHLVL
        echo CMD_DURATION
        echo fish_bind_mode
    end
end

function __async_prompt_config_functions
    set -l funcs (
        if set -q async_prompt_functions
            string join \n $async_prompt_functions
        else
            echo fish_prompt
            echo fish_right_prompt
        end
    )
    for func in $funcs
        functions -q "$func"
        or continue

        echo $func
    end
end

function __async_prompt_config_internal_signal
    if test -z "$async_prompt_signal_number"
        echo SIGUSR1
    else
        echo "$async_prompt_signal_number"
    end
end

function __async_prompt_repaint_prompt --on-signal (__async_prompt_config_internal_signal)
    commandline -f repaint >/dev/null 2>/dev/null
end