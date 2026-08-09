#!/usr/bin/env bash
# Install micromamba to $HOME/bin (no root required — HPC-friendly)
# Origin: mikecuoco/cluster_dotfiles — updated with arch detection and idempotency

set -euo pipefail

# ── Architecture detection ────────────────────────────────────────────────────
ARCH="$(uname -m)"
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"

case "${OS}-${ARCH}" in
    linux-x86_64)  PLATFORM="linux-64" ;;
    linux-aarch64) PLATFORM="linux-aarch64" ;;
    linux-ppc64le) PLATFORM="linux-ppc64le" ;;
    darwin-arm64)  PLATFORM="osx-arm64" ;;
    darwin-x86_64) PLATFORM="osx-64" ;;
    *)
        echo "Unsupported platform: ${OS}-${ARCH}" >&2
        exit 1
        ;;
esac

echo "Detected platform: ${PLATFORM}"

# ── Install micromamba ────────────────────────────────────────────────────────
mkdir -p "$HOME/bin"

MAMBA_URL="https://micro.mamba.pm/api/micromamba/${PLATFORM}/latest"
echo "Downloading micromamba from ${MAMBA_URL} ..."
curl -fsSL "${MAMBA_URL}" | tar -xvj -C "$HOME/bin" --strip-components=1 "bin/micromamba"

chmod +x "$HOME/bin/micromamba"
echo "micromamba installed to $HOME/bin/micromamba"

# ── Initialize shell integration ──────────────────────────────────────────────
"$HOME/bin/micromamba" shell init -s bash -p "$HOME/micromamba"
echo "micromamba root: $HOME/micromamba"

# ── Add aliases to shell rc (idempotent) ──────────────────────────────────────
ALIASES=(
    "alias mamba=micromamba"
    "alias conda=micromamba"
)

for alias_line in "${ALIASES[@]}"; do
    if ! grep -qF "$alias_line" "$HOME/.bashrc" 2>/dev/null; then
        echo "$alias_line" >> "$HOME/.bashrc"
        echo "Added to ~/.bashrc: $alias_line"
    fi
done

echo ""
echo "Done! Restart your shell or run: source ~/.bashrc"
echo "Then: micromamba create -n myenv python=3.12"
