// ─────────────────────────────────────────────────────────────
//  CLUB SETTINGS — edit this file first.
//  Everything that says "Quant Club" or "University" on the site
//  comes from here, so you only change it once.
// ─────────────────────────────────────────────────────────────

export const club = {
  name: 'Lehigh University Quant Club',
  shortName: 'Lehigh Quant Club',
  school: 'Lehigh University',
  tagline: 'Probability, markets, and code — learned by doing.',
  description:
    'A student organization for anyone curious about quantitative finance: ' +
    'trading games, research projects, interview prep, and talks from people in the industry.',

  email: 'quantclub@example.edu',

  // GroupMe invite link for the "Join GroupMe" buttons
  groupmeUrl: 'https://groupme.com/join_group/106715228/X8A9zme6',

  // Where and when general meetings happen
  meetings: 'Wednesdays, 4:30 PM',

  // Optional: official Lehigh logo file for student organizations.
  // Put the file in public/ (e.g. public/lehigh-logo.svg) and set the path here.
  // Leave '' to show the university name as text instead.
  schoolLogo: '',

  // Leave a link as '' to hide it
  social: {
    linkedin: 'https://www.linkedin.com/company/lehigh-mountain-quants/',
    github: '',
    instagram: '',
    discord: '',
  },
};

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/events/', label: 'Meetings' },
  { href: '/projects/', label: 'Research' },
  { href: '/resources/', label: 'Resources' },
  { href: '/sponsors/', label: 'Sponsors' },
];
