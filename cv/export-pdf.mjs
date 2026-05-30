// Export cv.html to a print-perfect A4 PDF using playwright-core.
// Run: node cv/export-pdf.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { copyFileSync } from 'node:fs';
import { homedir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, 'cv.html');
const outPath = join(here, 'cv.pdf');
const homeCopy = join(homedir(), 'CV_LautaroWaltersdorf.pdf');

const executablePath = join(
  homedir(),
  '.cache/ms-playwright/chromium-1223/chrome-linux64/chrome'
);

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();

copyFileSync(outPath, homeCopy);
console.log('Wrote', outPath, 'and', homeCopy);
