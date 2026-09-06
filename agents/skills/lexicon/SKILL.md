---
name: lexicon
description: Define, review, and audit a project's domain vocabulary across code and documentation. Use when creating or editing a lexicon, glossary, ubiquitous language, or term list; evaluating terminology across a project for clarity; reconciling competing terminology or conceptual models; checking terminology drift or invented vocabulary; or planning deprecated-term refactors.
---

# Lexicon

Maintain a small, opinionated vocabulary for concepts that humans and agents must understand consistently. Treat terminology disagreements as possible disagreements about the domain model, not merely word choice.

## Invariants

- Keep one canonical term per concept; reject generic software terms and speculative synonyms.
- Admit a term only when grounded in code, documentation, schemas, history, or a relevant external source.
- Define what a concept is and distinguish easily confused neighbors; do not turn entries into procedures or miniature specifications.
- Let the user adjudicate conceptual conflicts. Challenge ambiguity, but never silently choose which source is authoritative or reopen an explicit decision.

## Choose the workflow

The skill has three primary workflows:

- **Lexicon authoring:** create or extend a lexicon.
- **Focused terminology review:** review and improve terminology.
- **Terminology audit:** compare the repository's current language with an existing lexicon and identify drift, violations, and new conflicts.

Infer the workflow when the request makes it clear. If more than one workflow is plausible, ask the user which outcome they want before surveying or editing.

## Locate any existing lexicon

Look for any existing glossary of terms. eg `LEXICON.md`, `TERMS.md`, `GLOSSARY.md`, or `CONTEXT.md` in the repo, or a substantial Glossary, Terms, Vocabulary, or Domain Language section in `README.md`, etc.

If multiple candidates contain substantive terminology, report the overlap and ask which is authoritative. If none exists, use `LEXICON.md` at the repository root.

Read the entire lexicon file before proposing or applying changes.

## Term admission rules

A candidate earns an entry when either condition holds:

1. **Terminology drift:** two or more terms are already used for the same concept; or
2. **Shared domain concept:** the concept is both used across at least two architectural layers or subsystems and central to the problem domain rather than a generic implementation detail.

Reject candidates that satisfy neither condition. Frequency alone is not evidence that a term belongs in the lexicon.

## Review and resolution procedure

Run this procedure on findings from Lexicon authoring, a Focused terminology review, or a Terminology audit.

1. **Partition the findings.** Apply the admission rule to new terms, then separate:
   - **Accepted lexicon candidates:** one name and meaning are consistent across sources, boundaries are clear, and a lexicon update is in scope.
   - **Local terminology improvements:** clearer terms for a file that do not need a canonical lexicon entry.
   - **Candidates requiring a decision:** terms with terminology drift, narrow semantic boundaries, conflicting sources, multiple plausible names, or a substantive reviewer objection.
   - **Nonconforming occurrences:** findings from a Terminology audit that violate an existing canonical decision without introducing semantic ambiguity.
   - **Rejected or irrelevant matches:** candidates that fail admission or matches that do not describe the canonical concept.
2. **Challenge consequential findings.** For repository-wide Lexicon authoring and Terminology audits, give a fresh skeptical subagent proposed lexicon additions or changes, close conceptual distinctions, and replacements classified as mechanical. This review is required when the batch contains any such finding. For a Focused terminology review, require it only when a proposed change affects canonical vocabulary or has an ambiguous boundary. Provide only the findings, evidence, and source locations—not the main agent's advocacy or intended decision. Ask the reviewer to challenge domain importance, boundary clarity, invented vocabulary, synonym padding, and mechanical-replacement claims. Incorporate substantive objections into the classifications before proceeding.
3. **Write accepted lexicon candidates.** Add accepted lexicon candidates immediately, then tell the user what was added in a concise bulleted list.
4. **Propose local improvements.** For a Focused terminology review, present the smallest high-value replacements, distinguish genuine problems from harmless prose variation, and apply only user-approved edits to the file.
5. **Resolve candidates requiring a decision.** Present conceptual conflicts as questions for the user rather than choosing silently. Focus the discussion on boundaries and meaning, then update the lexicon or reviewed file as each decision resolves. When renaming a canonical concept, retain the old evidenced name under `_Avoid_`.
6. **Prepare fixes.** For a Terminology audit, batch nonconforming occurrences by term and show the replacement direction, count, outcome of the ambiguous-use check, safety tier, and representative locations. Obtain approval per term.

## Lexicon authoring

Use Lexicon authoring to bootstrap a lexicon or intentionally extend its documented domain vocabulary.

