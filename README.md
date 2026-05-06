# Daily Goods Co. — Design System & UI Kits

Brand, design system, and clickable UI kits for **Daily Goods Co.**, a modern grocery and pantry-supply service for households, sari-sari stores, restaurants, and resellers.

This repo contains:

- **`colors_and_type.css`** — design tokens (colors, type, spacing, radii, shadows, easings)
- **`assets/`** — logos, category icons, brand marks
- **`preview/`** — design-system preview cards (Type, Colors, Spacing, Components, Brand)
- **`ui_kits/storefront/`** — clickable customer-facing site (Home, Shop, Product, Cart, Checkout, Tracking, About, Contact, Wholesale)
- **`ui_kits/admin/`** — admin dashboard kit
- **`SKILL.md`** — guidance for working in this design system

---

## Quick preview

Everything is static HTML + CSS + JSX-via-Babel. **No build step.**

### Option A — open directly
Open any `index.html` in a browser. Some browsers restrict local-file fetches, so if assets don't load, use Option B.

### Option B — local server (recommended)

```bash
# from the repo root, pick whichever you have:
python3 -m http.server 8000
# or
npx serve .
```

Then visit:

- Storefront → http://localhost:8000/ui_kits/storefront/
- Admin → http://localhost:8000/ui_kits/admin/
- Design-system preview → http://localhost:8000/preview/

---

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. **Settings → Pages**
3. **Source:** Deploy from a branch → `main` → `/ (root)` → Save
4. Wait ~1 minute. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/ui_kits/storefront/
   ```

---

## Project structure

```
.
├── colors_and_type.css        # Design tokens
├── README.md
├── SKILL.md
├── assets/                    # Logos, icons, brand marks
├── preview/                   # Design-system preview cards
└── ui_kits/
    ├── storefront/            # Customer-facing site
    │   ├── index.html
    │   ├── components-core.jsx
    │   ├── components-shop.jsx
    │   └── screens.jsx
    └── admin/                 # Admin dashboard
        └── index.html
```

---

## Tech notes

- **React 18** + **Babel Standalone** loaded from CDN — no bundler required
- **Inter** (UI/body) and **Fraunces** (headings) loaded from Google Fonts
- All design tokens are CSS custom properties in `colors_and_type.css` — change once, propagate everywhere

---

## License

© 2026 Daily Goods Co.. All rights reserved.
