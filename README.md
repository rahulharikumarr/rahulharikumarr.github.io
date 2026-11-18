# rahulharikumarr.github.io

My portfolio, written as a README that renders itself as you scroll.

Every piece of the page starts as its markdown source, typed in mono, and then
renders: a heading, a checklist, a table, a code block, an image, a link.

- `index.html` holds every section and all of the words. Each `.rx` element has
  the markdown source (`.rx__raw`) and what it renders to (`.rx__out`). Edit copy here.
- `src/main.ts` is the scroll engine. A scene's `data-len` is how many
  screen-heights of scroll it lasts. `data-in="0.2 0.5"` on an element means it
  types and renders between 20% and 50% of its scene.
- `src/style.css` is the look. With reduced motion on, or without JavaScript,
  the same page reads as a plain column of screens.
- `public/assets/` is served as-is at `/assets/`.

## Run it

```bash
npm install
npm run dev
```

Pushing to `main` builds and deploys to GitHub Pages.
