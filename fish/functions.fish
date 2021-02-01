# thx to https://github.com/mduvall/config/

function subl --description 'Open Sublime Text'
  if test -d "/Applications/Sublime Text.app"
    "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" $argv
  else if test -d "/Applications/Sublime Text 2.app"
    "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl" $argv
  else if test -x "/opt/sublime_text/sublime_text"
    "/opt/sublime_text/sublime_text" $argv
  else if test -x "/opt/sublime_text_3/sublime_text"
    "/opt/sublime_text_3/sublime_text" $argv
  else
    echo "No Sublime Text installation found"
  end
end

function loc --description "zfz with locatef"
  glocate --database=(brew --prefix)/var/locate/locatedb --all --ignore-case --null $argv | ggrep --null --invert-match --extended-regexp '~$' | fzf --read0 -0 -1 -m
end

function killf
  if ps -ef | sed 1d | fzf -m | awk '{print $2}' > $TMPDIR/fzf.result
    kill -9 (cat $TMPDIR/fzf.result)
  end
end

function clone --description "clone something, cd into it. install it."
    git clone --depth=1 $argv[1]
    cd (basename $argv[1] | sed 's/.git$//')
    yarn install
end


function md --wraps mkdir -d "Create a directory and cd into it"
  command mkdir -p $argv
  if test $status = 0
    switch $argv[(count $argv)]
      case '-*'
      case '*'
        cd $argv[(count $argv)]
        return
    end
  end
end

function gz --d "Get the gzipped size"
  printf "%-20s %12s\n"  "compression method"  "bytes"
  printf "%-20s %'12.0f\n"  "original"         (cat "$argv[1]" | wc -c)
  
  # -5 is what GH pages uses, dunno about others
  # fwiw --no-name is equivalent to catting into gzip
  printf "%-20s %'12.0f\n"  "gzipped (-5)"     (cat "$argv[1]" | gzip -5 -c | wc -c)
  printf "%-20s %'12.0f\n"  "gzipped (--best)" (cat "$argv[1]" | gzip --best -c | wc -c)
  
  # brew install brotli to get these as well
  if hash brotli
  # googlenews uses about -5, walmart serves --best 
  printf "%-20s %'12.0f\n"  "brotli (-q 5)"    (cat "$argv[1]" | brotli -c --quality=5 | wc -c)
  printf "%-20s %'12.0f\n"  "brotli (--best)"  (cat "$argv[1]" | brotli -c --best | wc -c)
  end
end

function sudo!!
    eval sudo $history[1]
end


# `shellswitch [bash|zsh|fish]`
function shellswitch
	chsh -s (brew --prefix)/bin/$argv
end

function upgradeyarn
  curl -o- -L https://yarnpkg.com/install.sh | bash
end

function fuck -d 'Correct your previous console command'
    set -l exit_code $status
    set -l eval_script (mktemp 2>/dev/null ; or mktemp -t 'thefuck')
    set -l fucked_up_commandd $history[1]
    thefuck $fucked_up_commandd > $eval_script
    . $eval_script
    rm $eval_script
    if test $exit_code -ne 0
        history --delete $fucked_up_commandd
    end
end

function server -d 'Start a HTTP server in the current dir, optionally specifying the port'
    if test $argv[1]
        set port $argv[1]
    else
        set port 8011
    end

    open "http://localhost:$port/" &
    # Set the default Content-Type to `text/plain` instead of `application/octet-stream`
    # And serve everything as UTF-8 (although not technically correct, this doesn’t break anything for binary files)
#     python -c "import SimpleHTTPServer
# map = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map;
# map[\"\"] = \"text/plain\";
# for key, value in map.items():
#   map[key] = value + \";charset=UTF-8\";
#   SimpleHTTPServer.test()" $port
    statikk --port "$port" .
end


function emptytrash -d 'Empty the Trash on all mounted volumes and the main HDD. then clear the useless sleepimage'
    sudo rm -rfv "/Volumes/*/.Trashes"
    grm -rf "~/.Trash/*"
    rm -rfv "/Users/paulirish/Library/Application Support/stremio/Cache"
    rm -rfv "/Users/paulirish/Library/Application Support/stremio/stremio-cache"
    rm -rfv "~/Library/Application Support/Spotify/PersistentCache/Update/*.tbz"
    rm -rfv ~/Library/Caches/com.spotify.client/Data
    rm -rfv ~/Library/Caches/Firefox/Profiles/98ne80k7.dev-edition-default/cache2
end

function cond -d 'initialize conda'
  # >>> conda initialize >>>
  # !! Contents within this block are managed by 'conda init' !!
  eval /opt/miniconda3/bin/conda "shell.fish" "hook" $argv | source
  # <<< conda initialize <<<
  conda activate py2
end