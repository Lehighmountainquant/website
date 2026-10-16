import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each folder in src/content/ is a "collection". The schema below is the
// list of fields every file in that folder must have at the top (frontmatter).
// If someone forgets a required field, the build fails with a clear message.

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(), // day of the meeting, e.g. 2026-11-04
    speaker: z.string().optional(),
    slides: z.string().optional(), // path in /public, e.g. /slides/options-101.pdf
    photos: z.array(z.string()).default([]), // paths in /public, e.g. /events/2026-11-04/1.jpg
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    code: z.string().url().optional(), // link to a GitHub repo or notebook
    draft: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number().default(99), // lower numbers show first
    year: z.string().optional(), // e.g. "Class of 2027"
    major: z.string().optional(),
    photo: z.string().optional(), // path in /public, e.g. /team/jane.jpg
    linkedin: z.string().url().optional(),
  }),
});

export const collections = { events, projects, team };
