# Load ~/.extra, ~/.bash_prompt, ~/.exports, ~/.aliases and ~/.functions
# ~/.extra can be used for settings you don’t want to commit
for file in ~/.{extra,bash_prompt,exports,aliases,functions,git-completion.bash}; do
	[ -r "$file" ] && source "$file"
done
unset file

# init rvm
if [ -f "~/.rvm/scripts/rvm" ]
then
  source ~/.rvm/scripts/rvm
fi

# Case-insensitive globbing (used in pathname expansion)
shopt -s nocaseglob

# Prefer US English and use UTF-8
export LC_ALL="de_DE.UTF-8"
export LANG="de_DE"

export CHROME_BIN="/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"

# Add tab completion for SSH hostnames based on ~/.ssh/config, ignoring wildcards
[ -e "$HOME/.ssh/config" ] && complete -o "default" -o "nospace" -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" | cut -d " " -f2)" scp sftp ssh

# Add tab completion for `defaults read|write NSGlobalDomain`
# You could just use `-g` instead, but I like being explicit
complete -W "NSGlobalDomain" defaults

[[ -s /Users/jan/.nvm/nvm.sh ]] && . /Users/jan/.nvm/nvm.sh # This loads NVM

export EDITOR="vim"

LESSPIPE=`which src-hilite-lesspipe.sh`

export LESSOPEN="| ${LESSPIPE} %s"
export LESS='-R'LESSPIPE=`which src-hilite-lesspipe.sh`
export LESSOPEN="| ${LESSPIPE} %s"
export LESS='-R'
