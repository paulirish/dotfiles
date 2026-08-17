#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

export interface StackedUpstreamInfo {
  branch: string;
  upstream: string;
  mergeBaseSha: string;
  mergeBaseShort: string;
  commitsAhead: number;
  isDirectStackTip: boolean;
  baseCommitSubject: string;
}

function runGit(args: string[], cwd: string): string {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 10 * 1024 * 1024
    }).trim();
  } catch {
    return "";
  }
}

/**
 * Discovers the default trunk branch (e.g. main, master, origin/main, pierre/main, upstream/main).
 */
export function detectDefaultTrunk(repoDir: string): string {
  // Check any remote HEAD symbolic ref (e.g. refs/remotes/origin/HEAD, refs/remotes/pierre/HEAD)
  const remotes = runGit(["remote"], repoDir).split("\n").filter(Boolean);
  for (const r of remotes) {
    const headRemote = runGit(["symbolic-ref", `refs/remotes/${r}/HEAD`], repoDir);
    if (headRemote) {
      const name = headRemote.replace("refs/remotes/", "");
      if (runGit(["rev-parse", name], repoDir)) return name;
    }
  }

  // Common trunk name heuristics
  for (const candidate of ["main", "master", "trunk", "develop"]) {
    if (runGit(["rev-parse", candidate], repoDir)) return candidate;
    for (const r of remotes) {
      if (runGit(["rev-parse", `${r}/${candidate}`], repoDir)) return `${r}/${candidate}`;
    }
  }
  return "main";
}

/**
 * Detects the immediate parent/upstream branch and merge-base for a target branch.
 */
export function detectStackedUpstream(targetBranch: string, repoDir: string, trunkRef?: string): StackedUpstreamInfo {
  const trunk = trunkRef || detectDefaultTrunk(repoDir);
  const trunkBaseName = trunk.replace(/^[^/]+\//, ""); // e.g. "pierre/main" -> "main"

  const targetSha = runGit(["rev-parse", targetBranch], repoDir);
  if (!targetSha) {
    return {
      branch: targetBranch,
      upstream: "(invalid ref)",
      mergeBaseSha: "",
      mergeBaseShort: "-",
      commitsAhead: 0,
      isDirectStackTip: false,
      baseCommitSubject: "Ref does not exist"
    };
  }

  // Trunk branch itself has no upstream
  if (targetBranch === trunk || targetBranch === trunkBaseName) {
    return {
      branch: targetBranch,
      upstream: "(trunk root)",
      mergeBaseSha: targetSha,
      mergeBaseShort: targetSha.slice(0, 8),
      commitsAhead: 0,
      isDirectStackTip: true,
      baseCommitSubject: runGit(["log", "-1", "--format=%s", targetSha], repoDir)
    };
  }

  // 1. Gather candidate ancestor branches via --merged (fast filter)
  const mergedLocal = runGit(["branch", "--merged", targetBranch, "--format=%(refname:short)"], repoDir)
    .split("\n")
    .map(s => s.trim())
    .filter(s => s && s !== targetBranch && s !== `takeover/${targetBranch}`);

  const candidates = new Set<string>(mergedLocal);

  // Always include trunk candidates
  candidates.add(trunk);
  if (trunkBaseName !== trunk && runGit(["rev-parse", trunkBaseName], repoDir)) {
    candidates.add(trunkBaseName);
  }

  interface ScoredCandidate {
    ref: string;
    mergeBase: string;
    distance: number;
    candDistance: number;
    isLocal: boolean;
  }

  const scored: ScoredCandidate[] = [];

  for (const cand of candidates) {
    if (cand === targetBranch) continue;
    const candSha = runGit(["rev-parse", cand], repoDir);
    if (!candSha) continue;

    const mergeBase = runGit(["merge-base", targetBranch, cand], repoDir);
    if (!mergeBase || mergeBase === targetSha) continue;

    const dist = parseInt(runGit(["rev-list", "--count", `${mergeBase}..${targetBranch}`], repoDir), 10);
    if (isNaN(dist) || dist <= 0) continue;

    const candDist = parseInt(runGit(["rev-list", "--count", `${mergeBase}..${cand}`], repoDir), 10) || 0;
    const isLocal = !cand.includes("/");

    scored.push({
      ref: cand,
      mergeBase,
      distance: dist,
      candDistance: candDist,
      isLocal
    });
  }

  // Fallback: If no candidate found via --merged (e.g. branch diverged and trunk moved ahead)
  if (scored.length === 0) {
    const mb = runGit(["merge-base", targetBranch, trunk], repoDir) || runGit(["merge-base", targetBranch, trunkBaseName], repoDir);
    if (mb) {
      const dist = parseInt(runGit(["rev-list", "--count", `${mb}..${targetBranch}`], repoDir), 10) || 0;
      const candDist = parseInt(runGit(["rev-list", "--count", `${mb}..${trunk}`], repoDir), 10) || 0;
      scored.push({
        ref: trunk,
        mergeBase: mb,
        distance: dist,
        candDistance: candDist,
        isLocal: false
      });
    }
  }

  if (scored.length === 0) {
    return {
      branch: targetBranch,
      upstream: "(unknown)",
      mergeBaseSha: "",
      mergeBaseShort: "-",
      commitsAhead: 0,
      isDirectStackTip: false,
      baseCommitSubject: ""
    };
  }

  scored.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (a.candDistance === 0 && b.candDistance !== 0) return -1;
    if (a.candDistance !== 0 && b.candDistance === 0) return 1;
    if (a.isLocal && !b.isLocal) return -1;
    if (!a.isLocal && b.isLocal) return 1;
    return a.candDistance - b.candDistance;
  });

  const best = scored[0];
  const subject = runGit(["log", "-1", "--format=%s", best.mergeBase], repoDir);

  return {
    branch: targetBranch,
    upstream: best.ref,
    mergeBaseSha: best.mergeBase,
    mergeBaseShort: best.mergeBase.slice(0, 8),
    commitsAhead: best.distance,
    isDirectStackTip: best.candDistance === 0,
    baseCommitSubject: subject
  };
}

