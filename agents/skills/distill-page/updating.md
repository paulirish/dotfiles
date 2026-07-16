# Maintenance Guide: Updating Proto Definitions

This guide is for coding agents tasked with updating and maintaining the Chromium Page Content Annotations protobuf definitions for the `distill-page` skill.

We regularly pull the latest `common_quality_data.proto` from the Chromium source tree to stay in sync with the upstream Optimization Guide model features and find new opportunities for higher-fidelity markdown conversion.

---

## Step 1: Run the Update Script

To fetch the latest proto file and compile it, run the following command from the `dotfiles` repository root:

```bash
node agents/skills/distill-page/scripts/update-proto.ts
```



---

## Step 2: Investigate Changes in the Proto

After running the script, use Git to inspect what changed in the proto file itself:

```bash
git diff agents/skills/distill-page/scripts/proto/common_quality_data.proto
```

Scan the diff for the following:

### A. Breaking Changes
* **What to look for:** Renamed fields, deleted fields (often marked as `reserved`), or changed types.
* **Action:** Search the distiller codebase (`agents/skills/distill-page/scripts/decode_annotations.ts` and `agents/skills/distill-page/scripts/distill-page.ts`) to see if we access those modified/deleted fields. If we do, update our parsing logic to preserve compatibility.

### B. Opportunities for Higher-Fidelity Markdown
* **What to look for:**
  * New attributes added to `ContentAttributeType` (e.g. dialogs, lists, tables).
  * New roles added to `AnnotatedRole` (e.g. structural layout markers).
  * New layout properties in `Geometry` or styling properties in `TextStyle`.
* **Action:** Evaluate if these can be used to improve the output markdown quality (e.g., filtering out layout noise like cookie modals, extracting real image/media URLs, styling headings, or improving list structure).

---

## Step 3: Run the Test Suite

Always verify that the generated code compiles and passes our test suite:

```bash
# Run all unit and integration tests
node --test agents/skills/distill-page/test/**/*.test.ts
```

*Note: The integration tests will launch a headless browser using Playwright to test real CDP interactions. Ensure you have Playwright installed and configured.*

---

## Step 4: Implement Improvements (If applicable)

If you identify opportunities in Step 2:
1. Update `agents/skills/distill-page/scripts/decode_annotations.ts` to leverage the new proto fields/enums.
2. Add new test cases or mock fixtures in `agents/skills/distill-page/test/` to cover the new features.
3. Verify all tests pass.

---

## Step 5: Amend the Commit

Once verified, stage all changes and amend the current task commit to keep the Git history clean:

```bash
# Stage only the modified proto files and update script
git add agents/skills/distill-page/scripts/proto/
git add agents/skills/distill-page/scripts/update-proto.ts
git add agents/skills/distill-page/updating.md
# Stage any other modified implementation/test files specifically
git commit --amend --no-edit
```
