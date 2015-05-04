# zmodload zsh/zprof

# history
SAVEHIST=100000

# vim bindings
bindkey -v


# zstyle :compinstall filename '/Users/paulirish/.zshrc'
# autoload -Uz compinit
# compinit


fpath=( "$HOME/.zfunctions" $fpath )



# antigen time!
source ~/code/antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh


local b="antigen-bundle"

# Guess what to install when running an unknown command.
$b command-not-found

# Helper for extracting different types of archives.
$b extract

# atom editor
$b atom

# homebrew  - autocomplete on `brew install`
$b brew
$b brew-cask

# Tracks your most used directories, based on 'frecency'. 
$b z

# suggestion as you type
$b tarruda/zsh-autosuggestions

# nicoulaj's moar completion files for zsh
# $b zsh-users/zsh-completions src

# Syntax highlighting on the readline
$b zsh-users/zsh-syntax-highlighting

# colors for all files!
$b trapd00r/zsh-syntax-highlighting-filetypes

# dont set a theme, because pure does it all
$b sindresorhus/pure

# history search
$b zsh-users/zsh-history-substring-search


# Tell antigen that you're done.
antigen apply



# Automatically list directory contents on `cd`.
auto-ls () { ls; }
chpwd_functions=( auto-ls $chpwd_functions )


# zprof

# Load default dotfiles
source ~/.bash_profile

