
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
# 	set PA $PA /Users/dbachko/.rvm/gems/ruby-2.2.1/bin
# end

set PA $PA /usr/local/Cellar/atlassian-plugin-sdk/8.2.6

# GOLANG configurations
set -x GOPATH $HOME/golang
set -x GOROOT /usr/local/opt/go/libexec
set PA $GOPATH/bin $GOROOT/bin $PA

set -l paths "

for entry in (string split \n $paths)
    # resolve the {$HOME} substitutions
    set -l resolved_path (eval echo $entry)
    if test -d "$resolved_path";
        set PA $PA "$resolved_path"
    end
end

# Google Cloud SDK.
if test -f "$HOME/google-cloud-sdk/path.fish.inc"
    source "$HOME/google-cloud-sdk/path.fish.inc"
end

set --export PATH $PA
