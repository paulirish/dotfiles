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
- Classify search evidence before presenting it. Show useful findings with locations, not raw search dumps.

## Locate the lexicon

Honor a path named by the user or repository instructions. Otherwise inspect, in order:

1. `LEXICON.md`, `TERMS.md`, `GLOSSARY.md`, or `CONTEXT.md` at the repository root.
2. The same filenames under `docs/`.
3. A substantial Glossary, Terms, Vocabulary, or Domain Language section in `README.md` or the primary agent-instructions file.

If multiple candidates contain substantive terminology, report the overlap and ask which is authoritative. If none exists, use `LEXICON.md` at the repository root. Propose extracting an embedded glossary when it grows beyond roughly ten entries.

Read the entire lexicon, including its project-specific audit guidance, before proposing or applying changes.

## Admit terms sparingly

A candidate earns an entry when either condition holds:

1. **Active divergence:** two or more terms are already used for the same concept; or
2. **Boundary-crossing domain concept:** the concept is both present across at least two meaningful layers and central to the problem domain rather than generic plumbing.

Reject candidates that satisfy neither condition. Frequency alone is not evidence that a term belongs in the lexicon.

## Definition mode

1. **Discover and load.** Locate the authoritative lexicon and read its audit guidance.
2. **Delegate the survey.** For any repository-wide or multi-subsystem task, use parallel read-only subagents by default; do not scan the repository serially in the main context. Skip delegation only when the relevant surface is clearly small or subagents are unavailable. Assign separate passes for:
   - domain docs and top-level specifications;
   - schemas, migrations, public types, APIs, and recurring domain nouns; and
   - conflicts in ownership, boundaries, states, or lifecycles across documents.
   Require structured candidates with exact evidence locations, not raw file dumps.
3. **Gate and challenge.** Apply the admission rule. For a large or ambiguous candidate set, give an independent skeptical subagent only the candidates and their evidence; ask it to challenge domain importance, boundary clarity, invented vocabulary, and synonym padding.
4. **Adjudicate.** Present surviving terms with concise definitions, collision risks, evidence, and a recommended canonical name. Present conceptual conflicts as questions for the user rather than choosing silently.
5. **Persist.** Record confirmed decisions. When renaming a concept, retain the old evidenced name under `_Avoid_`. When establishing a dedicated lexicon, recommend a concise link from the primary agent-instructions file, but edit that file only when it is in scope.

## Audit mode

1. **Load scope and rules.** Read the lexicon's canonical terms, `_Avoid_` entries, implementation anchors, audited paths, and exceptions.
2. **Delegate the scan.** For every repository-wide audit, use parallel read-only subagents by default; do not perform the full sweep solely in the main context unless subagents are unavailable. Give each subagent the lexicon and audit guidance, split the work into avoid-term usage, canonical misuse, new candidates, and conceptual divergence, and require classified findings with locations rather than raw search output.
3. **Classify and collision-check.** Deduplicate results; exclude generated, fixture, and vendor cases as directed; assign a safety tier; and inspect every proposed replacement for legitimate uses in other domains, compound identifiers, third-party interfaces, serialized strings, logs, and fixtures. Any collision makes the token a judgment call rather than a mechanical replacement.
4. **Review and adjudicate.** Skeptically review the classifications. Batch findings by token and show replacement direction, count, collision result, tier, and representative locations. Obtain approval per token. Route new concepts and conflicting models through definition mode as one batch.
5. **Apply and verify.** Default to proposing a diff or edit list. Apply only approved changes, verify them according to their tier, and summarize what changed and what remains open. Create a dated report only when requested or already conventional in the project.

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

## Audit Guidance

- **Audited paths:** `src/`, `lib/`, `docs/`
- **Excluded paths:** generated output, vendored sources, and frozen fixtures
- **Project rules:** note intentional vocabulary exceptions and required cross-checks

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

Keep project-specific scan paths, exclusions, intentional vocabulary exceptions, and required document cross-checks under `## Audit Guidance`.
