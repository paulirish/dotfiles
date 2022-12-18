
# I love the FZF keybindings, especially ctrl-t midway through typing  a command

# orig source is ~ https://github.com/junegunn/fzf/blob/master/shell/key-bindings.fish
set -l fzfb_path "$(brew --prefix)/opt/fzf/shell/key-bindings.fish"
if test -e $fzfb_path
	source $fzfb_path
	fzf_key_bindings
end
