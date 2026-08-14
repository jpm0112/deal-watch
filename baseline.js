// Has this listing's price ever actually moved?
//
// The safeguard against permanent "discounts". A real deal needs a real drop:
// what a listing charges today must be below what it charged on its own past
// days. A fake strikethrough ("was $159.99, now $89.99" — every day, forever)
// and an everyday price that only looks cheap beside pricier products are both
// FLAT: one price per day, unchanged across days. Flat is never a deal, however
// large the apparent discount.
//
// Reads prices.jsonl, writes nothing. Prices collapse to one value per
// (listing, calendar day): the LOW. That retroactively neutralises the was/now
// pairs in rows logged before scrape.js stopped recording them.
//
// Run: node baseline.js               movement report across every listing
//      node baseline.js <substring>   one listing's day-by-day history
//      node baseline.js --selftest    assert the logic still holds

const fs = require('fs');

// Mirrors the longitudinal bar in README.md — change both together.
const LONGITUDINAL_DROP = 0.15;

/** Parse prices.jsonl text into price observations, dropping error rows. */
function readObservations(text) {
  const rows = [];
  let skipped = 0;
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    let row;
    try { row = JSON.parse(line); }        // a run killed mid-append can leave
    catch { skipped++; continue; }         // one truncated line behind
    if (typeof row.price === 'number' && row.url) rows.push(row);
  }
  return { rows, skipped };
}

/** Group observations by listing URL, keeping the lowest price per day. */
function indexByListing(rows) {
  const byUrl = new Map();
  for (const row of rows) {
    let entry = byUrl.get(row.url);
    if (!entry) {
      entry = { url: row.url, item: row.item, title: row.title, days: new Map() };
      byUrl.set(row.url, entry);
    }
    if (row.title) entry.title = row.title;
    const day = row.ts.slice(0, 10);
    const low = entry.days.get(day);
    if (low === undefined || row.price < low) entry.days.set(day, row.price);
  }
  return byUrl;
}

/** Movement summary for one listing: has the price it charges ever changed? */
function summarize(entry) {
  const days = [...entry.days.entries()].sort(([a], [b]) => a.localeCompare(b));
  const lows = days.map(([, price]) => price);
  const current = lows[lows.length - 1];
  const prior = lows.slice(0, -1);
  const priorLow = prior.length ? Math.min(...prior) : null;
  return {
    ...entry,
    days,
    current,
    priorLow,
    moved: new Set(lows).size > 1,
    // Drop against this listing's own best previous day — the only drop that is
    // evidence of an event rather than of a permanent price tag. Negative means
    // the price went up; null means there is no earlier day to compare against.
    drop: priorLow === null ? null : (priorLow - current) / priorLow,
  };
}

/** The gate the routine applies before a candidate may become a hit. */
function verdict(summary) {
  if (summary.days.length < 2) return 'NEW';    // no history — cannot prove a drop
  if (!summary.moved) return 'FLAT';            // permanent price, never a deal
  if (summary.drop >= LONGITUDINAL_DROP) return 'DROP';
  return 'MOVED';                               // real movement, under the bar
}

// --- reporting ---------------------------------------------------------------

const money = price => `$${price.toFixed(2)}`;
const pct = fraction => `${(fraction * 100).toFixed(1)}%`;

function printReport(byUrl) {
  const all = [...byUrl.values()].map(summarize);
  const counts = { FLAT: 0, NEW: 0, MOVED: 0, DROP: 0 };
  for (const summary of all) counts[verdict(summary)]++;
  const days = new Set(all.flatMap(s => s.days.map(([day]) => day)));

  console.log(`${all.length} listings tracked across ${days.size} days\n`);
  console.log(`  FLAT  ${String(counts.FLAT).padStart(5)}  same price every day seen — everyday price, not a deal`);
  console.log(`  NEW   ${String(counts.NEW).padStart(5)}  seen on one day only — no history, cannot confirm a drop`);
  console.log(`  MOVED ${String(counts.MOVED).padStart(5)}  price changed, but under the ${pct(LONGITUDINAL_DROP)} bar`);
  console.log(`  DROP  ${String(counts.DROP).padStart(5)}  price fell ${pct(LONGITUDINAL_DROP)}+ below its own prior low\n`);

  const movers = all.filter(summary => summary.moved).sort((a, b) => b.drop - a.drop);
  if (!movers.length) {
    console.log('No listing has ever changed price. Nothing can qualify on its own history.');
    return;
  }
  console.log('Listings whose price actually moved:\n');
  console.log('  verdict    drop   current  prior low  days  title');
  for (const s of movers)
    console.log(`  ${verdict(s).padEnd(7)} ${pct(s.drop).padStart(6)}  ${money(s.current).padStart(8)}  ` +
                `${money(s.priorLow).padStart(9)}  ${String(s.days.length).padStart(4)}  ${(s.title || '').slice(0, 60)}`);
}

