
# 2022-11 comment: this whole file feels gross. 
# also feels like https://fishshell.com/docs/current/cmds/fish_add_path.html would clean it up a lot
# also a .paths file seems like a great idea. https://github.com/davidaurelio/dotfiles/blob/ce3d4117762f15ed92287e1049efefadfefb557a/.profile#L16-L22

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


set -l paths "
# yarn binary
$HOME/.yarn/bin
$GOPATH/bin

# yarn global modules (hack for me)
$HOME/.config/yarn/global/node_modules/.bin
"

for entry in (string split \n $paths)
    # resolve the {$HOME} substitutions
    set -l resolved_path (eval echo $entry)
    if test -d "$resolved_path";
        set PA $PA "$resolved_path"
    end
end

# GO
set PA $PA "/Users/paulirish/.go/bin"

# `code` binary from VS Code insiders
set PA $PA "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin"


# Google Cloud SDK.
if test -f "$HOME/google-cloud-sdk/path.fish.inc"
    source "$HOME/google-cloud-sdk/path.fish.inc"
end

set --export PATH $PA