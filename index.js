const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const cron = require("node-cron");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");

  const [button] = await page.$x("//button[contains(., 'Click me')]");
  await button.click();
  await page.content("Dogs bark and cats meow.");

  const input = await page.$("input[type=text]");
  await input.type("blue");
  const submitBtn = await page.$x("//button[contains(., 'Submit')]");
  submitBtn[0].click();

  await page.waitForNavigation();
  const url = await page.evaluate(() => location.pathname);

  console.log(url);
  if (url.includes("/message.html")) {
    console.log("success");
  } else {
    console.log("failed");
  }
}
start();
cron.schedule("*/10 * * * * *", async () => {
  start();
});
