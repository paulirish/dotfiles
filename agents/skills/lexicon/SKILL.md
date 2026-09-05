---
name: lexicon
description: Define, refine, audit, and guard a project's canonical domain language and conceptual boundaries. Use when establishing or extending a lexicon, glossary, ubiquitous language, or term list; reconciling competing conceptual framings across docs; auditing terminology drift or invented vocabulary in code and markdown; refactoring deprecated terms; or working directly with a TERMS.md, GLOSSARY.md, LEXICON.md, or CONTEXT.md file.
---

# Lexicon

Maintain a small, opinionated vocabulary for the concepts that humans and agents must understand consistently across the project. Treat terminology disagreements as possible disagreements about the underlying domain model, not merely word-choice problems.

Do not generate a broad glossary. Resist speculative synonyms, generic software terms, and entries that do not prevent a demonstrated misunderstanding.

## Core rules

- Keep one canonical term per concept.
- Define what a concept **is** and its essential boundary or lifecycle role, not a procedure for operating it.
- Distinguish adjacent concepts explicitly when readers could confuse them.
- Ground proposals in code, documentation, schemas, history, or an external source the project actually uses.
- Preserve explicit human decisions. Challenge ambiguous definitions, but do not silently override adjudicated terminology.
- Treat static search as evidence to classify, not as a replacement for semantic judgment.
- Show the user filtered findings and exact supporting locations, not raw search dumps.

## Choose a mode

Use **definition mode** to create or extend the lexicon, resolve competing terms, or reconcile conflicting conceptual models.

Use **audit mode** to find deprecated vocabulary, canonical-term misuse, emerging concepts, or stale mental models across the repository.

When an audit finds questions requiring domain judgment, collect them and run them through definition mode as one batch after the scan.

## Discover the lexicon

Honor a path explicitly named by the user or repository instructions. Otherwise inspect, in order:

1. `LEXICON.md`, `TERMS.md`, `GLOSSARY.md`, or `CONTEXT.md` at the repository root.
2. The same filenames under `docs/`.
3. A substantial Glossary, Terms, Vocabulary, or Domain Language section in `README.md` or the primary agent-instructions file.

If multiple candidates contain substantive terminology, do not silently choose one. Report the overlap or conflict and ask which is authoritative. If none exists, use `LEXICON.md` at the repository root. If an embedded glossary grows beyond roughly ten entries, propose extracting it to a dedicated file.

Read the entire lexicon before proposing or applying changes, including its project-specific audit guidance. When creating or restructuring one, follow [lexicon-file-format.md](./lexicon-file-format.md).

## Admit terms sparingly

A candidate earns an entry when either condition holds:

1. **Active divergence:** two or more terms are already used for the same concept in code or documentation; or
2. **Boundary-crossing domain concept:** the concept is both:
   - present across at least two meaningful layers, such as UI, persistence, API, domain logic, or project documentation; and
   - central to the problem domain rather than generic software plumbing.

Reject candidates that satisfy neither condition. `Handler`, `Payload`, `Manager`, `Service`, and similar implementation vocabulary do not belong unless the project gives them a specific domain meaning.

## Definition mode

1. **Discover and load.** Locate the authoritative lexicon and read its audit guidance.
2. **Survey high-signal sources.** Inspect domain documentation, top-level specifications, schemas, migrations, public types, and API contracts. Avoid exhaustive reading of utility code unless evidence points there.
3. **Separate three kinds of evidence.** Collect:
   - recurring domain concepts and their representative anchors;
   - competing words used for apparently identical concepts; and
   - documents that encode conflicting ownership, boundaries, states, or lifecycles.
4. **Apply the admission rule.** Drop candidates that do not meet the criteria above.
5. **Run a skeptical review.** Test every survivor for domain importance, boundary clarity, invented vocabulary, synonym padding, and unsupported assumptions. Require a reason for accepting each term; do not use a numerical rejection quota.
6. **Present grounded proposals.** For each surviving term, show a concise definition, collision risks, exact evidence locations, and a recommended canonical name. Present conceptual conflicts as questions for human adjudication rather than choosing silently.
7. **Persist confirmed decisions.** Update the lexicon only after the user resolves substantive domain questions. When renaming a concept, retain the old, evidenced name in the canonical entry's `_Avoid_` field.

For a large repository, use independent subagents when available to keep raw source volume out of the main context. Assign distinct, read-only scopes such as documentation, code/schema contracts, and cross-document divergence; ask for structured findings with locations. Give a separate skeptical reviewer only the candidates and their evidence, without advocacy or an intended answer. If subagents are unavailable, perform the same passes locally and keep the outputs separated.

