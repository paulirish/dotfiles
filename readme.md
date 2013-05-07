# Simon's dotfiles.

Wrote some blog articles on this [Mother Effing Dotfiles](http://www.simonowendesign.co.uk/mother-effing-dotfiles/), [Mac OS X Dotfile](http://www.simonowendesign.co.uk/mac-os-x-osx-dotfile/).

Ripped from [Paul Irish](https://github.com/paulirish/dotfiles)

[mathias's readme](https://github.com/mathiasbynens/dotfiles/) is awesome. Go read it.

This repo is mostly for me but you're welcome to make suggestions. Mathias's is the project to fork.  I'm mostly catching up to him, @cowboy, and @gf3.

## Install the necessary apps

My basic setup is captured in `install-deps.sh` which adds homebrew, z, nave, etc.

## Private config

Toss it into a file called `.extra` which you do not commit to this repo and just keep in your `~/`

I do something nice with my `PATH` there:

```shell
# PATH like a bawss
      PATH=/opt/local/bin
PATH=$PATH:/opt/local/sbin
PATH=$PATH:/bin
PATH=$PATH:~/.rvm/bin
PATH=$PATH:~/code/git-friendly
# ...

export PATH
```

## Syntax highlighting

…is really important. Even for these files.

Install [Dotfiles Syntax Highlighting](https://github.com/mattbanks/dotfiles-syntax-highlighting-st2) via [Sublime Text 2 Package Control](http://wbond.net/sublime_packages/package_control)


### Sensible OS X defaults

When setting up a new Mac, you may want to set some sensible OS X defaults:

```bash
./.osx
```

## Similar projects

I recommend getting a [`.jshintrc`](https://github.com/jshint/node-jshint/blob/master/.jshintrc) and [`.editorconfig`](http://editorconfig.org/) defined for all your projects.


## Overview of files

####  Automatic config
* `.ackrc` - for ack (better than grep)
* `.vimrc`, `.vim` - vim config, obv.

#### Shell environment
* `.aliases`
* `.bash_profile`
* `.bash_prompt`
* `.bashrc`
* `.exports`
* `.functions`
* `.extra` - not included, explained above

#### Manual run
* `install-deps.sh` - random apps I need installed
* `.osx` - run on a fresh osx machine
* `.brew` - homebrew intialization

#### Git, brah
* `.git`
* `.gitattributes`
* `.gitconfig`
* `.gitignore`

* `.inputrc` - config for bash readline


## Installation

```bash
git clone https://github.com/simonowendesign/dotfiles.git && cd dotfiles && ./sync.sh
```

To update later on, just run the sync again.
