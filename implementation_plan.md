# Implementation Plan — /howtouse Page

## [Overview]
Create the `/howtouse` guide page for Shortlink using only existing theme Tailwind utilities (`globals.css`): a concise 3-step walkthrough (Enter URL -> Enter Short URL text -> Generate), plus a Tips section and a FAQ section, ending with a styled "Go to Generate" CTA button that links to `/shorten`.

Scope is content + styling only — no new state, API calls, or components. The page is a static guide; functionality lives in `/shorten` and is referenced via a navigation link.

## [Types]
No type system changes (no TypeScript in this project).

## [Files]
| File | Action | Purpose |
|---|---|---|
| `app/howtouse/page.js` | Replace existing stub (`<div>hi</div>`) with the guide component | Single-page static guide; no other files modified. |
| `app/globals.css` | None | All classes (`bg-shell`, `text-shell-ink`, `sl-rise`, `sl-clamp`, `sl-ruler`, etc.) already exist. |

## [Functions]
No new functions — the component holds its data as local `steps`, `tips`, `faq` arrays and renders them with `.map()`.

## [Classes]
No new CSS classes; all styling uses theme utilities: `bg-shell`, `text-shell-ink`, `text-shell-muted`, `text-brass`, `border-rule`, `border-rule-soft`, `font-mono`, `uppercase tracking-[0.14em]`, `rounded-[3px]`, `transition-colors`, and motion classes `sl-rise`, `sl-clamp`, `sl-ruler`.

## [Dependencies]
No dependency modifications.

## [Testing]
1. `npx eslint app/howtouse/page.js` — lint pass.
2. `npm run build` — confirm the route compiles and the page is prerendered as static content.
3. Start dev server (`npm run dev`) and visit `/howtouse` to visually verify all sections render, the brass "Go to Generate" button links to `/shorten`, and light/dark modes look correct.

## [Implementation Order]
1. Replace `app/howtouse/page.js` stub with the guide component (steps, tips, FAQ, CTA).
2. Run lint + build to validate the route compiles.
3. Start dev server and visually verify the page end-to-end.