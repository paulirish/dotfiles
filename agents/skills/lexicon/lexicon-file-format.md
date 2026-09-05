# Lexicon File Format

Use this format when creating or materially restructuring a project lexicon. Existing project conventions may take precedence when they preserve the same semantics.

## Document shape

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

Use domain sections only when they make the lexicon easier to navigate. Omit metadata bullets that have no value; do not add empty fields.

## Entry rules

### Canonical term

- Use one canonical name for one concept.
- Prefer a short domain noun or noun phrase.
- Do not create a compromise name by joining competing alternatives.

### Definition

- Limit the definition to one or two sentences when possible.
- State what the concept is, including an essential lifecycle role or architectural boundary when necessary.
- Do not turn the entry into a workflow, implementation guide, or miniature specification.
- Name an adjacent concept and explain the distinction when collision is likely.

### Impl anchor

- Omit when no stable canonical symbol exists.
- Point to a public type, interface, schema entity, persistence table, or API contract.
- Do not point to local variables or incidental utility helpers.
- Treat the anchor as evidence and navigation, not as a substitute for the definition.

### AKA

- Omit unless the alternate term bridges to an external source project readers actually use.
- Name the paper, standard, upstream library, or other source.
- Do not list obvious English synonyms or internally competing names here.

### Avoid

- Include deprecated internal names and alternatives explicitly rejected for this concept.
- Add an item only when prior use or a human decision provides evidence.
- Prefer a durable citation such as an issue, PR, commit, or stable document location. A file-and-line citation is acceptable during active cleanup but may age poorly.
- Keep deprecated names after the repository sweep is complete.
- Do not distinguish separate categories of forbidden name; readers need one clear list of what not to use.

## Identifier scope

Enforce canonical compound nouns at boundaries:

- exported types, interfaces, and classes;
- database tables and columns;
- public API and event fields;
- wire formats and serialized values; and
- other identifiers consumed outside their immediate module.

Permit idiomatic short names inside an unambiguous local scope. For example, a callback over `speakerProfiles` may use `profile`; an exported type should retain `SpeakerProfile`.

Permit adjective prefixes and state modifiers such as `activeSpeakerProfile`, `speakerProfileId`, or `isVerifiedExemplar`. These refine a canonical noun rather than creating a synonym.

## Audit guidance

Keep project-specific scan configuration in the lexicon itself so future audits can discover it. Record:

- paths to include or exclude;
- generated, vendored, fixture, research, or compatibility surfaces that require special handling;
- intentional vocabulary exceptions;
- documents or schemas that must be cross-checked; and
- local naming rules that differ from the defaults above.

## Prohibited content

- Generic programming vocabulary without project-specific domain meaning.
- Lists of allowable everyday synonyms.
- Speculative avoided names with no evidence of use or rejection.
- Task lists, migration steps, or architecture scratchpads.
- Duplicate definitions maintained in both the lexicon and agent instructions.
