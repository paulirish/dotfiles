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
    const localPath = path.resolve('packages/core');
    if (fs.existsSync(localPath) && fs.existsSync(path.join(localPath, 'package.json'))) {
      coreDir = localPath;
    } else {
      try {
        const geminiBinPath = execSync('which gemini').toString().trim();
        const geminiFilePath = fs.realpathSync(geminiBinPath);
        let current = geminiFilePath;
        while (current !== path.dirname(current)) {
          current = path.dirname(current);
          if (path.basename(current) === '@google') {
             const candidate = path.join(current, 'gemini-cli-core');
             if (fs.existsSync(candidate)) { coreDir = candidate; break; }
          }
          const nodeModules = path.join(current, 'node_modules');
          if (fs.existsSync(nodeModules)) {
            const candidate = path.join(nodeModules, '@google/gemini-cli-core');
            if (fs.existsSync(candidate)) { coreDir = candidate; break; }
          }
        }
      } catch (e) {}
    }

    if (!coreDir) throw new Error('Could not locate @google/gemini-cli-core package.');
    console.log(`Using core package at: ${coreDir}`);

    // 2. Discovery: Collect all tool and agent names
    const toolNames = new Set();
    const toolConstants = new Map(); // Value -> Constant Name (e.g. 'read_file' -> 'READ_FILE_TOOL_NAME')

    // 2a. Resolve constants from base-declarations.ts
    const baseDecFile = path.join(coreDir, 'src/tools/definitions/base-declarations.ts');
    if (fs.existsSync(baseDecFile)) {
      const content = fs.readFileSync(baseDecFile, 'utf8');
      const matches = content.matchAll(/export const ([A-Z0-9_]+)\s*=\s*['"]([^'"]+)['"]/g);
      for (const m of matches) toolConstants.set(m[2], m[1]);
    }

    // 2b. Built-in tools from tool-names.ts
    const toolNamesFile = [path.join(coreDir, 'src/tools/tool-names.ts'), path.join(coreDir, 'dist/src/tools/tool-names.js')].find(fs.existsSync);
    if (toolNamesFile) {
      const content = fs.readFileSync(toolNamesFile, 'utf8');
      const builtinMatch = content.match(/ALL_BUILTIN_TOOL_NAMES\s*=\s*\[([\s\S]*?)\]/);
      if (builtinMatch) {
        // Resolve constant names (like READ_FILE_TOOL_NAME) to values (like 'read_file')
        const constantToValue = new Map([...toolConstants.entries()].map(([v, k]) => [k, v]));
        builtinMatch[1].split(',').map(i => i.trim().replace(/['",]| as const/g, '')).forEach(item => {
          if (!item) return;
          const value = constantToValue.get(item) || item;
          if (value && !value.includes('_NAME')) toolNames.add(value);
        });
      }
    }

    // 2c. Agents from agents/ directory
    const agentsDir = [path.join(coreDir, 'src/agents'), path.join(coreDir, 'dist/src/agents'), path.join(coreDir, 'agents')].find(fs.existsSync);
    if (agentsDir) {
      fs.readdirSync(agentsDir).filter(f => !f.includes('.test.') && (f.endsWith('.ts') || f.endsWith('.js'))).forEach(file => {
        const m = fs.readFileSync(path.join(agentsDir, file), 'utf8').match(/name:\s*['"]([^'"]+)['"]/);
        if (m) toolNames.add(m[1]);
      });
    }

    // 3. Filtering: Identify interactive tools (Communicate, Plan, SwitchMode)
    const interactiveTools = new Set();
    const toolsImplDir = [path.join(coreDir, 'src/tools'), path.join(coreDir, 'dist/src/tools'), path.join(coreDir, 'dist/tools')].find(fs.existsSync);
    if (toolsImplDir) {
      const interactivePattern = /Kind\.(Communicate|Plan|SwitchMode)|['"](communicate|plan|switch_mode)['"]/i;
      const toolFiles = fs.readdirSync(toolsImplDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
      
      for (const file of toolFiles) {
        const content = fs.readFileSync(path.join(toolsImplDir, file), 'utf8');
        if (interactivePattern.test(content)) {
          for (const name of toolNames) {
            const constName = toolConstants.get(name);
            // Match either the literal name or the constant name
            const nameMatch = new RegExp(`['"]${name}['"]`).test(content);
            const constMatch = constName && content.includes(constName);
            
            if (nameMatch || constMatch) {
              interactiveTools.add(name);
              toolNames.delete(name);
            }
          }
        }
      }
    }

    if (interactiveTools.size > 0) {
      console.log(`Excluding interactive tools: ${[...interactiveTools].sort().join(', ')}`);
    }

    if (toolNames.size === 0) throw new Error('CRITICAL: Zero tool names discovered.');

    // 4. Update Settings
    if (!fs.existsSync(SETTINGS_PATH)) throw new Error(`Settings file not found at ${SETTINGS_PATH}`);
    let settingsContent = fs.readFileSync(SETTINGS_PATH, 'utf8');
    if (!settingsContent.includes(ANCHOR_COMMENT)) throw new Error(`CRITICAL: Anchor comment "${ANCHOR_COMMENT}" not found in settings.json.`);

    const match = settingsContent.match(/("allowed"\s*:\s*\[)([\s\S]*?)(\])/);
    if (!match) throw new Error("Could not find 'allowed' array in settings.json");

    const [fullMatch, prefix, currentItems, suffix] = match;
    let lines = currentItems.split('\n');
    
    // Determine existing allowed tools
    const existingTools = new Set(lines.map(l => (l.split('//')[0].trim().match(/"([^"]+)"/) || [])[1]).filter(Boolean));
    
    // Prune interactive tools from existing allowed list
    let prunedCount = 0;
    lines = lines.filter(line => {
      const toolNameMatch = (line.split('//')[0].trim().match(/"([^"]+)"/) || [])[1];
      if (toolNameMatch && interactiveTools.has(toolNameMatch)) {
        prunedCount++;
        return false;
      }
      return true;
    });

    const toolsToAdd = [...toolNames].filter(t => !existingTools.has(t) && !Array.from(existingTools).some(e => e.startsWith(`${t}(`))).sort();

    if (toolsToAdd.length === 0 && prunedCount === 0) {
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
    if (IS_DRY_RUN) {
      console.log(`\n--- PREVIEW ---`);
      if (prunedCount > 0) console.log(`Pruning ${prunedCount} interactive tools.`);
      if (toolsToAdd.length > 0) console.log(`Adding ${toolsToAdd.length} new tools: ${toolsToAdd.join(', ')}`);
      console.log(updatedBlock);
      console.log(`--- END ---`);
    } else {
      fs.writeFileSync(SETTINGS_PATH, settingsContent.replace(fullMatch, updatedBlock));
      console.log(`\nSuccessfully updated ${SETTINGS_PATH} (Added: ${toolsToAdd.length}, Pruned: ${prunedCount})`);
    }
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

syncTools();
