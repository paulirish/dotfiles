

# Load our dotfiles like ~/.bash_prompt, etc…
# ~/.extra can be used for settings you don’t want to commit
for file in ~/.{extra,exports,aliases,functions,bash_profile}; do
	[ -r "$file" ] && source "$file"
done
unset file


source ~/code/z/z.sh


# Lines configured by zsh-newuser-install
SAVEHIST=100000
bindkey -v
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/Users/paulirish/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall


fpath=( "$HOME/.zfunctions" $fpath )

autoload -U promptinit && promptinit
prompt pure

