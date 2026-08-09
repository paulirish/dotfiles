# Dotfiles Unification Plan

Audit of `mikecuoco/dotfiles` (Mac) and `mikecuoco/cluster_dotfiles` (Linux/HPC),
produced as Phase 1 of migrating to a single cross-platform repository.

---

## File Classification

| File | Mac repo | Cluster repo | Class | Action |
|------|----------|--------------|-------|--------|
| `.bashrc` | Sources `.bash_profile` | Sources `.bash_profile` | common | Merge (identical) |
| `.bash_profile` | Mac-heavy; Homebrew completions, `z`, `grc` | Linux-friendly; 100k history, VSCode-PATH workaround, self-bootstrapping `z` | common + platform split | Extract common loader; platform overlays for completions |
| `.bash_prompt` | `default_username='mikecuoco'`, `thefuck`, forces gnome-256color TERM | Near-identical; no `thefuck`; excellent `PS4` debug prompt | common | Use cluster base; parameterize `default_username`; drop `thefuck` |
| `.aliases` | macOS `emptytrash`, BSD `fs`, Stremio paths, `exa` | Cross-platform `gls` detection, `main` branch alias | common + macos split | Common: navigation, safer ops, git, cross-platform ls; macOS: trash, BSD-specific |
| `.exports` | Homebrew init, iTerm2, `USER=mcuoco` override, `CROMWELL_JAR` glob | Kubernetes locale guard, `gdircolors`/`dircolors` fallback, no Homebrew | common + platform split | Common: EDITOR, MANPAGER, locale, dircolors; macOS: Homebrew, iTerm2; cluster: locale guard |
| `.functions` | `cdf` (Finder), `connect` (1Password VPN), `tunnel`, `shellswitch`, `cond` (hard-coded `/opt/miniconda3`) | `wait_for_mem_available`, `rc` (DNA reverse complement), `_path_del`/`_path_prepend` | common + platform split | Common: `md`, `f`, `la`, `cp_p`, `gz`, `extract`, `whois`, `csvpreview`, `log`, `nullify`, `cond` (rewritten); macOS: `cdf`, `connect`, `localip`, `gifify`; cluster: `wait_for_mem_available`, `rc` |
| `.inputrc` | Near-identical | Near-identical | common | Single canonical copy (cluster version preferred) |
| `.gitconfig` | `gh` credential helper hardcoded `/opt/homebrew/bin/gh`; `opendiff` merge tool; UCSD email | `credential.helper=store`; UCSD email; `opendiff` vestigially present | common + platform setup | Common: aliases, delta, colors, push/pull behavior; `user.*` to `.gitconfig.local`; credential helper set by installer |
| `.condarc` | bioconda+conda-forge+nodefaults, `auto_activate_base: true` | Same content | common | Single copy; change `auto_update_conda: false` |
| `.dircolors` | trapd00r LS_COLORS (500+ entries) | Similar | common | Use one canonical copy |
| `.vimrc` / `.vim/` | vim-plug, molotov, 30+ plugins (some stale) | Same base | common | Merge; replace stale plugins |
| `.Rprofile` | Not present | VSCode-R integration (cluster-specific) | cluster | Keep in cluster profile |
| `.conda_build_config.yaml` | `MacOSX10.10.sdk` path (2014, non-existent) | Not present | macos / obsolete | Update SDK path or remove |
| `.eslintrc.js` / `package.json` | ESLint 6.x, Prettier 1.x (outdated) | Present | legacy | Move to `legacy/`; not part of dotfiles install |
| `.gemrc` | `gem: --no-document` | Not checked | common | Keep as common |
| `.spacemacs` | 43KB; **committed Google OAuth secret at line 58** | Not present | **delete** | Remove from repo; add to `.gitignore`; **rotate the credential** |
| `.hushlogin` | Suppresses macOS login banner | Not present | common (harmless) | Keep as common |
| `.gitignore` (global) | Comprehensive | Comprehensive | common | Merge |
| `.gitattributes` | Empty | Empty | common | Keep (referenced by gitconfig) |
| `brew.sh` | Homebrew formulae | Not present | macos | Move to `src/dotfiles/resources/macos/setup/` |
| `brew-cask.sh` | Homebrew casks | Not present | macos | Move to `src/dotfiles/resources/macos/setup/` |
| `macos.sh` | 100+ `defaults write` settings | Not present | macos | Move to `src/dotfiles/resources/macos/setup/` |
| `setup-a-new-machine.sh` | Annotated Mac setup guide | Not present | doc | Update stale references; move to `docs/` |
| `symlink-setup.sh` | Bash symlinker | Present (both) | legacy | Deprecate; replaced by Python installer |
| `conda-setup.sh` | Not present | micromamba Linux-x64 install | cluster | Move to cluster setup; add arch detection |
| `singurity-setup.sh` | Not present | Singularity RHEL7 RPM install (filename typo) | cluster | Rename to `singularity-setup.sh`; update to EL8/Apptainer |
| `cron/` | Crontab template + crontest; actual scripts gitignored | Present | doc | Move to `docs/cron-reference/`; preserve gitignore pattern |
| `docs/R_Conda_VSCode.md` | Not present | VSCode+R+HPC guide | cluster doc | Move to `docs/` |

