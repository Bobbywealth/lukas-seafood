# Lukas' Seafood · Steak · Bar (Warren, NJ)

Restaurant marketing site for Lukas' Seafood, Steak & Bar.

## Live

**https://lukas-seafood.netlify.app/**

## Hosting / deploy pipeline

| Piece | Where |
|---|---|
| Source | This repo (`Bobbywealth/lukas-seafood`), branch `main` |
| Host | Netlify project `lukas-seafood` (team `bobbycraig1293`) |
| Deploy trigger | GitHub push to `main` -> Netlify auto-deploy |
| Build command | none (static site) |
| Publish directory | `.` (repo root) |

To change the site: edit the files here, commit, push. Netlify rebuilds automatically.

## Structure

- `index.html` - the whole page (markup + inline CSS/JS references)
- `style.css` - all styling
- `hero-photos.js` - hero photo rotator
- `assets/` - 12 WebP photos + `manrope-latin.woff2` font

No build step, no dependencies, no database.

## Notes

- Source was extracted from the ChatGPT Sites artifact `appgprj_6afaa272413c819187bad3a4d4484016`
  (published at `https://lukas-seafood-2027.bobbywealth.chatgpt.site/`).
- The Cloudflare bot-check script that ChatGPT injects into the published copy was removed; it is
  hosting infrastructure, not site code.
- `index.html` still carries `<meta name="robots" content="noindex">` from the ChatGPT copy, so
  search engines will not index the site. Delete that one line to make it indexable.
