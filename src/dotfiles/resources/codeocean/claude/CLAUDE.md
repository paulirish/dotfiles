# Code Ocean Capsule Conventions

Extends the global CLAUDE.md for work inside a Code Ocean capsule.

## Layout

- `/code` — source; `run` or `run.sh` is the entrypoint
- `/data` — read-only inputs; never write here
- `/results` — all final artifacts
- `/scratch` — large temporary data (much more space than root)

## Storage

Root filesystem is ~5 GB. Write large intermediates to `/scratch`, finals to `/results`.
Run `ulimit -c 0` at session start to prevent a crash from filling root.
Set `export TMPDIR=/scratch/tmp && mkdir -p "$TMPDIR"` so transient files land on scratch.

## Environment

Define dependencies in `environment/` (Dockerfile + `postInstall`), not via ad-hoc installs.
Install conda envs into `/scratch` (e.g. `conda create -p /scratch/envs/<name>`).

Redirect caches to `/scratch` at runtime — do **not** use Dockerfile `ENV` (`/scratch` is
empty at build time, so ENV breaks `postInstall` hardlinks and `pip install -e`).
Use a `/etc/profile.d/*.sh` script guarded by `if [ -d /scratch ]`, also sourced from
`/etc/bash.bashrc` for interactive terminals:

```bash
export CONDA_PKGS_DIRS=/scratch/conda_pkgs
export MAMBA_PKGS_DIRS=/scratch/conda_pkgs
export PIP_CACHE_DIR=/scratch/pip_cache
export TMPDIR=/scratch/tmp
```

## Reproducibility

- Pin environment versions in Dockerfile / postInstall / env yaml.
- `run` is the single reproducible entrypoint; write all artifacts to `/results`.
- No machine-specific paths; runs must reproduce from a clean state.
