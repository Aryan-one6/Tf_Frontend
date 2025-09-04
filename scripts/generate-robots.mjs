import { writeFileSync, mkdirSync } from 'fs';

const PROD = process.env.NODE_ENV === 'production';
const BASE = 'https://triadflair.com';

const lines = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin/',
  'Disallow: /api/private/',
  `Sitemap: ${BASE}/sitemap.xml`,
  ''
];

mkdirSync('public', { recursive: true });
writeFileSync('public/robots.txt', lines.join('\n'), 'utf8');
console.log('✅ robots.txt written to public/robots.txt');
