#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from "url";
import { realpathSync } from 'fs';
import { parseArgs } from 'node:util';

/**
 * Trims trailing whitespace from files.
 * By default, only trims on modified lines in `git diff origin/main...`.
 * With `--force` flag, trims all lines of modified/added files.
 */

function printHelp() {
  console.log(`Usage: trim-trailing-whitespace [options] [files/directories...]

Trims trailing whitespace from files.
By default, only trims on modified lines in 'git diff origin/main...'.

Options:
  -f, --force  Trim trailing whitespace from all lines of the target files.
  -h, --help   Show this help message.`);
}

async function isTextFile(filePath: string): Promise<boolean> {
  const ext = path.extname(filePath).toLowerCase();
  const binaryExtensions = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.zip', '.tar', '.gz',
    '.mp4', '.mp3', '.wav', '.mov', '.avi', '.ttf', '.woff', '.woff2', '.eot', '.db',
    '.sqlite', '.wasm', '.bin', '.exe', '.dll', '.so', '.dylib', '.pyc'
  ]);
  if (binaryExtensions.has(ext)) {
    return false;
  }

  try {
    const fd = await fs.open(filePath, 'r');
    try {
      const buffer = Buffer.alloc(512);
      const { bytesRead } = await fd.read(buffer, 0, 512, 0);
      for (let i = 0; i < bytesRead; i++) {
        if (buffer[i] === 0) {
          return false;
        }
      }
      return true;
    } finally {
      await fd.close();
    }
  } catch {
    return false;
  }
}

async function getFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'dist', 'build', '.gemini', '.antigravitycli', 'coverage'].includes(entry.name)) {
        continue;
      }
      files.push(...(await getFilesRecursively(res)));
    } else if (entry.isFile()) {
      if (await isTextFile(res)) {
        files.push(res);
      }
    }
  }
  return files;
}

export async function main(args: string[]) {
  let values, positionals;
  try {
    const parsed = parseArgs({
      args,
      options: {
        force: {
          type: 'boolean',
          short: 'f',
          default: false,
        },
        help: {
          type: 'boolean',
          short: 'h',
          default: false,
        },
      },
      allowPositionals: true,
    });
    values = parsed.values;
    positionals = parsed.positionals;
  } catch (err: any) {
    console.error(err.message);
    printHelp();
    process.exit(1);
  }

  if (values.help) {
    printHelp();
    return;
  }

  const useForce = values.force;
  const inputPaths = positionals;
  let filesToProcess: string[] = [];

  if (inputPaths.length === 0) {
    try {
      const diffCommand = 'git diff --name-only origin/main...';
      const gitFiles = execSync(diffCommand).toString().trim().split('\n').filter(f => f.length > 0);
      filesToProcess = gitFiles.map(f => path.resolve(f));
      if (filesToProcess.length === 0) {
        console.log('No modified files detected relative to origin/main.');
        return;
      }
      console.log(`Detected modified files: ${filesToProcess.map(f => path.relative(process.cwd(), f)).join(', ')}`);
    } catch (e) {
      console.error('Error detecting modified files from git:', e);
      process.exit(1);
    }
  } else {
    for (const inputPath of inputPaths) {
      const resolved = path.resolve(inputPath);
      try {
        const stat = await fs.stat(resolved);
        if (stat.isDirectory()) {
          const dirFiles = await getFilesRecursively(resolved);
          filesToProcess.push(...dirFiles);
        } else if (stat.isFile()) {
          if (await isTextFile(resolved)) {
            filesToProcess.push(resolved);
          } else {
            console.log(`Skipping binary file: ${inputPath}`);
          }
        }
      } catch (e: any) {
        if (e.code === 'ENOENT') {
          console.error(`Path does not exist: ${inputPath}`);
        } else {
          console.error(`Error processing path ${inputPath}:`, e);
        }
      }
    }
  }

  for (const file of filesToProcess) {
    try {
      await processFile(file, useForce);
    } catch (e) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 'ENOENT') {
        console.log(`File skipped (does not exist): ${path.relative(process.cwd(), file)}`);
      } else {
        console.error(`Error processing ${path.relative(process.cwd(), file)}:`, e);
      }
    }
  }
  console.log('Done.');
}

async function processFile(filePath: string, useForce: boolean) {
  const resolvedPath = path.resolve(filePath);
  const relativePath = path.relative(process.cwd(), resolvedPath);

  try {
    const stat = await fs.stat(resolvedPath);
    if (stat.isDirectory()) {
      return;
    }
  } catch {
    // Let downstream FS/git operations throw if file is missing/inaccessible
  }

  if (useForce) {
    console.log(`Trimming all lines: ${relativePath}...`);
    const content = await fs.readFile(resolvedPath, 'utf8');
    const lines = content.split('\n');
    const trimmedLines = lines.map(line => line.trimEnd());
    await fs.writeFile(resolvedPath, trimmedLines.join('\n'));
    return;
  }

  console.log(`Trimming modified lines: ${relativePath}...`);
  const diffCommand = `git diff -U0 origin/main... -- ${resolvedPath}`;
  let diff = '';
  try {
    diff = execSync(diffCommand).toString();
  } catch (e) {
    console.log(`No changes detected for ${relativePath} in diff.`);
    return;
  }
  if (!diff) {
    console.log(`No changes detected for ${relativePath} in diff.`);
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
const isDirectExecution = process.argv[1] ? realpathSync(process.argv[1]) === fileURLToPath(import.meta.url) : false;
if (isDirectExecution) {
  main(process.argv.slice(2));
}
