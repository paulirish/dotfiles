# `which` plus symlink resolving
# requires: brew install coreutils
function whichlink --description "Use `which` along with symlink resolving"
    # can't use the cool bash type -p technique cuz fish doesnt allow command substituions. technique:  $(type -p greadlink readlink | head -1) -f $(which $@)
    if type greadlink > /dev/null 2>&1
      greadlink -f (which $argv)
    else
      command readlink (which $argv)
    end
end
