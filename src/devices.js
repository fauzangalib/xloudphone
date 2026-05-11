const { launch } = require('./browser');

/**
 * Device management skeleton. Run: npm run devices
 *
 * This script assumes you have already run `npm run login` so the session
 * in ./user-data is authenticated.
 *
 * TODO: The selectors below are placeholders. Once we inspect the real
 * dashboard DOM we will replace them with the actual ones.
 */
(async () => {
  const { context, page } = await launch({ headless: false });

  await page.goto('https://app.xcloudphone.com', { waitUntil: 'domcontentloaded' });

  // Give the SPA a moment to hydrate
  await page.waitForLoadState('networkidle').catch(() => {});

  // --- Placeholder: list devices on the page ------------------------------
  // Replace '[data-testid="device-card"]' with the real selector after we
  // inspect the dashboard.
  const deviceCards = await page.locator('[data-testid="device-card"]').all();
  console.log(`Found ${deviceCards.length} device(s).`);

  for (const card of deviceCards) {
    const name = (await card.innerText()).split('\n')[0];
    console.log(' -', name);
  }

  // --- Placeholder: example action ---------------------------------------
  // await page.getByRole('button', { name: 'Start' }).first().click();
  // await page.waitForTimeout(2000);

  await context.close();
})();
