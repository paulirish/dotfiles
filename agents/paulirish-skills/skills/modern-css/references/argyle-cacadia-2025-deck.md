

--- URL: https://cascadiajs-2025.netlify.app/ ---

Oops, CSS Got Away From Me… Send Halp! \| 2025

## CSS can do what?!CSS can do what?!CSS can do what?!CSS can do what?!CSS can do what?!CSS can do what?!CSS can do what?!

# 25 rad features in 25 minutes

[cascadiajs-2025.netlify.app/](https://cascadiajs-2025.netlify.app)

Adam Argyle [next slide](/01-page-transitions/)


--- URL: https://cascadiajs-2025.netlify.app/01-page-transitions/ ---

Page Transitions

# Page Transitions

Easily transition elements or entire pages

    @view-transition {
      navigation: auto;
    }

    nav {
        view-transition-name: --persist-nav;
    }

[nerdy.dev](https://nerdy.dev) [next slide](/02-media-query-ranges/)


--- URL: https://cascadiajs-2025.netlify.app/02-media-query-ranges/ ---

Media Query Ranges

#### Media Query

# Range Syntax

    @media (width <= 1024px) {
        
    }

    @media (360px < width < 1024px) {
        
    }

    @container (20ch < width < 50ch) {
        
    }

    .card-grid {
        container-type: inline-size;

        > .card {
            @container (20ch < width < 50ch) {…}
        }
    }

[next slide](/03-container-query/)


--- URL: https://cascadiajs-2025.netlify.app/03-container-query/ ---

Container Queries

# Container Queries

    /* Define a container */
    .card {
      container: --my-first-cq / inline-size;
    }

    /* Query Nearest Container */
    @container (width < 40ch) {
        …
    }

    /* Query Container By Name */
    @container --my-first-cq (width < 40ch) {
        …
    }

    .perfect-bento {
      container: --perfect-bento / size;

      > .bento-layout {
        @container --perfect-bento (orientation: landscape) {
          grid-auto-flow: column;
        }
      }
    }

    .container-units {
      inline-size: 50cqi;
        block-size: 50cqb;
    }

[Demo](https://codepen.io/argyleink/pres/RwdRaVg?editors=0100) [next slide](/04-cascade-layers/)


--- URL: https://cascadiajs-2025.netlify.app/04-cascade-layers/ ---

Cascade Layers

# Cascade Layers

    @layer design.system, components, utilities;

    @import "open-props/colors" layer(design.system);
    @import "open-props/easings" layer(design.system);

    @import "components/nav/base.css" layer(components.nav);

    @layer components.nav.primary {
        nav {
            container: --primary-nav / inline-size;
            view-transition-name: --primary-nav;

            position: sticky;
            inset-block-start: 0;
        }
    }

    .demo {
        /* isolate just the demo tricks */
    }

    @layer demo.support {
        /* center the demo, etc */
    }

[next slide](/05-field-sizing/)


--- URL: https://cascadiajs-2025.netlify.app/05-field-sizing/ ---

Field Sizing

# Field Sizing

    textarea, select, input {
      field-sizing: content;
    }

    /* defensive styles */
    textarea {
      min-block-size: 3lh;
      max-block-size: 80svh;
      min-inline-size: var(--size-content-1);
      max-inline-size: var(--size-content-2);
    }

    /* defensive styles */
    select {
      min-inline-size: 5ch;
    }

[Demo](https://codepen.io/argyleink/pres/JjxQLoW?editors=0100) [Demo](https://codepen.io/argyleink/pres/WNLzyJK?editors=0100) [next slide](/06-color-scheme/)


--- URL: https://cascadiajs-2025.netlify.app/06-color-scheme/ ---

Color Scheme

# Color Scheme

Toggle light/dark page, inputs and custom components

    :root {
      color-scheme: light dark;
    }

    /* customize */
    :root {
      color-scheme: light dark;

      color: light-dark(#333, white);
      background: light-dark(white, black);
    }

    .dark  { color-scheme: dark }
    .light { color-scheme: light }

    section {
      background: light-dark(#ddd, #222);
      color: light-dark(#222, #ddd);
    }

[Demo](https://codepen.io/argyleink/pres/QwjPWGe?editors=0100) [next slide](/07-light-dark/)


--- URL: https://cascadiajs-2025.netlify.app/07-light-dark/ ---

light-dark()

# light-dark()

Leverage `color-scheme` for
easy adaptive color

    :root {
      color: light-dark(#333, white);
      background: light-dark(white, black);
    }

    section {
      border: 2px solid light-dark(lightgray, darkgray);
    }

    :root {
      --surface-1: light-dark(white, #222);
      --surface-2: light-dark(#eee, #444);
      --text-1:    light-dark(#222, #fff);
      --text-2:    light-dark(#444, #ddd);
    }

[Demo](https://codepen.io/argyleink/pres/bGPvvqm?editors=0100) [Demo](https://codepen.io/argyleink/pres/QWXmrqN?editors=0100) [next slide](/08-accent-color/)


--- URL: https://cascadiajs-2025.netlify.app/08-accent-color/ ---

Accent Color

# Accent Color

Quickly tint tons of built-in elements

    :root {
      accent-color: hotpink;
    }

    input[type="range"] {
      accent-color: black;
    }

[Demo](https://codepen.io/argyleink/pres/KKmaaEK?editors=0100) [Demo](https://codepen.io/argyleink/pres/vYPdBOO?editors=0100) [next slide](/09-@property/)


--- URL: https://cascadiajs-2025.netlify.app/09-@property/ ---

@property

# @property

Type safe, interpolatable, CSS variables

    @property --unbreakable-color {
      syntax: "<color>";
      inherits: false;
      initial-value: #decade;
    }

    @property --interpolatable-percentage {
      syntax: "<percentage>";
      inherits: true;
      initial-value: 0%;
    }

    .animate-the-property {
      transition: --interpolatable-percentage 1s ease-out;

      &:hover {
        --interpolatable-percentage: 100%;
      }
    }

    @property --animate {
      syntax: '<percentage>';
      initial-value: 0%;
      inherits: false;
    }

    @keyframes use-keyframes { to {
      --animate: 100%;
    }}

[Noisee](https://noisee.netlify.app) [Demo](https://codepen.io/argyleink/pres/rNwWwor?editors=0100) [next slide](/10-scroll-driven-animation/)


--- URL: https://cascadiajs-2025.netlify.app/10-scroll-driven-animation/ ---

Scroll Driven Animation

# Scroll Driven Animation

Animate on scroll or on viewport intersection

    .animate-on-scroll {
      animation: somethin-coo linear both;
      animation-timeline: scroll();
    }

    .animate-on-viewport-intersection {
      animation: somethin-coo linear both;
      animation-timeline: view();
    }

    @supports (animation-timeline: view()) {
      animation: slide-in linear both;
      animation-timeline: view(x);
      animation-range: cover -75cqi contain 20cqi;
    }

[scroll()](https://codepen.io/argyleink/pres/vYxGKPz?editors=0100) [scroll()](https://codepen.io/argyleink/pres/ZEdrzJZ?editors=0100) [view()](https://codepen.io/argyleink/pres/VwNMLQN?editors=0100) [view()](https://codepen.io/argyleink/pres/gOyoBLj?editors=0100) [view()](https://codepen.io/argyleink/pres/MWMQJQy?editors=0100) [view()](https://codepen.io/argyleink/pres/qBQByGN?editors=0100) [next slide](/11-linear/)


--- URL: https://cascadiajs-2025.netlify.app/11-linear/ ---

linear()

# linear()

Doesn't feel linear

    .springy {
      --spring: linear(
        0, 0.14 4%, 0.94 17%, 1.15 24% 30%, 1.02 43%, 0.98 51%, 1 77%, 1
      );
      transition: transform 1s var(--spring);
    }

    @import "open-props/easings";

    @media (prefers-reduced-motion: no-preference) {
      .springy {
        transition: transform 1s var(--ease-spring-3);
      }
    }

[Demo](https://codepen.io/argyleink/pres/XWOOydB?editors=0100) [Tool](https://linear-easing-generator.netlify.app/) [Library](https://open-props.style/#easing) [next slide](/12-hr-in-select/)


--- URL: https://cascadiajs-2025.netlify.app/12-hr-in-select/ ---

\<hr\> in \<select\>

# Horizonal Rules in Select Elements

    <select>
      <option>Option 1</option>
      <hr>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>

Select with HR example

------------------------------------------------------------------------

Option 1 Option 2 Option 3

------------------------------------------------------------------------

Option 4 Option 5 Option 6 [Article](https://developer.chrome.com/blog/hr-in-select)

Chrome 119+, Safari 17+, Firefox 122+

[next slide](/13-search-element/)


--- URL: https://cascadiajs-2025.netlify.app/13-search-element/ ---

A search element

# A Search Element

    <search>
      <form>
        <label for="movie">Find a Movie</label>
        <input type="search" id="movie" name="q">
        <button type="submit">Search</button>
      </form>
    </search>

[Demo](https://codepen.io/argyleink/pres/WNLZqYZ?editors=1100) [next slide](/14-user-valid/)


--- URL: https://cascadiajs-2025.netlify.app/14-user-valid/ ---

:user-valid and :user-invalid

# Better Validation

`:valid` and `:invalid` are eager, `:user-valid` and `:user-invalid`
are lazy

    :user-valid {
      outline-color: green;
    }

    :user-invalid {
      outline-color: red;
    }

    input {
      label:has(+ &:user-invalid) {
        text-decoration: underline wavy red;
      }
    }

    input {
      label:has(+ &:user-valid)::after {
        color: green;
        content: " ✓";
      }
    }

[Demo](https://codepen.io/web-dot-dev/pen/wvNJGrO) [Demo](https://codepen.io/argyleink/pres/mdaPvYY?editors=0100) [Demo](https://codepen.io/argyleink/pres/eYbZbPY?editors=0100) [Demo](https://codepen.io/argyleink/pres/GRbYMGw?editors=1100) [next slide](/15-exclusive-accordion/)


--- URL: https://cascadiajs-2025.netlify.app/15-exclusive-accordion/ ---

Exclusive Accordion

# Exclusive Accordion

    <details name="linked-accordions">
      …
    </details>
    <details name="linked-accordions">
      …
    </details>

[Demo](https://codepen.io/argyleink/pres/MWMPOap?editors=1000) [next slide](/16-math/)


--- URL: https://cascadiajs-2025.netlify.app/16-math/ ---

Math

# Math

Lots of math

    .math-trig-you-name-it {
      rotate: cos(1rad) sin(2rad) tan(3rad);
      scale: pow(2, 3);
      translate: atan2(1, 2) asin(0.5) acos(0.5);
    }

    .radial-layout {
      --_angle: calc(var(--sibling-index) * var(--_offset));
      
      translate: 
        calc(cos(var(--_angle)) * var(--_circle-size))
        calc(sin(var(--_angle)) * var(--_circle-size))
      ;
    }

    :root {
      --mass: 1;
      --stiffness: 100;
      --damping: 5;
      --start-velocity: 0; 
    }

[Demo](https://codepen.io/argyleink/pres/jOovoav?editors=0100) [Demo](https://codepen.io/argyleink/pres/OJozxrB?editors=0100) [Demo](https://codepen.io/matthiasott/pen/yLWoXaN?editors=1000) [Demo](https://codepen.io/argyleink/pres/KKLaNdd?editors=0100) [Demo](https://codepen.io/nocksock/pres/QWXzPQg?editors=0100) [Demo](https://codepen.io/enbee81/pres/xxNzJem?editors=0100) [next slide](/17-function-teaser-slide/)


--- URL: https://cascadiajs-2025.netlify.app/17-function-teaser-slide/ ---

More Functions

# More Functions

These are in the works

    .random {
      z-index: random();
      order: random-item();
    }

    .use-nth-child-value {
      background-color: hsl(sibling-count() 50% 50%);
      animation-delay: calc(sibling-index() * .1s);
    }

    .progress {
      progress()
      media-progress()
      container-progress()
    }

    .mix {
      mix()
      calc-mix()
      cross-fade()
      transform-mix()
    }

    .misc {
      first-valid()
      toggle()
      calc-size()
    }

CSS [Values Level 5](https://drafts.csswg.org/css-values-5/)

[next slide](/18-text-wrap/)


--- URL: https://cascadiajs-2025.netlify.app/18-text-wrap/ ---

Text Wrap

# Text Wrap

Balanced blocks or orphanless paragraphs

    h1 {
      text-wrap: balance;
      max-inline-size: 25ch;
    }

    p {
      text-wrap: pretty;
      max-inline-size: 50ch;
    }

[Demo](https://codepen.io/argyleink/pres/eYxEENW?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/KKxjpQm?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/eYLwpRx?editors=0100) [next slide](/19-color-mix/)


--- URL: https://cascadiajs-2025.netlify.app/19-color-mix/ ---

Color Mix

# Color Mix

Brew your own colors

    .lighten-the-brand {
      background: color-mix(in oklab, var(--brand), white);
    }

    .reduce-transparency {
      background: color-mix(in oklab, var(--background), transparent 80%);
    }

    .nest-it {
      color: color-mix(in oklch, purple 40%, color-mix(in oklab, plum, white));
    }

[Demo](https://codepen.io/web-dot-dev/pen/poZKLdw?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/bGjKvyW?editors=0100) [Demo](https://color-mix.style) [next slide](/20-color-spaces/)


--- URL: https://cascadiajs-2025.netlify.app/20-color-spaces/ ---

Color Spaces

# Color Spaces

Blueray-like colors & gradients

    .hdr-syntax {
      background: color(display-p3 1 0 1);
      background: oklch(72% 75% 330);
    }

    .richer-colors {
      background: red;
      background: color(display-p3 1 0 0);
      background: oklch(63% 100% 30);
    }

    .sick-neons {
      @media (dynamic-range: high) {
        --neon-red: color(display-p3 1 0 0);
        --neon-blue: color(display-p3 0 0.75 1);
      }
    }

    .better-gradients {
      background: linear-gradient(
        to right in oklch, 
        color(display-p3 1 0 .5), 
        color(display-p3 0 1 1)
      );
    }

[Demo](https://codepen.io/argyleink/pen/RwyOyeq?editors=0100) [Demo](https://codepen.io/argyleink/pen/rNvEeQp?editors=0100) [Demo](https://codepen.io/argyleink/pen/abarGpJ?editors=0100) [Demo](https://codepen.io/argyleink/pen/XWdapvY?editors=0100) [Demo](https://codepen.io/argyleink/pen/xxyNNdx?editors=0100) [Demo](https://gradient.style) [next slide](/21-relative-color/)


--- URL: https://cascadiajs-2025.netlify.app/21-relative-color/ ---

Relative Color

# Relative Color

Derive and compute colors from colors

    .lighten-by-25 {
      background: oklch(from blue calc(l * 1.25) c h);
      background: oklch(from blue calc(l + .25) c h);
    }

    .lighten-to-75 {
      background: oklch(from blue 75% c h);
    }

    .set-alpha {
      background: hsl(from blue h s l / 50%);
      background: oklch(from blue l c h / 50%);
      background: rgb(from blue r g b / 50%);
    }

    .complementary-color {
      background: hsl(from blue calc(h + 180) s l);
    }

[Demo](https://codepen.io/web-dot-dev/pen/oNVLPPK?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/QWoEVJO?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/YzdByvg?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/PoVWEGK?editors=0100) [next slide](/22-scrollbars/)


--- URL: https://cascadiajs-2025.netlify.app/22-scrollbars/ ---

Scrollbars

# Scrollbars

Easily customize the scrollbar

    .custom-scrollbar {
      scrollbar-color: hotpink transparent;
    }

    .custom-scrollbar-size {
      scrollbar-width: none;
      scrollbar-width: thin;
    }

[Demo](https://codepen.io/web-dot-dev/pen/yLwMexO?editors=0100) [Demo](https://codepen.io/web-dot-dev/pen/YzgZwOO?editors=0100) [next slide](/23-starting-style/)


--- URL: https://cascadiajs-2025.netlify.app/23-starting-style/ ---

Starting Style

# @starting-style

Easy entry effects

    @starting-style { 
      scale: 0; 
    }

    .present-the-thing {
      transition: opacity .5s ease, scale .5s ease;

      @starting-style {
        opacity: 0; 
        scale: 1.1; 
      }
    }

[Demo](https://codepen.io/argyleink/pres/qBGOamz?editors=0100) [Demo](https://codepen.io/jh3y/pen/bGyrwbE?editors=0100) [next slide](/24-dialog/)


--- URL: https://cascadiajs-2025.netlify.app/24-dialog/ ---

Dialog

# Dialog

An element for synchronous blocking UI

    <dialog></dialog>

    <dialog>
      <form method="dialog">
        …
        <button value="cancel">Cancel</button>
        <button value="confirm">Confirm</button>
      </form>
    </dialog>

    document.querySelector('dialog').showModal();
    document.querySelector('dialog').close();

    <dialog id="dialog">
      <p>Hi, I'm a dialog.</p>
      <button commandfor="dialog" command="close">Ok</button>
    </dialog>

    <button commandfor="dialog" command="showModal">Open Dialog</button> 

[Demo](https://codepen.io/argyleink/pres/OJeWWNZ?editors=0100) [Demo](https://codepen.io/argyleink/pres/VwJvqrW?editors=0100) [Demo](https://codepen.io/argyleink/pres/ZENRLva?editors=0100) [Demo](https://nerdy.dev/have-a-dialog) [next slide](/25-popover/)


--- URL: https://cascadiajs-2025.netlify.app/25-popover/ ---

Popover

# Popover

An element for asynchronous non-blocking UI

    <button popovertarget="demo">Show</button>
      
    <div popover id="demo">…</div>

    [popover] {
      &, &::backdrop {
        transition: 
          display .5s allow-discrete, 
          overlay .5s allow-discrete, 
          opacity .5s;
        opacity: 0;
      }
    }

    [popover] {
      @starting-style {
        &:popover-open,
        &:popover-open::backdrop {
          opacity: 0;
        }
      }
    }

[Demo](https://codepen.io/argyleink/pres/xxozrJw?editors=0100) [Read](https://nerdy.dev/steal-this-popover-starter-kit) [next slide](/26-anchor/)


--- URL: https://cascadiajs-2025.netlify.app/26-anchor/ ---

Anchor Positioning

# Anchor Positioning

Intelligent and convenient element positioning

    .anchor {
      anchor-name: --over-easy;
    }

    .positioned-element {
      position-anchor: --over-easy;
      position: fixed;
      position-area: block-end;
    }

    .anchored[popover] {
      position-anchor: --somewhere;
      inset: auto;
      position-area: block-start;
      position-try-fallbacks: flip-block;
      position-try-order: most-height;
    }

[Demo](https://codepen.io/argyleink/pres/bGZoBYO?editors=0100) [Demo](https://codepen.io/jh3y/pres/BaVOqwz?editors=0100) [Demo](https://codepen.io/jh3y/pres/nRgxPoB?editors=0100) [Demo](https://codepen.io/jh3y/pres/dyLjbwG?editors=0100) [Demo](https://codepen.io/jh3y/pres/PoxjQRX?editors=0100) [Tool](https://chrome.dev/anchor-tool/) [next slide](/27-text-box-trim/)


--- URL: https://cascadiajs-2025.netlify.app/27-text-box-trim/ ---

Text Box Trim

# Text Box Trim

Switch from double leading to fit line-heights

    h1, p, button {
      text-box: trim-both cap alphabetic;
    }

[Demo](https://codepen.io/argyleink/pres/wvboZdY?editors=0100) [Demo](https://codepen.io/argyleink/pres/wvberMj?editors=0100) [Demo](https://codepen.io/argyleink/pres/wvLmmyQ?editors=0100) [next slide](/28-outro/)


--- URL: https://cascadiajs-2025.netlify.app/28-outro/ ---

Oops, CSS Got Away From Me… Send Halp! \| 2025
[](https://nerdy.dev "site") [](https://nerdy.dev "site") [](https://nerdy.dev "site") [](https://nerdy.dev "site") [](https://nerdy.dev "site") [](https://nerdy.dev "site") [](https://nerdy.dev "site")

# Thank You

[](https://twitter.com/argyleink "twitter") [](https://elk.zone/front-end.social/@argyleink "mastodon") [](https://bsky.app/profile/nerdy.dev "bluesky") [next slide]()
