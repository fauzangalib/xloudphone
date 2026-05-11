const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

/**
 * Buka Chromium dengan session tersimpan per akun.
 * Session disimpan di ./user-data/<accountId>/
 *
 * @param {string} accountId  - ID akun (misal: "akun01")
 * @param {boolean} headless  - false = tampilkan browser
 */
async function launch({ accountId, headless = false }) {
  const userDataDir = path.resolve(__dirname, '..', 'user-data', accountId);
  fs.mkdirSync(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless,
    viewport: { width: 1280, height: 800 },
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const page = context.pages()[0] || (await context.newPage());
  return { context, page };
}

module.exports = { launch };
