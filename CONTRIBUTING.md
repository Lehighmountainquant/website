# Updating the website

Everything below can be done **in the browser on GitHub** — no installs needed.
Open the repo, navigate to the folder, and use **Add file → Create new file** (or click a file, then the ✏️ pencil to edit). Click **Commit changes** and the site updates in about a minute.

The easiest way to add something new is to **copy an existing file** in the same folder and change it.

---

## Add an event

Create `src/content/events/2026-11-04-short-name.md`:

```md
---
title: "Options 101 Workshop"
date: 2026-11-04T19:00:00-05:00
location: "Room 101"
type: Workshop
speaker: "Optional — delete this line if none"
rsvp: "https://forms.gle/... (optional)"
slides: "/slides/options-101.pdf (optional, add after the event)"
---
One or two sentences describing the event.
```

- `type` must be one of: `Speaker`, `Workshop`, `Competition`, `Social`, `General Meeting`
- Date format is `YYYY-MM-DDTHH:MM:SS` then the time zone: `-04:00` during daylight saving (mid-March → early November), `-05:00` otherwise.
- Events move from "Upcoming" to "Past" automatically.

## Add slides from a workshop

1. Upload the PDF to `public/slides/` (Add file → Upload files).
2. Add `slides: "/slides/your-file.pdf"` to that event, and/or list it in `src/pages/resources.astro` under `workshops`.

## Add or update an officer

Create or edit a file in `src/content/team/`:

```md
---
name: "Jane Doe"
role: "Treasurer"
order: 5            # lower numbers appear first
major: "Economics"
year: "Class of 2028"
photo: "/team/jane-doe.jpg"            # optional — upload to public/team/
linkedin: "https://www.linkedin.com/in/..."   # optional
---
A one- or two-sentence bio.
```

When officers graduate, delete their file.

## Publish a research write-up

Create `src/content/projects/short-name.md`:

```md
---
title: "Your Project Title"
summary: "One sentence describing what you did and found."
authors: ["Name One", "Name Two"]
date: 2026-12-01
tags: ["volatility", "python"]
code: "https://github.com/..."   # optional
draft: true                       # remove this line when ready to publish
---

Write in normal Markdown. Math works with dollar signs: $f^* = p - q/b$,
or on its own line with $$ ... $$. Code blocks get syntax highlighting.
```

## Change the club info, meeting time, or join link

Edit `src/config.ts`.

## Something broke?

Open the **Actions** tab. A red ✗ means the last change has an error — click it to see which file and line. The most common causes are a missing quote, a misspelled field name, or a `type` that isn't in the allowed list. The live site stays on the last working version until it's fixed.

---

**Each semester:** check that the team page, meeting time, and join link are current. Assign one officer to own the site.
