# Near-miss candidates

Listings that came close to a deal but didn't clear the bars in README.md —
10%+ below a median without reaching 15% (longitudinal) / 20% (cross-sectional).
Tracked so a price that keeps drifting down gets noticed before it qualifies,
and so DEALS.md verdicts have context.

Unlike DEALS.md entries, these are **not verified on their product page** —
prices may be badges or bundles. Newest first, top 5 per run at most.
Never delete past rows; a candidate that later qualifies moves to DEALS.md
via the normal verification path.

| Date | Item | Title | Price | Source | Gap | Link |
|---|---|---|---|---|---|---|
<!-- Row template (routine prepends below this line, top 5 per run max):
| YYYY-MM-DD | `watchlist-id` | <title, truncated> | $XX.XX | bestbuy | 12% below run median (need 20%) | <url> |
-->
| 2026-08-07 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable FreeSync Gaming Monitor | $169.99 | staples | 15.0% below this run's clean median (need 20%) | https://www.staples.com/viewsonic-16-144-hz-lcd-gaming-monitor-vx1654/product_24616303 |
| 2026-08-07 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable Gaming Monitor | $179.99 | officedepot | 10.0% below this run's clean median (need 20%); same panel as the Staples row above, different retailer/price | https://www.officedepot.com/a/products/9857144/ViewSonic-VX1654-16-Inch-1080p-Portable/ |
| 2026-08-05 | `hotspot-phone` | Samsung Galaxy A26 5G, full price at Visible | $299.00 | visible | 14.3% below this run's clean median (need 20%) | https://www.visible.com/shop/smartphones/samsung-galaxy-a26-5g |
| 2026-08-05 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable FreeSync Gaming Monitor | $169.99 | staples | 10.5% below this run's clean median (need 20%); this is the item's normal price, back up from the $149.99 promo verified 2026-08-04 | https://www.staples.com/viewsonic-16-144-hz-lcd-gaming-monitor-vx1654/product_24616303 |

_Prior runs (2026-08-04, 2026-08-05 x2) recorded no candidates — every apparent near-miss traced to noise (expired posts, carrier locks, off-spec panels)._

_2026-08-06 also recorded no candidates. Root cause found this run: scrape.js captures both a listing's fake "compare-at" price and its permanent sale price as two separate observations, so most apparent history-based gaps (Arzopa and otherwise) are an artifact, not movement — see RUNLOG.md for detail. Remaining near-misses were expired Slickdeals posts, third-party/locked sellers, or spec-tier mismatches in the cross-sectional set._
