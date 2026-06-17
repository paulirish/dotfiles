# Heap Snapshot Inspection Skill

This skill provides expert guidance for investigating memory issues in Chromium-based environments (Chrome, Node.js, Electron) using heap snapshots and the `@paulirish/agents` CLI.

## Core Tooling

We use the `@paulirish/agents` package which includes the `heap-snapshot` CLI.

### Usage Pattern
Always prefer using the CLI via `npx` to ensure the latest version and dependencies:
```bash
npx -y @paulirish/agents heap-snapshot <command> [arguments]
```

## Analysis Workflow

### 1. High-Level Summary
Start by getting an overview of the heap composition.
```bash
npx -y @paulirish/agents heap-snapshot summary path/to/snapshot.heapsnapshot
```

### 2. Identifying Leaks (Diffing)
Compare two snapshots (e.g., before and after an action) to see what objects are growing.
```bash
npx -y @paulirish/agents heap-snapshot diff baseline.heapsnapshot leak.heapsnapshot
```

### 3. Listing Specific Classes
If you suspect a specific class of objects (e.g., `Detached` DOM nodes or a specific constructor), list them.
```bash
npx -y @paulirish/agents heap-snapshot list leak.heapsnapshot --class Detached
```

### 4. Inspecting Objects
Get details for a specific object by its ID.
```bash
npx -y @paulirish/agents heap-snapshot inspect leak.heapsnapshot --id 12345
```

### 5. Retainer Analysis
Understand why an object is still in memory by looking at its retainers.
```bash
npx -y @paulirish/agents heap-snapshot retainers leak.heapsnapshot --id 12345
```

## Best Practices
- **Capture Clean Snapshots**: Before taking a snapshot, always perform a Garbage Collection (GC) if possible.
- **Isolate Reproductions**: Use minimal test cases to make diffing more effective.
- **Focus on Retained Size**: When listing objects, prioritize those with high retained size, as they are keeping other objects alive.
- **Look for "Detached"**: In web apps, "Detached" elements are a common source of leaks.
