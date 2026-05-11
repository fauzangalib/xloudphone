# xloudphone automation

Playwright-based automation for [app.xcloudphone.com](https://app.xcloudphone.com).

## Prerequisites (Windows)

1. Install [Node.js 18+](https://nodejs.org/) (LTS).
2. Open **PowerShell** or **Command Prompt** in this folder.

## Setup

```cmd
npm install
```

The `postinstall` hook downloads Chromium for Playwright automatically.

## 1. First-time login (once)

```cmd
npm run login
```

- A Chromium window opens on app.xcloudphone.com.
- Click **Login with Google** and complete the flow manually (including 2FA if any).
- When the dashboard is visible, switch back to the terminal and press **Enter**.
- The session is saved in the `user-data/` folder. Keep this folder private.

## 2. Run device management

```cmd
npm run devices
```

This reuses the saved session, so no login is needed.

## Notes

- `user-data/` is gitignored. Do **not** commit it.
- If xcloudphone logs you out, just run `npm run login` again.
- To customize actions (start/stop/install app/etc.), edit `src/devices.js`.
