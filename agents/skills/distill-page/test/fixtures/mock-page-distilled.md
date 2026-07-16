Mock Page Title

# Main Page Heading (H1)

Some introductory paragraph text here.

## Section 1: Semantic Table

**Table: Mock Table Caption**

| **Header A** | **Header B** | **Header C** |
|---|---|---|
| Value A1 | Value B1 |  |
| Value A2 | Value B2 |  |

## Section 2: Aside and Paid Content

<aside>

## Interesting Aside

This is content inside an aside tag, which is secondary to the main flow.
</aside>

Normal flow text continues here.

> [!IMPORTANT]
> **Paid Content**: The following section is behind a paywall.

Paid content paragraph that should be identified as paid content by annotations.

## Section 3: Hidden / Collapsed Accordions

Click to reveal more

<details><summary>Collapsed Content</summary>

This is hidden content inside a details tag.
</details>

## Section 4: Extra Elements for Testing

* Item 1
* Item 2
  * Nested Item A
  * Nested Item B

Here is a link: [Link Text](file:///relative-path) and a [same-page fragment link](#section-10).

A very strange [Pi issue](https://github.com/earendil-works/pi/issues/6278) sent me down a rabbit hole over the last two days.  The short version is that
newer Claude models sometimes call Pi’s edit tool with extra, invented fields in
the nested `edits[]` array.  And not Haiku or some small model: Opus 4.8.  The
edit itself is usually correct but the arguments do not match the schema as
the model invents made-up keys and Pi thus rejects the tool call and asks to
try again.

Here is a preformatted code block:

```
{
  "path": "some/file.py",
  "edits": [
    {
      "oldText": "text to replace",
      "newText": "replacement text"
    }
  ]
}
```

Here is an image: ![With URL][image01]

First reference image: ![image][image02] Reference Image A

Second reference image: ![image][image03] Reference Image B

Here is a styled paragraph that should not split into heading tags:

Hi, I'm Kilian. I make [Polypane](https://polypane.app/), the browser for responsive web development and design.

## Section 5: Ad Block (Should be omitted)

## Sponsored Advertisement

This ad content must be ignored by the distiller.

## Section 6: Dynamic Font Size Headings

# Dynamic Size XL Heading

### Dynamic Size L Heading

### Dynamic Size M Heading

#### Dynamic Size S Heading

## Section 7: Inlines spacing & code formatting

Punctuation spacing test: Hello, world! This is a test.

Dialog transparency test: Before dialog

Inside modal dialog After dialog.

Code spacing test: `const a = 123;`

Bold code test: **`const b = 456;`**

Variable spacing test: `sk_test_id` and `payment-intent`.

Sentence dot spacing test. **This should have a space before it.**

Dotted variable test: `payment.method.id`.

## Section 8: Navigation and Footer (Should be omitted)

## Section 9: Merged Code Block Tab Layout

app/layout.tsx TypeScript TypeScript

```
import { Geist } from 'next/font/google'
const geist = Geist({
  subsets: ['latin'],
})
```

## Section 10: Nested Container Code Blocks

```
const x = 1;
```