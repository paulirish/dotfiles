
# I love the FZF keybindings, especially ctrl-t midway through typing  a command

set -l fzfb_path "$(brew --prefix)/opt/fzf/shell/key-bindings.fish"
if test -e $fzfb_path
	source $fzfb_path
	fzf_key_bindings
end
