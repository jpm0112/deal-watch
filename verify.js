// Record a price read off a product page, not off a search card.
//
// Run: node verify.js --item=portable-monitor --price=149.99 \
//        --url=https://www.staples.com/... [--title="ViewSonic VX1654 16..."] \
//        [--source=staples] [--seller="Staples (first-party)"] \
//        [--condition=new] [--in-stock=true]
//      node verify.js --selftest
//
// Step 6 of routine-prompt.md opens every candidate's product page and reads the
// real price. That number used to go into DEALS.md and nowhere else: prices.jsonl
// kept the scraper's search-card guess, so baseline.js scored each listing on a
// price the routine had already proven wrong. Every hit recorded through
// 2026-08-11 is FLAT in the log for exactly that reason — the ViewSonic VX1654
// sat at $169.99 for nine runs while DEALS.md carried the verified $149.99.
//
// Appends one row with "verified":true. baseline.js gives verified rows
// precedence over scraped rows for the same listing on the same day.

const fs = require('fs');

const REQUIRED = ['item', 'url', 'price'];

/** Turn --key=value argv into {key: value}, with dashes normalised to _. */
function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    const match = /^--([\w-]+)=([\s\S]*)$/.exec(arg);
    if (!match) throw new Error(`bad argument "${arg}" — expected --key=value`);
    args[match[1].replace(/-/g, '_')] = match[2];
  }
  return args;
}

/**
 * Build one observation row in scrape.js's shape, validating at the boundary.
 * prices.jsonl is append-only and never edited, so a malformed row written here
 * is permanent — reject it now rather than leave it for baseline.js to skip.
 */
function buildObservation(args, ts) {
  for (const key of REQUIRED)
    if (!args[key]) throw new Error(`--${key} is required`);
  const price = Number(args.price);
  if (!Number.isFinite(price) || price <= 0)
    throw new Error(`--price must be a positive number, got "${args.price}"`);
  if (!/^https?:\/\//.test(args.url))
    throw new Error(`--url must be an http(s) URL, got "${args.url}"`);
  const asBool = value => (value === undefined ? null : /^(true|yes|1|in.?stock)$/i.test(value));
  return {
    ts,
    item: args.item,
    source: args.source || 'verified',
    seller: args.seller || null,
    title: args.title ? args.title.slice(0, 120) : null,
    // Query strings dropped the same way scrape.js drops them, so a verified row
    // and the scraped rows for the same listing share one URL key.
    url: args.url.split('?')[0],
    price,
    currency: 'USD',
    condition: args.condition || null,
    in_stock: asBool(args.in_stock),
    verified: true,
  };
}

// --- self-check --------------------------------------------------------------

function selftest() {
  const assert = require('assert');
  const ts = '2026-08-16T00:00:00.000Z';

  const obs = buildObservation(parseArgs([
    '--item=portable-monitor',
    '--url=https://www.staples.com/viewsonic/product_24616303?cid=abc',
    '--price=149.99', '--title=ViewSonic VX1654', '--source=staples',
    '--seller=Staples', '--condition=new', '--in-stock=true',
  ]), ts);
  assert.equal(obs.url, 'https://www.staples.com/viewsonic/product_24616303', 'query string stripped');
  assert.equal(obs.price, 149.99);
  assert.equal(obs.in_stock, true);
  assert.equal(obs.verified, true, 'the flag baseline.js keys precedence on');
  assert.equal(obs.currency, 'USD');

  const minimal = buildObservation(parseArgs(['--item=m', '--url=https://x.test/p', '--price=10']), ts);
  assert.equal(minimal.in_stock, null, 'unstated stock is unknown, not false');
  assert.equal(minimal.seller, null);

  const rejects = [
    [['--item=m', '--url=https://x.test/p'], /--price is required/],
    [['--item=m', '--url=https://x.test/p', '--price=free'], /positive number/],
    [['--item=m', '--url=https://x.test/p', '--price=-5'], /positive number/],
    [['--item=m', '--url=x.test/p', '--price=10'], /http\(s\) URL/],
    [['--url=https://x.test/p', '--price=10'], /--item is required/],
  ];
  for (const [argv, expected] of rejects)
    assert.throws(() => buildObservation(parseArgs(argv), ts), expected, `should reject: ${argv.join(' ')}`);
  assert.throws(() => parseArgs(['--price']), /expected --key=value/);

  // The row must survive the round trip baseline.js actually performs.
  const parsed = JSON.parse(JSON.stringify(obs));
  assert.equal(parsed.ts.slice(0, 10), '2026-08-16');
  assert.equal(typeof parsed.price, 'number');

  console.log('selftest OK');
}

// --- main --------------------------------------------------------------------

if (process.argv[2] === '--selftest') {
  selftest();
} else {
  try {
    const observation = buildObservation(parseArgs(process.argv.slice(2)), new Date().toISOString());
    fs.appendFileSync(`${__dirname}/prices.jsonl`, JSON.stringify(observation) + '\n');
    console.log(`recorded verified $${observation.price.toFixed(2)}  ${observation.item}  ${observation.url}`);
  } catch (e) {
    console.error(`verify.js: ${e.message}`);
    console.error('usage: node verify.js --item=<id> --url=<product page> --price=<number> [--title=] [--source=] [--seller=] [--condition=] [--in-stock=]');
    process.exit(1);
  }
}
