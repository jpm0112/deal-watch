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

An item is a hit if **either**:

- price ≤ its target price in `watchlist.md`, or
- price is ≥15% below the item's baseline (median of its recorded prices)

## Caveat on the baseline

The routine runs weekly, so the baseline accumulates ~52 observations a year.
For roughly the first month, "15% below baseline" has too little history to
mean much, and hits will effectively come from the target price alone. This
is expected; the rule sharpens as the log fills.
