#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import {execSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_URL = 'https://chromium.googlesource.com/chromium/src/+/main/components/optimization_guide/proto/features/common_quality_data.proto?format=TEXT';
const PROTO_DIR = path.resolve(__dirname, 'proto');
const PROTO_FILE = path.join(PROTO_DIR, 'common_quality_data.proto');
const JS_FILE = path.join(PROTO_DIR, 'common_quality_data_pb.js');
const TS_FILE = path.join(PROTO_DIR, 'common_quality_data_pb.d.ts');

async function fetchProto() {
  console.log(`Fetching latest proto from ${PROTO_URL}...`);
  const response = await fetch(PROTO_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch proto: ${response.statusText}`);
  }
  const base64Text = await response.text();
  const protoContent = Buffer.from(base64Text, 'base64').toString('utf8');

  if (!fs.existsSync(PROTO_DIR)) {
    fs.mkdirSync(PROTO_DIR, {recursive: true});
  }

  fs.writeFileSync(PROTO_FILE, protoContent, 'utf8');
  console.log(`Saved proto to ${PROTO_FILE}`);
}

function generateBuf() {
  console.log('Generating buf files...');

  const templateFile = path.join(PROTO_DIR, 'buf.gen.yaml');
  // Run buf generate using @bufbuild/buf and @bufbuild/protoc-gen-es
  const bufCmd = `npx --yes --registry=https://registry.npmjs.org/ -p @bufbuild/buf -p @bufbuild/protoc-gen-es buf generate ${PROTO_FILE} --template ${templateFile} -o ${PROTO_DIR}`;
  console.log(`$ ${bufCmd}`);
  execSync(bufCmd, {stdio: 'inherit'});

  console.log('Generation complete.');
}

async function main() {
  try {
    await fetchProto();
    generateBuf();
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// If run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
