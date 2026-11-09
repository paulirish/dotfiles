# Simons's dotfiles

Based off [Paul Irish's dotfiles](https://github.com/paulirish/dotfiles), which are great. These are adapted to my needs.

## Setup

### Fresh computer

- Install homebrew first, it will install XCode dev tools to get `git` and so on:
  ```
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- Add SSH keys to Github

### Installing & using

Some applications are worth installing manually since a Brew install will mess with future updates:

- Browsers
- Slack
- VSCode
- Spotify
- [BeardedSpice](https://beardedspice.github.io/) for media controls

#### Let's go!

- fork this to your own acct
- clone that repo
- Create `.gitconfig.local` with user settings

      [user]
      	useConfigOnly = true
      	email = <email>
      	name = <name>
      [credential]
      	helper = osxkeychain

- read and run parts of `setup-a-new-machine.sh`
- use it. yay!

#### Configuration of applications

- [Make iTerm2 open split tabs in same directory](https://apple.stackexchange.com/questions/337377/iterm2-split-vertically-with-current-profile-with-same-working-directory/337386#337386)

#### Claude Code: personal and work accounts

The `claude()` function in `.functions` picks the account by folder:

- anywhere under `~/code/work` → work account, config in `~/.claude-work`
- everywhere else → personal account, config in `~/.claude`

`claude/settings.json` (symlinked by `symlink-setup.sh`) is the personal one.
The work account keeps its own `~/.claude-work/settings.json` locally, outside
this repo; on a new machine, copy it over by hand. Secrets such as
`CUBIC_API_KEY` go in `~/.extra`, never in a settings file.

Log in once per account:

```
cd ~ && claude                  # then /login with the personal account
cd ~/code/work/<repo> && claude # then /login with the work account
```

The Claude desktop app ignores this and uses whichever account it is logged in to.

### What you get

- Mac OSX default settings (Paul Irish's)
- homebrew apps:
  - git
  - jq
  - zoxide
  - bat
  - [borders](https://github.com/FelixKratz/JankyBorders): orange border around
    the focused window, so you can tell which one Cmd+Tab landed on
- homebrew cask
  - rectangle for window management
  - iterm2
  - insomna (better Postman)
- oh-my-zsh
  - git
  - history substring search
  - autosuggestions
  - syntax highlighting on terminal commands
- [zoxide](https://github.com/ajeetdsouza/zoxide)
- functions:
  - `mkdc`: create directory and `cd` into it
- `bin/` scripts (symlinked to `~/bin`, which is on `PATH`):
  - `git-archive-merged-branches`: tags and deletes local branches already
    merged into main — including squash-merged ones — usable as
    `git archive-merged-branches`
  - `macos-prefs-diff.sh`: diffs live `defaults` state against every
    `defaults write` line in `.osx`, to catch drift between the script and
    reality. Read-only.

## Migration

Steps to migrate from another computer.

- Copy `.extra`
