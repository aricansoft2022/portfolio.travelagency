# Jadoo — Travel Agency Landing Page

A front-end implementation of a travel-agency landing page, hand-coded from a
Figma Community design. Fully responsive, with an English/Turkish language switcher.

> **Design credit:** based on the **Jadoo** travel landing design (Figma Community).
> I did not design this — this repository is my front-end build of that design.
> Original design: [add original Figma link]

## Live demo

https://portfolio-travelagency.pages.dev/

## Features

- **Fully responsive** — hand-written CSS with breakpoints at 1100 / 900 / 800 / 460 px
- **EN/TR language switcher** — all text lives in `content.json` and is applied at
  runtime by `i18n.js`
- **Persists language choice** across visits (localStorage); falls back to the English
  text already in the HTML if `content.json` fails to load
- **Semantic HTML** (header / nav / section / article / footer)
- **Optimized images** (WebP)
- **No framework, no build step** — plain HTML, CSS, and vanilla JavaScript

## Tech stack

- HTML5 (semantic)
- CSS3 (hand-written, responsive — no utility framework)
- Vanilla JavaScript (i18n loader + UI interactions)

## Project structure
