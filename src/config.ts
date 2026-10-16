// ─────────────────────────────────────────────────────────────
//  CLUB SETTINGS — edit this file first.
//  Everything that says "Quant Club" or "University" on the site
//  comes from here, so you only change it once.
// ─────────────────────────────────────────────────────────────

export const club = {
  name: 'Quantitative Finance Club',
  shortName: 'QFC',
  school: 'University',
  tagline: 'Probability, markets, and code — learned by doing.',
  description:
    'A student organization for anyone curious about quantitative finance: ' +
    'trading games, research projects, interview prep, and talks from people in the industry.',

  email: 'quantclub@example.edu',

  // Google Form (or mailing-list) link for the "Join" button
  joinUrl: 'https://forms.gle/your-form-id',

  // Where and when general meetings happen
  meetings: 'Wednesdays, 7:00 PM · Room TBD',

  // Leave a link as '' to hide it
  social: {
    github: 'https://github.com/your-club-org',
    linkedin: '',
    instagram: '',
    discord: '',
  },
};

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/events/', label: 'Events' },
  { href: '/projects/', label: 'Research' },
  { href: '/resources/', label: 'Resources' },
  { href: '/sponsors/', label: 'Sponsors' },
];
