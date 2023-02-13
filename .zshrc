# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/Users/ricardorivas/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in ~/.oh-my-zsh/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to automatically update without prompting.
# DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS=true

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

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
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

export EDITOR='vim'

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

alias ..="cd .."
alias cd..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ~="cd ~" # `cd` is probably faster to type though
alias -- -="cd -"
alias slt='open -a "Sublime Text 2"'
alias please=sudo
alias fucking=sudo
alias hosts='sudo $EDITOR /etc/hosts'   # yes I occasionally 127.0.0.1 twitter.com ;)
alias lsd='ls -l | grep "^d"'
alias undopush="git push -f origin HEAD^:master"
alias gr='[ ! -z `git rev-parse --show-cdup` ] && cd `git rev-parse --show-cdup || pwd`'
alias flush="dscacheutil -flushcache"
alias sniff="sudo ngrep -d 'en1' -t '^(GET|POST) ' 'tcp and port 80'"
alias httpdump="sudo tcpdump -i en1 -n -s 0 -w - | grep -a -o -E \"Host\: .*|GET \/.*\""
alias trimcopy="tr -d '\n' | pbcopy"
alias cleanup="find . -name '*.DS_Store' -type f -ls -delete"
alias g="git"
alias v="vim"
alias fs="stat -f \"%z bytes\""
alias rot13='tr a-zA-Z n-za-mN-ZA-M'
alias emptytrash="sudo rm -rfv /Volumes/*/.Trashes; rm -rfv ~/.Trash"
alias hidedesktop="defaults write com.apple.finder CreateDesktop -bool false && killall Finder"
alias showdesktop="defaults write com.apple.finder CreateDesktop -bool true && killall Finder"
alias plistbuddy="/usr/libexec/PlistBuddy"
alias stfu="osascript -e 'set volume output muted true'"
alias pumpitup="osascript -e 'set volume 10'"
alias hax="growlnotify -a 'Activity Monitor' 'System error' -m 'WTF R U DOIN'"
alias decolorize='sed -r "s/\\x1B\\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]//g"'
alias docker_container="docker ps -a"
alias r_reset="rails db:drop; rails db:create; rails db:migrate; rails db:seed;"
alias r="rails"
alias rs="rspec"
alias mysql_start="brew services start mysql@5.7"
alias mysql_stop="brew services stop mysql@5.7"
alias nginx_start="brew services start nginx-full"
alias nginx_stop="brew services stop nginx-full"
alias nginx_restart="brew services restart nginx-full"
alias nginx_reload="brew services reload nginx-full"
# rubocop
alias police="git status -s | awk '{print \$2}' | grep '\.rb$' | xargs rubocop" 
# spork
alias spork_up="RAILS_ENV=test bundle exec spork"
alias spork_test="bundle exec rspec --drb"
# bundler
alias be="bundle exec"
alias bs="bundle show"
alias b="bundle"
alias fix_postgres="rm -f /usr/local/var/postgres/postmaster.pid"
alias nocolors='sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]//g"'
export BUNDLER_EDITOR=vim

### FUNCTIONS
# setup_docker() {
    # eval $(minikube docker-env)
# }

# start_docker() {
    # minikube start --mount --mount-string="/private:/private" # mount for docker tmp files
    # minikube pause  #disable the k8s stuff
    # eval $(minikube docker-env)    
# }

clean_branch() {
  if [ -z "$1" ]; then
    echo "missing parameter 'clean_branch main'"
  else
    g up
    g b -D $1
    g ch $1
  fi
}

push_to() {
  current_branch="$(git branch --show-current)"
  clean_branch $1
  g merge $current_branch --no-edit
  g push origin $1
  g ch $current_branch
}

g_rand() {
  git commit -m "$(curl -s http://whatthecommit.com/index.txt)"
}

### FUNCTIONS

### stdin hacko for git add -a
# stty icrnl

# brew paths
export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"
export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"
export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"
export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

# aws
export AWS_VAULT_PROMPT=osascript
export AWS_VAULT_KEYCHAIN_NAME=login

# erl
export PATH="/usr/local/opt/erlang@22/bin:$PATH"
test -s "$HOME/.kiex/scripts/kiex" && source "$HOME/.kiex/scripts/kiex"
export PATH="/usr/local/sbin:$PATH"

# asdf
. /usr/local/opt/asdf/libexec/asdf.sh

# Rancher
export PATH="$HOME/.rd/bin:$PATH"

# buildkit
export DOCKER_BUILDKIT=1

# https://github.com/rupa/z
. $HOME/z/z.sh

## END

