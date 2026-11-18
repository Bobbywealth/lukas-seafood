# Lukas’ Seafood · Steak · Bar — Warren, NJ

A rebuilt site for **Lukas’ Seafood & Grille**, 61C Mountain Blvd, Warren, NJ 07059.

Live: **https://lukas-seafood.netlify.app/** · Menus: **https://lukas-seafood.netlify.app/menus.html**

> **Status: preview build.** The site is `noindex` on purpose and has not been shown to the
> restaurant. Phone number is intentionally not published yet — reservations run through
> OpenTable, catering through ezCater, and the site email is `lukaswarrennj@gmail.com`.

## Structure

| File | What it is |
|---|---|
| `index.html` | Long-form home: hero, house story, signature dishes, steaks & chops, prix fixe, the bar, our story, brunch / private dining / catering, gallery, guest ratings, visit |
| `menus.html` | The full menu as HTML — soups, salads, appetizers, steaks & chops, entrées, complements, sides, sauces, prix fixe, cocktails, martinis, draft beer, wine & champagne, after-dinner drinks, soft drinks — plus the printed menu scans |
| `style.css` | The whole design system: ink / gold / cream / brick, Cormorant Garamond + Lora, self-hosted |
| `site.js` | Sticky header, mobile nav, scroll reveal, gallery lightbox |
| `assets/fonts/` | Self-hosted Cormorant Garamond + Lora (latin subset woff2) + `fonts.css` |
| `assets/img/` | 98 responsive WebP images (900/480 cards, 1600/960 heroes, 1200 print scans) + `manifest.json` |

## Where the content came from

The **menu, prices and brand copy are transcribed from the restaurant's own printed menus**
(photo scans in the project asset library) and its own site copy — soups, salads, appetizers,
steaks & chops with prices, entrées, complements, sauces, the $45 prix fixe (Sunday–Thursday),
cocktails with recipes, martinis, draft beer, after-dinner drinks, wine list, happy hour
(Mon–Fri 4:30–6:30) and weekend brunch (Sat–Sun 11a–2p).

Hours are published as the most commonly listed set (Google + Apple Maps agreement) with a
note that weekend and holiday hours can shift — the four public listings disagree, so the
owner should confirm before launch.

## Deploy

Netlify auto-deploys from `main`. Build command: empty. Publish directory: `.`.
Nothing to configure — it is a static site.

## Regenerating the pages

The HTML is generated from a manifest so every `<img>` carries a correct `srcset`, `width`
and `height`:

```
python3 tmp/build_assets.py     # fonts + WebP variants -> assets/img + manifest.json
python3 tmp/gen_index.py        # -> index.html
python3 tmp/gen_menus.py        # -> menus.html
```

(Scripts live in the Aside session workspace, not in this repo.)
