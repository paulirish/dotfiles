#!/usr/bin/env node

/**
 * Heap Explorer CLI
 * A utility to explore Chromium heap snapshots via heap-snapshot-toolkit.
 */

import { createReadStream } from 'node:fs';
import { parse, diff } from 'heap-snapshot-toolkit';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  try {
    switch (command) {
      case 'summary':
        await handleSummary(args[1]);
        break;
      case 'list':
        await handleList(args[1], args);
        break;
      case 'inspect':
        await handleInspect(args[1], args);
        break;
      case 'retainers':
        await handleRetainers(args[1], args);
        break;
      case 'diff':
        await handleDiff(args[1], args[2], args);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Heap Explorer CLI - Explore Chromium heap snapshots

Usage:
  npx @paulirish/agents heap-snapshot <command> [arguments]

Commands:
  summary <file>                      Show high-level heap statistics
  list <file> --class <name>          List objects of a specific class (sorted by retained size)
  inspect <file> --id <objectId>      Show details of a specific object by its ID
  retainers <file> --id <objectId>    Show the retainer graph for an object
  diff <file1> <file2>                Show growth between two snapshots

Examples:
  npx @paulirish/agents heap-snapshot summary baseline.heapsnapshot
  npx @paulirish/agents heap-snapshot list leak.heapsnapshot --class Detached
  npx @paulirish/agents heap-snapshot inspect leak.heapsnapshot --id 12345
  npx @paulirish/agents heap-snapshot retainers leak.heapsnapshot --id 12345
  npx @paulirish/agents heap-snapshot diff baseline.heapsnapshot leak.heapsnapshot
`);
}

async function handleSummary(file) {
  if (!file) throw new Error('Missing snapshot file');
  console.log(`Loading ${file}...`);
  const snapshot = await parse(createReadStream(file));
  const stats = snapshot.getStatistics();
  
  console.log('\nHeap Statistics:');
  console.log(`Total Size: ${(stats.total / 1024 / 1024).toFixed(2)} MB`);
  console.log('\nV8 Heap:');
  console.log(`  Code: ${(stats.v8heap.code / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Strings: ${(stats.v8heap.strings / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  JS Arrays: ${(stats.v8heap.jsArrays / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  System: ${(stats.v8heap.system / 1024 / 1024).toFixed(2)} MB`);
  console.log('\nNative:');
  console.log(`  Total: ${(stats.native.total / 1024 / 1024).toFixed(2)} MB`);
}

async function handleList(file, args) {
  if (!file) throw new Error('Missing snapshot file');
  const classFlagIdx = args.indexOf('--class');
  if (classFlagIdx === -1 || !args[classFlagIdx + 1]) throw new Error('Missing --class <name>');
  const className = args[classFlagIdx + 1];
  const limit = 20;

  console.log(`Loading ${file}...`);
  const snapshot = await parse(createReadStream(file));
  const aggregates = snapshot.aggregatesWithFilter({});
  
  // Find the class key
  const classKey = Object.keys(aggregates).find(key => 
    aggregates[key].name.toLowerCase().includes(className.toLowerCase())
  );

  if (!classKey) {
    console.log(`No objects found matching class: ${className}`);
    return;
  }

  const aggregate = aggregates[classKey];
  console.log(`\nFound ${aggregate.count} objects of class "${aggregate.name}"`);
  console.log(`Total Self Size: ${(aggregate.self / 1024).toFixed(2)} KB`);
  console.log(`Max Retained Size: ${(aggregate.maxRet / 1024).toFixed(2)} KB`);
  
  console.log(`\nTop ${limit} items by ID:`);
  aggregate.idxs.slice(0, limit).forEach(idx => {
    const node = snapshot.createNode(idx);
    console.log(`  ID: ${node.id()}, Self: ${node.selfSize()} B, Retained: ${node.retainedSize()} B, Distance: ${node.distance()}`);
  });
}

async function handleInspect(file, args) {
  if (!file) throw new Error('Missing snapshot file');
  const idFlagIdx = args.indexOf('--id');
  if (idFlagIdx === -1 || !args[idFlagIdx + 1]) throw new Error('Missing --id <objectId>');
  const objectId = parseInt(args[idFlagIdx + 1], 10);

  console.log(`Loading ${file}...`);
  const snapshot = await parse(createReadStream(file));
  
  let foundNode = null;
  for (let i = 0; i < snapshot.nodeCount; i++) {
    const node = snapshot.createNode(i);
    if (node.id() === objectId) {
      foundNode = node;
      break;
    }
  }

  if (!foundNode) {
    console.log(`Object with ID ${objectId} not found`);
    return;
  }

  console.log('\nObject Details:');
  console.log(`  ID: ${foundNode.id()}`);
  console.log(`  Class: ${foundNode.className()}`);
  console.log(`  Name: ${foundNode.name() ||foundNode.rawName()}`);
  console.log(`  Self Size: ${foundNode.selfSize()} B`);
  console.log(`  Retained Size: ${foundNode.retainedSize()} B`);
  console.log(`  Distance: ${foundNode.distance()}`);
  console.log(`  Type: ${foundNode.type()}`);
  
  console.log('\nEdges (Outgoing References):');
  const edgesIter = foundNode.edges();
  while (edgesIter.hasNext()) {
    const edge = edgesIter.item();
    console.log(`  - [${edge.type()}] ${edge.name()} -> ${edge.node().className()} (@${edge.node().id()})`);
    edgesIter.next();
  }
}

async function handleRetainers(file, args) {
  if (!file) throw new Error('Missing snapshot file');
  const idFlagIdx = args.indexOf('--id');
  if (idFlagIdx === -1 || !args[idFlagIdx + 1]) throw new Error('Missing --id <objectId>');
  const objectId = parseInt(args[idFlagIdx + 1], 10);

  console.log(`Loading ${file}...`);
  const snapshot = await parse(createReadStream(file));
  
  let foundNode = null;
  for (let i = 0; i < snapshot.nodeCount; i++) {
    const node = snapshot.createNode(i);
    if (node.id() === objectId) {
      foundNode = node;
      break;
    }
  }

  if (!foundNode) {
    console.log(`Object with ID ${objectId} not found`);
    return;
  }

  console.log(`\nRetainers for ${foundNode.className()} (@${foundNode.id()}):`);
  const retainersIter = foundNode.retainers();
  let count = 0;
  while (retainersIter.hasNext() && count < 20) {
    const edge = retainersIter.item();
    const node = edge.node();
    console.log(`  <- [${edge.type()}] ${edge.name()} from ${node.className()} (@${node.id()})`);
    retainersIter.next();
    count++;
  }
  if (retainersIter.hasNext()) console.log('  ... (more retainers available)');
}

async function handleDiff(file1, file2, args) {
  if (!file1 || !file2) throw new Error('Missing snapshot files');
  
  console.log(`Diffing ${file1} vs ${file2}...`);
  const startSnapshot = await parse(createReadStream(file1));
  const endSnapshot = await parse(createReadStream(file2));
  
  const snapshotDiff = await diff(startSnapshot, endSnapshot);
  
  const diffItems = Object.entries(snapshotDiff)
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => b.sizeDelta - a.sizeDelta)
    .filter(item => item.countDelta !== 0);

  console.log('\nTop Growth by Class:');
  console.log('Class'.padEnd(30), 'Count Delta'.padStart(12), 'Size Delta'.padStart(12));
  console.log('-'.repeat(56));
  
  diffItems.slice(0, 20).forEach(item => {
    console.log(
      item.name.slice(0, 30).padEnd(30),
      item.countDelta.toString().padStart(12),
      `${(item.sizeDelta / 1024).toFixed(2)} KB`.padStart(12)
    );
  });
}

main();
