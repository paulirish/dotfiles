
# Grab my $PATHs from ~/.extra
set -l PATH_DIRS (cat "$HOME/.extra" | grep "^PATH" | \
    # clean up bash PATH setting pattern
    sed "s/PATH=//" | sed "s/\\\$PATH://" | \
    # rewrite ~/ to use {$HOME}
    sed "s/~\//{\$HOME}\//")


set -l PA ""

for entry in (string split \n $PATH_DIRS)
    # resolve the {$HOME} substitutions
    set -l resolved_path (eval echo $entry)
    if test -d "$resolved_path"; # and not contains $resolved_path $PATH
        set PA $PA "$resolved_path"
    end
end

# # rvm
# if which -s rvm; 
# 	set PA $PA /Users/paulirish/.rvm/gems/ruby-2.2.1/bin
# end


set --export PATH $PA

# path for yarn globals
# if which -s yarn; 
	set node_path (greadlink -f (which node))
	set node_path_dir (string replace "bin/node" "bin" $node_path)
	set PA $PA $node_path_dir
# end
set --export PATH $PA