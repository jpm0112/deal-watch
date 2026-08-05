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
| `prices.jsonl` | Append-only observation log. Never edited, never pruned. |
| `DEALS.md` | Human-readable verified findings, newest first. |
| `routine-prompt.md` | The instructions pasted into the cloud routine. |

## How a run works

1. `node scrape.js` — reads `watchlist.md`, scrapes the verified sources,
   appends every observation *and every failure* to `prices.jsonl`.
2. The agent applies the relative deal rules (below) to this run's data.
3. Every candidate is **verified on its own product page** before it counts:
   real price, must-have specs, seller, condition, stock. The scraper's wide
   net catches discount badges and accessories; verification throws them back.
4. Verified hits are prepended to `DEALS.md`.
5. Commit and push.

The routine uses **no connectors** and sends nothing. `DEALS.md` and the
commit history are the only output. Notification is handled separately.

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

## Alert rule

There are no target prices. A listing is a hit on **relative** evidence:

- **Longitudinal** — ≥15% below that specific model's own median recorded
  price (matched by URL/title, not the watchlist item — an item-wide median
  mixes cheap and premium products and means nothing).
- **Cross-sectional** — ≥20% below the median price of comparable listings
  in the same run that meet the same must-have specs.

The price cap in `watchlist.md` is a relevance filter, not a goal. Being
under the cap is never itself a reason to alert.

## Why cross-sectional matters early

The routine runs weekly, so a product's own history accumulates ~52 points a
year. For roughly the first month the longitudinal rule has too little data
to fire, and every real hit will come from the cross-sectional comparison.
That ordering is expected — the longitudinal rule sharpens as the log fills,
and eventually becomes the better of the two.
