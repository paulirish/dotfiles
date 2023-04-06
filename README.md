# Paul's dotfiles

* I maintain this repo as *my* dotfiles, but I'm keenly aware people are using it for theirs.
* You're quite welcome to make suggestions, however I may decline if it's not of personal value to me.
* If you're starting off anew, consider forking [mathias](https://github.com/mathiasbynens/dotfiles/) or [alrra](https://github.com/alrra/dotfiles/). [paulmillr](https://github.com/paulmillr/dotfiles) and [gf3](https://github.com/gf3/dotfiles) also have great setups


## Setup

I would not suggest you just wholesale use my dotfiles. But there's a few files where there's great goodies you can steal.

#### shell

This repo contains config for fish and bash. As of 2016, I primarily use `fish` shell, but fall back to `bash` once in a while. The bash and fish stuff are both well maintained. If you're using fish you'll want to do a `git submodule update --init`.

## my favorite parts.

### aliases and functions

* [`aliases.fish`](./fish/aliases.fish) and [`functions.fish`](./fish/functions.fish) and [`fish/functions/*`](./fish/functions/)
* [`.aliases`](./.aliases) and [`.functions`](./.functions)

So many goodies.

### The "readline config" (`.inputrc`)
Basically it makes typing into the prompt amazing.

* tab like crazy for autocompletion that doesnt suck. tab all the things. srsly.
* no more <tab><tab> that says "Display all 1745 possibilities? (y or n)" YAY
* type `cat <uparrow>` to see your previous `cat`s and use them.
* case insensitivity.
* tab all the livelong day.

### [.gitconfig](./gitconfig)
* err'body gotta have their aliases. I'm no different.

### Moving around in folders (`z`, `...`, `cdf`)
`z` helps you jump around to whatever folder. It uses actual real magic to determine where you should jump to. Seperately there's some `...` aliases to shorten `cd ../..` and `..`, `....` etc. Then, if you have a folder open in Finder, `cdf` will bring you to it.
```sh
z dotfiles
z blog
....      # drop back equivalent to cd ../../..
z public
cdf       # cd to whatever's up in Finder
```
`z` learns only once its installed so you'll have to cd around for a bit to get it taught.
Lastly, I use `open .` to open Finder from this path. (That's just available normally.)


## overview of files


#### shell environment
* `.aliases`, `.bash_profile`, `.bash_prompt`, `.bashrc`, `.exports`, `.functions`

#### manual run
* `setup-a-new-machine.sh` - random apps i need installed
* `symlink-setup.sh`  - sets up symlinks for all dotfiles and vim config.
* `.macos` - run on a fresh mac os setup
* `brew.sh` & `brew-cask.sh` - homebrew initialization

#### git, brah
* `.gitconfig`
* `.gitignore`


### `.extra` for your private configuration

There will be items that don't belong to be committed to a git repo, because either 1) it shoudn't be the same across your machines or 2) it shouldn't be in a git repo. Kick it off like this:

`touch ~/.extra && $EDITOR $_`

I have some EXPORTS, my PATH construction, and a few aliases for ssh'ing into my servers in there.


### Sensible OS X defaults in `.macos`

Mathias's repo is the canonical for this, but you should probably run his or mine after reviewing it.


### `~/bin`

One-off binaries that aren't via an npm global or homebrew. [git open](https://github.com/paulirish/git-open), `subl` for Sublime Text, and some other git utilities.


### 2020 update

Rust folks have made a few things that are changing things.

 - most folks know `bat`  as a `cat` replacement
 - https://github.com/dandavison/delta seems a lot better than the diff-so-fancy project that i started. :/
 - https://github.com/ogham/exa is better `ls` and gets all the trapd00r/LS_COLORS stuff etc.
 - https://github.com/bigH/git-fuzzy interactive git thing. deprecates my `git recent` script. and probably some other things.

### Dotfiles mgmt todo
 Also I'd like to migrate to using one of these:
 - homesick or 
 - https://www.atlassian.com/git/tutorials/dotfiles
 - https://github.com/nix-community/home-manager
 - https://www.chezmoi.io/

 also interested in https://github.com/dandavison/open-in-editor
