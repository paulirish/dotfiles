---
name: npm-trusted-publishing
description: Set up or debug npm Trusted Publishing (OIDC) from GitHub Actions. Handles permissions, metadata validation, and provenance.
---

# npm Trusted Publishing (OIDC)

Configure and debug secure, tokenless npm publishing from GitHub Actions using OpenID Connect (OIDC) and Provenance.

## Core Requirements

Trusted Publishing eliminates the need for long-lived `NPM_TOKEN` secrets by using short-lived, cryptographically-signed tokens.

### 1. GitHub Actions Permissions (CRITICAL)
The publishing job MUST declare explicit permissions to fetch the OIDC ID token directly inside its target job configuration block (e.g., `jobs.publish.permissions`), rather than relying solely on top-level file placement. Certain hardened runner execution matrices strip globally-scoped token inheritance during individual job executions.

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Required for OIDC provenance authentication
      contents: read  # Required for repository checkout
```

### 2. Node.js Version
Trusted Publishing requires **Node.js 22.14.0 or higher** and **npm 11.5.1 or higher**.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22.14.0
    registry-url: 'https://registry.npmjs.org'
```

### 3. package.json Metadata (CRITICAL)
NPM validates provenance against the `repository` field. If this is missing or lacks the strict Sigstore protocol scheme, the publish will fail with a **422 Unprocessable Entity** or preliminary token rejection. The URL string MUST start explicitly with **`git+https://`** and end with **`.git`**.

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/USER/REPO.git"
  }
}
```

## Workflow Implementation

A standard reference template is provided inside this skill folder at `references/publish.yml` for drop-in integration.

### Recommended Publish Step
Always use the latest `npm` CLI and explicit flags for maximum reliability.

```yaml
- name: Publish to npm
  run: |
    npm install -g npm@latest
    npm publish --provenance --access public --registry https://registry.npmjs.org/
```

## Troubleshooting Guide

### 400 Bad Request - OIDC publish authorize: Invalid token
*   **Cause 1 (Version Shadowing)**: If a manual or test version of the package was published previously, automated GitHub Actions deployment runs attempting to verify token permissions against an existing version string are rejected on registry pre-authorization checks to prevent shadow collisions.
*   **Fix 1**: Ensure the `version` property in `package.json` is strictly bumped to a new, unreleased semver identifier prior to workflow execution.
*   **Cause 2 (Manual Triggers)**: Manually triggering a publish run via `workflow_dispatch` (rather than an authentic git push) generates an OIDC token payload where `ref` and `sha` environment claims diverge from standard annotated publication tags. The npm pre-authorization gateway routinely drops these customized dynamic event scopes.
*   **Fix 2**: To guarantee unblocked authorization passes on npm servers, trigger the publication workflow strictly by pushing an authentic annotated Git release tag (e.g., `git tag v1.0.0 && git push origin v1.0.0`).

### 404 Not Found
*   **Cause**: Usually a registry mismatch.
*   **Fix**: Explicitly set `--registry https://registry.npmjs.org/` in the publish command. Ensure no `.npmrc` is overriding the registry to a mirror or private proxy.

### 422 Unprocessable Entity
*   **Cause**: Metadata mismatch (most common: `repository.url` in `package.json` is missing or doesn't match the GitHub URL).
*   **Fix**: Validate `package.json` against the actual repository URL.

### 403 Forbidden / Unauthorized
*   **Cause**: The "Trusted Publisher" is not configured on `npmjs.com` or has an "Environment" mismatch.
*   **Fix**: 
    1. Check **npmjs.com → Package Settings → Trusted Publishing**.
    2. Verify **Organization**, **Repository**, and **Workflow filename** (e.g., `publish.yml`) are exact.
    3. If an **Environment** is specified on npm (e.g., "release"), it MUST be specified in the workflow: `jobs.publish.environment: release`.

## User Instructions

When setting up a new project, provide these instructions to the user:

1.  **Configure npmjs.com**: Go to your package settings → Trusted Publishing and add a new "GitHub Actions" publisher.
2.  **Fields**:
    *   **Organization**: `YOUR_USERNAME`
    *   **Repository**: `YOUR_REPO`
    *   **Workflow filename**: `publish.yml`
    *   **Environment**: Leave blank (unless explicitly requested).
3.  **No Secrets Needed**: Remind the user that `NPM_TOKEN` is NO LONGER REQUIRED in GitHub Secrets.

## Additional Resources

For more detailed information, consult the official documentation. It is often helpful to fetch this URL to verify the latest field requirements or troubleshooting steps:
https://docs.npmjs.org/trusted-publishers
