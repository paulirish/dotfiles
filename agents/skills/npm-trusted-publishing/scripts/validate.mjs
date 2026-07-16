#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Main Execution ---
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }

  const packageJsonPath = path.resolve(args[0]);
  const packageDir = path.dirname(packageJsonPath);
  const gitRoot = findGitRoot(packageDir) || packageDir;

  console.log(`Analyzing package at: ${packageDir}`);
  if (gitRoot !== packageDir) {
    console.log(`Resolved Git root at: ${gitRoot}`);
  }

  const errors = [];
  const warnings = [];

  const packageJson = readPackageJson(packageJsonPath);
  validatePackageJson(packageJson, errors, warnings);

  const workflow = findWorkflowFile(gitRoot);
  if (!workflow) {
    warnings.push("Could not find a GitHub Actions workflow file containing 'npm publish' under .github/workflows/.");
  } else {
    console.log(`Analyzing workflow file: ${path.relative(gitRoot, workflow.path)}`);
    validateWorkflow(workflow.content, workflow.path, gitRoot, errors, warnings);
  }

  printResults(errors, warnings);

  process.exit(errors.length > 0 ? 1 : 0);
}

// --- Helper Functions ---

function printUsage() {
  console.log('Usage: node validate.mjs <path-to-package.json>');
  console.log('Example: node validate.mjs ./package.json');
}

function readPackageJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.error(`Error: package.json not found at ${filePath}`);
    } else {
      console.error(`Error reading/parsing package.json: ${e.message}`);
    }
    process.exit(1);
  }
}

function validatePackageJson(packageJson, errors, warnings) {
  if (packageJson.private === true) {
    warnings.push("package.json is marked as private. Provenance and Trusted Publishing are only supported for public packages.");
  }

  if (!packageJson.repository) {
    errors.push("package.json: Missing 'repository' field. NPM validates provenance against this field.");
  } else {
    const repoUrl = typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository.url;
    if (!repoUrl) {
      errors.push("package.json: Missing 'repository.url' field.");
    }
  }
}

function findWorkflowFile(gitRoot) {
  const workflowDirs = [path.join(gitRoot, '.github', 'workflows')];
  
  for (const dir of workflowDirs) {
    let files;
    try {
      files = fs.readdirSync(dir);
    } catch (e) {
      if (e.code === 'ENOENT') continue;
      throw e;
    }
    
    const preferredFiles = files.filter(f => ['publish.yml', 'publish.yaml', 'release.yml', 'release.yaml'].includes(f));
    const otherFiles = files.filter(f => !preferredFiles.includes(f) && (f.endsWith('.yml') || f.endsWith('.yaml')));
    
    const candidateFiles = [...preferredFiles, ...otherFiles];
    
    for (const file of candidateFiles) {
      const p = path.join(dir, file);
      try {
        const content = fs.readFileSync(p, 'utf8');
        const isPreferred = preferredFiles.includes(file);
        const hasPublishCommand = content.includes('npm publish') || 
                                  content.includes('npm-publish') || 
                                  /uses\s*:\s*[^\n]*npm-publish/.test(content) ||
                                  /npm\s+run\s+[^\n]*publish/.test(content);
        if (isPreferred || hasPublishCommand) {
          return { path: p, content };
        }
      } catch (e) {
        // ignore read errors
      }
    }
  }
  return null;
}

function validateWorkflow(workflowContent, workflowPath, gitRoot, errors, warnings) {
  const filename = path.basename(workflowPath);

  if (!/id-token\s*:\s*write/.test(workflowContent)) {
    errors.push(`${filename}: Missing 'id-token: write' permission. This is required for OIDC token exchange.`);
  }
  if (!/contents\s*:\s*read/.test(workflowContent)) {
    warnings.push(`${filename}: Recommended 'contents: read' permission is missing.`);
  }

  const hasNpmUpgrade = /npm\s+(install|i)\s+(-g|--global)\s+npm/.test(workflowContent);
  if (hasNpmUpgrade) {
    console.log("Detected npm upgrade command in workflow.");
  }

  const steps = parseSteps(workflowContent);
  const setupNodeStep = steps.find(s => /uses\s*:\s*actions\/setup-node/.test(s));

  if (setupNodeStep) {
    const versionMatch = /node-version\s*:\s*([^\n]+)/.exec(setupNodeStep);
    const versionFileMatch = /node-version-file\s*:\s*([^\n]+)/.exec(setupNodeStep);

    if (!versionMatch && !versionFileMatch) {
      warnings.push(`${filename}: Neither 'node-version' nor 'node-version-file' is specified in setup-node step. It is recommended to use Node 24+ (or 'lts/*') for npm 11+ to ensure robust OIDC support.`);
    } else if (versionFileMatch) {
      const file = versionFileMatch[1].split('#')[0].trim().replace(/['"]/g, '');
      const filePath = path.join(gitRoot, file);
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8').trim();
        console.log(`Found node-version-file "${file}" specifying Node version: ${fileContent}`);
      } catch (e) {
        if (e.code === 'ENOENT') {
          errors.push(`${filename}: Referenced node-version-file "${file}" does not exist at ${filePath}`);
        } else {
          warnings.push(`${filename}: Could not read node-version-file "${file}": ${e.message}`);
        }
      }
    } else {
      const version = versionMatch[1].split('#')[0].trim().replace(/['"]/g, '');
      if (version === '20' || version.startsWith('20.')) {
        warnings.push(`${filename}: Node ${version} is deprecated on GitHub Actions. Consider upgrading to 24 or 'lts/*'.`);
      } else if (version !== '24' && version !== 'lts/*' && !version.startsWith('24.')) {
        if (!hasNpmUpgrade) {
          warnings.push(`${filename}: Node version is set to "${version}". Ensure it provides npm v11.5.1+ (Node v24+) if you encounter OIDC issues, or add a step to upgrade npm: "npm install -g npm@latest".`);
        }
      }
    }
  } else {
    warnings.push(`${filename}: Could not find 'actions/setup-node' step. Ensure you are using a modern Node/npm version.`);
  }
}

function printResults(errors, warnings) {
  console.log('\n--- Validation Results ---');
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed! Configuration looks good for NPM Trusted Publishing.');
  } else {
    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach(e => console.log(`  - ${e}`));
    }
    if (warnings.length > 0) {
      console.log(`\n⚠️ Warnings (${warnings.length}):`);
      warnings.forEach(w => console.log(`  - ${w}`));
    }
  }
}

function findGitRoot(startDir) {
  let dir = startDir;
  while (dir !== path.parse(dir).root) {
    // Checking exists here is not a TOCTOU violation as we don't immediately operate on it.
    if (fs.existsSync(path.join(dir, '.git'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return null;
}

function parseSteps(yamlContent) {
  const lines = yamlContent.split('\n');
  const steps = [];
  let currentStep = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      if (currentStep) {
        steps.push(currentStep);
      }
      currentStep = [line];
    } else if (currentStep && (line.startsWith(' ') || line.startsWith('\t') || trimmed === '')) {
      currentStep.push(line);
    } else {
      if (currentStep) {
        steps.push(currentStep);
        currentStep = null;
      }
    }
  }
  if (currentStep) {
    steps.push(currentStep);
  }
  return steps.map(s => s.join('\n'));
}

// --- Import Guard ---
const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main();
}
