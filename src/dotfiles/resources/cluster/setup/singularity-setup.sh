#!/usr/bin/env bash
# Install Apptainer (formerly Singularity) on a Linux HPC cluster
# Origin: mikecuoco/cluster_dotfiles/singurity-setup.sh (fixed typo in filename)
#
# Supports:
#   - RHEL/CentOS/Rocky 8 or 9 (RPM-based) — primary HPC target
#   - Ubuntu/Debian (apt-based) — fallback
#
# Requires root or sudo.  On systems where you don't have root, ask your
# HPC admin to install Apptainer system-wide.

set -euo pipefail

APPTAINER_VERSION="${APPTAINER_VERSION:-1.3.6}"

# ── Detect package manager ────────────────────────────────────────────────────
if command -v dnf &>/dev/null || command -v yum &>/dev/null; then
    PKG="rpm"
elif command -v apt-get &>/dev/null; then
    PKG="apt"
else
    echo "Error: No supported package manager found (dnf/yum/apt-get)" >&2
    exit 1
fi

echo "Package manager: ${PKG}"
echo "Installing Apptainer ${APPTAINER_VERSION} ..."

# ── RPM install (RHEL 8/9, Rocky, AlmaLinux) ─────────────────────────────────
if [ "$PKG" == "rpm" ]; then
    # Detect EL version
    EL_VER="$(rpm -E %rhel 2>/dev/null || echo '8')"
    ARCH="$(uname -m)"

    # Install build dependencies
    sudo dnf groupinstall -y "Development Tools" 2>/dev/null || \
        sudo yum groupinstall -y "Development Tools"
    sudo dnf install -y epel-release fuse-overlayfs fuse3 libseccomp-devel 2>/dev/null || \
        sudo yum install -y epel-release fuse-overlayfs fuse3 libseccomp-devel

    # Download and install Apptainer RPM
    RPM_URL="https://github.com/apptainer/apptainer/releases/download/v${APPTAINER_VERSION}/apptainer-${APPTAINER_VERSION}-1.el${EL_VER}.${ARCH}.rpm"
    echo "Downloading: ${RPM_URL}"
    curl -fsSL "${RPM_URL}" -o /tmp/apptainer.rpm
    sudo rpm -ivh --nodeps /tmp/apptainer.rpm
    rm -f /tmp/apptainer.rpm

# ── APT install (Ubuntu/Debian) ───────────────────────────────────────────────
elif [ "$PKG" == "apt" ]; then
    sudo apt-get update
    sudo apt-get install -y \
        build-essential \
        libseccomp-dev \
        pkg-config \
        squashfs-tools \
        cryptsetup \
        libfuse2

    # Add the Apptainer PPA (Ubuntu) or download the .deb (Debian)
    DISTRO="$(lsb_release -is 2>/dev/null | tr '[:upper:]' '[:lower:]' || echo ubuntu)"
    if [ "$DISTRO" == "ubuntu" ]; then
        sudo add-apt-repository -y ppa:apptainer/ppa
        sudo apt-get update
        sudo apt-get install -y apptainer
    else
        # Debian: download pre-built .deb from GitHub releases
        ARCH="$(dpkg --print-architecture)"
        DEB_URL="https://github.com/apptainer/apptainer/releases/download/v${APPTAINER_VERSION}/apptainer_${APPTAINER_VERSION}_${ARCH}.deb"
        echo "Downloading: ${DEB_URL}"
        curl -fsSL "${DEB_URL}" -o /tmp/apptainer.deb
        sudo dpkg -i /tmp/apptainer.deb || sudo apt-get -f install -y
        rm -f /tmp/apptainer.deb
    fi
fi

# ── Verify ────────────────────────────────────────────────────────────────────
echo ""
if command -v apptainer &>/dev/null; then
    apptainer --version
    echo "✓ Apptainer installed successfully"
elif command -v singularity &>/dev/null; then
    singularity --version
    echo "✓ Singularity (apptainer-compat) installed successfully"
else
    echo "✗ Installation may have failed — apptainer/singularity not found in PATH" >&2
    exit 1
fi
