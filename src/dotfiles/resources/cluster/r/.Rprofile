# ~/.Rprofile — managed by dotfiles (cluster profile)
# R startup configuration for VSCode Remote-SSH + conda environments.
#
# Enables:
#   - VSCode-R extension integration (interactive plot viewer, data viewer, hover docs)
#   - Sane print limits

# ── VSCode-R integration ──────────────────────────────────────────────────────
# Sources the VSCode-R extension init script if present.
# See: https://github.com/REditorSupport/vscode-R/wiki/R-Session-watcher
local({
    init_script <- file.path(
        Sys.getenv(if (.Platform$OS.type == "windows") "USERPROFILE" else "HOME"),
        ".vscode-R", "init.R"
    )
    if (file.exists(init_script)) {
        source(init_script)
    }
})

# ── Options ───────────────────────────────────────────────────────────────────
options(max.print = 100)    # avoid flooding the terminal on large objects
