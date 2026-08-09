# Code Ocean Capsule Conventions

These extend the global `CLAUDE.md` for work inside a Code Ocean capsule.

---

## Capsule layout

- Code lives in `/code`, with an entrypoint `run` (or `run.sh`).
- Inputs are mounted at `/data`; outputs go to `/results`; large temporary
  files go to `/scratch`.
- The environment is defined under `environment/` (Dockerfile + `postInstall`)
  — not via ad-hoc shell installs.

---

## Storage limits

- The capsule root / working filesystem has only **~5 GB** — do NOT write
  large intermediate files there.
- Use `/scratch` for big temporary data (it has much more space) and write
  final artifacts to `/results`.
- Clean up `/scratch` when done.

---

## Data assets

- `/data` is **read-only** — never write there.
- Reference data by its mounted asset path; never hardcode absolute host paths
  or assume files outside `/data`, `/results`, `/scratch`.

---

## Reproducibility

- Pin environment versions (Dockerfile / `postInstall` / env yaml).
- No machine-specific or absolute paths in code.
- Runs must be deterministic and re-runnable from the `run` script alone;
  write all artifacts to `/results`.

---

## Environment setup

- Always create/install conda envs in the **`postInstall` script**, not
  interactively in a workstation.
- **Install conda envs into `/scratch` by default**
  (e.g. `conda create -p /scratch/envs/<name>`) — envs are large and the
  ~5 GB root can't hold them.
- If multiple envs are needed, keep one `*.yaml` file per env and have
  `postInstall` create each from its yaml — so the environment rebuilds
  reproducibly.
- **Always redirect the conda/mamba pkg cache, pip cache, and temp dir to
  `/scratch`** so they don't fill the ~5 GB root:

  ```bash
  export CONDA_PKGS_DIRS=/scratch/conda_pkgs
  export MAMBA_PKGS_DIRS=/scratch/conda_pkgs   # micromamba reads this var
  export PIP_CACHE_DIR=/scratch/pip_cache
  export TMPDIR=/scratch/tmp
  ```

  Set these via a runtime shell hook (a `/etc/profile.d/*.sh` script installed
  in the Dockerfile, guarded by `if [ -d /scratch ]`, and also sourced from
  `/etc/bash.bashrc` so interactive non-login code-server terminals pick it
  up) — **not** a Dockerfile `ENV`. `/scratch` is a runtime-only mount (empty
  at build time), so an `ENV` would redirect build-time caches in `postInstall`
  and break hardlinking into `/opt/conda/envs` and any `pip install -e`.

---

## Compute & runs

- Distinguish interactive Cloud Workstation work from batch Reproducible Runs.
- Keep the `run` entrypoint as the single source of truth.
- Respect resource limits; avoid unbounded or long interactive operations.
- Verify a run reproduces from a clean state before declaring done.
