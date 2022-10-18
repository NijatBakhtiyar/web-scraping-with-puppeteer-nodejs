const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/JavaScript");
  await page.screenshot({ path: "javascript.png", fullPage: true });

  await browser.close();
}

start();
