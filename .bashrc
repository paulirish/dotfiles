[ -n "$PS1" ] && source ~/.bash_profile

# when things like nvm/yarn/rvm add rando shit into my .bashrc i move them to ~/.extrarc just cuz
[ -r "~/.extrarc" ] && source "~/.extrarc"

export GOPATH=$HOME/golang
export GOROOT=/usr/local/opt/go/libexec
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:$GOROOT/bin

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
