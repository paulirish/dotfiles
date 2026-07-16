#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_URL = 'https://chromium.googlesource.com/chromium/src/+/main/components/optimization_guide/proto/features/common_quality_data.proto?format=TEXT';
const PROTO_DIR = path.resolve(__dirname, 'proto');
const PROTO_FILE = path.join(PROTO_DIR, 'common_quality_data.proto');
const JS_FILE = path.join(PROTO_DIR, 'common_quality_data_pbjs.js');
const TS_FILE = path.join(PROTO_DIR, 'common_quality_data_pbjs.d.ts');

async function fetchProto() {
  console.log(`Fetching latest proto from ${PROTO_URL}...`);
  const response = await fetch(PROTO_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch proto: ${response.statusText}`);
  }
  const base64Text = await response.text();
  const protoContent = Buffer.from(base64Text, 'base64').toString('utf8');
  
  if (!fs.existsSync(PROTO_DIR)) {
    fs.mkdirSync(PROTO_DIR, { recursive: true });
  }
  
  fs.writeFileSync(PROTO_FILE, protoContent, 'utf8');
  console.log(`Saved proto to ${PROTO_FILE}`);
}

function generatePbjs() {
  console.log('Generating pbjs files...');
  
  // Run pbjs to generate static module with size optimizations (keeping encode/create for tests)
  const pbjsCmd = `npx --yes --registry=https://registry.npmjs.org/ --package protobufjs-cli pbjs -t static-module -w esm --no-verify --no-delimited --no-service --no-typeurl -o ${JS_FILE} ${PROTO_FILE}`;
  console.log(`$ ${pbjsCmd}`);
  execSync(pbjsCmd, { stdio: 'inherit' });

  // Post-process the generated JS file to fix the protobufjs import if needed.
  let jsContent = fs.readFileSync(JS_FILE, 'utf8');
  
  // Replace the default generated import "protobufjs/minimal.js" with "protobufjs" to remain consistent with our existing code imports.
  jsContent = jsContent.replace(/import\s+\$protobuf\s+from\s+['"]protobufjs\/minimal\.js['"];/, 'import $protobuf from "protobufjs";');
  
  fs.writeFileSync(JS_FILE, jsContent, 'utf8');
  console.log('Fixed import in JS file.');

  // Run pbts to generate TypeScript definitions
  const pbtsCmd = `npx --yes --registry=https://registry.npmjs.org/ --package protobufjs-cli pbts -o ${TS_FILE} ${JS_FILE}`;
  console.log(`$ ${pbtsCmd}`);
  execSync(pbtsCmd, { stdio: 'inherit' });
  
  console.log('Generation complete.');
}

async function main() {
  try {
    await fetchProto();
    generatePbjs();
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// If run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
