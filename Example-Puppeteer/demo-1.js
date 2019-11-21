const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://nodeschoolsm.io');
  console.log(await page.evaluate(()=>document.title))

  await page.goto('https://gdgsansalvador.dev/');
  console.log(await page.evaluate(()=>document.title))

  await page.goto('https://www.meetup.com/es/GDG-SanSalvador/events/262332298/');
  console.log(await page.evaluate(()=>document.title))
  await browser.close();

})();