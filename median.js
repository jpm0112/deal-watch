// This run's cross-sectional medians and candidates, computed instead of
// re-derived by hand.
//
// Run: node median.js [YYYY-MM-DD]    default: the latest day in the log
//      node median.js --selftest
//
// The routine used to rebuild the "clean median" in its head every run —
// which exclusions, how the PS5 tiers split — and the same tier-classifier
// bug got fixed on 2026-08-10 and again on 2026-08-11 because the fix lived
// in RUNLOG prose. The rules now live in watchlist.md as machine-read lines
// (**Exclude keywords**, **Tiers**) and in NOISE.md (known-junk URLs), and
// this script applies them. The agent's job is verifying candidates, not
// re-deriving arithmetic.
//
// For each watchlist item (split by tier when a **Tiers** line exists):
//   1. take the target day's observations, one price per URL (verified rows
//      from verify.js outrank scraped rows, else the day's low),
//   2. drop NOISE.md URLs and **Exclude keywords** matches,
//   3. report the median, every candidate 10%+ below it, and — inline —
//      each candidate's movement verdict from baseline.js, since a FLAT
//      candidate is dead on arrival however large its gap.

const fs = require('fs');
const { readObservations, indexByListing, summarize, verdict } = require('./baseline');
const { parseWatchlist } = require('./scrape');

// Mirror the bars in README.md — change both together.
const CROSS_SECTIONAL_DROP = 0.20; // candidate → hit
const NEAR_MISS = 0.10;            // candidate → CANDIDATES.md breadcrumb

/**
 * NOISE.md matcher — verified junk, excluded from every median.
 * A row's URL matches exactly (query string and #fragment ignored); a row
 * ending in `*` matches as a prefix, for seller families that mint a new SKU
 * URL per listing (the Newegg "Generic Logic, Inc." pattern).
 */
