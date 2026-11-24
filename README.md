# Lukas’ Seafood · Steak · Bar — Warren, NJ

A rebuilt site for **Lukas’ Seafood & Grille**, 61C Mountain Blvd, Warren, NJ 07059.

Live: **https://lukas-seafood.netlify.app/** · Menus: **https://lukas-seafood.netlify.app/menus.html**

> **Status: preview build.** The site is `noindex` on purpose and has not been shown to the
> restaurant. Phone number is intentionally not published yet — reservations run through
> OpenTable, catering through ezCater, and the site email is `lukaswarrennj@gmail.com`.

## Structure

| File | What it is |
|---|---|
| `index.html` | Long-form home: hero, menu preview, signature dishes, steaks & chops, the bar, prix fixe, our story, private dining & catering, gallery, guest ratings, visit |
| `menus.html` | The full menu as HTML — soups, salads, appetizers, steaks & chops, entrées, complements, sides, sauces, prix fixe, cocktails, martinis, draft beer, wine & champagne, after-dinner drinks, soft drinks — plus the printed menu scans |
| `style.css` | The whole design system: ink `#111312` / panel `#1b1f1c` / warm off-white text, lime accent `#d8f0a3`, warm `--warm #f0a35c`, Manrope 400–800, self-hosted |
| `site.js` | Mobile menu, today's-hours computation, scroll reveal, hero parallax, gallery lightbox |
| `hero-photos.js` | Hero photo picker (dining room / table / bar) with a crossfade |
| `_headers` | Netlify headers — immutable caching for `assets/img/*`, security headers |
| `404.html` | Not-found page in the site’s own design |
| `assets/fonts/` | Self-hosted Manrope (latin subset woff2) + `fonts.css` |
| `assets/img/` | Responsive WebP images + `manifest.json` (name → variants + dimensions) |

## Where the content came from

The **menu, prices and brand copy are transcribed from the restaurant's own printed menus**
(photo scans in the project asset library) and its own site copy — soups, salads, appetizers,
steaks & chops with prices, entrées, complements, sauces, the $45 prix fixe (Sunday–Thursday),
cocktails with recipes, martinis, draft beer, after-dinner drinks, wine list, happy hour
(Mon–Fri 4:30–6:30) and weekend brunch (Sat–Sun 11a–2p).

Hours are published as the most commonly listed set (Google + Apple Maps agreement) with a
note that weekend and holiday hours can shift — the four public listings disagree, so the
owner should confirm before launch.

## ⚠️ Changing an image

`_headers` serves `assets/img/*` as **`immutable` for a year**, and the site references images
**by name, not by hash**. So:

> **To change a picture, write it to a NEW filename** and update the reference.
> Reusing an existing name will leave the old picture pinned in every visitor's cache.

The same applies to `assets/img/manifest.json` — add a new entry rather than editing an
existing key in place.

## ⚠️ The Python generators are STALE — do not run them

`gen_index.py` / `gen_menus.py` / `build_assets.py` live in the 2026-11-18 Aside session
workspace (not in this repo) and still emit the **old serif-and-gold design that was
rejected and reverted** in commit `8028973`. Running any of them would overwrite the current
site and undo every correction since.

**Edit `index.html`, `menus.html`, `style.css`, `site.js` and `hero-photos.js` directly** —
that is what every commit since the revert has done.

## Photo provenance

The dining and gallery photos come from the restaurant's own site, its own Instagram, and
review platforms (Google, Yelp, OpenTable, TripAdvisor). Some of those carries a **third-party
watermark burned into the pixels**; those files were removed and replaced with clean
alternatives from the same library. **Do not re-introduce a watermarked file** — check a
replacement at a decent size before adding it, because the watermark is easy to miss in a
small thumbnail.

## Deploy

Netlify auto-deploys from `main`. Build command: empty. Publish directory: `.`.
Nothing to configure — it is a static site. A push goes live in roughly 10 seconds.
