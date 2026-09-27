---
name: lexicon
description: Define, review, and audit a project's domain vocabulary across code and documentation. Use when creating or editing a lexicon, glossary, or term list; auditing against a lexicon for drift, invented vocabulary, and deprecated terms; critiquing project vernacular; reconciling conceptual models; or planning naming refactors.
---

# Lexicon

Maintain a small, opinionated vocabulary for concepts humans and agents must understand consistently. Treat terminology disagreements as possible disagreements about the domain model, not merely word choice.

Prevent terminology drift, invented vocabulary, obsolete conceptual framings, and synonym bloat.

## Invariants

- **One term per concept:** Keep one canonical term; reject generic terms and speculative synonyms. Never invent a compromise name that fuses competing alternatives.
- **Evidence-based:** Admit terms grounded in code, documentation, schemas, project history, or relevant external sources.
- **Terminology authority:** The lexicon governs terminology. Ground definitions in established project meaning; do not use entries to introduce or adjudicate architecture, implementation choices, or project status. Surface unresolved domain decisions to the user.
- **Boundaries, not specs:** Include only the facts needed to identify a concept and distinguish easily confused neighbors; do not turn entries into procedures or miniature specifications. Link to authoritative documentation for implementation, operational details, and decision history.
- **User authority:** Let the user adjudicate conceptual conflicts. Never silently pick a winner or reopen explicit decisions.

## Workflows

Select based on user intent (ask if ambiguous):

1. **Lexicon authoring:** Create or expand `LEXICON.md`.
2. **Lexicon audit:** Sweep the codebase against `LEXICON.md` to catch drift, invented vocabulary, and deprecated terms.
3. **Naming critique:** Evaluate the project's current vernacular for clarity and suggest better domain terms.

### 1. Lexicon authoring
- **Load:** Locate and read the entire authoritative lexicon. Check `LEXICON.md`, `TERMS.md`, `GLOSSARY.md`, `CONTEXT.md`, and relevant `README.md` sections; report overlaps and ask if authority is unclear. Default new lexicons to root `LEXICON.md`.
- **Survey:** Use 2+ parallel read-only subagents to extract domain terms from (a) specs/docs, (b) schemas/APIs/public types, and (c) conceptual conflicts affecting terminology. Require each candidate to state the terminology problem and exact evidence locations, not raw search dumps.
- **Resolve:** Run the [Review and resolution procedure](#review-and-resolution-procedure).
- **Link:** Reference the lexicon in `AGENTS.md` when newly created.

### 2. Lexicon audit
- **Load standard:** Read canonical terms, implementation references, and `_Avoid_` entries.
- **Scan:** Use 2+ parallel subagents to search for avoided terms, canonical misuse, new or invented vocabulary, and conceptual conflicts. Exclude generated/vendored files.
- **Check safety:** Deduplicate and inspect replacements for legitimate multi-domain uses, compound identifiers, third-party interfaces, serialized strings, logs, fixtures, and compatibility surfaces. Treat any ambiguous occurrence as a semantic question, not a mechanical replacement; surface uncertain exclusions and classify clear violations by safety tier.
- **Resolve:** Run the Review and resolution procedure.
- **Apply and verify:** Apply only approved fixes, verify per their safety tier, and summarize what changed and what remains open.

### 3. Naming critique
- **Load vernacular:** Read the existing lexicon; if none exists, infer current usage from the request and authoritative project sources.
- **Survey:** Reuse the authoring survey or audit scan if run together; otherwise use 2+ parallel subagents across specs, schemas, and core code.
- **Inspect:** Flag misleading, overloaded, inconsistent, idiosyncratic, or nonparallel names, including multiple names for one idea and one name for multiple ideas. Distinguish genuine conceptual issues from harmless prose variation.
- **Resolve:** Run the Review and resolution procedure. Treat findings as naming improvements, not lexicon changes, unless the concept independently passes admission rules *and* the user asked for lexicon edits.

## Term admission rules

Admit a term when its entry resolves an evidenced ambiguity in naming or meaning, or explains a project-specific distinction readers need to use the term correctly.

For each candidate, answer: **What naming or interpretation error does this entry prevent?** State the terminology problem and its evidence, including for candidates found during audits or naming critiques. Do not invent competing names to justify an entry.

Prominence, frequency, and architectural importance are insufficient. Reject entries that merely identify a project or technology, repeat a standard definition, or document implementation or project history.

## Review and resolution procedure

1. **Classify findings by next action:**
   - **Add to the lexicon:** Clear concept passing admission rules.
   - **Discuss with the user:** Drift, competing names, boundary conflicts, or ambiguous uses.
   - **Propose a project edit:** Naming improvement or unambiguous lexicon violation.
   - **Discard:** Fails admission rules or irrelevant match.
2. **Challenge consequential findings:** For authoring additions, audit mechanical replacements, and close boundary distinctions, invoke a fresh skeptical subagent with candidates and evidence (no advocacy). Incorporate objections before proceeding.
3. **Write accepted terms:** Add **Add to the lexicon** terms immediately; notify user with a concise list.
4. **Resolve questions:** Present **Discuss with the user** items as questions on boundaries and meaning. Retain replaced canonical terms under `_Avoid_`.
5. **Propose project edits:** For naming critiques, present the smallest high-value replacements. For audits, batch fixes by term and report the replacement direction, count, ambiguity-check result, safety tier, and representative locations. Apply only user-approved changes.

## Change safety tiers

- **Tier 1 (Prose & local):** Prose, comments, unexported identifiers.
- **Tier 2 (Structural):** Shared types, interfaces, cross-module signatures. Requires explicit approval + typecheck/test.
- **Tier 3 (Compatibility-sensitive):** Persisted schemas, public APIs, wire contracts, CLI flags, serialized data, logs. Requires migration/compatibility plan.

A term's highest-risk occurrence dictates its approval tier. Never treat mixed-risk terms as mechanical.

## Lexicon format

Use this shape when creating or materially restructuring a lexicon. Preserve an existing format when it carries the same semantics.

```markdown
# Project Lexicon

The canonical domain language for this project and the conceptual boundaries those terms represent.

## <Domain or subsystem>

### Canonical Term

One or two sentences stating what the concept is and its boundary or lifecycle role.
"Not to be confused with X; X differs because ..."

* _Reference_: `src/types.ts#CanonicalTerm` (stable public type, table, or API contract)
* _AKA_: External Term — used by Specific Standard or Upstream Project
* _Avoid_: DeprecatedTerm — superseded in PR #123
```

- **Scope:** Canonical compound nouns for exported, persisted, public, and wire identifiers; concise names and descriptive modifiers (`activeUser`, `userId`) allowed in unambiguous local scope.
- **AKA restraint:** Only list alternatives used by an external source (standard, paper, upstream library). Exclude English synonyms and competing internal names.
- **Avoid restraint:** Only list evidenced deprecated names or alternatives explicitly rejected by the user for this concept; retain them after cleanup. Replacing a technology or component does not by itself make its name a deprecated synonym.
- Omit metadata bullets (`_Reference_`, `_AKA_`, `_Avoid_`) when not applicable.
