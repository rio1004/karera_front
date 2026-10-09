import { test, expect, chromium, Browser } from "@playwright/test";
import { generateTestUser } from "./utils/generateUsers";

interface WindowConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  id?: string;
  col?: number;
  scale?: number;
}

let browser: Browser;
let chromiumWindows: WindowConfig[] = [];

function generateGrid(
  screenWidth: number,
  screenHeight: number,
  totalWindows: number,
  columns: number,
): WindowConfig[] {
  const margin = 8;
  const padding = 8;

  const windowWidth = 360;
  const windowHeight = 640;

  const totalGridWidth =
    columns * windowWidth + (columns - 1) * padding + 2 * margin;

  const scale = Math.min(1, screenWidth / totalGridWidth);

  const scaledWidth = Math.floor(windowWidth * scale);
  const scaledHeight = Math.floor(windowHeight * scale);

  const windows: WindowConfig[] = [];

  for (let i = 0; i < totalWindows; i++) {
    const col = i % columns;
    const row = Math.floor(i / columns);

    const x = margin + col * (scaledWidth + padding);
    const y = margin + row * (scaledHeight + padding);

    windows.push({
      width: scaledWidth,
      height: scaledHeight,
      x,
      y,
      id: `mobile-${i + 1}`,
      col,
      scale,
    });
  }

  return windows;
}

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    args: [
      "--start-maximized",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
    ],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const screenInfo = await page.evaluate(() => ({
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  }));

  await context.close();

  const screenWidth = screenInfo.width;
  const screenHeight = screenInfo.height;

  const totalWindows = 12; 
  const columns = 6;

  chromiumWindows = generateGrid(
    screenWidth,
    screenHeight,
    totalWindows,
    columns,
  );
});

test.afterAll(async () => {
  await browser.close();
});

test("simulate registration across mobile windows (2-row grid layout)", async () => {
  await Promise.all(
    chromiumWindows.map(async (win, index) => {
      const context = await browser.newContext({
        viewport: { width: win.width, height: win.height },
        baseURL: "http://localhost:3000",
        deviceScaleFactor: 1.0,
      });

      const page = await context.newPage();
      try {
        const session = await context.newCDPSession(page);
        const { windowId } = await session.send("Browser.getWindowForTarget");

        await session.send("Browser.setWindowBounds", {
          windowId,
          bounds: {
            left: win.x,
            top: win.y,
            width: win.width,
            height: win.height,
            windowState: "normal",
          },
        });

        const user = generateTestUser();

        await page.route("**/api/register", async (route) => {
          const data = await route.request().postDataJSON();
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              user: data,
              token: "mocked-token",
              windowId: win.id,
            }),
          });
        });

        await page.waitForTimeout(index * 100);
        await page.goto("/register");
        await page.waitForLoadState("networkidle");

        await page.fill('input[placeholder="First Name"]', user.firstName);
        await page.fill('input[placeholder="Last Name"]', user.lastName);
        await page.fill('input[placeholder="Username"]', user.userName);
        await page.fill('input[placeholder="Email"]', user.email);
        await page.fill('input[placeholder="Mobile"]', user.mobile);
        await page.selectOption("select", user.type);
        await page.fill('input[placeholder="Password"]', user.password);
        await page.fill(
          'input[placeholder="EKYC Transaction ID"]',
          user.ekycTransactionId
        );

        await page.getByRole("button", { name: "Register" }).click();

        await page.waitForURL(/.*\/(admin|player)/, { timeout: 10000 });
        await expect(page).toHaveURL(/.*\/(admin|player)/);
        await page.waitForTimeout(2000);
      } catch (err) {
        console.error(`❌ ${win.id}:`, err.message);
      } finally {
        await context.close();
      }
    })
  );
});
