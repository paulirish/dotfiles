---
name: GitHub PR comment fetcher
description: Easily query for open discussions and reviews on a pull request to help resolve them.
---

# GitHub PR comment fetcher

This skill enables agents to query for reviews and comments on a pull request, including the resolved status of comment threads, to facilitate resolving open discussions.

## Usage

Use the included script to gather reviews and comments for a specific PR.

After fetching and presenting the results to the user, you can offer to address the comments. 

```bash
node scripts/gather-reviews.ts <repo> <pr_number>
```

Example:
```bash
node scripts/gather-reviews.ts GoogleChrome/lighthouse 14425
```

The script will output a JSON file and a Markdown file with the gathered data.

## Script Details

The `gather-reviews.ts` script uses the GitHub CLI (`gh`) to fetch data.
- It uses GraphQL to fetch review threads and their resolved status.
- It filters for relevant comments and reviews.
- It outputs data to the `resources/` directory in the skill folder.

## Caching

Caching is not implemented by default to ensure agents always work with the most up-to-date state.
