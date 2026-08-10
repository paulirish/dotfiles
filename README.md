# Mike's dotfiles

A cross-platform dotfiles manager for macOS, Linux, HPC clusters, GitHub Codespaces, and Code Ocean — packaged as a Python CLI so installation is a single command anywhere Python is available.

## Quick start

```bash
# Install globally with uv (recommended)
uv tool install git+https://github.com/mikecuoco/dotfiles

# Or in development
git clone https://github.com/mikecuoco/dotfiles && cd dotfiles
pip install -e .

# Install dotfiles for the detected platform
dotfiles install

# Preview changes without touching anything
dotfiles install --dry-run
```

## CLI reference

```
dotfiles install   [-p PROFILE] [-n/--dry-run] [--home DIR]
dotfiles doctor    [--json]
dotfiles status
dotfiles auth
dotfiles profiles
```

| Command | What it does |
|---|---|
| `install` | Symlink dotfiles for the active (or specified) profile; backs up any existing files |
| `doctor` | Check that all installed symlinks and generated files are healthy |
| `status` | Show what's currently installed and which profile is active |
| `auth` | Report authentication status (Anthropic, GitHub, AWS, Mem0) |
| `profiles` | List all available profiles with descriptions |

## Profiles

Profiles compose via inheritance — each child inherits all of its parent's links and can override or append to them.

```
common
├── macos        macOS / MacBook
├── linux        Generic Linux workstation or server
│   ├── cluster  HPC / SLURM / PBS / SGE clusters
│   ├── codeocean Code Ocean cloud workstation or container
│   └── codespace GitHub Codespaces
```

The active profile is **auto-detected** at install time (override with `--profile`):

| Detected by | Profile |
|---|---|
| `CODESPACES=true` or `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN` | `codespace` |
| `CODEOCEAN_ENV` or `CO_REPO_ID` | `codeocean` |
| `SLURM_JOB_ID`, `PBS_JOBID`, `SGE_TASK_ID`, `LSB_JOBID`, or cluster-like hostname | `cluster` |
| `uname = Linux` | `linux` |
| `uname = Darwin` | `macos` |

## What gets installed

### Common (all platforms)

| Category | Files |
|---|---|
| Shell | `.bashrc`, `.bash_profile`, `.bash_prompt`, `.aliases`, `.exports`, `.functions`, `.inputrc` |
| Git | `.gitconfig`, `.gitignore`, `.gitattributes` |
| Editor | `.vimrc`, `.vim/` |
| Conda | `.condarc` |
| Misc | `.dircolors`, `.gemrc`, `.hushlogin` |
| Claude Code | `.claude/CLAUDE.md`, `.claude/settings.json` |

### Platform overlays

Each profile adds files alongside the common ones. Shell overlays (`.exports.<profile>`, `.aliases.<profile>`, `.functions.<profile>`) are sourced automatically by `.bash_profile` at shell startup.

| Profile | Extra files |
|---|---|
| `macos` | `.aliases.macos`, `.exports.macos`, `.functions.macos`, `.conda_build_config.yaml` |
| `linux` | `.exports.linux` |
| `cluster` | `.exports.cluster`, `.functions.cluster`, `.Rprofile` |
| `codeocean` | `.exports.codeocean`, `.claude/CLAUDE.md` (appended to common) |
| `codespace` | `.exports.codespace` |

### Profile overlays (`append` mode)

A link declared with `mode = "append"` concatenates its source onto the parent's file rather than replacing it. This is used for profile-specific `CLAUDE.md` additions — the `codeocean` profile appends its own instructions to the common `CLAUDE.md` to produce a single merged file.

## How it works

1. **`dotfiles install`** resolves the full link list for the active profile (depth-first through `inherits`), then either symlinks each file into `$HOME` or — when append entries exist for a destination — writes a concatenated regular file.
2. **Backup on conflict**: if a file already exists at the destination it is renamed to `<name>.dotfiles-backup.<timestamp>` before being replaced.
3. **Idempotent**: re-running `install` is safe; unchanged symlinks and up-to-date generated files are skipped.
4. **State file**: installation details are saved to `~/.config/dotfiles/state.json` so `status` and `doctor` can verify the installation without re-reading the package.
5. **Active profile**: written to `~/.config/dotfiles/profile` and read by `.bash_profile` to source the right platform overlays at shell startup.

## Extending or developing

```bash
git clone https://github.com/mikecuoco/dotfiles
cd dotfiles
pip install -e .

# Run tests
pytest

# Preview what a specific profile would install
dotfiles install --profile cluster --dry-run
```

Resources live in `src/dotfiles/resources/`, organized by profile name. Add a new profile by editing `src/dotfiles/resources/profiles.toml`.

## macOS setup scripts

The following scripts in `src/dotfiles/resources/macos/setup/` are meant to be run manually on a fresh machine:

```bash
./brew.sh        # core Homebrew formulae
./brew-cask.sh   # GUI applications via Homebrew Cask
./macos.sh       # sensible macOS defaults
```

## HPC cluster extras

`src/dotfiles/resources/cluster/setup/` contains helper scripts for cluster environments:

- `conda-setup.sh` — bootstrap conda on a cluster
- `singularity-setup.sh` — Singularity / Apptainer configuration

