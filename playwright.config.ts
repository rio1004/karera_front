import { defineConfig } from "@playwright/test";

const totalWindows = 3;
const screenHeight = 1080;

const windowWidth = 2000;
const windowHeight = 5000;
const margin = 8;
const padding = 4;

const chromiumWindows = Array.from({ length: totalWindows }, (_, i) => {
  const x = margin + i * (windowWidth + padding);
  const y = Math.floor((screenHeight - windowHeight) / 2);
  return {
    id: `mobile-${i + 1}`,
    width: windowWidth,
    height: windowHeight,
    x,
    y,
    col: i,
  };
});

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  timeout: 90000,
  workers: 3,

  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },

  projects: chromiumWindows.map((win, index) => ({
    name: `chromium-${index + 1}`,
    use: {
      browserName: "chromium",
      viewport: { width: win.width, height: win.height },
      launchOptions: {
        args: [
          `--window-size=${win.width},${win.height}`,
          `--window-position=${win.x},${win.y}`,
          '--disable-web-security',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--force-device-scale-factor=1',
          '--disable-features=VizDisplayCompositor',
          `--user-data-dir=/tmp/chrome-mobile-${index}`,
        ],
      },
    },
  })),

  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