1. **Discover and load.** Locate and read any authoritative lexicon.
2. **Delegate the survey.** Treat a task as exempt only when the user explicitly scopes it to one known concept or a small named set of files. For every other repository-wide or multi-subsystem task, **use two or more parallel read-only subagents**. This is required; do not substitute serial inspection in the main context. If delegation is exempted or unavailable, state why before surveying. Assign separate passes for:
   - domain docs and top-level specifications;
   - schemas, migrations, public types, APIs, and recurring domain nouns; and
   - conceptual conflicts in ownership, boundaries, states, or lifecycles across documents.
   Require structured candidates with exact evidence locations, not raw file dumps.
3. **Review and resolve.** Run the Review and resolution procedure on the survey findings.
4. **Connect the lexicon.** When establishing a dedicated lexicon, add a concise reference to it from `AGENTS.md`.

## Focused terminology review

Use a Focused terminology review to improve the vocabulary of a file without assuming every naming improvement belongs in the project lexicon.

1. **Load the file.** Read the complete file and any existing lexicon entries or authoritative sources relevant to its concepts.
2. **Inspect the terminology.** Identify misleading, overloaded, inconsistent, or idiosyncratic terms; multiple names for one idea; one name covering multiple ideas; and nonparallel category names. Distinguish genuine conceptual problems from harmless prose variation.
3. **Review and resolve.** Run the Review and resolution procedure. Treat proposed replacements as local terminology improvements unless the concept independently passes the admission rule and updating the lexicon is in scope.

## Terminology audit

Use a Terminology audit periodically to find and reconcile terminology drift. Expect both straightforward conformance fixes and new semantic questions requiring human decisions.

1. **Load the standard.** Read the lexicon's canonical terms, `_Avoid_` entries, and implementation references.
2. **Delegate the scan.** For every repository-wide audit, **use two or more parallel read-only subagents**. This is required; do not perform the full audit solely in the main context. Tell each subagent to read the full lexicon, split the work into avoided-term usage, canonical misuse, new candidates, and conceptual conflicts, and require classified findings with locations rather than raw search output. If subagents are unavailable, disclose that before scanning and perform visibly separate local passes.
3. **Classify and check for ambiguous uses.** Deduplicate results and assign a safety tier. Exclude generated, vendored, fixture, and compatibility surfaces as appropriate; surface uncertain exclusions rather than assuming. Inspect every proposed replacement for legitimate uses in other domains, compound identifiers, third-party interfaces, serialized strings, logs, and fixtures. Any ambiguous occurrence makes the term a semantic question rather than a mechanical replacement.
4. **Review and resolve.** Run the Review and resolution procedure on all classified findings.
5. **Apply and verify.** Default to proposing a diff or edit list. Apply only approved fixes, verify them according to their tier, and summarize what changed and what remains open. Create a dated report only when requested or already conventional in the project.

## Change safety tiers

- **Tier 1 — prose and local:** Apply approved changes to prose, comments, and unexported local identifiers; run focused checks when useful.
- **Tier 2 — structural:** Change shared types, interfaces, signatures, and cross-module identifiers only with explicit approval; then typecheck and test.
- **Tier 3 — compatibility-sensitive:** Do not automatically rename database identifiers, migrations, public APIs, wire fields, events, serialized or persisted values, CLI flags, telemetry contracts, or externally consumed logs. Produce a migration or compatibility plan.

The highest-risk occurrence of a term determines how broadly it can be approved. Never treat a mixed-risk term as one mechanical replacement.

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

* _Reference_: `src/domain/types.ts#CanonicalTerm`
* _AKA_: External Term — used by Specific Standard or Upstream Project
* _Avoid_: OldTerm — deprecated in PR #123
```

Use H3 headings to delimit entries. Use domain sections only when they aid navigation, and omit metadata bullets that have no value.

### Entry rules

- **Canonical term:** Use one short domain noun or noun phrase. Do not join competing alternatives into a compromise name.
- **Definition:** Prefer one or two sentences describing what the concept is, including an essential lifecycle role or boundary. Explicitly distinguish a neighboring concept when confusion is likely.
- **Reference:** Add an implementation reference only for a stable public type, interface, schema entity, persistence table, or API contract; omit it when none exists.
- **AKA:** Include only when an external paper, standard, upstream library, or other source used by project readers employs the alternative. Name the source; exclude obvious English synonyms and competing internal names.
- **Avoid:** Include only deprecated names with demonstrated prior use or alternatives explicitly rejected by the user. Cite a durable source when practical, and retain the name after cleanup to prevent reintroduction.

### Identifier scope

Enforce canonical compound nouns in exported, persisted, public, and wire identifiers. Permit concise names in an unambiguous local scope and descriptive modifiers such as `activeSpeakerProfile`, `speakerProfileId`, or `isVerifiedExemplar`.
