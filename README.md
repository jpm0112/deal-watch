# deal-watch

A weekly Claude Code cloud routine that scans for deals on the products in
[`watchlist.md`](watchlist.md) across the sites in [`sources.md`](sources.md),
and records verified hits in [`DEALS.md`](DEALS.md) when something genuinely
good turns up.

## Files

| File | Role |
|---|---|
| `watchlist.md` | What to look for. Specs, caps, search queries. Edit this. |
| `sources.md` | Where to look, and how each site behaves when scraped. |
| `scrape.js` | Collects observations. Mechanical: gathers, never judges. |
| `probe.js` | One-off source viability tester. Re-run when a site goes quiet. |
| `verify.js` | Records a price read off a product page. The only hand-append path. |
| `prices.jsonl` | Append-only observation log. Never edited, never pruned. |
| `baseline.js` | Each listing's own price history. Has this price ever actually moved? |
| `median.js` | This run's cross-sectional medians and candidates, rules applied from `watchlist.md` + `NOISE.md`. |
| `DEALS.md` | Human-readable verified findings, newest first. |
| `CANDIDATES.md` | Near-misses (10%+ below a median, under the bar). Unverified breadcrumbs. |
| `NOISE.md` | Verified-junk URLs with durable reasons. Excluded from medians, never re-verified. |
| `routine-prompt.md` | The instructions pasted into the cloud routine. |

## How a run works

1. `node scrape.js` — reads `watchlist.md`, scrapes the verified sources,
   appends every observation *and every failure* to `prices.jsonl`.
2. The agent applies the relative deal rules (below) to this run's data.
3. Every candidate is **verified on its own product page** before it counts:
   real price, must-have specs, seller, condition, stock. The scraper's wide
   net catches discount badges and accessories; verification throws them back.
   Every verified price goes back into the log via `node verify.js` — including
   the ones that get discarded.
4. Verified hits are prepended to `DEALS.md`; near-misses (close to a bar
   but under it) get one unverified row each in `CANDIDATES.md`.
5. Commit and push.

The routine uses **no connectors** and sends nothing itself. `DEALS.md`, the
commit history, and — for a must-buy only — a GitHub issue on this repo are
the entire output surface.

## The price log

`prices.jsonl` is append-only. Nothing is ever rewritten or deleted, so the
full observation history survives and diffs cleanly.

```json
{"ts":"2026-08-02T12:00:00Z","item":"portable-monitor","source":"bestbuy","seller":"Best Buy","title":"Arzopa A1 16\" FHD","url":"https://...","price":109.99,"currency":"USD","condition":"new","in_stock":true}
```

Best-ever price and the drop-vs-baseline rule are **derived** from this file
at read time, not stored. That way a bad run can't corrupt the baseline.

Failures are logged too, with `"error"` instead of `"price"`. This matters:
a site that blocked the scraper must never be recorded as "no deals found."

Rows written by `verify.js` carry `"verified":true`. For a given listing and
day, a verified row **outranks every scraped row** — higher or lower — because
it was read off the product page rather than guessed from a search card. Before
this existed the verified price lived only in `DEALS.md`, so `baseline.js` kept
scoring listings on numbers the routine had already disproved: the ViewSonic
VX1654 reads `FLAT` at $169.99 across nine runs while `DEALS.md` records the
$149.99 promo that was actually on the page.

## Alert rule

There are no target prices. A listing is a hit on **relative** evidence:

- **Longitudinal** — ≥15% below that specific model's own median recorded
  price (matched by URL/title, not the watchlist item — an item-wide median
  mixes cheap and premium products and means nothing).
- **Cross-sectional** — ≥20% below the median price of comparable listings
  in the same run that meet the same must-have specs.

Both rules are gated on **movement**: the price the listing charges must
actually have gone down. `node baseline.js` collapses every listing to one
price per day (the low) and reports whether that price has ever changed.

- `FLAT` — same price every day it was seen. This is what the thing costs.
  Never a hit, however large the strikethrough or how far below any median.
- `NEW` — one day of history, so no drop can be proven. May go to
  `CANDIDATES.md`; never to `DEALS.md`.
- `MOVED` / `DROP` — the price genuinely changed. Only these can be hits.

The price cap in `watchlist.md` is a relevance filter, not a goal. Being
under the cap is never itself a reason to alert.

## Must-buy

`DEALS.md` records anything that clears the bars. A **must-buy** is stricter,
and it is the only thing that earns a notification:

1. Movement verdict is `DROP` — the price fell 15%+ below this listing's own
   prior daily low, which also makes it the lowest it has ever been recorded.
2. **Both** relative rules fire, not one: it is *also* 20%+ below the median of
   comparable listings **in its own spec tier** (a 1080p/60Hz panel is not
   comparable to a QHD/144Hz one, and flattering it with that median is how the
   Arzopa entries got recorded as hits on 2026-08-11).
3. Verification is clean: first-party or manufacturer seller, in stock, live —
   not an expired post — and every must-have spec confirmed on the page itself.

Anything that fails 2 or 3 is a normal `DEALS.md` entry, not a must-buy. Expect
one to fire once or twice a month at most. Silence is the system working.

When one fires, the routine opens a GitHub issue titled `MUST-BUY: <product>
$X`, which GitHub emails to you. Nothing else notifies.

## Permanent discounts

The failure mode the movement gate exists for: a listing that displays
"~~$159.99~~ / $89.99 now" on every page load, forever. Nothing is on sale —
that is simply what it costs — but a naive reading sees two prices for one
product and computes a 44% drop against their median, every single run.

Two defences, one at each end:

- `scrape.js` records **one observation per listing per run, at the lowest
  price it showed**, and skips price nodes labelled as references ("Save $50",
  "20% off", "Reg. $199.99"). The compare-at number never enters the log.
- `baseline.js` reads the log by **daily low**, so rows collected before that
  fix still resolve to the real charged price, and reports which listings have
  ever moved. Most never have.

The same gate kills the other permanent-discount shape: a listing that is
genuinely 20% under the cross-sectional median because the comparable set
mixes spec tiers (a 1080p/60Hz panel against QHD/144Hz ones). That gap is
permanent too, so the price is flat, so it is not a hit.

## Why cross-sectional matters early

The routine runs weekly, so a product's own history accumulates ~52 points a
year. For roughly the first month the longitudinal rule has too little data
to fire, and every real hit will come from the cross-sectional comparison.
That ordering is expected — the longitudinal rule sharpens as the log fills,
and eventually becomes the better of the two.
