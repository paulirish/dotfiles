---
name: lexicon
description: Define and audit a project's canonical domain vocabulary across code and documentation. Use when creating or editing a lexicon, glossary, ubiquitous language, or term list; reconciling competing terminology or conceptual models; checking terminology drift or invented vocabulary; or planning deprecated-term refactors.
---

# Lexicon

Maintain a small, opinionated vocabulary for concepts that humans and agents must understand consistently. Treat terminology disagreements as possible disagreements about the domain model, not merely word choice.

## Invariants

- Keep one canonical term per concept; reject generic software terms and speculative synonyms.
- Admit a term only when grounded in code, documentation, schemas, history, or a relevant external source.
- Define what a concept is and distinguish easily confused neighbors; do not turn entries into procedures or miniature specifications.
- Let the user adjudicate conceptual conflicts. Challenge ambiguity, but never silently choose an authority or reopen an explicit decision.

## Locate any existing lexicon

Look for any existing glossary of terms. eg `LEXICON.md`, `TERMS.md`, `GLOSSARY.md`, or `CONTEXT.md` in the repo, or a substantial Glossary, Terms, Vocabulary, or Domain Language section in `README.md`, etc.

If multiple candidates contain substantive terminology, report the overlap and ask which is authoritative. If none exists, use `LEXICON.md` at the repository root.

Read the entire lexicon file before proposing or applying changes.

## Admit terms sparingly

A candidate earns an entry when either condition holds:

1. **Active divergence:** two or more terms are already used for the same concept; or
2. **Boundary-crossing domain concept:** the concept is both present across at least two meaningful layers and central to the problem domain rather than generic plumbing.

Reject candidates that satisfy neither condition. Frequency alone is not evidence that a term belongs in the lexicon.

## Shared canonicalization workflow

Run this workflow on findings from either Definition mode or a Recurring Sweep.

1. **Gate and challenge.** Apply the admission rule to new terms. Before presenting any findings, **give the batch to a fresh skeptical subagent**. Independent review is mandatory whenever there is something to present. Provide only the candidates or classifications, evidence, and source locations—not the main agent's advocacy or intended decision. Ask it to challenge domain importance, boundary clarity, invented vocabulary, synonym padding, and claims that a replacement is mechanical. Do not proceed until review completes. Skip only when there are no findings or subagents are unavailable; disclose the reason.
2. **Partition the findings.** Separate:
   - **Settled entries:** one name and meaning are consistent across sources, boundaries are clear, and the reviewer raises no substantive objection.
   - **Decision queue:** terms with active divergence, narrow semantic boundaries, conflicting sources, multiple plausible names, or a substantive reviewer objection.
   - **Conformance changes:** recurring-sweep findings that violate an existing canonical decision without introducing semantic ambiguity.
   - **Rejected or irrelevant findings:** candidates that fail admission or matches that do not describe the canonical concept.
3. **Write settled entries.** Add settled entries to the lexicon immediately, then tell the user what was added in a concise bulleted list.
4. **Resolve the decision queue.** Present conceptual conflicts as questions for the user rather than choosing silently. Focus the discussion on boundaries and meaning, then update the lexicon as each decision resolves. When renaming a concept, retain the old evidenced name under `_Avoid_`.
5. **Prepare conformance changes.** For a Recurring Sweep, batch changes by token and show the replacement direction, count, collision result, safety tier, and representative locations. Obtain approval per token.

## Definition mode

Use Definition mode to bootstrap a lexicon or intentionally extend its domain model.

1. **Discover and load.** Locate and read any authoritative lexicon.
2. **Delegate the survey.** Treat a task as exempt only when the user explicitly scopes it to one known concept or a small named set of files. For every other repository-wide or multi-subsystem task, **use two or more parallel read-only subagents**. This is required; do not substitute serial inspection in the main context. If delegation is exempted or unavailable, state why before surveying. Assign separate passes for:
   - domain docs and top-level specifications;
   - schemas, migrations, public types, APIs, and recurring domain nouns; and
   - conflicts in ownership, boundaries, states, or lifecycles across documents.
   Require structured candidates with exact evidence locations, not raw file dumps.
