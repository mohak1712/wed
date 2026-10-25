# #MohgyiKrish — wedding invitation website

A mobile-first, animated storybook invitation for **Mohak & Krishika**.
Built with React, Vite, Tailwind CSS v4 and Motion for React.

What is inside: an opening envelope, seven animated story chapters, floating petals, gentle parallax,
a music button (off by default), a scratch-to-reveal wedding date, five animated invitation cards and
Google Maps buttons for confirmed venues.

## Preview it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
cd mohgyi-krish
npm install
npm run dev
```

Open the **Local** address it prints (usually http://localhost:5173).

**To see it on your phone:** connect the phone to the same Wi-Fi, then open the **Network** address that
`npm run dev` prints (something like `http://192.168.1.20:5173`).

To test the production version exactly as guests will see it:

```bash
npm run build
npm run preview
```

## Change the text, dates and venues

Everything is in **`src/config.js`**:

- Story lines for each chapter (`story`)
- The five events (`events`) — set `time` and `venue` when confirmed and the card updates automatically.
  A **Google Maps button appears by itself** for any event that has `venue.address`.
- The Polaroid captions (`polaroids`)

Example:

```js
{ id: 'engagement', icon: 'rings', title: 'Engagement', iso: '2026-11-18',
  time: '6 PM onwards',
  venue: { name: 'Venue name', address: 'Full street address, City' },
  accent: '#E39AAB' }
```

## Add your own illustrations and music

See **[ASSET_GUIDE.md](./ASSET_GUIDE.md)** for exact file names and sizes. Drop files into `public/assets/`
and `public/audio/` and refresh. Missing files keep showing the placeholders.

## Publish it

1. Decide the final web address (for example `https://mohgyi-krish.netlify.app`).
2. Open **`.env.production`** and replace `https://YOUR-SITE-ADDRESS` with it (no trailing slash).
   This makes the WhatsApp preview picture work.
3. Run `npm run build`. The finished site is in the **`dist`** folder.
4. Upload `dist` to any static host. Three easy options:
   - **Netlify** — go to app.netlify.com/drop and drag the `dist` folder onto the page.
   - **Vercel / Cloudflare Pages** — connect the folder or Git repository. Build command `npm run build`,
     output folder `dist`.
   - **GitHub Pages** — push the repository, then publish the contents of `dist`.
     (Asset paths are relative, so it works inside a sub-folder too.)

### Before sharing on WhatsApp

- Add `public/og-image.jpg` (1200 × 630) so the link shows a pretty preview.
- Share the **final https address**. WhatsApp caches previews, so if you change the picture later, add a
  `?v=2` to the link to force a fresh preview.
- Open the link on a real phone once and check: envelope, scrolling, the scratch card and the music button.

## Project layout

```
src/
  config.js            names, story text, events, venues
  App.jsx              envelope → chapters → petals + music button
  chapters/            Chapter1 … Chapter7
  components/
    Envelope.jsx       opening animation
    Scene.jsx          one storybook page (parallax, iris reveal, ribbon)
    Person.jsx         placeholder figure shared by both characters
    ScratchCard.jsx    scratch-to-reveal date
    EventCard.jsx      animated invitation card
    MusicToggle.jsx    music on/off (muted by default)
    placeholders/      painted placeholder scenes
public/
  assets/              your illustrations
  audio/               wedding-theme.mp3
```

## Notes

- Animations respect the phone's "reduce motion" setting.
- The site never shows or names any café or restaurant. Keep it that way in custom artwork.
