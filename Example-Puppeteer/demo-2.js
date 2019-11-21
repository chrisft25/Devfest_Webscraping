const puppeteer = require('puppeteer-extra');
puppeteer.use(require('puppeteer-extra-plugin-flash')());
(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://v.angelcam.com/iframe?v=j3l7v9kblm&autoplay=1');
  await page.screenshot({path: './screenshots/example.png'});

  //await browser.close();
})();