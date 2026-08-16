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
    const anyOf = text => text.split(';').map(s => s.trim()).filter(Boolean);
    const excludes = anyOf(grab(/\*\*Exclude keywords:\*\*\s*(.+)/) || '');
    return {
      id,
      active: /\*\*Status:\*\*\s*active/.test(sec),
      cap: Number(grab(/\*\*Price cap:\*\*\s*\$?(\d+)/) || Infinity),
      min: Number(grab(/\*\*Min price:\*\*\s*\$?(\d+)/) || 0),
      queries: anyOf(grab(/\*\*Search queries:\*\*\s*(.+)/) || ''),
      keywords: new RegExp(anyOf(grab(/\*\*Match keywords:\*\*\s*(.+)/) || id).join('|'), 'i'),
      // Comparable-set filter for median.js — scrape.js keeps these rows (the
      // log stays a wide net); they are only excluded from median computation.
      excludes: excludes.length ? new RegExp(excludes.join('|'), 'i') : null,
      // "name: kw1 | kw2; name2: *" — first tier whose regex matches the title
      // wins; "*" is the catch-all. No Tiers line means one undivided pool.
      // Each alternative is trimmed: the documented format spaces them out, but
      // those spaces land INSIDE the pattern, so "a | b" compiled to /a | b/ and
      // only matched " b" mid-string. A title starting with the tier name —
      // "PlayStation 5 Pro Console" — fell through to the catch-all tier and
      // polluted the median it was supposed to be compared against.
      tiers: anyOf(grab(/\*\*Tiers:\*\*\s*(.+)/) || '').map(part => {
        const [name, pattern] = part.split(':').map(s => s.trim());
        const alternatives = pattern.split('|').map(s => s.trim()).filter(Boolean).join('|');
        return { name, re: pattern === '*' ? /(?:)/ : new RegExp(alternatives, 'i') };
      }),
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
  // ponytail: slickdeals removed 2026-08-15 — a forum post's price never changes,
  // so it can never clear the movement gate, and 3 weeks of RUNLOG show every
  // thread opened was expired. It was 43% of all tracked listings and 0% of the
  // movement. Restore it only behind a live/expired filter (see sources.md).
  target:      q => `https://www.target.com/s?searchTerm=${enc(q)}`,
  officedepot: q => `https://www.officedepot.com/catalog/search.do?Ntt=${enc(q)}`,
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
  arzopa:     'https://www.arzopa.com/collections/portable-monitors',
  uperfect:   'https://www.uperfect.com/collections/portable-monitors',
  // main collection has only 2 products; the manufacturer-refurb one has the
  // stock, and manufacturer-refurbished is watchlist-allowed
  innocn:     'https://www.innocn.com/collections/refurbished-portable-monitor',
  // search URL baked in: monitor-only vendor, keeps phone queries off it
  acerstore:  'https://store.acer.com/en-us/catalogsearch/result/?q=portable+monitor',
  visible:    'https://www.visible.com/shop/smartphones',
};

// --- extraction -------------------------------------------------------------
// Generic: find leaf nodes that are exactly a price, walk up to the enclosing
// card, take its main link and longest text line as the title. Survives site
// redesigns better than per-site selectors; per-site selectors live in
// sources.md notes when this misses.

const EXTRACT = (pageUrl) => {
  const bare = href => href.split('?')[0].replace(/\/$/, '');
  const self = bare(pageUrl);                            // this search page itself
  const priceRe = /\$\s?\d[\d,]*(?:\.\d{2})?/;          // contained, not exact —
  // Reference prices, not what the listing charges: "Save $50", "20% off",
  // "Reg. $199.99", "was $159.99". Logging these as observations is what makes
  // a permanently-discounted listing look like it keeps dropping.
  const refRe = /\b(save|off|was|reg|list|msrp|coupon|rebate|discount)\b|%/i;
  const out = [], seen = new Set();                      // sites pad price nodes
  for (const el of document.querySelectorAll('body *')) {
    const t = (el.innerText || '').trim();
    if (el.children.length || t.length > 25 || !priceRe.test(t) || refRe.test(t)) continue;
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
    // A "card" whose link points back at this same search page is the price-range
    // filter sidebar, not a product: its $100/$200/$300 are facet buckets. Best
    // Buy's entire contribution to the log was one of these ("Unlocked Cell
    // Phones", $100-$500) masquerading as a listing.
    if (bare(url) === self) continue;
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
    const listings = await page.evaluate(EXTRACT, url);
    if (!listings.length) return { error: `HTTP ${status}, page loaded but 0 prices extracted` };
    return { listings };
  } catch (e) {
    return { error: e.message.split('\n')[0].slice(0, 120) };
  } finally {
    await ctx.close();
  }
}

// --- main -------------------------------------------------------------------

module.exports = { parseWatchlist };

