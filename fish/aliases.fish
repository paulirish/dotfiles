

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
# pretty sure watchexec has just won my heart after years of using `entr`
alias reportwatch 'watchexec "node build/build-report-components.js && node build/build-report.js --psi && node build/build-sample-reports.js && echo \$(date) && yarn eslint --fix report/renderer/components.js" && bash core/scripts/copy-util-commonjs.sh'

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
abbr brwe brew

alias push="git push"

# `g co`, etc. subcommand expansion with `abbr`.
function set_git_abbr
  set -l short "$argv[1]"
  set -l long "$argv[2]"

  # Check that these strings are safe, since we're going to eval. 👺
  if not string match --regex --quiet '^[a-z]*$' "$short"
    or not string match --regex --quiet '^[a-z- ]*$' "$long"
    echo "Scary unsupported alias or expansion $short $long"; exit 1; 
  end

  # Subcommand arg expanesion via commandline -tokenize + abbr --position anywhere
  # thx lgarron for inspiration: https://github.com/lgarron/dotfiles/blob/115d8c1bf2a/dotfiles/fish/.config/fish/config.fish#L221
  # https://www.reddit.com/r/fishshell/comments/16s0bsi/leveraging_abbr_for_git_aliases/
  set -l git_abbr_temp_fn "function git_abbr_$short
    set --local tokens (commandline --tokenize)
    if test \$tokens[1] = git
      echo $long
    else
      echo $short
    end; 
  end; 
  abbr --add $short --position anywhere --function git_abbr_$short"
  eval "$git_abbr_temp_fn"
end

set_git_abbr "c" "commit -am"
set_git_abbr "co" "checkout"
set_git_abbr "c" "commit -am"
set_git_abbr "s" "status"
set_git_abbr "ts" "status"
set_git_abbr "amend" "commit --amend --all --no-edit"
set_git_abbr "hreset" "reset --hard"
set_git_abbr "cp" "cherry-pick"
set_git_abbr "cherrypick" "cherry-pick"
set_git_abbr "dif" "diff"



# is it a `main` or a `master` repo?
alias gitmainormaster="git branch --format '%(refname:short)' --sort=-committerdate --list master main | head -n1"
alias main="git checkout (gitmainormaster)"
alias master="main"



# ag defaults. go as wide as terminal (minus some space for line numbers)
# i used to like `--follow --hidden` but dont anymore. -follow ends up with lots of fstat errors on broken symlinks. and --hidden is something that should be turned on explicitly.
alias ag='command ag -W (math $COLUMNS - 14)'  

# fd is fast but their multicore stuff is dumb and slow and bad. https://github.com/sharkdp/fd/issues/1203
alias fd='command fd -j1 --exclude node_modules'
# By default watchexec thinks the project origin is higher up.  So dumb. 
alias watchexec='command watchexec --project-origin . --ignore node_modules'


# for counting instances.. `ag -o 'metadata","name":".*?"' trace.json | sorteduniq`
alias sorteduniq="sort | uniq -c | sort -r"
alias sorteduniq-asc="sort | uniq -c | sort"


alias diskspace_report="df -P -kHl"
alias free_diskspace_report="diskspace_report"


alias hosts='sudo $EDITOR /etc/hosts'   # yes I occasionally 127.0.0.1 twitter.com ;)

alias resetmouse='printf '"'"'\e[?1000l'"'"

alias dotfiles="subl ~/code/dotfiles" # open dotfiles for viewing


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

