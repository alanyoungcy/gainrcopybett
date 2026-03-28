const { chromium } = require('playwright');
const fs = require('fs');

const viewports = [
  { name: 'mobile', width: 430, height: 932, scale: 2 },
  { name: 'tablet', width: 1024, height: 1366, scale: 2 },
  { name: 'desktop', width: 1440, height: 900, scale: 1 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const base = 'http://localhost:3847';
  const outDir = '/Volumes/Orico/code/ncode/frontendskilltest/gainr/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const vp of viewports) {
    console.log(`\n── ${vp.name} (${vp.width}x${vp.height}) ──`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.scale,
    });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Screenshot each tab
    const tabs = ['Discover', 'Markets', 'Portfolio', 'Profile'];
    for (const tabName of tabs) {
      // On mobile: use the visible bottom nav; on larger: use header nav
      if (vp.name === 'mobile') {
        // Bottom nav is the last <nav> on the page
        const btn = page.locator(`nav.fixed button:has-text("${tabName}")`);
        await btn.click();
      } else {
        // Header nav buttons
        const btn = page.locator(`header nav button:has-text("${tabName}")`);
        await btn.click();
      }
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const filename = `${vp.name}_${tabName.toLowerCase()}.png`;
      await page.screenshot({ path: `${outDir}/${filename}`, fullPage: true });
      console.log(`  ✓ ${filename}`);
    }

    // Interaction test: open bet slip on Markets tab
    if (vp.name === 'mobile') {
      await page.locator('nav.fixed button:has-text("Markets")').click();
    } else {
      await page.locator('header nav button:has-text("Markets")').click();
    }
    await page.waitForTimeout(500);
    const yesBtn = page.locator('button:has-text("Yes")').first();
    await yesBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${outDir}/${vp.name}_betslip.png`, fullPage: true });
    console.log(`  ✓ ${vp.name}_betslip.png`);

    await ctx.close();
  }

  await browser.close();
  console.log('\n✅ All viewport screenshots saved.');
})();