function printListing(byUrl, needle) {
  const match = text => (text || '').toLowerCase().includes(needle.toLowerCase());
  const found = [...byUrl.values()].filter(entry => match(entry.url) || match(entry.title));
  if (!found.length) { console.log(`No listing matches "${needle}".`); return; }
  for (const s of found.map(summarize)) {
    console.log(`\n${s.title}\n${s.url}\n  item: ${s.item}   verdict: ${verdict(s)}`);
    for (const [day, price] of s.days) console.log(`  ${day}  ${money(price)}`);
    if (s.drop !== null) console.log(`  drop vs own prior low (${money(s.priorLow)}): ${pct(s.drop)}`);
  }
}

// --- self-check --------------------------------------------------------------

function selftest() {
  const assert = require('assert');
  const log = [
    // fake strikethrough: both numbers on every page load, two days running
    '{"ts":"2026-08-01T00:00:00Z","item":"m","url":"u/fake","title":"Fake sale","price":159.99}',
    '{"ts":"2026-08-01T00:00:00Z","item":"m","url":"u/fake","title":"Fake sale","price":89.99}',
    '{"ts":"2026-08-02T00:00:00Z","item":"m","url":"u/fake","title":"Fake sale","price":159.99}',
    '{"ts":"2026-08-02T00:00:00Z","item":"m","url":"u/fake","title":"Fake sale","price":89.99}',
    // real drop: 100, 100, then 80
    '{"ts":"2026-08-01T00:00:00Z","item":"m","url":"u/real","title":"Real drop","price":100}',
    '{"ts":"2026-08-02T00:00:00Z","item":"m","url":"u/real","title":"Real drop","price":100}',
    '{"ts":"2026-08-03T00:00:00Z","item":"m","url":"u/real","title":"Real drop","price":80}',
    // seen once, and a listing that went up
    '{"ts":"2026-08-03T00:00:00Z","item":"m","url":"u/new","title":"First sighting","price":42}',
    '{"ts":"2026-08-01T00:00:00Z","item":"m","url":"u/up","title":"Went up","price":50}',
    '{"ts":"2026-08-03T00:00:00Z","item":"m","url":"u/up","title":"Went up","price":60}',
    // an error row carries no price, and a truncated line must not kill the run
    '{"ts":"2026-08-01T00:00:00Z","item":"m","url":"u/err","error":"HTTP 403"}',
    '{"ts":"2026-08-01T00:00:0',
  ].join('\n');

  const { rows, skipped } = readObservations(log);
  assert.equal(skipped, 1, 'truncated line counted, not thrown');
  assert.equal(rows.length, 10, 'error rows are not observations');

  const byUrl = indexByListing(rows);
  const at = url => summarize(byUrl.get(url));

  const fake = at('u/fake');
  assert.equal(fake.current, 89.99, 'daily low ignores the strikethrough');
  assert.equal(fake.moved, false, 'a permanent was/now pair is not movement');
  assert.equal(fake.drop, 0, 'and shows no drop against its own history');
  assert.equal(verdict(fake), 'FLAT');

  const real = at('u/real');
  assert.equal(real.priorLow, 100);
  assert.equal(real.drop, 0.2);
  assert.equal(verdict(real), 'DROP');

  assert.equal(at('u/new').drop, null, 'one day of history cannot prove a drop');
  assert.equal(verdict(at('u/new')), 'NEW');

  assert.ok(at('u/up').drop < 0, 'a price rise is a negative drop');
  assert.equal(verdict(at('u/up')), 'MOVED');

  console.log('selftest OK');
}

// --- main --------------------------------------------------------------------

const arg = process.argv[2];
if (arg === '--selftest') {
  selftest();
} else {
  const { rows, skipped } = readObservations(fs.readFileSync(`${__dirname}/prices.jsonl`, 'utf8'));
  if (skipped) console.warn(`skipped ${skipped} unparseable line(s)`);
  const byUrl = indexByListing(rows);
  if (arg) printListing(byUrl, arg); else printReport(byUrl);
}