3. **Canonicalize.** Run the shared canonicalization workflow on the survey findings.
4. **Connect the lexicon.** When establishing a dedicated lexicon, add a concise reference to it from `AGENTS.md`.

## Recurring Sweep

Use a Recurring Sweep periodically to find and reconcile terminology drift. Expect both straightforward conformance fixes and new semantic questions requiring human decisions.

1. **Load the standard.** Read the lexicon's canonical terms, `_Avoid_` entries, and implementation anchors.
2. **Delegate the scan.** For every repository-wide sweep, **use two or more parallel read-only subagents**. This is required; do not perform the full sweep solely in the main context. Tell each subagent to read the full lexicon, split the work into avoid-term usage, canonical misuse, new candidates, and conceptual divergence, and require classified findings with locations rather than raw search output. If subagents are unavailable, disclose that before scanning and perform visibly separate local passes.
3. **Classify and collision-check.** Deduplicate results and assign a safety tier. Exclude generated, vendored, fixture, and compatibility surfaces as appropriate; surface uncertain exclusions rather than assuming. Inspect every proposed replacement for legitimate uses in other domains, compound identifiers, third-party interfaces, serialized strings, logs, and fixtures. Any collision makes the token a semantic question rather than a mechanical replacement.
4. **Canonicalize.** Run the shared canonicalization workflow on all classified findings.
5. **Apply and verify.** Default to proposing a diff or edit list. Apply only approved conformance changes, verify them according to their tier, and summarize what changed and what remains open. Create a dated report only when requested or already conventional in the project.

## Change safety

- **Tier 1 — prose and local:** Apply approved changes to prose, comments, and unexported local identifiers; run focused checks when useful.
- **Tier 2 — structural:** Change shared types, interfaces, signatures, and cross-module identifiers only with explicit approval; then typecheck and test.
- **Tier 3 — compatibility-sensitive:** Do not automatically rename database identifiers, migrations, public APIs, wire fields, events, serialized or persisted values, CLI flags, telemetry contracts, or externally consumed logs. Produce a migration or compatibility plan.

The highest-risk occurrence of a token determines how broadly it can be approved. Never treat a mixed-risk token as one mechanical replacement.

## Lexicon file format

Use this shape when creating or materially restructuring a lexicon. Preserve an existing project format when it carries the same semantics.

```markdown
# Project Lexicon

The canonical domain language for this project and the conceptual boundaries
those terms represent.

## <Domain or subsystem>

### Canonical Term

One or two sentences stating what the concept is and its essential boundary or
lifecycle role. If needed: "Not to be confused with X; X differs because ..."

* _Impl anchor_: `src/domain/types.ts#CanonicalTerm`
* _AKA_: External Term — used by Specific Standard or Upstream Project
* _Avoid_: OldTerm — deprecated in PR #123
```

Use H3 headings to delimit entries. Use domain sections only when they aid navigation, and omit metadata bullets that have no value.

### Entry rules

- **Canonical term:** Use one short domain noun or noun phrase. Do not join competing alternatives into a compromise name.
- **Definition:** Prefer one or two sentences describing what the concept is, including an essential lifecycle role or boundary. Explicitly distinguish a neighboring concept when confusion is likely.
- **Impl anchor:** Point only to a stable public type, interface, schema entity, persistence table, or API contract; omit it when none exists.
- **AKA:** Include only when an external paper, standard, upstream library, or other source used by project readers employs the alternative. Name the source; exclude obvious English synonyms and competing internal names.
- **Avoid:** Include only deprecated names with demonstrated prior use or alternatives explicitly rejected by the user. Cite a durable source when practical, and retain the name after cleanup to prevent reintroduction.

### Identifier scope

Enforce canonical compound nouns in exported, persisted, public, and wire identifiers. Permit concise names in an unambiguous local scope and descriptive modifiers such as `activeSpeakerProfile`, `speakerProfileId`, or `isVerifiedExemplar`.
