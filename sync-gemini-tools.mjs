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
 * PURPOSE:
 * Automatically synchronizes core Gemini CLI tools and agents with your 
 * ~/.gemini/settings.json allowlist. 
 * 
 * RATIONALE:
 * Gemini CLI requires explicit approval for tools. As new tools are added 
 * in package updates, manually adding them to settings.json becomes tedious.
 * 
 * CRITICAL HEURISTIC:
 * This script identifies "interactive" tools (Kinds: Communicate, Plan, SwitchMode)
 * and EXCLUDES them from the allowlist. Tools like `ask_user` and `exit_plan_mode` 
 * MUST remain in the 'ASK_USER' policy state; if auto-allowed, they skip their 
 * interactive UI phase and fail to capture user input.
 * 
 * USAGE:
 * Run this script every time you update to a new version of Gemini CLI:
 *   node sync-gemini-tools.mjs
 */

const SETTINGS_PATH = path.join(os.homedir(), '.gemini/settings.json');
const IS_DRY_RUN = process.argv.includes('--dry-run');
const ANCHOR_COMMENT = '// @auto-sync-core-tools';

// Heuristic for interactive tool detection
const INTERACTIVE_KIND_PATTERN = /Kind\.(Communicate|Plan|SwitchMode)|['"](communicate|plan|switch_mode)['"]/i;

async function syncTools() {
  try {
    console.log(`\n--- Gemini Tool Sync ${IS_DRY_RUN ? '(DRY RUN)' : ''} ---`);

    // 1. Path Resolution
    const coreDir = resolveCorePackagePath();
    console.log(`Using core package at: ${coreDir}`);

    // 2. Metadata Resolution (Constant Name <-> String Value)
    const { valueToConstant, constantToValue } = resolveToolMetadata(coreDir);

    // 3. Discovery
    const allCoreTools = resolveCoreToolNames(coreDir, constantToValue);
    const allAgents = resolveAgentNames(coreDir);
    
    // Combine sets
    const discoveredTools = new Set([...allCoreTools, ...allAgents]);

    // 4. Heuristic Filtering (Blacklisting Interactive Tools)
    const interactiveTools = identifyInteractiveTools(coreDir, discoveredTools, valueToConstant);
    
    const targetTools = new Set(discoveredTools);
    for (const tool of interactiveTools) {
      targetTools.delete(tool);
    }

    if (targetTools.size === 0) throw new Error('CRITICAL: Zero tool names discovered.');

    // 5. Settings Synchronization
    updateSettings(targetTools, interactiveTools);

  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

/** Resolves the path to the @google/gemini-cli-core package. */
function resolveCorePackagePath() {
  const localPath = path.resolve('packages/core');
  if (fs.existsSync(localPath) && fs.existsSync(path.join(localPath, 'package.json'))) {
    return localPath;
  }
  try {
    const geminiBinPath = execSync('which gemini').toString().trim();
    const geminiFilePath = fs.realpathSync(geminiBinPath);
    let current = geminiFilePath;
    while (current !== path.dirname(current)) {
      current = path.dirname(current);
      if (path.basename(current) === '@google') {
         const candidate = path.join(current, 'gemini-cli-core');
         if (fs.existsSync(candidate)) return candidate;
      }
      const nodeModules = path.join(current, 'node_modules');
      if (fs.existsSync(nodeModules)) {
        const candidate = path.join(nodeModules, '@google/gemini-cli-core');
        if (fs.existsSync(candidate)) return candidate;
      }
    }
  } catch (e) {}
  throw new Error('Could not locate @google/gemini-cli-core package.');
}

/** Parses base-declarations to map 'read_file' <-> 'READ_FILE_TOOL_NAME'. */
function resolveToolMetadata(coreDir) {
  const valueToConstant = new Map();
  const constantToValue = new Map();
  const baseDecFile = path.join(coreDir, 'src/tools/definitions/base-declarations.ts');
  
  if (fs.existsSync(baseDecFile)) {
    const content = fs.readFileSync(baseDecFile, 'utf8');
    const matches = content.matchAll(/export const ([A-Z0-9_]+)\s*=\s*['"]([^'"]+)['"]/g);
    for (const m of matches) {
      valueToConstant.set(m[2], m[1]);
      constantToValue.set(m[1], m[2]);
    }
  }
  return { valueToConstant, constantToValue };
}

/** Extracts canonical tool names from tool-names.ts. */
function resolveCoreToolNames(coreDir, constantToValue) {
  const names = new Set();
  const toolNamesFile = [
    path.join(coreDir, 'src/tools/tool-names.ts'),
    path.join(coreDir, 'dist/src/tools/tool-names.js')
  ].find(fs.existsSync);

  if (toolNamesFile) {
    const content = fs.readFileSync(toolNamesFile, 'utf8');
    const builtinMatch = content.match(/ALL_BUILTIN_TOOL_NAMES\s*=\s*\[([\s\S]*?)\]/);
    if (builtinMatch) {
      builtinMatch[1].split(',').map(i => i.trim().replace(/['",]| as const/g, '')).forEach(item => {
        if (!item) return;
        const value = constantToValue.get(item) || item;
        if (value && !value.includes('_NAME')) names.add(value);
      });
    }
  }
  return names;
}

/** Extracts agent names from the agents directory. */
function resolveAgentNames(coreDir) {
  const names = new Set();
  const agentsDir = [path.join(coreDir, 'src/agents'), path.join(coreDir, 'dist/src/agents')].find(fs.existsSync);
  if (agentsDir) {
    fs.readdirSync(agentsDir).filter(f => !f.includes('.test.') && (f.endsWith('.ts') || f.endsWith('.js'))).forEach(file => {
      const m = fs.readFileSync(path.join(agentsDir, file), 'utf8').match(/name:\s*['"]([^'"]+)['"]/);
      if (m) names.add(m[1]);
    });
  }
  return names;
}

/** Scans tool implementations to find interactive tools. */
function identifyInteractiveTools(coreDir, toolNames, valueToConstant) {
  const interactive = new Set();
  const toolsImplDir = [path.join(coreDir, 'src/tools'), path.join(coreDir, 'dist/src/tools')].find(fs.existsSync);
  
  if (toolsImplDir) {
    fs.readdirSync(toolsImplDir).filter(f => f.endsWith('.ts') || f.endsWith('.js')).forEach(file => {
      const content = fs.readFileSync(path.join(toolsImplDir, file), 'utf8');
      if (INTERACTIVE_KIND_PATTERN.test(content)) {
        for (const name of toolNames) {
          const constName = valueToConstant.get(name);
          const hasLiteral = new RegExp(`['"]${name}['"]`).test(content);
          const hasConstant = constName && content.includes(constName);
          if (hasLiteral || hasConstant) interactive.add(name);
        }
      }
    });
  }
  return interactive;
}

/** Merges the target tools into settings.json while pruning blacklisted ones. */
function updateSettings(targetTools, interactiveTools) {
  if (!fs.existsSync(SETTINGS_PATH)) throw new Error(`Settings file not found at ${SETTINGS_PATH}`);
  const settingsContent = fs.readFileSync(SETTINGS_PATH, 'utf8');
  if (!settingsContent.includes(ANCHOR_COMMENT)) throw new Error(`Anchor comment "${ANCHOR_COMMENT}" not found in settings.json.`);

  const match = settingsContent.match(/("allowed"\s*:\s*\[)([\s\S]*?)(\])/);
  if (!match) throw new Error("Could not find 'allowed' array in settings.json");

  const [fullMatch, prefix, currentItems, suffix] = match;
  let lines = currentItems.split('\n');
  
  // Parse current state
  const existingEntries = lines.map(l => {
    const raw = l.split('//')[0].trim();
    const nameMatch = raw.match(/"([^"]+)"/);
    return nameMatch ? { name: nameMatch[1], line: l } : null;
  }).filter(Boolean);

  // 1. Identify interactive tools that MUST be pruned
  const toolsToPrune = existingEntries.filter(e => interactiveTools.has(e.name));
  
  // 2. Identify new tools to add
  const existingNames = new Set(existingEntries.map(e => e.name));
  const toolsToAdd = [...targetTools].filter(t => 
    !existingNames.has(t) && 
    !Array.from(existingNames).some(e => e.startsWith(`${t}(`))
  ).sort();

  if (toolsToAdd.length === 0 && toolsToPrune.length === 0) {
    console.log("✅ Your allowlist is up to date.");
    return;
  }

  // Perform updates
  let newLines = lines.filter(line => {
    const name = (line.split('//')[0].trim().match(/"([^"]+)"/) || [])[1];
    return !name || !interactiveTools.has(name);
  });

  const anchorIdx = newLines.findIndex(l => l.includes(ANCHOR_COMMENT));
  if (anchorIdx !== -1) {
    // Ensure comma before anchor if adding new tools
    if (toolsToAdd.length > 0 && anchorIdx > 0) {
      newLines[anchorIdx - 1] = addCommaToLine(newLines[anchorIdx - 1]);
    }
    const newEntries = toolsToAdd.map(t => `      "${t}",`);
    newLines.splice(anchorIdx + 1, 0, ...newEntries);
  }

  const updatedBlock = `${prefix}${newLines.join('\n')}${suffix}`;

  if (IS_DRY_RUN) {
    console.log(`\n--- PREVIEW ---`);
    if (toolsToPrune.length > 0) {
      console.log(`Pruning ${toolsToPrune.length} interactive tool(s): ${toolsToPrune.map(t => t.name).join(', ')}`);
    }
    if (toolsToAdd.length > 0) {
      console.log(`Adding ${toolsToAdd.length} new tool(s): ${toolsToAdd.join(', ')}`);
    }
    console.log(updatedBlock);
    console.log(`--- END ---`);
  } else {
    fs.writeFileSync(SETTINGS_PATH, settingsContent.replace(fullMatch, updatedBlock));
    console.log(`\nSuccessfully updated settings.json (Added: ${toolsToAdd.length}, Pruned: ${toolsToPrune.length})`);
  }
}

function addCommaToLine(line) {
  const parts = line.split('//');
  const content = parts[0];
  if (content.includes('"') && !content.includes(',')) {
    const lastQuote = content.lastIndexOf('"');
    parts[0] = content.slice(0, lastQuote + 1) + ',' + content.slice(lastQuote + 1);
    return parts.join('//');
  }
  return line;
}

syncTools();
