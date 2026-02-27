/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import os from 'node:os';

/**
 * sync-gemini-tools.mjs
 * 
 * Synchronizes core Gemini CLI tools and agents with your ~/.gemini/settings.json.
 * Uses an anchor comment in settings.json to manage the list safely.
 */

const SETTINGS_PATH = path.join(os.homedir(), '.gemini/settings.json');
const IS_DRY_RUN = process.argv.includes('--dry-run');
const ANCHOR_COMMENT = '// @auto-sync-core-tools';

async function syncTools() {
  try {
    console.log(`\n--- Gemini Tool Sync ${IS_DRY_RUN ? '(DRY RUN)' : ''} ---`);

    // 1. Locate the Core Package
    let coreDir;
    
    // Check for repo mode first if current directory looks like a repo
    const localPath = path.resolve('packages/core');
    if (fs.existsSync(localPath) && fs.existsSync(path.join(localPath, 'package.json'))) {
      coreDir = localPath;
    } else {
      // Otherwise find via 'which gemini'
      try {
        const geminiBinPath = execSync('which gemini').toString().trim();
        const geminiFilePath = fs.realpathSync(geminiBinPath);
        
        let current = geminiFilePath;
        while (current !== path.dirname(current)) {
          current = path.dirname(current);
          if (path.basename(current) === '@google') {
             const candidate = path.join(current, 'gemini-cli-core');
             if (fs.existsSync(candidate)) {
               coreDir = candidate;
               break;
             }
          }
          const nodeModules = path.join(current, 'node_modules');
          if (fs.existsSync(nodeModules)) {
            const candidate = path.join(nodeModules, '@google/gemini-cli-core');
            if (fs.existsSync(candidate)) {
              coreDir = candidate;
              break;
            }
          }
        }
      } catch (e) {}
    }

    if (!coreDir) throw new Error('Could not locate @google/gemini-cli-core package.');
    console.log(`Using core package at: ${coreDir}`);

    // 2. Read Tool Names from source of truth
    const toolNamesFile = [
      path.join(coreDir, 'src/tools/tool-names.ts'),
      path.join(coreDir, 'dist/src/tools/tool-names.js'),
    ].find(fs.existsSync);

    if (!toolNamesFile) throw new Error('CRITICAL: Could not find tool-names source file.');

    const sourceContent = fs.readFileSync(toolNamesFile, 'utf8');
    const toolNames = new Set();

    const builtinMatch = sourceContent.match(/ALL_BUILTIN_TOOL_NAMES\s*=\s*\[([\s\S]*?)\]/);
    if (!builtinMatch) throw new Error('CRITICAL: ALL_BUILTIN_TOOL_NAMES array not found.');

    builtinMatch[1].split(',').map(i => i.trim().replace(/['",]/g, '').replace(/ as const/g, '')).forEach(item => {
      if (!item) return;
      if (item.includes('_NAME')) {
        const valMatch = sourceContent.match(new RegExp(`export const ${item}\\s*=\\s*['"]([^'"]+)['"]`));
        if (valMatch) toolNames.add(valMatch[1]);
      } else {
        toolNames.add(item);
      }
    });

    // 3. Extract Agent Names
    const agentsDir = [path.join(coreDir, 'src/agents'), path.join(coreDir, 'dist/src/agents'), path.join(coreDir, 'agents')].find(fs.existsSync);
    if (agentsDir) {
      fs.readdirSync(agentsDir).forEach(file => {
        if (!file.includes('.test.') && (file.endsWith('.ts') || file.endsWith('.js'))) {
          const m = fs.readFileSync(path.join(agentsDir, file), 'utf8').match(/name:\s*['"]([^'"]+)['"]/);
          if (m) toolNames.add(m[1]);
        }
      });
    }

    if (toolNames.size === 0) throw new Error('CRITICAL: Zero tool names discovered.');

    // 4. Update Settings
    if (!fs.existsSync(SETTINGS_PATH)) throw new Error(`Settings file not found at ${SETTINGS_PATH}`);
    let settingsContent = fs.readFileSync(SETTINGS_PATH, 'utf8');

    if (!settingsContent.includes(ANCHOR_COMMENT)) {
      throw new Error(`CRITICAL: Anchor comment "${ANCHOR_COMMENT}" not found in settings.json.`);
    }

    const match = settingsContent.match(/("allowed"\s*:\s*\[)([\s\S]*?)(\])/);
    if (!match) throw new Error("Could not find 'allowed' array in settings.json");

    const [fullMatch, prefix, currentItems, suffix] = match;
    let lines = currentItems.split('\n');

    const existingTools = lines.map(l => (l.split('//')[0].trim().match(/"([^"]+)"/) || [])[1]?.toLowerCase()).filter(Boolean);
    const toolsToAdd = [...toolNames].filter(t => !existingTools.includes(t.toLowerCase()) && !existingTools.some(e => e.startsWith(`${t.toLowerCase()}(`))).sort();

    if (toolsToAdd.length === 0) {
      console.log("✅ Your allowlist is up to date.");
      return;
    }

    const addComma = (line) => {
      const parts = line.split('//');
      const content = parts[0];
      if (content.includes('"') && !content.includes(',')) {
        const lastQuote = content.lastIndexOf('"');
        parts[0] = content.slice(0, lastQuote + 1) + ',' + content.slice(lastQuote + 1);
        return parts.join('//');
      }
      return line;
    };

    const anchorIdx = lines.findIndex(l => l.includes(ANCHOR_COMMENT));
    const newEntries = toolsToAdd.map(t => `      "${t}",`);

    if (anchorIdx !== -1) {
      if (anchorIdx > 0) lines[anchorIdx - 1] = addComma(lines[anchorIdx - 1]);
      lines.splice(anchorIdx + 1, 0, ...newEntries);
    }

    const updatedBlock = `${prefix}${lines.join('\n')}${suffix}`;
    if (IS_DRY_RUN) console.log(`\n--- PREVIEW (Adding ${toolsToAdd.length} tools) ---\n${updatedBlock}\n--- END ---`);
    else {
      fs.writeFileSync(SETTINGS_PATH, settingsContent.replace(fullMatch, updatedBlock));
      console.log(`\nSuccessfully added ${toolsToAdd.length} tools to ${SETTINGS_PATH}`);
    }
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

syncTools();