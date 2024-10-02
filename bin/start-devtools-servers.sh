
#!/usr/bin/env bash

set -euo pipefail

echo "hi"
# port 9435
/Users/paulirish/bin/statikk --cors ~/Downloads/traces & 

# --port=9308
statikk --cors --port=9308 $HOME/chromium-devtools/devtools-frontend/front_end/panels/timeline/fixtures/traces & 

# port 10090
cd $HOME/chromium-devtools/devtools-frontend && PORT=10090 /Users/paulirish/bin/node scripts/component_server/server.js

# but DONT background this last one.. so you can ctrl-c the script in total                        ^


# fyi these have been hardcoed into
#     ~/Library/Workflows/Applications/MyLoginStuff-streamdeck-displayswap-etc.automator.app
# so any changes here wont affect that one.