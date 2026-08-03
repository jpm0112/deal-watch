# deal-watch

A weekly Claude Code cloud routine that scans for deals on the products in
[`watchlist.md`](watchlist.md) across the sites in [`sources.md`](sources.md),
and drafts an email when something genuinely good turns up.

## Files

| File | Role |
|---|---|
| `watchlist.md` | What to look for. Specs, target prices, alert rules. Edit this. |
| `sources.md` | Where to look. Includes how each site has to be accessed. |
| `prices.jsonl` | Append-only observation log. Never edited, never pruned. |
| `DEALS.md` | Human-readable findings, newest first. |

## How a run works

1. Read `watchlist.md` and `sources.md`.
2. Search each source for products matching the **Must have** specs.
3. Append every observation to `prices.jsonl` — one JSON object per line.
4. Compare against the item's target price and its tracked baseline.
5. Write any hits to the top of `DEALS.md`.
6. Draft a Gmail summary **only if** there was a hit.
7. Commit and push.

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

- **Longitudinal** — ≥15% below that product's own median recorded price.
- **Cross-sectional** — clearly under the going rate for other listings in
  the same run that meet the same must-have specs.

The price cap in `watchlist.md` is a relevance filter, not a goal. Being
under the cap is never itself a reason to alert.

## Why cross-sectional matters early

The routine runs weekly, so a product's own history accumulates ~52 points a
year. For roughly the first month the longitudinal rule has too little data
to fire, and every real hit will come from the cross-sectional comparison.
That ordering is expected — the longitudinal rule sharpens as the log fills,
and eventually becomes the better of the two.
