---
name: pauls-gerrit
description: Gerrit helpers for fetching unresolved comments and CL diffs.
---

# Paul's Gerrit Helper Skill

This skill provides scripts to interact with Gerrit (specifically Chromium Gerrit) to fetch unresolved comments for the current branch and to download CL patches/diffs.

## Usage

### 1. Fetch Unresolved Comments
Get a list of unresolved comment threads for the current git branch. The branch must be configured with `gerritissue` and `gerritserver` (which is standard if you use `g4` or Gerrit integration).

```bash
node agents/skills/pauls-gerrit/scripts/get-unresolved.ts
```

This script will:
1. Determine the current git branch.
2. Read the Gerrit issue ID and server from git config.
3. Fetch and parse comments.
4. Output unresolved comments with file location and message.

### 2. Fetch CL Diff
Fetch the raw patch/diff for a specific CL.

```bash
node agents/skills/pauls-gerrit/scripts/get-cl-diff.ts <CL_URL_OR_ID>
```

Example:
```bash
node agents/skills/pauls-gerrit/scripts/get-cl-diff.ts 6976658
# Or with URL
node agents/skills/pauls-gerrit/scripts/get-cl-diff.ts https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6976658
```

If run without arguments, it will attempt to fallback to the `gerritissue` configured for the current git branch.
