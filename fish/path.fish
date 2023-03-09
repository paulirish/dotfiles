
# 2022-11 comment: this whole file feels gross. 
# also feels like https://fishshell.com/docs/current/cmds/fish_add_path.html would clean it up a lot
# also a .paths file seems like a great idea. https://github.com/davidaurelio/dotfiles/blob/ce3d4117762f15ed92287e1049efefadfefb557a/.profile#L16-L22

# Grab my $PATHs from ~/.extra
set -l PATH_DIRS (cat "$HOME/.extra" | grep "^PATH" | \
    # clean up bash PATH setting pattern
    sed "s/PATH=//" | sed "s/\\\$PATH://" | \
    # rewrite ~/ to use {$HOME}
    sed "s/~\//{\$HOME}\//")


set -l PA $PATH



for entry in (string split \n $PATH_DIRS)
    # resolve the {$HOME} substitutions
    set -l resolved_path (eval echo $entry)
    if contains $resolved_path $PATH;
        continue; # skip dupes
    end
    if test -d "$resolved_path";
        set PA $PA "$resolved_path"
    end
end


set -l manually_added_paths "
# yarn binary
$HOME/.yarn/bin
$GOPATH/bin

# yarn global modules (hack for me)
$HOME/.config/yarn/global/node_modules/.bin

# `code` binary from VS Code
/Applications/Visual Studio Code.app/Contents/Resources/app/bin
"

for entry in (string split \n $manually_added_paths)
    # resolve the {$HOME} substitutions
    set -l resolved_path (eval echo $entry)
    if contains $resolved_path $PATH;
      
        continue; # skip dupes
    end
    if test -d "$resolved_path";
        set PA $PA "$resolved_path"
    end
end


# Google Cloud SDK.
if test -f "$HOME/google-cloud-sdk/path.fish.inc"
    source "$HOME/google-cloud-sdk/path.fish.inc"
end

set --export PATH $PA