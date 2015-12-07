

# Navigation
function ..    ; cd .. ; end
function ...   ; cd ../.. ; end
function ....  ; cd ../../.. ; end
function ..... ; cd ../../../.. ; end

# Utilities
function c        ; pygmentize -O style=monokai -f console256 -g $argv ; end
function g        ; git $argv ; end
function grep     ; command grep --color=auto $argv ; end



# mv, rm, cp
alias mv 'command gmv --interactive --verbose'
alias rm 'command grm --interactive --verbose'
alias cp 'command gcp --interactive --verbose'


alias cask='brew cask' # i <3 u cask
alias where=which # sometimes i forget
alias brwe=brew  #typos

alias hosts='sudo $EDITOR /etc/hosts'   # yes I occasionally 127.0.0.1 twitter.com ;)


# `shellswitch [bash|zsh|fish]`
function shellswitch
	chsh -s (brew --prefix)/bin/$argv
end



# `cat` with beautiful colors. requires Pygments installed.
# 							   sudo easy_install -U Pygments
alias c='pygmentize -O style=monokai -f console256 -g'



# Networking. IP address, dig, DNS
alias ip="dig +short myip.opendns.com @resolver1.opendns.com"
alias dig="dig +nocmd any +multiline +noall +answer"

# Recursively delete `.DS_Store` files
alias cleanup_dsstore="find . -name '*.DS_Store' -type f -ls -delete"

# Shortcuts
alias g="git"
alias v="vim"
alias ungz="gunzip -k"

# File size
alias fs="stat -f \"%z bytes\""

# Empty the Trash on all mounted volumes and the main HDD. then clear the useless sleepimage
alias emptytrash="sudo rm -rfv /Volumes/*/.Trashes; rm -rfv ~/.Trash; sudo rm /private/var/vm/sleepimage"

# Update installed Ruby gems, Homebrew, npm, and their installed packages
alias brew_update="brew -v update; brew -v upgrade --all; brew cleanup; brew cask cleanup; brew prune; brew doctor"
alias update_brew_npm_gem='brew_update; npm install npm -g; npm update -g; sudo gem update --system; sudo gem update --no-rdoc --no-ri'

