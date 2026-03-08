---
name: npm-trusted-publishing
description: Use this skill to set up or debug npm "Trusted Publishing" (OIDC) from GitHub Actions. It handles OIDC permissions, Node.js version requirements, package.json metadata validation (specifically repository.url), and robust publish commands with provenance. Trigger this when the user mentions "npm OIDC", "trusted publishing", "publish to npm from github", or encounters 404/422 errors during npm publish in CI.
---

# npm Trusted Publishing (OIDC)

Configure and debug secure, tokenless npm publishing from GitHub Actions using OpenID Connect (OIDC) and Provenance.

## Core Requirements

Trusted Publishing eliminates the need for long-lived `NPM_TOKEN` secrets by using short-lived, cryptographically-signed tokens.

### 1. GitHub Actions Permissions
The workflow MUST have explicit permissions to fetch the OIDC ID token.

```yaml
permissions:
  id-token: write # Required for OIDC
  contents: read  # Required for checkout
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
NPM validates provenance against the `repository` field. If this is missing or incorrect, the publish will fail with a **422 Unprocessable Entity**.

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/USER/REPO"
  }
}
```

## Workflow Implementation

### Recommended Publish Step
Always use the latest `npm` CLI and explicit flags for maximum reliability.

```yaml
- name: Publish to npm
  run: |
    npm install -g npm@latest
    npm publish --provenance --access public --registry https://registry.npmjs.org/
```

## Troubleshooting Guide

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
