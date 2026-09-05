# Project Lexicon Specification (`LEXICON-FORMAT.md`)

This document defines the canonical format, structural rules, and entry conventions for project lexicon files (`LEXICON.md`, `TERMS.md`, or `CONTEXT.md`).

---

## 1. Document Structure

A project lexicon consists of three main components:
1. **Title & Scope Conventions**: High-level rules for code identifiers, audited paths, and grammatical boundaries.
2. **Domain Clusters**: Thematic sections grouping related concepts.
3. **Canonical Term Entries**: Concise, opinionated term definitions following the standard entry schema.

```markdown
# {Project Name} Domain Lexicon (`LEXICON.md`)

The authoritative ubiquitous language and conceptual model for {Project Name}. All code, tests, documentation, and agent discussions must strictly adhere to these canonical terms.

## Scope & Conventions

- **Audited Paths**: `src/`, `lib/`, `docs/` (ignores `dist/`, `node_modules/`, `fixtures/`)
- **Code Identifiers & Adjectives**: Descriptive prefixes and adjectives (e.g., `is_verified_by_human`, `session_speaker_label`, `speaker_id`) are explicitly encouraged in variable, function, and database identifiers. Truncating, shortening, or omitting root nouns (e.g., shortening `Exemplar Record` to `Record` or `Row`) is strictly avoided.

---

## 1. {Domain / Subsystem Area}

**{Canonical Term}**:
{1–2 sentence definition stating strictly what it IS and its core lifecycle role. If closely adjacent to a sibling concept, explicitly clarifies the boundary in prose.}
_Code Anchor_: {Optional pointer to primary exported type, interface, or database table. e.g., `src/types/speaker.ts#SpeakerLabel`, `db.session_speaker_labels`}
_Industry / Literature Synonyms_: {Optional external or academic synonyms, included ONLY when bridging an active gap to literature. Omit if none.}
_Avoid_: {Rejected synonyms, deprecated historical names from earlier refactors, and colloquial shortcuts.}
```

---

## 2. Term Entry Schema

Every entry must follow this exact layout:

### `**Canonical Term**`
* **Style**: Bold title case (e.g., `**Exemplar Coreset**`, `**Conversation**`).
* **Rule**: Pick the single best term. Do not create composite or compromise names.

### Definition Prose
* **Length**: 1–2 sentences maximum.
* **Content**: Define what the concept **is** and its essential lifecycle role or architectural boundary. Avoid procedural step-by-step implementation code, but capture behavioral contracts essential to the domain entity.
* **Boundary Delineation**: If the concept borders a closely related or frequently confused concept, delineate the boundary directly in prose:
  > *"Distinct from [Session Speaker Label], which is temporary and file-local, a Speaker Profile is persistent and globally unique across the entire audio vault."*

### `_Code Anchor_` *(Optional)*
* **Purpose**: Concrete pointers grounding the ubiquitous language in the codebase, preventing coding agents from guessing symbol names.
* **Format**: Comma-separated list of exported types, interfaces, schema tables, or API contracts (e.g., `src/types/speaker.ts#SpeakerProfile`, `db.speaker_profiles`).
* **Constraint**: Point only to high-level canonical types or primary persistence tables, not ephemeral utility helpers.

### `_Industry / Literature Synonyms_` *(Optional)*
* **Purpose**: Bridges internal terminology with external academic papers, industry standards, or third-party documentation.
* **Constraint**: Include **only** if there is real value in grounding the term in external literature.
* **Strictly Prohibited**: Do NOT add generic English synonyms (e.g., listing `dialogue` for `Conversation` or `item` for `Record`). If no formal external literature term exists, omit this line entirely.

### `_Avoid_` *(Mandatory when alternatives exist)*
* **Purpose**: Explicit anti-patterns, rejected alternatives, and deprecated internal names.
* **Include**:
  1. **Historical/Deprecated Names**: Terms previously used in older versions of the codebase that are being phased out.
  2. **Rejected Industry Equivalents**: Valid external terms that were intentionally passed over in favor of the canonical term.
  3. **Ambiguous Shortcuts**: Sloppy abbreviations or truncated words that destroy semantic precision.

---

## 3. The Code Naming & Identifier Scope Rule

A frequent failure mode in agentic coding is rigid paralysis around naming variables: agents either invent completely new words or fear using canonical terms because they need an adjective modifier, or they produce unreadable Java-style bloat in local loops.

### Scope Delineation:

1. **Boundary Identifiers (Strict)**:
   - Exported types, interfaces, classes, database tables/columns, and public API fields **must** use the canonical compound noun.
   - Example: `type SessionSpeakerLabel = ...`, `db.session_speaker_labels`
   - Noun truncation at boundary surfaces is strictly forbidden (`SessionSpeakerLabel` cannot be truncated to `Speaker` or `Label` in an exported API).

2. **Local Scope Identifiers (Permissive)**:
   - Inside an unambiguous lexical scope (e.g., inside a method on `SessionSpeakerLabel`, a loop over labels, or a small helper function), idiomatic short names are explicitly allowed.
   - Example: `labels.map(l => l.id)`, `function format(label: SessionSpeakerLabel) { return label.text; }`
   - Do NOT force unreadable bloat like `currentSessionSpeakerLabel.sessionSpeakerLabelId`.

3. **Adjective Prefixes & State Modifiers (Encouraged Everywhere)**:
   - Canonical Term: `Speaker Profile`
   - Allowed Code Identifiers: `active_speaker_profile`, `unnamedSpeakerProfile`, `speakerProfileId`
   - Canonical Term: `Verified Exemplar`
   - Allowed Code Identifiers: `is_verified_exemplar`, `has_verified_exemplar`

---

## 4. Anti-Patterns to Avoid

- **No "Allowable Synonyms" Lists**: Do not create lists of approved synonyms. Having multiple acceptable names for the same concept encourages terminology drift and accretion. There is only one canonical term.
- **No Scratchpad Specs**: The lexicon is a domain glossary and conceptual contract, not a system architecture document, implementation roadmap, or task list.
- **No General Programming Concepts**: Terms like `Handler`, `Controller`, `Cache`, `ResponsePayload`, or `Timeout` do not belong in the lexicon unless they have a distinct, proprietary domain meaning.
- **No Synonym Bloat**: Do not propose or accept synonyms just because a dictionary contains them. Every synonym listed under `_Avoid_` or `_Industry / Literature Synonyms_` must serve a clear grounding purpose.
