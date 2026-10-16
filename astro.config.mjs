import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

// SITE and BASE are set automatically by the GitHub Actions deploy workflow.
// - Repo named <org>.github.io  → site at https://<org>.github.io/      (BASE = /)
// - Any other repo name         → site at https://<org>.github.io/<repo>/ (BASE = /<repo>)
export default defineConfig({
  site: process.env.SITE || 'https://your-club-org.github.io',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  markdown: {
    // LaTeX math in research write-ups: $inline$ and $$display$$
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