## Audit mode

1. **Load scope and rules.** Read the full lexicon, including exclusions, audited paths, canonical terms, implementation anchors, and `_Avoid_` entries.
2. **Scan tracked code and markdown.** Search for:
   - avoided terms;
   - canonical terms used for neighboring concepts;
   - unrecorded candidates that meet the admission rule; and
   - conceptual divergence among current specifications, schemas, and guides.
3. **Classify before reporting.** Deduplicate findings, inspect surrounding context, honor generated/fixture/vendor exclusions, and separate mechanical candidates from judgment calls.
4. **Collision-scan every proposed replacement.** Search for legitimate uses of the same token in other domains, compound identifiers, third-party interfaces, serialized strings, logs, and fixtures. If any use makes a global replacement unsafe, classify the token as a judgment call.
5. **Run skeptical review.** Challenge both terminology proposals and claims that a replacement is mechanical.
6. **Batch review by token.** For each proposed replacement, show the direction, total count, collision result, safety tier, and representative locations. Obtain approval per token; never treat approval of one example as approval for a heterogeneous batch.
7. **Resolve semantic questions.** Route new concepts, canonical misuse, and conflicting mental models through definition mode in one batch.
8. **Apply only approved changes.** Default to proposing a diff or edit list. Make changes only within the user's authorized scope and verify them in proportion to their safety tier.
9. **Summarize.** Report what was found, approved, changed, verified, and left open. Create a dated repository report only when the user requests one or the project already has that convention.

For broad audits, use independent read-only subagents when available. Split work by axis—avoid-term search, canonical misuse, new candidates, and conceptual divergence—and give each worker the full lexicon plus relevant audit guidance. Keep raw search results inside the worker context and consolidate only classified findings.

## Change safety tiers

- **Tier 1 — prose and local:** Markdown prose, comments, tests that assert only internal wording, and unexported local identifiers. Apply approved edits and run focused checks where useful.
- **Tier 2 — structural:** Exported types, shared internal interfaces, function signatures, and identifiers with cross-module consumers. Apply only after explicit approval, then run typechecking and relevant tests.
- **Tier 3 — compatibility-sensitive:** Database identifiers, migrations, wire payloads, public APIs, event names, serialized JSON, persisted values, CLI flags, telemetry contracts, or externally consumed log strings. Do not perform an automatic rename. Produce a migration or compatibility plan for human review.

A token's highest-risk occurrence determines how broadly it can be approved. Mixed-risk tokens cannot be treated as a single mechanical replacement.

## Evidence rules

- Add `_AKA_` only when an external paper, standard, upstream library, or other source used by project readers employs that alternative. Name the source.
- Add `_Avoid_` only for a term with demonstrated prior use or an explicit human rejection. Cite a durable source when practical, such as a file location, issue, PR, or commit.
- Keep deprecated terms in `_Avoid_` after cleanup so future contributors do not reintroduce them.
- Use `_Impl anchor_` only for canonical boundary symbols or persistence entities, not incidental helpers.
- Allow concise local variable names in unambiguous lexical scopes. Enforce canonical compound nouns at exported, persisted, or wire boundaries.
- Allow descriptive state modifiers and adjective prefixes; do not mistake them for competing canonical nouns.

## Repository integration

When establishing a dedicated lexicon, recommend a concise pointer from the repository's primary agent-instructions file. Add it only when that file is within the requested edit scope. Do not create instructions for every supported agent brand or duplicate the full lexicon there.

## Anti-patterns

- Padding the lexicon with obvious or speculative synonyms.
- Adding a term merely because it appears frequently.
- Treating a word-level mismatch as proof that two concepts are identical.
- Defining procedures, implementation plans, or generic architecture in term entries.
- Adding unsupported `_Avoid_` entries for words nobody has used or rejected.
- Calling a replacement mechanical without a repository-wide collision scan.
- Replacing database, wire, persisted, or public identifiers in place.
- Showing the user unclassified `ripgrep` output.
- Pausing an audit for each semantic question instead of batching them.
- Silently choosing which of two conflicting documents is authoritative.
- Forcing a commit, report file, or agent-instructions edit that the user did not request.

## Completion check

Before finishing, verify that:

- the authoritative lexicon and audit scope are identified;
- every proposed term passes the admission rule;
- definitions separate easily confused concepts;
- aliases and avoided terms have evidence;
- every replacement has a collision scan and safety tier;
- human decisions are recorded without reopening settled choices;
- applied Tier 1 or Tier 2 changes have appropriate verification; and
- Tier 3 changes remain plans rather than automatic renames.
