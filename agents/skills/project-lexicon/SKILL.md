---
name: project-lexicon
description: Define, audit, and guard the project's canonical domain language and conceptual boundaries. Use when establishing a project lexicon, auditing terminology drift or invented vocabulary across code and docs, resolving conceptual divergence between specs, or refactoring deprecated terms.
---

# Project Lexicon: Domain Language & Conceptual Guard

Maintain a razor-sharp, ubiquitous language across the project's code, documentation, schemas, and architectural discussions.

This skill prevents:
1. **Terminology Drift & Accretion**: Different names accumulating over time for the same concept (`turn` vs. `segment` vs. `utterance`).
2. **Invented Vocabulary**: Agents or developers spontaneously generating idiosyncratic, ad-hoc terms for established concepts.
3. **Competing Conceptual Framings**: Stale documentation or schemas preserving obsolete mental models that contradict current architecture.
4. **Synonym Bloat**: Overloaded "allowable synonyms" lists that clutter understanding and weaken precision.

---

## 1. Project Discovery & Configuration

When invoked in a project repository, discover the lexicon file in this order:
1. `docs/TERMS.md`
2. `TERMS.md`
3. `CONTEXT.md`
4. `GLOSSARY.md`
5. If none exists, default to creating `LEXICON.md` at the repository root.

### In-Document Conventions (`LEXICON.md`)
Project-specific audit scopes and rules are declared directly in markdown under `## Scope & Conventions` inside the lexicon file:

```markdown
## Scope & Conventions

- **Audited Paths**: `src/`, `lib/`, `docs/` (ignores `dist/`, `node_modules/`, `fixtures/`)
- **Code Identifiers & Adjectives**: Descriptive prefixes and adjectives (e.g., `is_verified_by_human`, `session_speaker_label`, `speaker_id`) are explicitly encouraged in variable, function, and database identifiers. Truncating, shortening, or omitting root nouns (e.g., shortening `Exemplar Record` to `Record` or `Row`) is strictly avoided.
```

See [LEXICON-FORMAT.md](./LEXICON-FORMAT.md) for the complete format specification and entry rules.

---

## 2. Gating Criteria: What Earns a Spot in the Lexicon?

To prevent suggestion bloat and keep the lexicon focused on high-signal domain boundaries, a candidate concept **must satisfy at least one** of these three criteria:

1. **Boundary Crossing**: The concept spans 2+ architectural layers (e.g., UI labels, database schema, API/events, or core business logic).
2. **Active Divergence / Collision**: Multiple words are actively colliding or being used interchangeably in code or documentation.
3. **Core Domain Entity**: Represents a foundational problem-domain abstraction, not generic software plumbing (rejects terms like `Handler`, `Payload`, `CacheManager`, `Service`).

---

## 3. Two Operating Modes

```
               ┌───────────────────────────────────────┐
               │         project-lexicon skill         │
               └───────────────────┬───────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
[Mode 1: Definition & Alignment]                   [Mode 2: Audit & Sweep]
- Discover & map concepts                          - Behind-the-scenes static ripgrep scan
- Adversarial Pre-Filter (kills fluff)             - Cross-doc conceptual divergence check
- High-level spec coherence analysis               - Generate structured Audit Report Artifact
- Interactive interview with human                 - Guided interactive remediation
- Adversarial Co-Reviewer                          - Batch-refactor code & update docs
- Update `LEXICON.md`                              - Update `LEXICON.md`
```

---

## Mode 1: Definition & Alignment (Interactive Discovery)

Use this mode when establishing a new lexicon, adding concepts after an architectural shift, or reconciling fuzzy boundaries.

### Workflow Steps

1. **Initial Survey**:
   - Inspect existing architecture docs, schemas, and core code files.
   - Extract candidate concepts and compile words currently used for them.

2. **Adversarial Pre-Filter (Subagent)**:
   - Spawn a dedicated `lexicon-adversary` subagent to vet all candidate terms against the 3 Gating Criteria.
   - The subagent ruthlessly rejects low-value implementation helpers, generic programming patterns, and duplicate synonyms *before* presenting anything to the human.

3. **High-Level Conceptual Divergence Analysis**:
   - Compare key documents (e.g., specs, schemas, guides) against each other.
   - Identify contradictory assumptions, lifecycle discrepancies, or obsolete mental models preserved in older text.

4. **Interactive Alignment Session (with Human)**:
   - Present the grounded findings to the user:
     - Identify where concepts conflict or where multiple terms collide.
     - Cite exact doc or code locations.
     - Propose a single, opinionated canonical term and recommended `_Avoid_` list.
     - Ask the user to decide the authoritative path forward.

5. **Adversarial Co-Review (Subagent)**:
   - Before writing down a term, run the draft definition past the `lexicon-adversary` subagent.
   - Ensure definitions state strictly what the concept **is**, not what it does.
   - Ensure distinct adjacent concepts are explicitly separated in prose.