---

## Security Issues (act before making repo public)

### Critical: Google Calendar OAuth secret in `.spacemacs`
Line 58 of `.spacemacs` contains a commented-out OAuth client secret:
```
org-gcal-client-secret "xQ916mFYycskTJyJOtK2VbDZ"
```
Even commented out, it is in git history. **Rotate this credential immediately.**
Resolution: delete `.spacemacs` from the repo; add `.spacemacs` to `.gitignore`.

### Low: 1Password item UUIDs in `.functions`
The `connect()` function hardcodes 1Password item UUIDs for UCSD and Salk VPN
credentials (`hkbrgyxuubyudypzqlnanpdiya`, `ltzmpxtabm66b5acokjubr6g3m`). Not
passwords themselves, but discloses institutional access. These are moved to the
macOS profile and refactored to use env vars (`OP_UCSD_VPN_ID`, `OP_SALK_VPN_ID`)
that the user sets in `~/.extra`.

### Informational: UCSD email in `.gitconfig`
Update via `~/.gitconfig.local` to `mike.cuoco@alleninstitute.org`.

---

## Cross-Cutting Improvements

### Hard-coded usernames and paths removed

| Item | File | Fix |
|------|------|-----|
| `export USER=mcuoco` | `.exports` | Remove; machine-specific workaround → `~/.extra` |
| `default_username='mikecuoco'` | `.bash_prompt` | → `DOTFILES_USER="${DOTFILES_USER:-$(id -un)}"` |
| `ssh mcuoco@$1` | `.functions` | → `${DOTFILES_USER:-$USER}` |
| `printf "...\nmcuoco\n..."` | `.functions` (VPN) | → `$USER` |
| `/opt/homebrew/bin/brew` | `.exports` | → macOS profile only |
| `/opt/homebrew/bin/gh` | `.gitconfig` | → `!/usr/bin/env gh auth git-credential` |
| `/opt/miniconda3/bin/conda` | `.functions` `cond()` | → detect via `$CONDA_EXE` / `command -v conda` |

### Stale tools replaced

| Old | New | Reason |
|-----|-----|--------|
| `exa` | `eza` (with `exa` fallback) | `exa` is unmaintained upstream |
| `z` (rupa/z) | `zoxide` preferred, `z` fallback | `zoxide` is the maintained successor |
| `hub` completions | `gh completion` | `hub` superseded by `gh` |
| `statikk` server | `python3 -m http.server` | `statikk` is abandoned |
| `syntastic` vim plugin | `ALE` | `syntastic` deprecated |
| `ag.vim` vim plugin | fzf+ripgrep | author deleted the repo |

