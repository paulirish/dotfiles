* [**Skip to main content**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#content)
* [**Skip to search**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#search)

Learn frontend, backend, and AI from our course partner [**Scrimba**](https://scrimba.com/learn/frontend?via=mdn)

1. [Web](https://developer.mozilla.org/en-US/docs/Web)
2. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
3. [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
4. [Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)
5. [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)

Theme

English (US)

## box-sizing

**Baseline** Widely available

This feature is well established and works across many devices and browser versions. It’s been available across browsers since July 2015.

* [**Learn more**](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)
* [**See full compatibility**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#browser_compatibility)
* [**Report feedback**](https://survey.alchemer.com/s3/7634825/MDN-baseline-feedback?page=%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing&level=high)

The **`** **box-sizing** **`**

[**CSS**](https://developer.mozilla.org/en-US/docs/Web/CSS) property sets how the total width and height of an element is calculated.

## [**Try it**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#try_it)

## **CSS Demo: box-sizing**

Reset

* box-sizing: content-box; width: 100%;
* box-sizing: content-box; width: 100%; border: solid # 5 b6dcd 10 px; padding: 5 px;
* box-sizing: border-box; width: 100%; border: solid # 5 b6dcd 10 px; padding: 5 px;

Parent container Child container

## [**Syntax**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#syntax)

css Copy box-sizing: border-box; box-sizing: content-box; /* Global values */ box-sizing: inherit; box-sizing: initial; box-sizing: revert; box-sizing: revert-layer; box-sizing: unset; The ` box-sizing ` property is specified as a single keyword chosen from the list of values below.

## [**Values**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#values)

* [**`** **content-box** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#content-box)
* This is the initial and default value as specified by the CSS standard. The [**`** **width** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) and [**`** **height** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height) properties include the content, but does not include the padding, border, or margin. For example, `.box {width: 350px; border: 10px solid black;} ` renders a box that is 370px wide. Here, the dimensions of the element are calculated as: **width = width of the content**, and **height = height of the content**. (Borders and padding are not included in the calculation.)
* [**`** **border-box** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#border-box)
* The [**`** **width** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) and [**`** **height** **`**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height) properties include the content, padding, and border, but do not include the margin. Note that padding and border will be inside of the box. For example, `.box {width: 350px; border: 10px solid black;} ` renders a box that is 350px wide, with the area for content being 330px wide. The content box can't be negative and is floored to 0, making it impossible to use ` border-box ` to make the element disappear. Here the dimensions of the element are calculated as: **width = border + padding + width of the content**, and **height = border + padding + height of the content**.

## [**Description**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#description)

By default in the [**CSS box model**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction), the ` width ` and ` height ` you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the ` width ` and ` height ` to arrive at the size of the box that's rendered on the screen. This means that when you set ` width ` and ` height `, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with ` width: 25%; `, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container. The ` box-sizing ` property can be used to adjust this behavior:

* ` content-box ` gives you the default CSS box-sizing behavior. If you set an element's width to 100 pixels, then the element's content box will be 100 pixels wide, and the width of any border or padding will be added to the final rendered width, making the element wider than 100px.
* ` border-box ` tells the browser to account for any border and padding in the values you specify for an element's width and height. If you set an element's width to 100 pixels, that 100 pixels will include any border or padding you added, and the content box will shrink to absorb that extra width. This typically makes it much easier to size elements. ` box-sizing: border-box ` is the default styling that browsers use for the [**`** **<table>** **`**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table), [**`** **<select>** **`**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select), and [**`** **<button>** **`**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) elements, and for [**`** **<input>** **`**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input) elements whose type is ` [**radio**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio) `, ` [**checkbox**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox) `, ` [**reset**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/reset) `, ` [**button**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/button) `, ` [**submit**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/submit) `, ` [**color**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color) `, or ` [**search**](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search) `.

**Note:** It is often useful to set ` box-sizing ` to ` border-box ` to lay out elements. This makes dealing with the sizes of elements much easier, and generally eliminates a number of pitfalls you can stumble on while laying out your content. On the other hand, when using ` position: relative ` or ` position: absolute `, use of ` box-sizing: content-box ` allows the positioning values to be relative to the content, and independent of changes to border and padding sizes, which is sometimes desirable.

## [**Formal definition**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#formal_definition)

| [**Initial value**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#initial_value) | ` content-box ` |
|---|---|
| **Applies to** | all elements that accept width or height |
| [**Inherited**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance) | no |
| [**Computed value**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Property_value_processing#computed_value) | as specified |
| [**Animation type**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Animatable_properties) | discrete |

## [**Formal syntax**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#formal_syntax)

``` box-sizing = content-box [**|**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Values_and_units/Value_definition_syntax#single_bar) border-box ```

## [**Examples**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#examples)

## [**Box sizes with content-box and border-box**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#box_sizes_with_content-box_and_border-box)

This example shows how different ` box-sizing ` values alter the rendered size of two otherwise identical elements.

### HTML

html Copy [**Play**](https://developer.mozilla.org/en-US/play?uuid=93acf78bdb947d4633af41fd7b9969f6fb0e6b43&state=hZLBboMwDEB%2FxfJpYzAKqyqU0h62X9gxFyARpE0TBFnLVvXfp0ARQVvbU2Jbz%2FaLcsbKHCQSTJk4QiGztt1QLLQyXJkg1x3F7ccQQa67NGTiuKUqzRsI7elSuW4Yb67Qex%2B4DPpYtC0StMyZKoCTYKYiEK0Wdbe2iYqLsjIEkjFRZ4wJVRKIx8wwhEBSd9BqKRg0nA2VrNiXjf5SjMA3l1Kf1lRdqKLq1fEZJue6C1rx07d2in2f0INPbTI5Ww9e4CkGr9%2FjeQwSe99AHK3qzpIAV9L1uEdGbxPpvPJs8j%2FlWXsvHC2n9%2F8rOdVuO95UeLAhBK5hMDdcLB8r3OHj5aSIPu7s%2F0EfTcUP3H6lrNnj5Rc%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing%2F) < div class = " content-box " > Content box </ div > < br /> < div class = " border-box " > Border box </ div >

### CSS

css Copy [**Play**](https://developer.mozilla.org/en-US/play?uuid=93acf78bdb947d4633af41fd7b9969f6fb0e6b43&state=hZLBboMwDEB%2FxfJpYzAKqyqU0h62X9gxFyARpE0TBFnLVvXfp0ARQVvbU2Jbz%2FaLcsbKHCQSTJk4QiGztt1QLLQyXJkg1x3F7ccQQa67NGTiuKUqzRsI7elSuW4Yb67Qex%2B4DPpYtC0StMyZKoCTYKYiEK0Wdbe2iYqLsjIEkjFRZ4wJVRKIx8wwhEBSd9BqKRg0nA2VrNiXjf5SjMA3l1Kf1lRdqKLq1fEZJue6C1rx07d2in2f0INPbTI5Ww9e4CkGr9%2FjeQwSe99AHK3qzpIAV9L1uEdGbxPpvPJs8j%2FlWXsvHC2n9%2F8rOdVuO95UeLAhBK5hMDdcLB8r3OHj5aSIPu7s%2F0EfTcUP3H6lrNnj5Rc%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing%2F) div { width: 160px; height: 80px; padding: 20px; border: 8px solid red; background: yellow; }.content-box { box-sizing: content-box; /* Total width: 160px + (2 * 20px) + (2 * 8px) = 216px
     Total height: 80px + (2 * 20px) + (2 * 8px) = 136px
     Content box width: 160px
     Content box height: 80px */ }.border-box { box-sizing: border-box; /* Total width: 160px
     Total height: 80px
     Content box width: 160px - (2 * 20px) - (2 * 8px) = 104px
     Content box height: 80px - (2 * 20px) - (2 * 8px) = 24px */ }

### Result

[**Play**](https://developer.mozilla.org/en-US/play?uuid=93acf78bdb947d4633af41fd7b9969f6fb0e6b43&state=hZLBboMwDEB%2FxfJpYzAKqyqU0h62X9gxFyARpE0TBFnLVvXfp0ARQVvbU2Jbz%2FaLcsbKHCQSTJk4QiGztt1QLLQyXJkg1x3F7ccQQa67NGTiuKUqzRsI7elSuW4Yb67Qex%2B4DPpYtC0StMyZKoCTYKYiEK0Wdbe2iYqLsjIEkjFRZ4wJVRKIx8wwhEBSd9BqKRg0nA2VrNiXjf5SjMA3l1Kf1lRdqKLq1fEZJue6C1rx07d2in2f0INPbTI5Ww9e4CkGr9%2FjeQwSe99AHK3qzpIAV9L1uEdGbxPpvPJs8j%2FlWXsvHC2n9%2F8rOdVuO95UeLAhBK5hMDdcLB8r3OHj5aSIPu7s%2F0EfTcUP3H6lrNnj5Rc%3D&srcPrefix=%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing%2F) Content box Border box

## [**Specifications**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#specifications)

| **Specification** |
|---|
| [**CSS Box Sizing Module Level 3** **#** **box-sizing** ​](https://drafts.csswg.org/css-sizing/#box-sizing) |

## [**Browser compatibility**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#browser_compatibility)

[**Report problems with this compatibility data**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#) • [**View data on GitHub**](https://github.com/mdn/browser-compat-data/tree/main/css/properties/box-sizing.json)

|  | **desktop** | **mobile** |
|---|---|---|
|  | **Chrome** | **Edge** | **Firefox** | **Opera** | **Safari** | **Chrome Android** | **Firefox for Android** | **Opera Android** | **Safari on iOS** | **Samsung Internet** | **WebView Android** | **WebView on iOS** |
| **box-sizing** | **Chrome – Full support** Chrome 10 **footnote** **more** | **Edge – Full support** Edge 12 **more** | **Firefox – Full support** Firefox 29 **more** | **Opera – Full support** Opera 7 | **Safari – Full support** Safari 5.1 **more** | **Chrome Android – Full support** Chrome Android 18 **footnote** **more** | **Firefox for Android – Full support** Firefox for Android 29 **more** | **Opera Android – Full support** Opera Android 14 **footnote** **more** | **Safari on iOS – Full support** Safari on iOS 6 **more** | **Samsung Internet – Full support** Samsung Internet 1 **footnote** **more** | **WebView Android – Full support** WebView Android 4 **footnote** **more** | **WebView on iOS – Full support** WebView on iOS 6 **more** |
| **border-box** | **Chrome – Full support** Chrome 1 | **Edge – Full support** Edge 12 | **Firefox – Full support** Firefox 1 | **Opera – Full support** Opera 15 | **Safari – Full support** Safari 3 | **Chrome Android – Full support** Chrome Android 18 | **Firefox for Android – Full support** Firefox for Android 4 | **Opera Android – Full support** Opera Android 14 | **Safari on iOS – Full support** Safari on iOS 2 | **Samsung Internet – Full support** Samsung Internet 1 | **WebView Android – Full support** WebView Android 4.4 | **WebView on iOS – Full support** WebView on iOS 2 |
| **content-box** | **Chrome – Full support** Chrome 1 | **Edge – Full support** Edge 12 | **Firefox – Full support** Firefox 1 | **Opera – Full support** Opera 15 | **Safari – Full support** Safari 3 | **Chrome Android – Full support** Chrome Android 18 | **Firefox for Android – Full support** Firefox for Android 4 | **Opera Android – Full support** Opera Android 14 | **Safari on iOS – Full support** Safari on iOS 2 | **Samsung Internet – Full support** Samsung Internet 1 | **WebView Android – Full support** WebView Android 4.4 | **WebView on iOS – Full support** WebView on iOS 2 |

### **Legend**

Tip: you can click/tap on a cell for more information.

* **Full support**
* Full support
* See implementation notes.
* Requires a vendor prefix or different name for use.
* Has more compatibility info.

## [**See also**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing#see_also)

* [**CSS box model**](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction)

## Help improve MDN

Was this page helpful to you? Yes No [**Learn how to contribute**](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started) This page was last modified on Nov 17, 2025 by [**MDN contributors**](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing/contributors.txt). [**View this page on GitHub** ​](https://github.com/mdn/content/blob/main/files/en-us/web/css/reference/properties/box-sizing/index.md?plain=1) • [**Report a problem with this content** ​](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fcss%2Freference%2Fproperties%2Fbox-sizing%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FReference%2FProperties%2Fbox-sizing%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fcss%2Freference%2Fproperties%2Fbox-sizing%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F46a4425d4b7160129fd4c8d0f684ccd0617326b7%0A*+Document+last+modified%3A+2025-11-17T08%3A15%3A12.000Z%0A%0A%3C%2Fdetails%3E)