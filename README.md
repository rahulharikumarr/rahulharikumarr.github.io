# rahulharikumarr.github.io

My portfolio, as a trip into the Matrix. Scroll plays it like a film.

- The code rains behind everything (`src/rain.ts`, a canvas of mirrored
  katakana) and, on the first screen, holds still inside the letters of my name.
- Each scene borrows one moment from the film: the pills, the Construct, agents,
  the spoon, the déjà vu cat, the red dress, the kung fu upload, the exit.
- `index.html` holds every scene and all of the words. Edit copy here.
- `src/main.ts` is the scroll engine. A scene's `data-len` is how many
  screen-heights of scroll it lasts. `data-in="0.2 0.5"` on an element means it
  arrives between 20% and 50% of its scene, and `data-decode` makes its text
  resolve out of scrambled characters.
- `src/style.css` is the look. With reduced motion on, or without JavaScript,
  the same page reads as a plain column of screens.
- `public/assets/` is served as-is at `/assets/`.

## Run it

```bash
npm install
npm run dev
```

Pushing to `main` builds and deploys to GitHub Pages.