/**
 * Scans all local branches in the repository and discovers their stacked parent relationships.
 */
export function detectAllBranchStacks(repoDir: string): StackedUpstreamInfo[] {
  const trunk = detectDefaultTrunk(repoDir);
  const localBranches = runGit(["branch", "--format=%(refname:short)"], repoDir)
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  return localBranches.map(branch => detectStackedUpstream(branch, repoDir, trunk));
}

// --- CLI Runner ---
if (process.argv[1] && (process.argv[1].endsWith("detect-branch-stacks.ts") || process.argv[1].endsWith("detect-branch-stacks.js"))) {
  const args = process.argv.slice(2);
  const isJson = args.includes("--json");
  const filteredArgs = args.filter(a => a !== "--json");

  const targetPath = filteredArgs[0] && !filteredArgs[0].startsWith("-") ? path.resolve(filteredArgs[0]) : process.cwd();
  const explicitBranch = filteredArgs[1] || (filteredArgs[0] && !fs.existsSync(path.resolve(filteredArgs[0])) ? filteredArgs[0] : null);

  const realRepoDir = runGit(["rev-parse", "--show-toplevel"], targetPath) || targetPath;

  if (!fs.existsSync(path.join(realRepoDir, ".git")) && !runGit(["rev-parse", "--git-dir"], realRepoDir)) {
    console.error(`Error: "${targetPath}" is not a git repository.`);
    process.exit(1);
  }

  const trunk = detectDefaultTrunk(realRepoDir);

  if (explicitBranch) {
    const info = detectStackedUpstream(explicitBranch, realRepoDir, trunk);
    if (isJson) {
      console.log(JSON.stringify(info, null, 2));
    } else {
      console.log(`
Repository: ${realRepoDir} (Trunk: ${trunk})`);
      console.log(`Branch:     ${info.branch}`);
      console.log(`Upstream:   ${info.upstream} ${info.isDirectStackTip ? "(⚡ direct stack tip)" : ""}`);
      console.log(`Merge-Base: ${info.mergeBaseSha} (${info.mergeBaseShort})`);
      console.log(`Commits:    ${info.commitsAhead} commit(s) ahead of merge-base`);
      console.log(`Base Title: ${info.baseCommitSubject}
`);
    }
  } else {
    const results = detectAllBranchStacks(realRepoDir);
    if (isJson) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(`
Repository: ${realRepoDir} (Trunk: ${trunk})`);
      console.log(`Found ${results.length} local branch(es):
`);
      console.log("| Local Branch | Detected Upstream | Merge-Base | Commits Ahead | Base Commit Subject |");
      console.log("| :--- | :--- | :--- | :---: | :--- |");
      for (const r of results) {
        const flag = r.isDirectStackTip && r.upstream !== "(trunk root)" ? " ⚡" : "";
        console.log(`| \`${r.branch}\` | \`${r.upstream}\`${flag} | \`${r.mergeBaseShort}\` | ${r.commitsAhead} | ${r.baseCommitSubject.slice(0, 48)} |`);
      }
      console.log("");
    }
  }
}
