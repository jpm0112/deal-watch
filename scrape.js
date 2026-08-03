// Collect price observations for watchlist items and append them to prices.jsonl.
// Run: node scrape.js
//
// Mechanical by design: it gathers candidates, it does not judge deals.
// Deal logic (relative rules in README.md) is applied by whoever reads the log.
// Items, queries, keywords, and caps come from watchlist.md — edit there, not here.

const fs = require('fs');
const { chromium } = require('playwright');

// --- watchlist.md parsing ---------------------------------------------------

function parseWatchlist(md) {
  return md.split(/^## /m).slice(1).map(sec => {
    const id = sec.split('\n')[0].trim();
    const grab = re => (re.exec(sec) || [])[1];
    return {
      id,
      active: /\*\*Status:\*\*\s*active/.test(sec),
      cap: Number(grab(/\*\*Price cap:\*\*\s*\$?(\d+)/) || Infinity),
      min: Number(grab(/\*\*Min price:\*\*\s*\$?(\d+)/) || 0),
      queries: (grab(/\*\*Search queries:\*\*\s*(.+)/) || '').split(';').map(s => s.trim()).filter(Boolean),
      keywords: new RegExp(
        (grab(/\*\*Match keywords:\*\*\s*(.+)/) || id).split(';').map(s => s.trim()).filter(Boolean).join('|'), 'i'),
    };
  }).filter(it => it.active && !it.id.startsWith('How '));
}

// --- sources ----------------------------------------------------------------
// Verified working 2026-08-02 (see sources.md / probe.js). Search sites take a
// query; fixed pages are category listings scanned once and matched by keyword.

const enc = q => encodeURIComponent(q);
const SEARCH = {
  bestbuy:     q => `https://www.bestbuy.com/site/searchpage.jsp?st=${enc(q)}`,
  bhphoto:     q => `https://www.bhphotovideo.com/c/search?q=${enc(q)}`,
  newegg:      q => `https://www.newegg.com/p/pl?d=${enc(q)}`,
  microcenter: q => `https://www.microcenter.com/search/search_results.aspx?Ntt=${enc(q)}`,
  adorama:     q => `https://www.adorama.com/l/?searchinfo=${enc(q)}`,
  monoprice:   q => `https://www.monoprice.com/search/index?keyword=${enc(q)}`,
  slickdeals:  q => `https://slickdeals.net/newsearch.php?q=${enc(q)}`,
  backmarket:  q => `https://www.backmarket.com/en-us/search?q=${enc(q)}`,
  staples:     q => `https://www.staples.com/${q.replace(/ /g, '+')}/directory_${q.replace(/ /g, '+')}`,
};
const FIXED = {
  woot:       'https://electronics.woot.com/',
  lenovo:     'https://www.lenovo.com/us/en/d/deals/monitor-deals/',
  asus:       'https://www.asus.com/us/displays-desktops/monitors/zenscreen/filter?Series=ZenScreen',
  samsung:    'https://www.samsung.com/us/smartphones/all-smartphones/',
  motorola:   'https://www.motorola.com/us/smartphones-all/c/all-smartphones',
  mintmobile: 'https://www.mintmobile.com/devices/',
};

// --- extraction -------------------------------------------------------------
// Generic: find leaf nodes that are exactly a price, walk up to the enclosing
// card, take its main link and longest text line as the title. Survives site
// redesigns better than per-site selectors; per-site selectors live in
// sources.md notes when this misses.

const EXTRACT = () => {
  const priceRe = /\$\s?\d[\d,]*(?:\.\d{2})?/;          // contained, not exact —
  const out = [], seen = new Set();                      // sites pad price nodes
  for (const el of document.querySelectorAll('body *')) {
    const t = (el.innerText || '').trim();
    if (el.children.length || t.length > 25 || !priceRe.test(t)) continue;
    // Walk up until the card contains a link with real title-length text —
    // on retail cards the product title IS the link text. Short links
    // ("Add to cart", financing offers) don't qualify, so keep climbing.
    let card = el, link = null;
    for (let i = 0; i < 8 && card.parentElement && !link; i++) {
      card = card.parentElement;
      link = [...card.querySelectorAll('a[href]')].find(a => (a.innerText || '').trim().length >= 20);
    }
    if (!link) continue;
    const title = link.innerText.trim().split('\n')[0];
    const price = Number((t.match(priceRe) || [''])[0].replace(/[$,\s]/g, ''));
    const url = link.href.split('?')[0];
    const key = `${url}|${price}`;
    if (title && price > 0 && url && !seen.has(key)) { seen.add(key); out.push({ title, price, url }); }
  }
  return out.slice(0, 120);
};