/** node scrape.js --selftest — pins the tier-spacing regression. No network. */
function selftest() {
  const assert = require('assert');
  const md = [
    '## demo',
    '**Status:** active',
    '**Match keywords:** ps5; playstation 5',
    '**Tiers:** pro: ps5 pro | playstation 5 pro; digital: digital; disc: *',
    '',
  ].join('\n');
  const [item] = parseWatchlist(md);
  const tierOf = title => (item.tiers.find(t => t.re.test(title)) || {}).name;

  // The regression: spaces around "|" used to leak into the pattern, so a title
  // that STARTS with the tier name missed and fell through to the catch-all.
  assert.equal(tierOf('PlayStation 5 Pro Console'), 'pro', 'title-initial match');
  assert.equal(tierOf('Sony - PlayStation 5 Pro Console'), 'pro', 'mid-string match');
  assert.equal(tierOf('PS5 Pro 2TB'), 'pro', 'first alternative');
  assert.equal(tierOf('PlayStation 5 Digital Edition'), 'digital');
  assert.equal(tierOf('PlayStation 5 Console'), 'disc', 'catch-all still catches');
  console.log('selftest OK');
}

if (require.main === module && process.argv[2] === '--selftest') {
  selftest();
} else if (require.main === module) (async () => {
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

  // Browser pick: PW_CHROME wins; else the cloud sandbox's pre-installed build
  // (/opt/pw-browsers/chromium), which every run since 2026-08-03 has needed —
  // freshly-downloaded builds fail through the proxy (TLS 1.3 ClientHello reset
  // on 2026-08-04, plain connection reset on 2026-08-11); else Playwright's own.
  // Cloud sandbox routes all egress through a local HTTPS_PROXY; Chromium doesn't
  // read that env var itself, so it's passed explicitly. TLS is capped at 1.2
  // because this proxy's path resets the connection on Chromium's TLS 1.3
  // ClientHello (oversized by the post-quantum X25519Kyber768 key share) —
  // confirmed via --log-net-log: CONNECT succeeds, then the raw socket gets
  // RST (net_error -101) right after ClientHello, every time, every domain.
  const proxyServer = process.env.HTTPS_PROXY || process.env.https_proxy;
  const CLOUD_CHROMIUM = '/opt/pw-browsers/chromium';
  const browser = await chromium.launch({
    executablePath: process.env.PW_CHROME
      || (fs.existsSync(CLOUD_CHROMIUM) ? CLOUD_CHROMIUM : undefined),
    proxy: proxyServer ? { server: proxyServer } : undefined,
    args: ['--ssl-version-max=tls1.2'],
  });
  // --preflight: prove the run's ACTUAL browser+proxy path can load a page.
  // A bare launch()-and-close is not enough — on 2026-08-11 it passed while
  // page.goto() reset on every domain, and the failure surfaced 20 minutes in.
  if (process.argv[2] === '--preflight') {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    try {
      const resp = await page.goto('https://example.com', { timeout: 30000 });
      if (resp && resp.status() < 400) { console.log('BROWSER OK'); await browser.close(); return; }
      console.error(`BROWSER PREFLIGHT FAILED: HTTP ${resp ? resp.status() : 0}`);
    } catch (e) {
      console.error(`BROWSER PREFLIGHT FAILED: ${e.message.split('\n')[0]}`);
    }
    await browser.close();
    process.exit(3);
  }

  const errors = [], summary = {};
  const ts = new Date().toISOString();
  // One observation per listing per run, at the LOWEST price it showed.
  // Overlapping queries surface the same listing repeatedly, and a card with a
  // strikethrough beside the real price yields both numbers — only the lower
  // one is ever charged, and keeping both invents a drop that never happened.
  const best = new Map(); // `${item}|${url}` -> observation

  for (let i = 0; i < tasks.length; i += 4) {                 // 4-wide, gentle on rate limits
    await Promise.all(tasks.slice(i, i + 4).map(async t => {
      const res = await fetchListings(browser, t.url);
      const targets = t.item ? [t.item] : items;
      if (res.error) {
        for (const it of targets)
          errors.push({ ts, item: it.id, source: t.site, url: t.url, error: res.error });
        summary[t.site] = summary[t.site] || `ERROR: ${res.error}`;
        return;
      }
      let kept = 0;
      for (const it of targets)
        for (const l of res.listings)
          if (it.keywords.test(l.title) && l.price >= it.min && l.price <= it.cap) {
            const key = `${it.id}|${l.url}`;
            const prev = best.get(key);
            if (prev && prev.price <= l.price) continue;
            if (!prev) kept++;
            best.set(key, { ts, item: it.id, source: t.site, seller: null, title: l.title.slice(0, 120),
                            url: l.url, price: l.price, currency: 'USD', condition: null, in_stock: null });
          }
      summary[t.site] = `${(summary[t.site] || '').startsWith('ERROR') ? summary[t.site] + '; then ' : ''}ok`;
      summary[t.site + '_kept'] = (summary[t.site + '_kept'] || 0) + kept;
    }));
  }
  await browser.close();

  const lines = [...errors, ...best.values()];
  if (lines.length) fs.appendFileSync(`${__dirname}/prices.jsonl`, lines.map(l => JSON.stringify(l)).join('\n') + '\n');

  const obs = lines.filter(l => 'price' in l).length, errs = lines.filter(l => l.error).length;
  console.log(`Appended ${lines.length} lines to prices.jsonl: ${obs} observations, ${errs} error records.`);
  for (const site of Object.keys(SEARCH).concat(Object.keys(FIXED)))
    console.log(`  ${site.padEnd(12)} ${String(summary[site + '_kept'] ?? 0).padStart(4)} kept  ${summary[site] || 'no tasks'}`);
  if (obs === 0) { console.error('ZERO observations — treat this run as FAILED, not as "no deals".'); process.exit(2); }
})();
