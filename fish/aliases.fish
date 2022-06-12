

# Navigation
function ..    ; cd .. ; end
function ...   ; cd ../.. ; end
function ....  ; cd ../../.. ; end
function ..... ; cd ../../../.. ; end

# Utilities
function grep     ; command grep --color=auto $argv ; end

# uses npm if its an npm repo. https://www.npmjs.com/package/narn
alias yarn=narn

alias li=lighthouse
alias lperf 'lighthouse --only-categories=performance'
alias comp 'node build/build-report-components.js && yarn eslint --fix report/renderer/components.js'
alias reportunit 'yarn jest (find report -iname "*-test.js" | grep -v axe)'
alias reportwatch 'find report lighthouse-core/test/results/sample_v2.json | entr bash -c "node build/build-report-components.js && node build/build-report.js --psi && node build/build-sample-reports.js && echo \$(date) && yarn eslint --fix report/renderer/components.js" && bash lighthouse-core/scripts/copy-util-commonjs.sh'

# mv, rm, cp
alias mv 'command gmv --interactive --verbose'
alias rm 'command grm --interactive --verbose'
alias cp 'command gcp --interactive --verbose'

alias chmox='chmod +x'

alias where=which # sometimes i forget

# typos and abbreviations
abbr g git
abbr gi git
abbr gti git
abbr yearn yarn
abbr v vim
abbr bwre brew


alias hosts='sudo $EDITOR /etc/hosts'   # yes I occasionally 127.0.0.1 twitter.com ;)

alias push="git push"

alias ag='ag --follow --hidden -W (math $COLUMNS - 11)'

alias diskspace_report="df -P -kHl"
alias free_diskspace_report="diskspace_report"

# is it a `main` or a `master` repo?
alias gitmainormaster="git branch --format '%(refname:short)' --sort=-committerdate --list master main | head -n1"
alias main="git checkout (gitmainormaster)"
alias master="main"

alias resetmouse='printf '"'"'\e[?1000l'"'"


# Networking. IP address, dig, DNS
alias ip="dig +short myip.opendns.com @resolver1.opendns.com"
alias dig="dig +nocmd any +multiline +noall +answer"
# wget sucks with certificates. Let's keep it simple.
alias wget="curl -O"

# Recursively delete `.DS_Store` files
alias cleanup_dsstore="find . -name '*.DS_Store' -type f -ls -delete"

alias ungz="gunzip -k"

# File size
alias fs="stat -f \"%z bytes\""

# emptytrash written as a function

# Update installed Ruby gems, Homebrew, npm, and their installed packages
alias brew_update="brew -v update; brew upgrade --force-bottle --cleanup; brew cleanup; brew cask cleanup; brew prune; brew doctor; npm-check -g -u"
alias update_brew_npm_gem='brew_update; npm install npm -g; npm update -g; sudo gem update --system; sudo gem update --no-document'