// --- scraping ---------------------------------------------------------------

const BLOCKED_RE = /captcha|are you a human|robot check|access denied|unusual traffic|something went wrong|just a moment/i;

async function fetchListings(browser, url) {
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    viewport: { width: 1366, height: 900 },
  });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const status = resp ? resp.status() : 0;
    await page.waitForTimeout(2000);
    // Scroll: several sites (Best Buy confirmed) render product cards lazily
    // and serve only a facet skeleton to a browser that never moves.
    for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(1500); }
    const title = await page.title();
    if (status >= 400 || BLOCKED_RE.test(title)) return { error: `HTTP ${status} / "${title.slice(0, 60)}"` };
    const listings = await page.evaluate(EXTRACT);
    if (!listings.length) return { error: `HTTP ${status}, page loaded but 0 prices extracted` };
    return { listings };
  } catch (e) {
    return { error: e.message.split('\n')[0].slice(0, 120) };
  } finally {
    await ctx.close();
  }
}

// --- main -------------------------------------------------------------------

(async () => {
  const items = parseWatchlist(fs.readFileSync(`${__dirname}/watchlist.md`, 'utf8'));
  if (!items.length) { console.error('No active watchlist items parsed — check watchlist.md format.'); process.exit(1); }

  // One task per (site-search x item-query), plus each fixed page once.
  const tasks = [];
  for (const it of items)
    for (const q of it.queries)
      for (const [site, tmpl] of Object.entries(SEARCH))
        tasks.push({ site, url: tmpl(q), item: it });
  for (const [site, url] of Object.entries(FIXED))
    tasks.push({ site, url, item: null }); // matched against all items by keyword

  // ponytail: PW_CHROME reuses a local browser when builds mismatch; unset in cloud.
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || undefined });
  const lines = [], summary = {};
  const ts = new Date().toISOString();

  for (let i = 0; i < tasks.length; i += 4) {                 // 4-wide, gentle on rate limits
    await Promise.all(tasks.slice(i, i + 4).map(async t => {
      const res = await fetchListings(browser, t.url);
      const targets = t.item ? [t.item] : items;
      if (res.error) {
        for (const it of targets)
          lines.push({ ts, item: it.id, source: t.site, url: t.url, error: res.error });
        summary[t.site] = summary[t.site] || `ERROR: ${res.error}`;
        return;
      }
      let kept = 0;
      for (const it of targets)
        for (const l of res.listings)
          if (it.keywords.test(l.title) && l.price >= it.min && l.price <= it.cap) {
            lines.push({ ts, item: it.id, source: t.site, seller: null, title: l.title.slice(0, 120),
                         url: l.url, price: l.price, currency: 'USD', condition: null, in_stock: null });
            kept++;
          }
      summary[t.site] = `${(summary[t.site] || '').startsWith('ERROR') ? summary[t.site] + '; then ' : ''}ok`;
      summary[t.site + '_kept'] = (summary[t.site + '_kept'] || 0) + kept;
    }));
  }
  await browser.close();

  fs.appendFileSync(`${__dirname}/prices.jsonl`, lines.map(l => JSON.stringify(l)).join('\n') + '\n');

  const obs = lines.filter(l => 'price' in l).length, errs = lines.filter(l => l.error).length;
  console.log(`Appended ${lines.length} lines to prices.jsonl: ${obs} observations, ${errs} error records.`);
  for (const site of Object.keys(SEARCH).concat(Object.keys(FIXED)))
    console.log(`  ${site.padEnd(12)} ${String(summary[site + '_kept'] ?? 0).padStart(4)} kept  ${summary[site] || 'no tasks'}`);
  if (obs === 0) { console.error('ZERO observations — treat this run as FAILED, not as "no deals".'); process.exit(2); }
})();
