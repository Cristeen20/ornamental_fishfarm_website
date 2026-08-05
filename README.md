# Quality Ornamental Fish Farm — website

Static marketing site for Quality Ornamental Fish Farm (guppy breeder and wholesaler,
Kerala, India). No build step, no dependencies — three files do the whole job.

```
index.html          all page content and text
styles.css          all styling
script.js           menu, strain filter, scroll reveal, WhatsApp enquiry
assets/fish/        real guppy photos used in the strain cards
assets/videos/      video thumbnails for the YouTube section
assets/farm-visit.jpg  photo used in the About section
vercel.json         caching + security headers for Vercel
```

## Run it locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 3000    # then visit http://localhost:3000
```

## Where the images came from

The Facebook page is login-walled, so nothing could be pulled from it. Every image on
the site is a still from the farm's own YouTube channel
([@qualityornamentalfishfarm](https://www.youtube.com/@qualityornamentalfishfarm)),
cropped to 16:9 and re-encoded:

| File | Source video |
|---|---|
| `assets/fish/super-full-red.jpg` | Super Full Red |
| `assets/fish/yellow-taxi.jpg` | New Yellow Taxi |
| `assets/farm-visit.jpg` | FARM VISIT, Customers meet 2019 |
| `assets/videos/*.jpg` | the nine videos linked in the Videos section |

## ⚠️ Placeholders to replace before going live

Search `index.html` for each string and replace it:

| Placeholder | Where it appears | Replace with |
|---|---|---|
| `910000000000` | WhatsApp links (contact section, floating button) | Your WhatsApp number in international format, no `+` or spaces — e.g. `919876543210` |
| `+91 00000 00000` / `tel:+910000000000` | Contact section + JSON-LD | Your display phone number |
| `qualityornamentalfishfarm@gmail.com` | Contact section + JSON-LD | Your real email |
| `Farm address line, Your town, Kerala 000000` | Contact section + JSON-LD | Your farm address |
| `https://ornamentalfishfarmwebsite.vercel.app/` | `og:url`, `og:image`, JSON-LD | Your final domain |

The enquiry form reads the WhatsApp number from the floating button's link, so updating
the number in `index.html` is enough — `script.js` needs no edits.

**Also check the strain list.** The eleven cards under "Our Guppies" cover the strains a
Kerala guppy farm usually runs, but only Super Full Red and Yellow Taxi are confirmed
from the channel. Delete, rename or add cards so the list matches what you actually breed.

## Adding your own photos

Nine of the strain cards still use CSS colour panels. To swap one for a real photo, drop
the file in `assets/fish/` and replace the placeholder div:

```html
<!-- before -->
<div class="fish-art art-blue-grass" aria-hidden="true"></div>

<!-- after -->
<div class="fish-art">
  <img src="assets/fish/blue-grass.jpg" alt="Blue Grass guppy" loading="lazy">
</div>
```

The CSS already handles sizing and cropping. Export photos around 640×360 and under
~100 KB so the page stays fast:

```bash
ffmpeg -i original.jpg -vf "scale=640:360:force_original_aspect_ratio=increase,crop=640:360" -q:v 4 assets/fish/blue-grass.jpg
```

## Deploying to Vercel

```bash
npx vercel@latest --prod
```

Or connect the Git repository at [vercel.com/new](https://vercel.com/new) — framework
preset **Other**, no build command, output directory `.`. Every push to `main` then
deploys to production automatically.
