const { launch } = require('./browser');

/**
 * One-time manual login.
 * Run: npm run login
 * A Chromium window will open on app.xcloudphone.com.
 * Click "Login with Google" and complete the flow manually.
 * When the dashboard loads, press Enter in the terminal to save and close.
 */
(async () => {
  const { context, page } = await launch({ headless: false });
  await page.goto('https://app.xcloudphone.com');

  console.log('\n==================================================');
  console.log(' Please complete Google login in the opened window.');
  console.log(' When you see the dashboard, come back here and');
  console.log(' press ENTER to save the session.');
  console.log('==================================================\n');

  process.stdin.resume();
  await new Promise((resolve) => process.stdin.once('data', resolve));

  await context.close();
  console.log('Session saved to ./user-data');
  process.exit(0);
})();
