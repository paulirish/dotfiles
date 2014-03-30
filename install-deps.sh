# up to you (me) if you want to run this as a file or copy paste at your leisure


# https://github.com/jamiew/git-friendly
# the `push` command which copies the github compare URL to my clipboard is heaven
bash < <( curl https://raw.github.com/jamiew/git-friendly/master/install.sh)

# https://rvm.io
# rvm for the rubiess
curl --progress -L https://get.rvm.io | bash -s stable --ruby

# http://nodejs.org/dist/v0.10.26/node-v0.10.26.tar.gz
# nodejs
mkdir -p /tmp/nodejs-install && cd /tmp/nodejs-install
curl --progress http://nodejs.org/dist/v0.10.26/node-v0.10.26.tar.gz | tar zx

# https://github.com/isaacs/nave
# needs npm, obviously.
# TODO: I think i'd rather curl down the nave.sh, symlink it into /bin and use that for initial node install.
npm install -g nave

# homebrew!
# you need the code CLI tools YOU FOOL.
ruby < (curl -fsSkL raw.github.com/mxcl/homebrew/go)

# https://github.com/rupa/z
# z binary is already referenced from .bash_profile
mkdir -p 
cd 
git clone https://github.com/rupa/z.git
chmod +x /z/z.sh

# https://github.com/dronir/SpotifyControl
# Spotify Controll Script
cd 
git clone git://github.com/dronir/SpotifyControl.git

# https://github.com/jeroenbegyn/VLCControl
# VLC Controll Script
cd 
git clone git://github.com/jeroenbegyn/VLCControl.git

# for the c alias (syntax highlighted cat)
sudo easy_install Pygments