### Git config improvements

| Item | Fix |
|------|-----|
| `diffbranch`/`diffcommitsfrommaster`/`difffrommaster` reference `origin/master` | Update to `$(git rev-parse --abbrev-ref origin/HEAD \|\| echo origin/main)` |
| `reup = rebase-update` | Remove (Chromium depot_tools artifact) |
| `merge.tool = opendiff` | Remove from common (macOS-only); set per-platform if needed |
| Missing `[init] defaultBranch` | Add `defaultBranch = main` |
| `log.date = relative` | Change to `iso` (shows absolute timestamps) |
| `user.name` / `user.email` hardcoded | Remove from common; goes in `~/.gitconfig.local` |

---

## Migration Origin Tracking (cluster_dotfiles imports)

Files brought in from `mikecuoco/cluster_dotfiles`:

| Resource | Origin file | Notes |
|----------|-------------|-------|
| `resources/cluster/shell/.functions.cluster` | `.functions` | `wait_for_mem_available`, `rc` (DNA reverse complement), `_path_del`/`_path_prepend` |
| `resources/cluster/r/.Rprofile` | `.Rprofile` | VSCode-R integration via `init.R` |
| `resources/cluster/setup/conda-setup.sh` | `conda-setup.sh` | micromamba; added arch detection |
| `resources/cluster/setup/singularity-setup.sh` | `singurity-setup.sh` | Fixed typo; updated to EL8/Apptainer |
| `resources/common/shell/.exports` | `.exports` (cluster) | Kubernetes locale guard |
| `docs/R_Conda_VSCode.md` | `docs/R_Conda_VSCode.md` | R+conda+VSCode workflow guide |
| History: `_path_del`/`_path_prepend` | `.functions` (cluster) | Safe PATH manipulation |
| History: 100k history + real-time sync | `.bash_profile` (cluster) | Best-practice history config |
| History: `DOTFILES_USER` prompt suppression | `.bash_prompt` (cluster) | Parameterized username hiding |

---

## File-by-File Improvement Notes

See `plan/task-unify-my-lazy-island.md` (Claude Code plan file) for the full
per-file improvement table. Key changes applied when writing canonical versions:

- `.bashrc`: fix `~/.extrarc` tilde-in-quotes silent fail
- `.bash_prompt`: remove `thefuck`; parameterize `default_username`; remove TERM override
- `.exports`: remove `USER=mcuoco`, `CROMWELL_JAR` glob, `BASH_SILENCE_DEPRECATION_WARNING`; prefer `nvim`
- `.aliases`: `exa`→`eza` with fallback; fix `undopush` to `HEAD`; remove `yarn` from `clone()`
- `.functions`: rewrite `cond()` for portability; `server()` → `python3 -m http.server`; use `$USER` in tunnel/connect
- `.condarc`: `auto_update_conda: false`
- `brew.sh`: replace `z`→`zoxide`, `exa`→`eza`; add note for rustup; clean up niche formulas
- `brew-cask.sh`: remove non-existent `claude-code` cask
- `conda-setup.sh`: add ARM/x86 arch detection; idempotent bashrc append
- `singularity-setup.sh`: update to EL8/Apptainer; fix filename typo

---

## What Is NOT Changing (preserved as-is)

- `macos.sh` — already audited for Tahoe 26 and Apple Silicon; minimal changes
- `.dircolors` — comprehensive color map; kept as-is
- `.vim/` colors and snippets — kept as-is
- `cron/` — moved to `docs/cron-reference/` but content unchanged
- All cron scripts remain gitignored

---

## Definition of Done

`cluster_dotfiles` can be archived when:
1. All unique cluster functionality is in `resources/cluster/`
2. `dotfiles install --profile cluster` is tested on an HPC system
3. The cluster documentation is updated in this repo's `docs/`

Do not archive `cluster_dotfiles` as part of this migration.
