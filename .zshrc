# zmodload zsh/zprof # Enable profiling

################################################################
# This config is heavily inspired from this two repos
# https://github.com/dreamsofautonomy/zensh/tree/main
# https://github.com/dreamsofautonomy/dotfiles
# Documentations of zinit and p10k are lsite below
# https://github.com/zdharma-continuum/zinit
# https://github.com/romkatv/powerlevel10k
################################################################

# Set the GPG_TTY to be the same as the TTY, either via the env var
# or via the tty command.
if [ -n "$TTY" ]; then
  export GPG_TTY=$(tty)
else
  export GPG_TTY="$TTY"
fi

# Nix
if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi
# End Nix

export PATH="/usr/local/bin:/usr/bin:$PATH"

if [ Darwin = `uname` ]; then
  [[ -f ~$HOME/.profile-macos ]] && source $HOME/.profile-macos
fi

# SSH_AUTH_SOCK set to GPG to enable using gpgagent as the ssh agent.
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
gpgconf --launch gpg-agent

# Source local zshrc with local only settings
[[ -f ~/.zshrc.local ]] && source ~/.zshrc.local

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

autoload -Uz compinit && compinit

ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
# Download Zinit, if it's not there yet
if [ ! -d "$ZINIT_HOME" ]; then
   mkdir -p "$(dirname $ZINIT_HOME)"
   git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

source "${ZINIT_HOME}/zinit.zsh"

# Define list of plugins that should be used
zinit light ohmyzsh/ohmyzsh
zinit ice depth=1; zinit light romkatv/powerlevel10k
zinit snippet OMZP::sudo
# zinit snippet OMZP::aws
# zinit snippet OMZP::kubectl
# zinit snippet OMZP::kubectx
zinit snippet OMZP::nvm
zinit snippet OMZP::rust
zinit snippet OMZP::command-not-found

zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-syntax-highlighting

export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

[[ -f $HOME/.profile ]] && source $HOME/.profile

if [ Linux = `uname` ]; then
  [[ -f ~/.profile-linux ]] && source $HOME/.profile-linux
fi

setopt auto_cd

#export PATH="/usr/local/opt/curl/bin:$PATH"
export PATH="$PATH:$HOME/Library/flutter/bin"

alias sudo='sudo '
export LD_LIBRARY_PATH=/usr/local/lib

# Completions
source <(kubectl completion zsh)

completions_dir="$HOME/.zsh-complete"
mkdir -p $completions_dir
if [ ! -f $completions_dir/_rg ]; then
  rg --generate complete-zsh > $completions_dir/_rg
fi

# P10k customizations
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh

# Fix for password store
export PASSWORD_STORE_GPG_OPTS='--no-throw-keyids'

export NVM_DIR="$HOME/.nvm"                            # You can change this if you want.
export NVM_SOURCE="/usr/share/nvm"                     # The AUR package installs it to here.
[ -s "$NVM_SOURCE/nvm.sh" ] && . "$NVM_SOURCE/nvm.sh"  # Load N

bindkey "^P" up-line-or-beginning-search
bindkey "^N" down-line-or-beginning-search

[ -s "$HOME/.svm/svm.sh" ] && source "$HOME/.svm/svm.sh"

# Capslock command
alias capslock="sudo killall -USR1 caps2esc"

if [ "$XDG_SESSION_TYPE" = "wayland" ]; then
  export MOZ_ENABLE_WAYLAND=1
fi

zle_highlight=('paste:none')

source ~/.exports
source ~/.aliases
source ~/.functions

[ -f ~/.fzf-init.zsh ] && source ~/.fzf-init.zsh

# Some kubernetes things
[ -f ~/.kube/kube-config.yaml ] && export KUBECONFIG=~/.kube/kube-config.yaml

[ -f ~/.cargo/env ] && source $HOME/.cargo/env

# Source local zshrc with local bu specific settings, if file exists
[ -f ~/.zshrc.bu ] && source ~/.zshrc.bu

export KEYCHAIN_KEYS="$KEYCHAIN_KEYS_LOCAL $KEYCHAIN_KEYS_BU"
[ -f ~/tmp/keychain_init_done ] && source ~/bin/init-keychain.sh

# Config keys for Atuin together with Fzf and run init for Zsh
[ -f ~/.config/atuin/atuin-setup.sh ] && source ~/.config/atuin/atuin-setup.sh

# zprof # Show profiling result
