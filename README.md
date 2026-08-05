# Quality Ornamental Fish Farm — website

Static marketing site for Quality Ornamental Fish Farm (Kerala, India).
No build step, no dependencies — three files do the whole job.

```
index.html      all page content and text
styles.css      all styling
script.js       menu, gallery filter, scroll reveal, WhatsApp enquiry
assets/         favicon (add photos here)
vercel.json     caching + security headers for Vercel
```

## Run it locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 3000    # then visit http://localhost:3000
```

## ⚠️ Placeholders to replace before going live

The Facebook page is login-walled, so the real contact details could not be read
from it. Everything below is a placeholder — search `index.html` for each string
and replace it:

| Placeholder | Where it appears | Replace with |
|---|---|---|
| `910000000000` | WhatsApp links (3×: hero-to-contact button, contact section, floating button) and the JSON-LD block | Your WhatsApp number in international format, no `+` or spaces — e.g. `919876543210` |
| `+91 00000 00000` / `tel:+910000000000` | Contact section | Your display phone number |
| `qualityornamentalfishfarm@gmail.com` | Contact section + JSON-LD | Your real email |
| `Farm address line, Your town, Kerala 000000` | Contact section + JSON-LD | Your farm address |
| `Since 2015` / `10 yrs` / `40+` | Hero | Your real founding year and numbers |
| `https://qualityornamentalfishfarm.vercel.app/` | `og:url` + JSON-LD image | Your final domain |
| Review quotes in `#reviews` | Reviews section | Real customer reviews (or delete the section) |

The enquiry form reads the WhatsApp number from the floating button's link, so
updating the number in `index.html` is enough — `script.js` needs no edits.

## Adding real photos

The fish cards currently use CSS gradient panels (`.fish-art`) so the site works
with zero images. To use photos instead, drop them in `assets/` and swap the
gradient div for an image, e.g.:

```html
<div class="fish-art"><img src="assets/guppy.jpg" alt="Full red guppy" loading="lazy"></div>
```

then add to `styles.css`:

```css
.fish-art img { width: 100%; height: 100%; object-fit: cover; }
```

Keep photos under ~300 KB each (export at 1200 px wide) so the page stays fast.

## Deploying to Vercel

```bash
npx vercel@latest login      # once
npx vercel@latest            # preview deployment
npx vercel@latest --prod     # production
```

Or connect the Git repository at [vercel.com/new](https://vercel.com/new) —
framework preset **Other**, no build command, output directory `.`. Every push
to `main` then deploys to production automatically.
