import { test, expect, chromium, Browser } from "@playwright/test";
import { generateTestUserLogin } from "./utils/generateUsers";

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

test("simulate login in parallel across all windows", async () => {
  await Promise.all(
    chromiumWindows.map(async (win) => {
      const context = await browser.newContext({
        viewport: { width: win.width, height: win.height },
        baseURL: "http://localhost:3000",
      });
      const page = await context.newPage();

      const session = await context.newCDPSession(page);
      const { windowId } = await session.send("Browser.getWindowForTarget");
      await session.send("Browser.setWindowBounds", {
        windowId,
        bounds: {
          left: win.x,
          top: win.y,
          width: win.width,
          height: win.height,
        },
      });

      const testUser = generateTestUserLogin("player");

      await page.route("**/api/login", async (route, request) => {
        const body = await request.postDataJSON();
        if (
          body.userNameOrEmail === testUser.userNameOrEmail &&
          body.password === testUser.password
        ) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              user: testUser.user,
              token: testUser.token,
            }),
          });
        }
        return route.fulfill({
          status: 401,
          contentType: "text/plain",
          body: "Invalid credentials",
        });
      });

      await page.goto("/login");
      await page.fill(
        'input[placeholder="Enter your email"]',
        testUser.userNameOrEmail
      );
      await page.fill(
        'input[placeholder="Enter your password"]',
        testUser.password
      );
      await page.getByRole("button", { name: "Sign In" }).click();

      await page.waitForURL(/.*\/(admin|player)/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*\/(admin|player)/);

      await page.waitForTimeout(1500);
      await context.close();
    })
  );
});
