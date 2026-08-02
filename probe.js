// Probe candidate sources: does a real browser get prices back?
// Run: node probe.js
// Reports one line per site so unverified guesses in sources.md become facts.

const { chromium } = require('playwright');

const SITES = [
  ['Best Buy',      'https://www.bestbuy.com/site/searchpage.jsp?st=portable+monitor+16+inch'],
  ['B&H Photo',     'https://www.bhphotovideo.com/c/search?q=portable%20monitor%2016%20inch'],
  ['Newegg',        'https://www.newegg.com/p/pl?d=portable+monitor+16+inch'],
  ['Target',        'https://www.target.com/s?searchTerm=portable+monitor'],
  ['Micro Center',  'https://www.microcenter.com/search/search_results.aspx?Ntt=portable+monitor'],
  ['Adorama',       'https://www.adorama.com/l/?searchinfo=portable%20monitor'],
  ['Woot',          'https://electronics.woot.com/'],
  ['eBay',          'https://www.ebay.com/sch/i.html?_nkw=portable+monitor+16+inch&LH_ItemCondition=2000'],
  ['Lenovo',        'https://www.lenovo.com/us/en/d/deals/monitor-deals/'],
  ['Dell',          'https://www.dell.com/en-us/shop/dell-monitors/ar/9860?appliedRefinements=42242'],
  ['Monoprice',     'https://www.monoprice.com/search/index?keyword=portable%20monitor'],
  ['ASUS',          'https://www.asus.com/us/displays-desktops/monitors/zenscreen/filter?Series=ZenScreen'],
  ['Abt',           'https://www.abt.com/search?q=portable+monitor'],
  ['Staples',       'https://www.staples.com/portable+monitor/directory_portable+monitor'],
  ['Office Depot',  'https://www.officedepot.com/a/search/portable%20monitor/'],
  ['Crutchfield',   'https://www.crutchfield.com/search/portable+monitor.html'],
  ['PCPartPicker',  'https://pcpartpicker.com/products/monitor/'],
  ['Back Market',   'https://www.backmarket.com/en-us/search?q=unlocked%205g%20phone'],
  ['Google Store',  'https://store.google.com/us/category/phones'],
  ['Motorola',      'https://www.motorola.com/us/smartphones-all/c/all-smartphones'],
  ['Samsung',       'https://www.samsung.com/us/smartphones/all-smartphones/'],
  ['Mint Mobile',   'https://www.mintmobile.com/devices/'],
  ['Visible',       'https://www.visible.com/phones'],
  ['OnePlus',       'https://www.oneplus.com/us/store/phone'],
  ['Gazelle',       'https://www.gazelle.com/shop/cell-phones'],
  ['Slickdeals',    'https://slickdeals.net/newsearch.php?q=portable+monitor'],
  ['DealNews',      'https://www.dealnews.com/c142/Computers/Monitors/'],
  ['Camelcamelcamel','https://camelcamelcamel.com/search?sq=portable+monitor'],
];

const PRICE = /\$\s?\d[\d,]*(\.\d{2})?/g;

async function probe(browser, [name, url]) {
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    viewport: { width: 1366, height: 900 },
  });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const status = resp ? resp.status() : 0;
    await page.waitForTimeout(3500); // let JS render prices
    const text = await page.evaluate(() => document.body.innerText || '');
    const title = await page.title();
    const prices = text.match(PRICE) || [];
    const blocked = /captcha|are you a human|robot check|access denied|unusual traffic|something went wrong/i.test(title + ' ' + text.slice(0, 1500));
    return { name, status, prices: prices.length, blocked, title: title.slice(0, 45) };
  } catch (e) {
    return { name, status: 'ERR', prices: 0, blocked: false, title: e.message.split('\n')[0].slice(0, 45) };
  } finally {
    await ctx.close();
  }
}

(async () => {
  // ponytail: PW_CHROME lets a machine with a mismatched browser build reuse
  // one it already has. Unset in the cloud, where `playwright install` runs.
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
  const results = [];
  // ponytail: 4 at a time. Serial is too slow, more risks tripping rate limits.
  for (let i = 0; i < SITES.length; i += 4) {
    results.push(...await Promise.all(SITES.slice(i, i + 4).map(s => probe(browser, s))));
  }
  await browser.close();

  const verdict = r =>
    r.status === 'ERR' ? 'ERROR' :
    r.blocked || r.status >= 400 ? 'BLOCKED' :
    r.prices >= 5 ? 'WORKS' :
    r.prices > 0 ? 'THIN' : 'NO PRICES';

  console.log('SITE'.padEnd(18) + 'STATUS'.padEnd(8) + 'PRICES'.padEnd(8) + 'VERDICT');
  for (const r of results) {
    console.log(r.name.padEnd(18) + String(r.status).padEnd(8) + String(r.prices).padEnd(8) + verdict(r).padEnd(10) + r.title);
  }
})();
