function append-to-path -d 'Adds the given directory to the end of the PATH'
    set -l dir ''
    if test (count $argv) -ne 0
        set dir $argv[1]
    end

    if test -d $dir
        set dir (abspath $dir)
        if not contains $dir $PATH
            set PATH $PATH $dir
        end
    else
        echo "Dir $dir does not exist?"
    end
end
