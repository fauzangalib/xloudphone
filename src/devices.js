const { launch } = require('./browser');
const accounts = require('../accounts.json');

/**
 * Jalankan aksi ke semua akun secara berurutan.
 * Run: npm run devices
 *
 * Setiap akun dibuka browsernya, aksi dijalankan, lalu browser ditutup.
 * Edit fungsi `runAccount()` di bawah untuk menyesuaikan aksi yang diinginkan.
 */

async function runAccount(account, page) {
  console.log(`  → Membuka dashboard...`);
  await page.goto('https://app.xcloudphone.com', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});

  // ----------------------------------------------------------------
  // TODO: Ganti placeholder di bawah dengan aksi nyata setelah
  // kita inspect selector dari dashboard xcloudphone.
  // ----------------------------------------------------------------

  // Contoh: ambil daftar device
  const deviceCards = await page.locator('[data-testid="device-card"]').all();
  console.log(`  → Ditemukan ${deviceCards.length} device.`);

  // Contoh: klik tombol Start pada device pertama
  // await page.getByRole('button', { name: 'Start' }).first().click();
  // await page.waitForTimeout(2000);

  // Contoh: ambil screenshot
  // await page.screenshot({ path: `screenshots/${account.id}.png` });
}

(async () => {
  console.log(`\n===== XLOUDPHONE DEVICE MANAGER =====`);
  console.log(`Total akun: ${accounts.length}\n`);

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const num = `[${i + 1}/${accounts.length}]`;

    console.log(`${num} ⚙️  Akun: ${account.id} (${account.email})`);

    let context, page;
    try {
      ({ context, page } = await launch({ accountId: account.id, headless: true }));
      await runAccount(account, page);
      console.log(`${num} ✅ Selesai.\n`);
    } catch (err) {
      console.error(`${num} ❌ Error: ${err.message}\n`);
    } finally {
      if (context) await context.close();
    }
  }

  console.log('===== SEMUA AKUN SELESAI =====');
  process.exit(0);
})();
