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

// Seeded random walk for the decorative price-path on the homepage.
// Same seed → same path on every build, so the page doesn't "jump".
export function randomWalk(n: number, seed = 42): number[] {
  let s = seed;
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const out = [0];
  for (let i = 1; i < n; i++) {
    // Box–Muller for a normal step, plus a slight upward drift
    const u = Math.max(rand(), 1e-9), v = rand();
    const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    out.push(out[i - 1] + 0.04 + z);
  }
  return out;
}
