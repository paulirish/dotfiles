
import {suite, test, mock, after} from 'node:test';
import * as assert from 'node:assert';
import {getClDiff} from './tools.ts';

suite('getClDiff', () => {

  after(() => mock.reset());
  const mockFetch = (fixtureText: string) => {
    return async () => ({ok: true, text: async () => fixtureText});
  };

  const diffFixture = getPatchFixture();
  mock.method(global, 'fetch', mockFetch(diffFixture));

  test('should return the diff for a valid CL URL', async () => {
    const url = 'https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6976658';
    const res = await getClDiff({urlOrId: url});
    const text = res.content[0].text;
    assert.ok(text.includes('diff --git'));
    assert.ok(text.includes('hasFakeConnection'));
  });

  test('should return the diff for a valid CL URL', async () => {
    const url = 'https://crrev.com/c/6976658';
    const res = await getClDiff({urlOrId: url});
    const text = res.content[0].text;
    assert.ok(text.includes('diff --git'));
    assert.ok(text.includes('hasFakeConnection'));
  });

  test('should return the diff for a valid CL ID', async () => {
    const id = '6976658';
    const res = await getClDiff({urlOrId: id});
    const text = res.content[0].text;
    assert.ok(text.includes('diff --git'));
  });

  test.skip('should throw an error for an invalid URL', async () => {
    const url = 'invalid-url';
    await assert.rejects(getClDiff({urlOrId: url}));
  });
});


function getPatchFixture(): string {
  return `From d362d344ca593ef89f629203190fd081f0d94d28 Mon Sep 17 00:00:00 2001
From: Paul Irish <paulirish@chromium.org>
Date: Tue, 23 Sep 2025 14:42:27 -0700
Subject: [PATCH] RPP: Ensure hasFakeConnection for rehydrated_devtools_app

Bug: 432043754
Change-Id: I932802acea7fda260b6246baf5828f09d23845e7
Reviewed-on: https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6976658
Commit-Queue: Paul Irish <paulirish@chromium.org>
Commit-Queue: Connor Clark <cjamcl@chromium.org>
Auto-Submit: Paul Irish <paulirish@chromium.org>
Reviewed-by: Connor Clark <cjamcl@chromium.org>
---

diff --git a/front_end/core/sdk/TargetManager.ts b/front_end/core/sdk/TargetManager.ts
index dbb52da..ecc090b 100644
--- a/front_end/core/sdk/TargetManager.ts
+++ b/front_end/core/sdk/TargetManager.ts
@@ -318,6 +318,10 @@
    *    (eg., tab URL of \`devtools://devtools/bundled/devtools_app.html\` uses a MainConnection but has no CDP server behind it).
    */
   hasFakeConnection(): boolean {
+    // Rehydrated DevTools always has a fake connection, so we shortcut and avoid the race.
+    if (Root.Runtime.getPathName().includes('rehydrated_devtools_app')) {
+      return true;
+    }
     // There _may_ be a race condition hiding here on the router/connection creation.
     // So we play it safe and consider "no connection yet" as "not fake".
     const connection = this.primaryPageTarget()?.router()?.connection();
`;
}
