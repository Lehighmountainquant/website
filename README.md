# Quant Club Website

The club's website, built with [Astro](https://astro.build) and hosted free on GitHub Pages.

**Updating content?** You don't need to read this file — see [CONTRIBUTING.md](CONTRIBUTING.md).

## First-time setup (do this once)

### 1. Make it yours

Open `src/config.ts` and replace the placeholders: club name, school, email, meeting time, and social links. Then replace the sample files in `src/content/` (events, team, research) with real ones.

### 2. Create the club's GitHub organization

1. Go to github.com → your profile picture → **Your organizations** → **New organization** → choose the **Free** plan.
2. Pick a name, e.g. `yourschool-quant`. This becomes your web address.
3. Invite every officer as an **Owner**, so access never depends on one person.

### 3. Create the repository and push

Name the repo **`<org-name>.github.io`** (e.g. `yourschool-quant.github.io`). The site will then live at `https://yourschool-quant.github.io/`.
(Any other repo name works too — the site will just be at `https://<org>.github.io/<repo>/`.)

```bash
cd quant-club-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<org-name>/<org-name>.github.io.git
git push -u origin main
```

### 4. Turn on GitHub Pages

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Then open the **Actions** tab — the first deploy runs automatically and takes about a minute. After that, every push to `main` updates the site.

## Running it on your own computer (optional)

Requires [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
npm run dev      # live preview at http://localhost:4321
npm run build    # production build into dist/
```

## How it's organized

```
src/
├── config.ts          ← club name, email, links, nav menu
├── content/
│   ├── events/        ← one .md file per meeting recap
│   ├── projects/      ← research write-ups (supports LaTeX math & code)
│   └── team/          ← one .md file per officer
├── pages/             ← one file per page (about, events, resources, sponsors…)
├── components/        ← header, footer, event card
├── layouts/Base.astro ← shared page shell
└── styles/global.css  ← colors & fonts (change --accent to re-theme)
public/                ← images, slide PDFs, favicon (served as-is)
```

## Custom domain later

If the club buys a domain: add a file `public/CNAME` containing just the domain (e.g. `yourschoolquant.org`), set it under **Settings → Pages → Custom domain**, and add the DNS records GitHub shows you.
