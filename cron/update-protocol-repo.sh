#!/bin/bash
set -x

# rolls new protocol files into https://github.com/ChromeDevTools/devtools-protocol

chromium_src_path="$HOME/chromium-tot/src"
local_script_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protocol_repo_path="$HOME/code/pristine/devtools-protocol"

# => into chromium
cd $chromium_src_path;

git fetch origin
git checkout -f origin/master
env GYP_DEFINES=disable_nacl=1 gclient sync --jobs=70  --nohooks


browser_protocol_path="$chromium_src_path/third_party/WebKit/Source/core/inspector/browser_protocol.json"
js_protocol_path="$chromium_src_path/v8/src/inspector/js_protocol.json"

# copy the protocol.json over
cp $js_protocol_path "$protocol_repo_path/json"
cp $browser_protocol_path "$protocol_repo_path/json"

# extract cr rev
commit_pos_line=$(git log --no-color --max-count=1 | gtac | grep -E -o "Cr-Commit-Position.*")
commit_rev=$(echo $commit_pos_line | grep -E -o "\d+")

# generate externs
python "$chromium_src_path/third_party/WebKit/Source/devtools/scripts/build/generate_protocol_externs.py" -o "$protocol_repo_path/externs/protocol_externs.js" "$browser_protocol_path" "$js_protocol_path"

# => into protocol repo
cd $protocol_repo_path
git commit --author="DevTools Bot <paulirish+bot@google.com>" --all -m "Roll protocol to r$commit_rev"
git pull && git push
