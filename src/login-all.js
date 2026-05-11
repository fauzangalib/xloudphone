const { launch } = require('./browser');
const accounts = require('../accounts.json');
const path = require('path');
const fs = require('fs');

/**
 * Login semua akun satu per satu secara manual.
 * Run: npm run login
 *
 * Untuk setiap akun:
 *  1. Browser Chromium terbuka di app.xcloudphone.com
 *  2. Anda login dengan akun Google yang sesuai
 *  3. Setelah dashboard muncul, tekan ENTER di terminal
 *  4. Session disimpan, lanjut ke akun berikutnya
 *
 * Akun yang sudah punya session akan di-skip otomatis.
 * Untuk re-login akun tertentu, hapus folder user-data/<accountId>/
 */

function isLoggedIn(accountId) {
  const sessionFile = path.resolve(__dirname, '..', 'user-data', accountId, 'Default', 'Cookies');
  return fs.existsSync(sessionFile);
}

function waitForEnter(prompt) {
  process.stdout.write(prompt);
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', () => {
      process.stdin.pause();
      resolve();
    });
  });
}

(async () => {
  console.log(`\n===== XLOUDPHONE MULTI-ACCOUNT LOGIN =====`);
  console.log(`Total akun: ${accounts.length}\n`);

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const num = `[${i + 1}/${accounts.length}]`;

    if (isLoggedIn(account.id)) {
      console.log(`${num} ✅ ${account.id} (${account.email}) — sudah login, skip.\n`);
      continue;
    }

    console.log(`${num} 🔐 Login untuk: ${account.id} (${account.email})`);
    console.log(`     Silakan login dengan akun Google: ${account.email}`);

    const { context, page } = await launch({ accountId: account.id, headless: false });
    await page.goto('https://app.xcloudphone.com', { waitUntil: 'domcontentloaded' });

    await waitForEnter(`     ➡ Setelah dashboard muncul, tekan ENTER untuk lanjut ke akun berikutnya...\n`);

    await context.close();
    console.log(`     ✅ Session ${account.id} tersimpan.\n`);
  }

  console.log('===== SEMUA AKUN SELESAI =====');
  console.log('Sekarang jalankan: npm run devices');
  process.exit(0);
})();
