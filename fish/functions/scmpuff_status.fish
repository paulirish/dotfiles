
function scmpuff_status
    scmpuff_clear_vars
    set -lx scmpuff_env_char "e"
    set -l cmd_output (/usr/bin/env scmpuff status --filelist $argv)
    set -l es "$status"

    if test $es -ne 0
        return $es
    end

    set -l files (string split \t $cmd_output[1])
    for e in (seq (count $files))
        set -gx "$scmpuff_env_char""$e" "$files[$e]"
    end

    for line in $cmd_output[2..-1]
        echo $line
    end
end
