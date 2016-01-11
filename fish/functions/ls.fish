#
# Make ls use colors if we are on a system that supports this
#
# original source: https://github.com/Raimondi/config-fish/blob/master/functions/ls.fish
# he made LS_COLORS work with coreutils gls

if begin
    type gls 1>/dev/null 2>/dev/null
    or command ls --version 1>/dev/null 2>/dev/null
  end
  # This is GNU ls
  function ls --description "List contents of directory"

    if type gls 1>/dev/null 2>/dev/null
      set ls gls
    else
      set ls ls
    end

    set -l     param --color=always  # afaik, this isn't neccessary: set --export CLICOLOR_FORCE 1
    set param $param --almost-all
    set param $param --human-readable
    set param $param --sort=extension
    set param $param --group-directories-first
	if isatty 1
      set param $param --indicator-style=classify
    end

    eval "env CLICOLOR_FORCE=1 command $ls $param $argv"
  end

  if not set -q LS_COLORS
    if begin
        type -f dircolors 1>/dev/null 2>/dev/null
        or type -f gdircolors 1>/dev/null 2>/dev/null
      end
      set -l colorfile
      for file in ~/.dir_colors ~/.dircolors /etc/DIR_COLORS
        if test -f $file
          set colorfile $file
          break
        end
      end
      if type gdircolors > /dev/null
        set dircolors_cmd gdircolors
      else
        set dircolors_cmd dircolors
      end
      eval (eval "$dircolors_cmd -c $colorfile" | sed 's/setenv LS_COLORS/set -gx LS_COLORS/')
    end
  end

else
  # BSD, OS X and a few more support colors through the -G switch instead
  if command ls -G / 1>/dev/null 2>/dev/null
    function ls --description "List contents of directory"
      command ls -G $argv
    end
  end
end
