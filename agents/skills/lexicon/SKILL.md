---
name: lexicon
description: Define, review, and audit a project's domain vocabulary across code and documentation. Use when creating or editing a lexicon, glossary, or term list; critiquing project vernacular; auditing against a lexicon for drift and deprecated terms; reconciling conceptual models; or planning naming refactors.
---

# Lexicon

Maintain a small, opinionated vocabulary for concepts humans and agents must understand consistently.

This skill prevents:
1. **Terminology drift & accretion:** Different names accumulating over time for the same concept.
2. **Invented vocabulary:** Spontaneously generating idiosyncratic, ad-hoc terms for established concepts.
3. **Competing conceptual framings:** Stale docs or schemas preserving obsolete mental models that contradict current architecture.
4. **Synonym bloat:** Overloaded "allowable synonyms" lists that weaken domain precision.

## Invariants

- **One term per concept:** Keep one canonical term; reject generic terms and speculative synonyms.
- **Evidence-based:** Admit terms grounded in code, documentation, schemas, or authoritative standards.
- **Boundaries, not specs:** Define what a concept is and distinguish neighbors; avoid procedural specs.
- **User authority:** Let the user adjudicate conceptual conflicts. Never silently pick a winner or reopen explicit decisions.

## Workflows

Select based on user intent (ask if ambiguous):

1. **Lexicon authoring:** Create or expand `LEXICON.md`.
2. **Naming critique:** Evaluate the project's current vernacular for clarity and suggest better domain terms.
3. **Lexicon audit:** Sweep the codebase against `LEXICON.md` to catch drift, violations, and deprecated terms.

### 1. Lexicon authoring
- **Load:** Read existing `LEXICON.md`, `GLOSSARY.md`, or relevant `README.md` sections (default to repo root `LEXICON.md`). Report overlaps and ask if authority is unclear.
- **Survey:** Use 2+ parallel read-only subagents to extract domain terms from (a) specs/docs, (b) schemas/APIs/public types, and (c) conceptual boundary conflicts.
- **Resolve:** Run the [Review and resolution procedure](#review-and-resolution-procedure).
- **Link:** Reference the lexicon in `AGENTS.md` when newly created.

### 2. Naming critique
- **Survey:** Reuse the authoring survey if run together; otherwise use 2+ parallel subagents across specs, schemas, and core code.
- **Inspect:** Flag misleading, overloaded, inconsistent, or nonparallel names. Distinguish genuine conceptual issues from harmless prose variation.
- **Resolve:** Run the Review and resolution procedure.

### 3. Lexicon audit
- **Load standard:** Read canonical terms, implementation references, and `_Avoid_` entries.
- **Scan:** Use 2+ parallel subagents to search for avoided terms, canonical misuse, and conceptual conflicts. Exclude generated/vendored files.
- **Check safety:** Flag ambiguous occurrences (multi-domain words, serialized data) for human decision; classify clear violations by safety tier.
- **Resolve:** Run the Review and resolution procedure.

## Term admission rules

A concept earns a lexicon entry only when:
1. **Terminology drift:** Two or more terms are already used for the same concept; or
2. **Shared domain concept:** Central to the problem domain and used across multiple subsystems.

Reject implementation details, generic software terms, and frequency-only candidates.

## Review and resolution procedure

1. **Classify findings by next action:**
   - **Add to the lexicon:** Clear concept passing admission rules.
   - **Discuss with the user:** Drift, competing names, boundary conflicts, or ambiguous uses.
   - **Propose an edit:** Scoped naming improvement or unambiguous lexicon violation.
   - **Discard:** Fails admission rules or irrelevant match.
2. **Challenge consequential findings:** For authoring additions, audit mechanical replacements, and close boundary distinctions, invoke a fresh skeptical subagent with candidates and evidence (no advocacy). Incorporate objections before proceeding.
3. **Write accepted terms:** Add **Add to the lexicon** terms immediately; notify user with a concise list.
4. **Resolve questions:** Present **Discuss with the user** items as questions on boundaries and meaning. Retain replaced canonical terms under `_Avoid_`.
5. **Propose edits:** Present diffs with safety tiers; apply only user-approved changes (batch audit fixes by term).

## Change safety tiers

- **Tier 1 (Prose & local):** Prose, comments, unexported identifiers.
- **Tier 2 (Structural):** Shared types, interfaces, cross-module signatures. Requires explicit approval + typecheck/test.
- **Tier 3 (Compatibility-sensitive):** Persisted schemas, public APIs, wire contracts, CLI flags, serialized data, logs. Requires migration/compatibility plan.

A term's highest-risk occurrence dictates its approval tier. Never treat mixed-risk terms as mechanical.

## Lexicon format

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

- **Scope:** Canonical compound nouns for exported, persisted, and public identifiers; concise names and descriptive modifiers (`activeUser`, `userId`) allowed in local scope.
- Omit metadata bullets (`_Reference_`, `_AKA_`, `_Avoid_`) when not applicable.
