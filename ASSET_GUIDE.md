# Asset guide — which illustrations to upload

The site works today with painted placeholders. To replace any of them, drop a file with the
**exact name below** into `public/assets/`. No code changes needed.

- The site looks for `name.webp`, then `name.png`, then `name.jpg`. The first one found wins.
- If a file is missing, the placeholder for that spot is shown instead, so you can add art gradually.
- To **hide** a placeholder on purpose (for example a table overlay your background already includes),
  upload a fully transparent PNG with that name.
- Keep every image under about 400 KB (characters under about 250 KB). Phones on mobile data will thank you.
  [squoosh.app](https://squoosh.app) converts to WebP for free.

## 1. Backgrounds (portrait, 9:16)

Export at **1080 × 1920 px**. The site crops to fill the phone screen, so keep important details in the
middle 80% and leave the **bottom 35% calm**, because the story text sits there.

| File name | Chapter | What to paint |
|---|---|---|
| `ch1-cafe-bg` | 1 — One spring evening | Cosy café in March: wooden tables, warm yellow pendant lights, golden glow, spring flowers. **No characters, no signage, no café names.** |
| `ch2-garden-bg` | 2 — Two different worlds | Spring garden with blossoms and open space for two separate paths. No characters. |
| `ch3-restaurant-bg` | 3 — Little moments | Contemporary, warmly lit restaurant with greenery and intimate tables. **No names, logos or signage.** No characters needed. |
| `ch4-conversation-bg` | 4 — She talks, he listens | Soft, warm café corner (blush and gold tones). No characters. |
| `ch5-memories-bg` | 5 — Falling in love | Optional. Ivory paper or scrapbook texture with faint watercolour blossoms. |
| `ch6-sunset-bg` | 6 — Written in the stars | Dreamy sunset garden, fairy lights, blossom trees, first stars. No characters. |
| `ch7-events-bg` | 7 — Wedding celebrations | Optional. Ivory paper with blossom branches in the corners. Keep the middle quiet. |

## 2. Characters (transparent background)

Export as **transparent WebP or PNG**, about **1200 × 1800 px**, cropped tight around the figure.
Each character sits at the **bottom** of its box.

| File name | Chapter | Pose | Facing |
|---|---|---|---|
| `mohak-seated` | 1 | Waist-up, seated at a table | **Right** (towards Krishika) |
| `krishika-seated` | 1 | Waist-up, seated at a table | **Left** (towards Mohak) |
| `ch1-table-front` | 1 | Foreground table with cups, flowers, candles (transparent, 1080 × 600). It covers the characters' lower bodies. Upload a transparent PNG if your background already has the table. | — |
| `mohak-walking` | 2 | Full body, mid-stride | **Right** |
| `krishika-walking` | 2 | Full body, mid-stride | **Left** |
| `krishika-talking` | 4 | Waist-up, animated, laughing, hands gesturing | **Right** |
| `mohak-listening` | 4 | Waist-up, head slightly tilted, gentle smile | **Left** |
| `couple-together` | 6 | Both standing close at sunset (silhouette or soft-lit), about 1400 × 1400 | — |

If you paint **one finished scene that already includes the couple** for chapter 1, 2 or 4, upload it as
that chapter's background and set the matching flag in `src/config.js`:

```js
export const flags = { ch1FullScene: true, ch2FullScene: false, ch4FullScene: false }
```

## 3. Polaroid photos (Chapter 5)

Square, **1000 × 1000 px**, painted in the same style as the rest.

| File name | Moment |
|---|---|
| `polaroid-dessert` | Sharing dessert |
| `polaroid-smiling` | Smiling together |
| `polaroid-delhi` | Exploring Delhi |
| `polaroid-sunset` | Watching sunsets |

## 4. Other files

| Location | Purpose |
|---|---|
| `public/audio/wedding-theme.mp3` | Background music. The speaker button stays off until a guest taps it. Use a song you have the rights to, ideally under 4 MB. |
| `public/og-image.jpg` | WhatsApp / social preview, **1200 × 630 px**, JPG under 300 KB. A simple text version is already included; replace it with your best chapter 1 or 6 painting when ready. |
| `public/favicon.svg` | Browser tab icon (a simple blush heart is included). |

## 5. Keeping Mohak and Krishika looking the same in every picture

The site shows the same two people across seven chapters, so consistency matters more than detail.

1. **Make a character sheet first.** One page per person: front view, three-quarter view, side view, plus a
   close-up of the face. Keep this sheet beside you for every later image.
2. **Lock the signature details:**
   - Mohak: **navy-blue T-shirt** (`#1F2F55`), **glasses**, short dark hair, warm skin tone.
   - Krishika: **blue dress** (`#4D7BBF`), **glasses**, long dark hair, warm skin tone.
3. **Lock the style:** one watercolour brush look, one soft outline weight, one light direction
   (warm golden from above-left) in every chapter.
4. **If you use an image-generation tool:** give it the character sheet as a reference every time, reuse the same
   style description, and generate characters on a plain background so they can be cut out cleanly.
5. **Compare side by side** before uploading. Glasses shape, hair length and dress colour are the first things
   that drift.
6. **Facing direction matters.** The site does not flip your images. Follow the "Facing" column above.

## 6. Quick checklist

- [ ] 7 backgrounds (5 and 7 optional)
- [ ] 8 character files (+ `ch1-table-front`)
- [ ] 4 Polaroids
- [ ] `og-image.jpg`
- [ ] `wedding-theme.mp3`
- [ ] No café, restaurant or brand names, logos or signage anywhere in the artwork
