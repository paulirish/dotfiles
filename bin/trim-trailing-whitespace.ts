#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

/**
 * Trims trailing whitespace from files.
 * By default, only trims on modified lines in `git diff origin/main...`.
 * With `--all` flag, trims all lines of modified/added files.
 */

export async function main(args: string[]) {
  const useAll = args.includes('--all');
  const files = args.filter(a => !a.startsWith('--'));

  let filesToProcess = files;

  if (filesToProcess.length === 0) {
    try {
      const diffCommand = 'git diff --name-only origin/main...';
      const gitFiles = execSync(diffCommand).toString().trim().split('\n').filter(f => f.length > 0);
      filesToProcess = gitFiles;
      if (filesToProcess.length === 0) {
        console.log('No modified files detected relative to origin/main.');
        return;
      }
      console.log(`Detected modified files: ${filesToProcess.join(', ')}`);
    } catch (e) {
      console.error('Error detecting modified files from git:', e);
      process.exit(1);
    }
  }

  for (const file of filesToProcess) {
    try {
      await processFile(file, useAll);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
  console.log('Done.');
}

async function processFile(filePath: string, useAll: boolean) {
  const resolvedPath = path.resolve(filePath);
  
  if (useAll) {
    console.log(`Trimming all lines: ${filePath}...`);
    const content = await fs.readFile(resolvedPath, 'utf8');
    const lines = content.split('\n');
    const trimmedLines = lines.map(line => line.trimEnd());
    await fs.writeFile(resolvedPath, trimmedLines.join('\n'));
    return;
  }

  console.log(`Trimming modified lines: ${filePath}...`);
  const diffCommand = `git diff -U0 origin/main... -- ${resolvedPath}`;
  let diff = '';
  try {
    diff = execSync(diffCommand).toString();
  } catch (e) {
    console.log(`No changes detected for ${filePath} in diff.`);
    return;
  }
  if (!diff) {
    console.log(`No changes detected for ${filePath} in diff.`);
    return;
  }

  const changedLineNumbers = new Set<number>();
  const hunkHeaderRegex = /@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/g;
  let match;
  while ((match = hunkHeaderRegex.exec(diff)) !== null) {
    const start = parseInt(match[1], 10);
    const count = match[2] ? parseInt(match[2], 10) : 1;
    for (let i = 0; i < Math.max(count, 1); i++) {
      changedLineNumbers.add(start + i);
    }
  }

  const content = await fs.readFile(resolvedPath, 'utf8');
  const lines = content.split('\n');
  const resultLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const currentLine = lines[i];
    if (changedLineNumbers.has(lineNum)) {
      resultLines.push(currentLine.trimEnd());
    } else {
      resultLines.push(currentLine);
    }
  }

  await fs.writeFile(resolvedPath, resultLines.join('\n'));
}

// Guard for direct execution
const isDirectExecution = import.meta.url === `file://${process.argv[1]}`;
if (isDirectExecution) {
  main(process.argv.slice(2));
}
