# https://github.com/jamiew/git-friendly
# the `push` command which copies the github compare URL to my clipboard is heaven
sudo bash < <( curl https://raw.github.com/jamiew/git-friendly/master/install.sh)

# homebrew!
# you need the code CLI tools YOU FOOL.
ruby <(curl -fsSkL raw.github.com/mxcl/homebrew/go)

# https://github.com/rupa/z
# z, awesome directory auto complete
# z binary is already referenced from .bash_profile
cd ~/Util
git clone https://github.com/rupa/z.git
chmod +x ~/Util/z/z.sh

# for the c alias (syntax highlighted cat)
sudo easy_install Pygments
