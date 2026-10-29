# Cinévia — portfolio edition

An improved **personal/training project** by Taha Mouaddine. This is a refinement of [TAHAMOUA/Cinevia](https://github.com/TAHAMOUA/Cinevia), not a paid client project or a new application with an unrelated identity.

**Live:** https://cinevia-taha-portfolio.peppycrab2049.chatgpt.site

## Provenance and recovery

Original source inspected at commit `24d8803f2826774bb5d5e9d227e98f3ab0dff53a`. Work lives in a separate checkout on `portfolio-polish`; the original GitHub repository was not overwritten. The original 17 films, French descriptions, genres, film details, search, genre filters and collection workflow are retained. `README.original.md` preserves the original README. Git history retains the original source; use the original commit in a separate branch to recover it.

## What changed

- Cinematic art direction, editorial typography, consistent spacing, responsive five/four/two-column catalogue and locally served artwork.
- Coordinated entrance motion, intersection-based heading reveals, poster zoom, visible hover/focus actions, animated dialog and feedback. Reduced-motion preferences disable movement and smooth scrolling.
- Search now matches anywhere in titles, ignores accents and combines with the active genre. Clear/reset and meaningful empty results are available.
- Favorites persist in `localStorage`, update across the catalogue, dialog and collection, and handle unavailable/corrupt storage without crashing.
- Native modal dialog supplies focus trapping and Escape dismissal, restores focus to the opener, supports backdrop dismissal and locks background scroll. Buttons, input labels, skip link, live counts, toast announcements and image fallbacks improve accessibility.

## Technology and dependencies

HTML5, CSS3, **vanilla JavaScript**, native `<dialog>`, IntersectionObserver and localStorage. The original technology stack is retained. No React, Next.js, runtime npm packages, API key, account or backend. Node.js 20+ is only needed for the optional static build.

## Run locally

From this directory:

```sh
python -m http.server 4173
```

Open http://localhost:4173. Alternatively use any static web server. No dependency installation is required.

## Build and deployment

```sh
node --check script.js
node --check films.js
node build.mjs
python -m http.server 4173 --directory dist
```

Publish `dist/` with any HTTPS static host. The portfolio version uses Sites static hosting; `.openai/hosting.json` identifies its Site and the `dist` public directory. Its source is synchronized to the hosting source repository before saving a built archive and deploying. No server runtime is required. To deploy a separate copy as a new Site, remove the existing hosting identity and register a new one; do not reuse another deployment's ID.

`build.mjs` explicitly copies only the runtime files and `assets/`, excluding Git metadata, READMEs, old experiments and hosting source credentials. Never add credentials to source files. Old `image/` assets remain in source history for recovery but are not published.

## Content and limitations

The catalogue is curated static data, not a current film API. It offers discovery and favorites, **not streaming or playback**. Favorites are per-browser and not synchronized between devices. Artwork is film promotional material from the original project and TMDB; see [ASSETS.md](ASSETS.md) for source URLs and rights context. System fonts require no external font requests.

## Validation

See the accompanying `verification.md` deliverable for recorded desktop/mobile and public deployment checks. No framework migration or paid service was used.

## English portfolio description

“Cinévia is an improved personal film-discovery project built with HTML, CSS and vanilla JavaScript. I refined its cinematic visual design, added accessible motion and responsive layouts, and improved combined search, genre filtering and persistent favorites.”
