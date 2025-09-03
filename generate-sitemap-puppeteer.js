import puppeteer from 'puppeteer';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import fetch from 'node-fetch';
import https from 'https';

const BASE_URL = 'https://triadflair.com';
const sitemapPath = resolve('public', 'sitemap.xml');

const visited = new Set();
const queue = [
  `${BASE_URL}/`,
  `${BASE_URL}/blog` // <-- forces crawl to start here and discover all posts
];

function pingGoogle() {
  const sitemapUrl = encodeURIComponent(`${BASE_URL}/sitemap.xml`);
  https.get(`https://www.google.com/ping?sitemap=${sitemapUrl}`, res => {
    console.log(`📣 Pinged Google: ${res.statusCode}`);
  });
}

async function crawl() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
      await new Promise(resolve => setTimeout(resolve, 9000));
      await page.screenshot({ path: `screenshot-${visited.size}.png`, fullPage: true });

      visited.add(url);
      console.log('✅ Crawled:', url);

      const links = await page.$$eval('a[href^="/"]', anchors =>
        anchors.map(a => a.href)
      );

      links.forEach(link => {
        const full = new URL(link, BASE_URL).href;
        if (!visited.has(full) && !queue.includes(full)) {
          queue.push(full);
        }
      });

    } catch (e) {
      console.warn('⚠️ Failed to crawl:', url, '\n', e.message);
    }
  }

  await browser.close();
}

async function generateSitemap() {
  await crawl();

  // 🔁 Inject dynamic blog pages BEFORE writing the sitemap
  try {
    const res = await fetch('https://triadflair.com/blog');
    const blogs = await res.json();

    blogs.forEach(blog => {
      const blogUrl = `${BASE_URL}/blog/${blog.slug}`;
      if (!visited.has(blogUrl)) {
        visited.add(blogUrl);
        console.log('📄 Injected blog:', blogUrl);
      }
    });
  } catch (e) {
    console.warn('⚠️ Failed to fetch dynamic blog routes:', e.message);
  }

  if (visited.size === 0) {
    throw new Error('No pages were crawled. Exiting...');
  }

  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream(sitemapPath);
  sitemap.pipe(writeStream);

  visited.forEach(url => {
    const relative = url.replace(BASE_URL, '') || '/';
    sitemap.write({ url: relative, changefreq: 'weekly', priority: 0.8 });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log(`🎉 Sitemap generated with ${visited.size} pages → ${sitemapPath}`);

  // 📣 Ping Google after generation
  pingGoogle();
}

generateSitemap().catch(err => {
  console.error('❌ ERROR:', err.message);
  process.exit(1);
});