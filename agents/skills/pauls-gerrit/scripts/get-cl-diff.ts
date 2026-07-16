#!/usr/bin/env node

import { execSync } from 'node:child_process';

async function main() {
  const args = process.argv.slice(2);
  let urlOrId = args[0];

  if (!urlOrId) {
    // Try to fallback to current git branch config
    try {
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      urlOrId = execSync(`git config branch.${branchName}.gerritissue`).toString().trim();
      if (urlOrId) {
        console.log(`No CL URL or ID provided. Using configured gerritissue "${urlOrId}" for current branch "${branchName}".`);
      }
    } catch (e) {
      // Ignore git errors, we will just show usage.
    }
  }

  if (!urlOrId) {
    console.error('Usage: node get-cl-diff.ts <CL_URL_OR_ID>');
    console.error('Or run within a git branch configured with branch.<branch>.gerritissue');
    process.exit(1);
  }

  const parsedUrl = URL.parse(urlOrId, 'https://crrev.com/');
  const path = parsedUrl ? parsedUrl.pathname || '' : urlOrId;
  const numericid = /\b\d+\b/.exec(path)?.[0];

  if (!numericid) {
    console.error(`Error: Invalid CL URL or ID: "${urlOrId}"`);
    process.exit(1);
  }

  // Chromium DevTools frontend specific URL. 
  // TODO: Make this generic if needed, or keep it specific to devtools-frontend as it was.
  const url = `https://chromium-review.googlesource.com/changes/devtools%2Fdevtools-frontend~${numericid}/revisions/current/patch?download&raw`;
  
  console.log(`Fetching diff from ${url}...`);

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.error(`Error fetching diff: ${resp.statusText}`);
      process.exit(1);
    }

    const text = await resp.text();
    console.log(text);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
