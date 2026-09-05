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
{1–2 sentence definition stating strictly what it IS, not what it does. If closely adjacent to a sibling concept, explicitly clarifies the boundary in prose.}
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
* **Content**: Define what the concept **is**, not what it does or how it is implemented.
* **Boundary Delineation**: If the concept borders a closely related or frequently confused concept, delineate the boundary directly in prose:
  > *"Distinct from [Session Speaker Label], which is temporary and file-local, a Speaker Profile is persistent and globally unique across the entire audio vault."*
* **Zero Implementation Details**: No mention of specific libraries, SQL tables, transient variables, or function arguments unless the concept itself is a formal data entity.

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

## 3. The Code Naming & Adjective Rule

A frequent failure mode in agentic coding is rigid paralysis around naming variables: agents either invent completely new words or fear using canonical terms because they need an adjective modifier.

### The Standard Rule:
1. **Adjective Prefixes Are Allowed**:
   - Canonical Term: `Speaker Profile`
   - Allowed Code Identifiers: `active_speaker_profile`, `unnamedSpeakerProfile`, `speakerProfileId`
2. **State Modifiers Are Allowed**:
   - Canonical Term: `Verified Exemplar`
   - Allowed Code Identifiers: `is_verified_exemplar`, `has_verified_exemplar`
3. **Noun Truncation Is Strictly Forbidden**:
   - Canonical Term: `Exemplar Coreset`
   - Forbidden Identifiers: `coreset` (drops root context if ambiguous), `cluster`, `buffer`, `group`
   - Canonical Term: `Session Speaker Label`
   - Forbidden Identifiers: `speaker`, `id`, `label`

---

## 4. Anti-Patterns to Avoid

- **No "Allowable Synonyms" Lists**: Do not create lists of approved synonyms. Having multiple acceptable names for the same concept encourages terminology drift and accretion. There is only one canonical term.
- **No Scratchpad Specs**: The lexicon is a domain glossary and conceptual contract, not a system architecture document, implementation roadmap, or task list.
- **No General Programming Concepts**: Terms like `Handler`, `Controller`, `Cache`, `ResponsePayload`, or `Timeout` do not belong in the lexicon unless they have a distinct, proprietary domain meaning.
- **No Synonym Bloat**: Do not propose or accept synonyms just because a dictionary contains them. Every synonym listed under `_Avoid_` or `_Industry / Literature Synonyms_` must serve a clear grounding purpose.
