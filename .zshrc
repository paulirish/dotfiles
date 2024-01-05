# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
export DEFAULT_USER=`whoami`
# ZSH_THEME="cobalt2"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# Should also prevent that tmux is renaming the captions of the tabs after I changed them manually.
DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  alias-finder
  ansible
  common-aliases
  dirhistory
  extract
  fzf-zsh-plugin
  git-extras
  golang
  httpie
  kubectl
  node
  npm
  nvm
  pass
  ripgrep
  rsync
  systemd
  terraform
  tmux
  vi-mode
  web-search
  yarn
  ufw
)

ZSH_WEB_SEARCH_ENGINES=(
  devdocs "https://devdocs.io/"
)

# User configuration
source $ZSH/oh-my-zsh.sh
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='nvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

export LESSOPEN="| /usr/local/bin/pygmentize %s"
export LESS=" -R "
alias less='less -m -N -g -i -J --underline-special --SILENT'

alias more='less'

stty -ixon # Disable ctrl-s and ctrl-q.

source ~/.exports
source ~/.functions

# aliases
source ~/.aliases

# I want to have the history for each tab separately
setopt no_share_history

# Activate this key binding explicitly since VI mode is deactivating it
bindkey '^R' history-incremental-search-backward

# use the default version of node.js
type nvm > /dev/null
if [ $? -eq 0 ]; then
  nvm use default
fi

# Add support for fzf the fuzzy finder
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

start-ssh-agent

# Source local zshrc with local only settings
[ -f ~/.zshrc.local ] && source ~/.zshrc.local

source ~/.config/zsh/cursor-shape.conf

# Some kubernetes things
[ -f ~/.kube/kube-config.yaml ] && export KUBECONFIG=~/.kube/kube-config.yaml

[ -f ~/.cargo/env ] && source $HOME/.cargo/env

# Adding starship for a more informative prompt https://starship.rs/de-DE/config/ 
eval "$(starship init zsh)"
#
# Source local zshrc with local bu specific settings, if file exists
[ -f ~/.zshrc.bu ] && source ~/.zshrc.bu

export KEYCHAIN_KEYS="$KEYCHAIN_KEYS_LOCAL $KEYCHAIN_KEYS_BU"
[ -f ~/tmp/keychain_init_done ] && source ~/bin/init-keychain.sh
