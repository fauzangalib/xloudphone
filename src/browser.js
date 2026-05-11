const { chromium } = require('playwright');
const path = require('path');

/**
 * Open a Chromium instance that persists cookies/localStorage to ./user-data.
 * After you log in once, subsequent runs reuse the same session.
 */
async function launch({ headless = false } = {}) {
  const userDataDir = path.resolve(__dirname, '..', 'user-data');
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless,
    viewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const page = context.pages()[0] || (await context.newPage());
  return { context, page };
}

module.exports = { launch };
