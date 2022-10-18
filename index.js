const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");

  //   const names = await page.evaluate(() => {
  //     const content = Array.from(document.querySelectorAll(".info strong"));
  //     return content.map((strong) => strong.textContent);
  //   });
  //     await fs.writeFile("names.txt", names.join("\n"));

  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((img) => img.src);
  });

  for (const photo of photos) {
    const imagePage = await page.goto(photo);
    await fs.writeFile(photo.split("/").pop(), await imagePage.buffer());
  }

  //   await browser.close();
}

start();
