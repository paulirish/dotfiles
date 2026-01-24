#!/usr/bin/env node

/**
 * Cleanup Tool for Gemini CLI
 * 
 * This tool resolves the issue of vertical whitespace drift (excessive newlines) 
 * introduced during code modifications by the Gemini CLI agent.
 * 
 * USAGE:
 *   npx ts-node cleanup.ts [--ast] [git-hash] <file1> <file2> ...
 * 
 * MODES:
 * 
 * 1. Dumb Mode (Default)
 *    Surgically targets only the lines introduced in the current session (or a specific commit).
 *    - Uses `git diff` to identify changed line numbers.
 *    - Collapses consecutive empty lines (2+).
 *    - Collapses alternating "every-other-line" whitespace.
 *    - Very safe; only touches code you just modified.
 * 
 * 2. AST Mode (--ast)
 *    Comprehensive vertical density enforcement using ts-morph.
 *    - Understands code structure (inter-statement vs. intra-statement).
 *    - Aggressively collapses whitespace inside logical statements (e.g., chained calls).
 *    - Collapses whitespace between "simple" one-liner statements.
 *    - Preserves exactly one empty line around "complex" blocks (if, for, try/catch, etc.).
 *    - Best for cleaning up a file that is already very loose or after sweeping changes.
 * 
 * ARGUMENTS:
 *   --ast       Enable the comprehensive AST-aware cleanup mode.
 *   [git-hash]  If a 7+ character hex string is provided, use its diff for dumb mode.
 *   <files>     The list of files to process.
 */

import { Project, QuoteKind, IndentationText, SyntaxKind, Node } from 'ts-morph';
import path from 'path';
import fs from 'fs/promises';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const useAst = args.includes('--ast');
const hashArg = args.find(a => /^[a-f0-9]{7,40}$/i.test(a));
let files = args.filter(a => !a.startsWith('--') && a !== hashArg);

if (files.length === 0) {
  const diffCommand = hashArg ? `git diff --name-only ${hashArg}^ ${hashArg}` : `git diff --name-only HEAD`;
  try {
    const gitFiles = execSync(diffCommand).toString().trim().split('\n').filter(f => f.length > 0);
    files = gitFiles;
    if (files.length === 0) {
      console.log('No modified files detected in git.');
      process.exit(0);
    }
    console.log(`Detected modified files: ${files.join(', ')}`);
  } catch (e) {
    console.error('Error detecting modified files from git:', e);
    process.exit(1);
  }
}

const project = new Project({
  manipulationSettings: {
    quoteKind: QuoteKind.Single,
    indentationText: IndentationText.TwoSpaces,
    useTrailingCommas: false,
  },
});

function isComplex(node: Node): boolean {
  if (node.isKind(SyntaxKind.IfStatement) ||
      node.isKind(SyntaxKind.ForStatement) ||
      node.isKind(SyntaxKind.ForInStatement) ||
      node.isKind(SyntaxKind.ForOfStatement) ||
      node.isKind(SyntaxKind.WhileStatement) ||
      node.isKind(SyntaxKind.TryStatement) ||
      node.isKind(SyntaxKind.SwitchStatement) ||
      node.isKind(SyntaxKind.FunctionDeclaration) ||
      node.isKind(SyntaxKind.ClassDeclaration) ||
      node.isKind(SyntaxKind.MethodDeclaration)) {
    return true;
  }
  return (node.getEndLineNumber() - node.getStartLineNumber() > 0);
}

function isStmt(n: Node): boolean {
  return Node.isStatement(n) || 
         Node.isMethodDeclaration(n) || 
         Node.isFunctionDeclaration(n) || 
         Node.isClassDeclaration(n);
}

async function cleanupAst(filePath: string) {
  console.log(`AST Cleanup: ${filePath}...`);
  const sourceFile = project.addSourceFileAtPath(filePath);
  const fullText = sourceFile.getFullText();
  const lines = fullText.split('\n');
  const resultLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    const nextLine = lines[i+1];

    if (currentLine.trim() === '' && nextLine !== undefined) {
      const pos = fullText.split('\n').slice(0, i).join('\n').length + (i > 0 ? 1 : 0) + 1;
      const nodeAtPos = sourceFile.getDescendantAtPos(pos);

      if (nodeAtPos) {
        const statement = nodeAtPos.getFirstAncestor(isStmt);
        if (statement && pos > statement.getStart() && pos < statement.getEnd()) {
          continue;
        }

        const prevNode = sourceFile.getDescendantAtPos(pos - 2);
        const nextNode = sourceFile.getDescendantAtPos(pos + nextLine.length + 1);
        
        if (prevNode && nextNode) {
          const prevStmt = prevNode.getFirstAncestor(isStmt);
          const nextStmt = nextNode.getFirstAncestor(isStmt);
          
          if (prevStmt && nextStmt && prevStmt !== nextStmt) {
            if (isComplex(prevStmt) || isComplex(nextStmt)) {
              // Keep it
            } else {
              continue;
            }
          }
        }
      }
    }
    resultLines.push(currentLine);
  }

  let finalOutput = resultLines.join('\n');
  finalOutput = finalOutput.replace(/\n\n\n+/g, '\n\n');
  finalOutput = finalOutput.trimEnd() + '\n';
  await fs.writeFile(filePath, finalOutput);
}

async function cleanupDumb(filePath: string) {
  console.log(`Dumb Cleanup: ${filePath}...`);
  // Use git diff from a specific hash if provided, otherwise use all changes relative to HEAD (staged + unstaged)
  const diffCommand = hashArg ? `git diff -U0 ${hashArg}^ ${hashArg} -- ${filePath}` : `git diff -U0 HEAD -- ${filePath}`;
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

  const content = await fs.readFile(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find all line numbers that were added/modified in the diff
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

  const resultLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const currentLine = lines[i];
    const prevLine = resultLines[resultLines.length - 1];

    // If the current line is empty and it's part of a changed range
    if (currentLine.trim() === '' && changedLineNumbers.has(lineNum)) {
      // 1. Collapse consecutive empty lines if this one is part of the change
      if (prevLine !== undefined && prevLine.trim() === '') {
        continue; // Discard: consecutive empty lines
      }

      // 2. Collapse alternating empty lines ("every other line")
      // Check if the previous non-empty line was also preceded by an empty line
      // and if those were also part of the change. This is a heuristic.
      if (i > 1 && lines[i-1].trim() !== '' && lines[i-2].trim() === '') {
          // If we are in an alternating pattern, discard this empty line
          continue; 
      }
    }
    resultLines.push(currentLine);
  }

  let finalOutput = resultLines.join('\n');
  finalOutput = finalOutput.replace(/\n\n\n+/g, '\n\n');
  finalOutput = finalOutput.trimEnd() + '\n';
  await fs.writeFile(filePath, finalOutput);
}

(async () => {
  for (const file of files) {
    try {
      if (useAst) {
        await cleanupAst(path.resolve(file));
      } else {
        await cleanupDumb(path.resolve(file));
      }
    } catch (e) {
      console.error(`Error cleaning up ${file}:`, e);
    }
  }
  console.log('Done.');
})();