function readNoiseUrls(md) {
  const bare = url => url.split(/[?#]/)[0];
  const rows = [...md.matchAll(/^\|\s*(https?:\/\/\S+)/gm)].map(m => m[1]);
  const exact = new Set(rows.filter(u => !u.endsWith('*')).map(bare));
  const prefixes = rows.filter(u => u.endsWith('*')).map(u => u.slice(0, -1));
  return {
    size: rows.length,
    has: url => exact.has(bare(url)) || prefixes.some(p => url.startsWith(p)),
  };
}

/** One observation per URL for the given day: verified beats scraped, else the low. */
function dayObservations(rows, day) {
  const byUrl = new Map();
  for (const row of rows) {
    if (row.ts.slice(0, 10) !== day) continue;
    const kept = byUrl.get(row.url);
    const verified = row.verified === true;
    const wins = !kept
      || (verified && !kept.verified)
      || (verified === kept.verified && row.price < kept.price);
    if (wins) byUrl.set(row.url, { ...row, verified });
  }
  return [...byUrl.values()];
}

const median = prices => {
  const sorted = [...prices].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/** Comparable pools for one item: {label, rows, median} per tier (or one pool). */
function buildPools(item, observations, noiseUrls) {
  const clean = observations.filter(row =>
    row.item === item.id
    && !noiseUrls.has(row.url)
    && !(item.excludes && item.excludes.test(row.title || '')));
  const pools = item.tiers.length
    ? item.tiers.map(tier => ({
        label: `${item.id}/${tier.name}`,
        rows: [] }))
    : [{ label: item.id, rows: clean }];
  if (item.tiers.length)
    for (const row of clean) {
      const index = item.tiers.findIndex(tier => tier.re.test(row.title || ''));
      if (index >= 0) pools[index].rows.push(row); // no tier match → not comparable
    }
  return pools.map(pool => ({ ...pool, median: pool.rows.length ? median(pool.rows.map(r => r.price)) : null }));
}

/** Candidates in one pool: gap ≥ NEAR_MISS below the pool median. */
function findCandidates(pool) {
  if (pool.median === null) return [];
  return pool.rows
    .map(row => ({ ...row, gap: (pool.median - row.price) / pool.median }))
    .filter(row => row.gap >= NEAR_MISS)
    .sort((a, b) => b.gap - a.gap);
}

// --- reporting ---------------------------------------------------------------

function printReport(items, rows, day, noiseUrls) {
  const observations = dayObservations(rows, day);
  const verdictByUrl = new Map(
    [...indexByListing(rows).values()].map(entry => [entry.url, verdict(summarize(entry))]));
  console.log(`Cross-sectional report for ${day} — bars: ${CROSS_SECTIONAL_DROP * 100}% hit, ${NEAR_MISS * 100}% near-miss`);
  console.log(`(${noiseUrls.size} NOISE.md URLs excluded; movement verdicts from baseline.js)\n`);
  for (const item of items)
    for (const pool of buildPools(item, observations, noiseUrls)) {
      if (pool.median === null) { console.log(`${pool.label}: no clean observations this day\n`); continue; }
      console.log(`${pool.label}: n=${pool.rows.length} clean, median $${pool.median.toFixed(2)}`);
      const candidates = findCandidates(pool);
      if (!candidates.length) console.log('  no candidates within 10% of the bar');
      for (const c of candidates) {
        const kind = c.gap >= CROSS_SECTIONAL_DROP ? 'HIT ' : 'near';
        const movement = verdictByUrl.get(c.url) || 'NEW';
        console.log(`  ${kind} ${(c.gap * 100).toFixed(1).padStart(5)}%  $${c.price.toFixed(2).padStart(8)}` +
                    `  ${movement.padEnd(5)} ${c.verified ? '[verified]' : ''} ${(c.title || '').slice(0, 70)}`);
        console.log(`        ${c.url}`);
      }
      console.log('');
    }
  console.log('HIT rows still need the movement gate (FLAT/NEW never qualify) and page verification.');
}

// --- self-check --------------------------------------------------------------

function selftest() {
  const assert = require('assert');
  const item = {
    id: 'ps5',
    excludes: /controller|headset/i,
    tiers: [
      { name: 'pro', re: /ps5 pro|playstation 5 pro/i },
      { name: 'digital', re: /digital/i },
      { name: 'disc', re: /(?:)/ },
    ],
  };
  const day = '2026-08-16';
  const rows = [
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/1', title: 'PS5 Disc Console', price: 500 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/2', title: 'PS5 Disc Console bundle', price: 480 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/3', title: 'PS5 Disc promo', price: 350 },
    // "GameStop Pro Members" must land in DISC, not PRO — the twice-fixed bug
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/4', title: 'PS5 Console for GameStop Pro Members', price: 460 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/5', title: 'PlayStation 5 Pro Console', price: 700 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/6', title: 'PS5 Digital Edition', price: 450 },
    // excluded accessory, noise URL, wrong day, other item
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/7', title: 'PS5 DualSense Controller', price: 70 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'https://x.test/noise', title: 'PS5 Disc scam', price: 100 },
    { ts: '2026-08-01T00:00:00Z', item: 'ps5', url: 'u/old', title: 'PS5 Disc Console', price: 200 },
    { ts: `${day}T00:00:00Z`, item: 'other', url: 'u/8', title: 'PS5 Disc lookalike', price: 10 },
    // same URL twice: scraped junk low + verified real price — verified wins
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/9', title: 'PS5 Disc White', price: 50 },
    { ts: `${day}T00:00:00Z`, item: 'ps5', url: 'u/9', title: 'PS5 Disc White', price: 490, verified: true },
  ];
  const noise = readNoiseUrls(
    '# Noise\n\n| URL | Reason |\n|---|---|\n| https://x.test/noise?x=1 | scam |\n| https://x.test/family-* | seller family |\n');
  assert.ok(noise.has('https://x.test/noise'), 'noise URL parsed, query string stripped');
  assert.ok(noise.has('https://x.test/noise#lnk=sametab'), 'fragment on the observed URL ignored');
  assert.ok(noise.has('https://x.test/family-00BC9'), 'trailing-* row matches as a prefix');
  assert.ok(!noise.has('https://x.test/other'), 'unlisted URL passes');

  const pools = buildPools(item, dayObservations(rows, day), noise);
  const byLabel = Object.fromEntries(pools.map(pool => [pool.label, pool]));
  assert.equal(byLabel['ps5/pro'].rows.length, 1, 'literal "PS5 Pro" only — loyalty programs stay out');
  assert.equal(byLabel['ps5/digital'].rows.length, 1);
  const disc = byLabel['ps5/disc'];
  assert.deepEqual(disc.rows.map(r => r.url).sort(), ['u/1', 'u/2', 'u/3', 'u/4', 'u/9'],
    'disc pool: catch-all, minus accessory/noise/wrong-day/other-item');
  assert.equal(disc.rows.find(r => r.url === 'u/9').price, 490, 'verified price outranks scraped junk');
  assert.equal(disc.median, 480, 'median of 350/460/480/490/500');

  const candidates = findCandidates(disc);
  assert.deepEqual(candidates.map(c => c.url), ['u/3'], 'only the 27% gap clears the 10% floor');
  assert.ok(candidates[0].gap >= CROSS_SECTIONAL_DROP, 'and it rates as a HIT');

  assert.equal(median([1, 2, 3, 4]), 2.5, 'even-length median interpolates');

  console.log('selftest OK');
}

// --- main --------------------------------------------------------------------

if (require.main === module) {
  if (process.argv[2] === '--selftest') {
    selftest();
  } else {
    const { rows, skipped } = readObservations(fs.readFileSync(`${__dirname}/prices.jsonl`, 'utf8'));
    if (skipped) console.warn(`skipped ${skipped} unparseable line(s)`);
    const items = parseWatchlist(fs.readFileSync(`${__dirname}/watchlist.md`, 'utf8'));
    let noiseUrls = { size: 0, has: () => false };
    try { noiseUrls = readNoiseUrls(fs.readFileSync(`${__dirname}/NOISE.md`, 'utf8')); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    const day = process.argv[2] || rows[rows.length - 1].ts.slice(0, 10);
    printReport(items, rows, day, noiseUrls);
  }
}