6. **Persist Lexicon**:
   - Write or update `LEXICON.md` following [LEXICON-FORMAT.md](./LEXICON-FORMAT.md).

---

## Mode 2: Audit & Sweep (Static Assist + Refactor Proposal)

Use this mode for pre-milestone commits, post-refactor cleanup, or regular codebase maintenance.

### Workflow Steps

1. **Spawn `lexicon-auditor` Subagent**:
   - The subagent parses `LEXICON.md` to extract all canonical terms and `_Avoid_` lists.
   - Runs static analysis (`ripgrep`) across audited paths to find occurrences of avoided terms and deprecated aliases in code identifiers, comments, and markdown.
   - Compares core specs and guides to detect stale conceptual framings that contradict `LEXICON.md`.
   - **Crucial**: Static analysis runs behind the scenes. Do NOT overwhelm the human with raw regex search dumps.

2. **Generate Audit Report Artifact**:
   Save a structured Markdown report in the conversation artifact directory (`lexicon-audit.md`):
   - **Section A: Conceptual Conflicts & Stale Specs**:
     - Areas where documentation or schemas contradict the current domain model.
     - Concise description of the conflicting statements with markdown file links.
     - Options for user adjudication.
   - **Section B: Lexicon Candidates**:
     - Emerging concepts discovered in code that meet the 3 Gating Criteria and should be formalized.
   - **Section C: Term Misuses & Invented Vocabulary**:
     - Specific occurrences of `_Avoid_` terms in code and docs.
     - Linked file path, line number, snippet, and recommended canonical replacement.

3. **Interactive Remediation**:
   - Walk through Section A with the user to resolve conceptual decisions.
   - Confirm additions to `LEXICON.md` from Section B.
   - For Section C (direct term replacements), present a clear refactoring plan.
   - Execute staged edits across code and documentation using file editing tools.

---

## 4. Subagent Specifications

When running this skill, use `define_subagent` and `invoke_subagent` to spawn these two specialized roles.

### A. `lexicon-adversary` (The Skeptical Principal Reviewer)
* **Role**: Evaluates candidate terms, kills fluff, and stress-tests conceptual boundaries.
* **System Prompt Core**:
  ```text
  You are an adversarial, skeptical Principal Systems Architect specializing in Domain-Driven Design and ubiquitous language.

  Your mission is to prevent suggestion bloat, reject trivial programming terms, and challenge imprecise conceptual boundaries.

  Rules:
  1. Ruthlessly enforce the 3 Gating Criteria: Boundary Crossing, Active Divergence, or Core Domain Entity. If a proposed term is merely an internal helper, a local variable, or generic plumbing (e.g., Handler, Cache, Payload, Manager), REJECT IT with extreme prejudice.
  2. Enforce the "What it IS, not what it DOES" definition rule. Reject procedural or algorithmic definitions.
  3. Delineate boundaries: If a term looks similar to an existing canonical term, demand an explicit prose distinction explaining why they are not the same concept.
  4. Block synonym bloat: Reject proposals that add obvious or generic synonyms.
  5. Check for invented vocabulary: Call out newly coined terms that unnecessarily replace established project terminology.
  ```

### B. `lexicon-auditor` (The Repository & Static Scanner)
* **Role**: Runs behind-the-scenes search and cross-doc coherence checks without flooding the user.
* **System Prompt Core**:
  ```text
  You are a meticulous, read-only Lexicon and Conceptual Coherence Auditor.

  Your mission is to perform static analysis and cross-doc verification to detect terminology misuses, invented vocabulary, and stale conceptual models.

  Instructions:
  1. Read the project's lexicon file (LEXICON.md, TERMS.md, or CONTEXT.md) to extract canonical terms and _Avoid_ lists.
  2. Use ripgrep to scan the audited paths for exact and word-boundary occurrences of avoided terms in code identifiers, comments, and markdown documents.
  3. Filter out false positives (e.g., third-party vendor API signatures, legitimate adjective prefixes allowed by conventions).
  4. Compare core specifications, schemas, and guides. Flag places where older docs describe obsolete workflows or contradictory mental models.
  5. Do NOT modify any files. Synthesize your findings into a clean, structured triage report.
  ```

---

## 5. Summary Checklist Before Ending Turn

- [ ] Existing or default lexicon file identified (`docs/TERMS.md`, `LEXICON.md`, etc.).
- [ ] In-document conventions respected (adjective prefix rules applied, noun truncation avoided).
- [ ] Gating criteria strictly enforced on every new term via `lexicon-adversary`.
- [ ] Conceptual contradictions surfaced to the user with actionable options.
- [ ] Code and doc edits staged cleanly and committed with descriptive, lowercase commit messages.
