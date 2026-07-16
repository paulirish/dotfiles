---
name: npm-trusted-publishing
description: Set up or debug npm Trusted Publishing (OIDC) from GitHub Actions. Handles permissions, metadata validation, and provenance.
---

# npm Trusted Publishing (OIDC)

Configure and debug secure, tokenless npm publishing from GitHub Actions using OpenID Connect (OIDC) and Provenance.

## Core Requirements

Trusted Publishing eliminates the need for long-lived `NPM_TOKEN` secrets by using short-lived, cryptographically-signed tokens.

### 1. GitHub Actions Permissions (CRITICAL)
The workflow MUST grant `id-token: write` permissions to fetch the OIDC token. This can be declared globally at the top level of the file or inside the target job block.

```yaml
permissions:
  id-token: write # Required for OIDC provenance authentication
  contents: read  # Required for repository checkout
```

### 2. Node.js Version
Trusted Publishing with provenance requires a modern Node.js environment (v20+) and npm v9.5.0+. Using standard runner defaults or `.nvmrc` configurations works reliably.

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: lts/* # npm v11.5.1+ (Node v24+) is required for Trusted Publishing
    registry-url: 'https://registry.npmjs.org'
```

### 3. package.json Metadata
NPM validates provenance against the `repository` field. 

*   **`.git` Suffix & `git+` Prefix are OPTIONAL**: You can use the raw HTTPS URL (e.g. `https://github.com/USER/REPO`) or the git-specific URL (e.g. `git+https://github.com/USER/REPO.git`). Most modern npm/node setups handle these automatically. However, OIDC matching can sometimes be sensitive to normalization; if OIDC fails, try toggling these formats.

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
Use standard publish flags to enable provenance.

```yaml
- name: Publish to npm
  run: npm publish --provenance --access public --registry https://registry.npmjs.org/
```

## Troubleshooting Guide

### 400 Bad Request - OIDC publish authorize: Invalid token
*   **Cause 1 (Version Shadowing)**: If a manual or test version of the package was published previously, automated GitHub Actions deployment runs attempting to verify token permissions against an existing version string are rejected on registry pre-authorization checks to prevent shadow collisions.
*   **Fix 1**: Ensure the `version` property in `package.json` is strictly bumped to a new, unreleased semver identifier prior to workflow execution.
*   **Cause 2 (Manual Triggers)**: Manually triggering a publish run via `workflow_dispatch` (rather than an authentic git push) generates an OIDC token payload where `ref` and `sha` environment claims diverge from standard annotated publication tags. The npm pre-authorization gateway routinely drops these customized dynamic event scopes.
*   **Fix 2**: To guarantee unblocked authorization passes on npm servers, trigger the publication workflow strictly by pushing an authentic annotated Git release tag (e.g., `git tag v1.0.0 && git push origin v1.0.0`).

### 404 Not Found
*   **Cause 1 (First Publish of a New Package)**: npm does not support "Pending Publishers" (unlike PyPI). You cannot configure Trusted Publishing for a package that does not exist yet. Attempting to publish a new package via OIDC first will fail with a 404 (e.g., `'packagename@1.4.12' is not in this registry`) because npm cannot authorize the publish without a pre-configured relationship.
*   **Fix 1**: 
    1. Perform the **initial publish manually** from your local machine using standard token/session authentication (`npm login` then `npm publish --access public`).
    2. Once the package is created on npmjs.com, go to **Package Settings** -> **Trusted Publishing** and configure the GitHub Actions mapping.
    3. Future publishes can then run automatically via the OIDC workflow.
*   **Cause 2 (Registry Mismatch)**: The publish command is attempting to hit a private registry or mirror where the package does not exist or cannot be written.
*   **Fix 2**: Explicitly set `--registry https://registry.npmjs.org/` in the publish command. Ensure no `.npmrc` is overriding the registry to a mirror or private proxy.
*   **Cause 3 (Misconfigured or Missing Trusted Publisher on Existing Package)**: npm may return `404 Not Found` (instead of `403 Forbidden`) when the OIDC token claims do not match any configured Trusted Publisher for the package, or if Trusted Publishing has not been configured yet for this package.
*   **Fix 3**: 
    1. Log in to npmjs.com, go to the package settings, and select **Publishing** (or **Trusted Publishers**).
    2. Verify that the configured **GitHub Organization/User** matches the repository owner (e.g., `so-fancy` for `so-fancy/diff-so-fancy`) and is case-sensitive.
    3. Verify that the **Repository** and **Workflow filename** (`publish.yml`) match exactly.
    4. Ensure the **Environment** field on npm is empty if it is not explicitly defined in the GitHub Actions workflow YAML.
*   **Cause 4 (repository.url format sensitivity)**: The npm registry's OIDC validation is sensitive to the `repository.url` format in `package.json`. In some cases, the `git+` prefix or missing `.git` extension can cause validation mismatches, even if the npm CLI claims to auto-correct/normalize it.
*   **Fix 4**: 
    1. Ensure the URL matches your GitHub repo.
    2. Try explicitly setting it to `git+https://github.com/owner/repo.git` (official format) to avoid normalization warnings.
    3. If that fails, try using `https://github.com/owner/repo.git` (without `git+` but with `.git`) as some users have reported this resolves OIDC claim mismatches.

### 422 Unprocessable Entity
*   **Cause**: Metadata mismatch (most common: `repository.url` in `package.json` is missing or doesn't match the GitHub URL).
*   **Fix**: Validate `package.json` against the actual repository URL.

### 403 Forbidden / Unauthorized
*   **Cause**: The "Trusted Publisher" is not configured on `npmjs.com` or has an "Environment" mismatch.
*   **Fix**: 
    1. Check **npmjs.com → Package Settings → Trusted Publishing**.
    2. Verify **Organization**, **Repository**, and **Workflow filename** (e.g., `publish.yml`) are exact.
    3. If an **Environment** is specified on npm (e.g., "release"), it MUST be specified in the workflow: `jobs.publish.environment: release`.
## Validation Tool

The skill includes a validation script to check your local configuration:

```bash
node <path-to-skill>/scripts/validate.mjs <path-to-package.json>
```

It verifies:
*   Mandatory `.git` suffix on `repository.url`.
*   Presence of `id-token: write` permission.
*   Absence of conflicting `registry-url` configurations in `setup-node`.
*   Modern Node version (`lts/*` or `24+`) for robust OIDC support.

## User Instructions

When setting up a new project, provide these instructions to the user in strict sequential order:

1.  **Commit Workflow First (CRITICAL Order of Operations)**: You MUST commit and push the `.github/workflows/publish.yml` file to your remote GitHub repository *before* initializing the trusted publisher mapping on npmjs.com. Configuring the dashboard mapping while the upstream repository lacks the workflow script can cause preliminary token evaluation handshakes to cache invalid target structures, resulting in unresolvable `400 Bad Request` authorization drops during deployment runs.
2.  **Initial Publish (For New Packages)**: If this is the first time publishing this package, you **cannot** use Trusted Publishing immediately. You must first publish the package manually from your local terminal to create it on the registry:
    ```bash
    npm login
    npm publish --access public
    ```
3.  **Configure npmjs.com**: Once the package exists on npm, go to the package page on npmjs.com -> **Settings** -> **Trusted Publishing** and add a new "GitHub Actions" publisher.
4.  **Fields**:
    *   **Organization**: `YOUR_USERNAME` (or your npm organization name)
    *   **Repository**: `YOUR_REPO`
    *   **Workflow filename**: `publish.yml`
    *   **Environment**: Leave blank (unless explicitly requested).
5.  **No Secrets Needed**: Remind the user that `NPM_TOKEN` is NO LONGER REQUIRED in GitHub Secrets.

## Additional Resources

For more detailed information, consult the official documentation. It is often helpful to fetch this URL to verify the latest field requirements or troubleshooting steps:
https://docs.npmjs.org/trusted-publishers
