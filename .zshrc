


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


source ~/code/antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo declared above.
antigen bundles <<EOBUNDLES

lein
pip
sharat87/autoenv
nvm

# Guess what to install when running an unknown command.
command-not-found

# Helper for extracting different types of archives.
extract

# atom editor
atom

# homebrew something
brew

# Tracks your most used directories, based on 'frecency'. 
z

# nicoulaj's moar completion files for zsh
zsh-users/zsh-completions src

# ZSH port of Fish shell's history search feature.
zsh-users/zsh-history-substring-search

# Syntax highlighting bundle.
zsh-users/zsh-syntax-highlighting

# colors for all files!
trapd00r/zsh-syntax-highlighting-filetypes

EOBUNDLES

# dont set a theme, because pure does it all
antigen bundle sindresorhus/pure




# Tell antigen that you're done.
antigen apply

# Load default dotfiles
source ~/.bash_profile


# Automatically list directory contents on `cd`.
auto-ls () { ls; }
chpwd_functions=( auto-ls $chpwd_functions )

