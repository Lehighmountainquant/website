// Prefix internal links with the site's base path (needed when the site
// is served from https://<org>.github.io/<repo>/ instead of the root).
export function url(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = {}): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
    ...opts,
  });
}

export function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
  });
}

// Seeded random numbers in [0, 1) for the decorative homepage art.
// Same seed → same picture on every build, so the page doesn't "jump".
export function seeded(seed = 42): () => number {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}
