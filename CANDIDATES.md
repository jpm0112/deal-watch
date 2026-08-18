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
| 2026-08-18 | `hotspot-phone` | Refurbished Samsung Galaxy S23+ 256GB S916U Unlocked Smartphone - Excellent | $329.99 | target | 13.5% below this run's clean median (need 20%); movement=NEW, one day of history, unverified breadcrumb | https://www.target.com/p/samsung-galaxy-s23-256gb-s916u-unlocked-smartphone-manufacturer-refurbished/-/A-90920428 |
| 2026-08-11 | `hotspot-phone` | 128GB Motorola Moto G Power 5G Unlocked Smartphone (2025) | $200.00 | slickdeals | 14.0% below this run's clean median (need 20%); confirmed-expired sibling posts of this exact repost cluster the last 4 runs | https://slickdeals.net/f/19699113-128gb-motorola-moto-g-power-5g-unlocked-smartphone-2025-200-free-s-h |
| 2026-08-11 | `playstation-5` | Sony PlayStation 5 Slim Console: 825GB Digital $374 (digital tier) | $374.00 | slickdeals | 16.9% below this run's clean digital-tier median (need 20%) | https://slickdeals.net/f/18722797-sony-playstation-5-slim-console-1tb-disc-425-825gb-digital-374-free-shipping |
| 2026-08-11 | `playstation-5` | Active Veterans/Military: 1TB PS5 Slim Disc Edition Console (disc tier) | $380.00 | slickdeals | 19.1% below this run's clean disc-tier median (need 20%) | https://slickdeals.net/f/18811144-sony-playstation-5-slim-disc-edition-console-1tb-military-cgx-379-99-free-shipping |
| 2026-08-11 | `playstation-5` | Military/Veterans: PS5 Pro Console, Coast Guard Exchange (pro tier) | $629.00 | slickdeals | 10.1% below this run's clean pro-tier median (need 20%) | https://slickdeals.net/f/18345043-military-veterans-sony-playstation-5-pro-console-coast-guard-exchange-cgx-629 |
| 2026-08-11 | `iphone-14-pro` | iphone 14 pro 256GB Unlocked Good (purple) | $326.99 | slickdeals | 10.7% below this run's clean median (need 15%) | https://slickdeals.net/f/19099096-iphone-14-pro-256gb-unlocked-good-purple-326-99 |
| 2026-08-10 | `hotspot-phone` | Motorola moto g - 2026, full price at Visible | $279.99 | visible | 19.8% below this run's clean median (need 20%) | https://www.visible.com/shop/smartphones/motorola-moto-g-2026 |
| 2026-08-10 | `playstation-5` | Sam's Club: PS5 Digital Slim Console $369.91 (digital tier) | $370.00 | slickdeals | 17.8% below this run's clean digital-tier median (need 20%) | https://slickdeals.net/f/19197652-ymmy-sam-s-club-ps5-digital-slim-console-369-91-ps5-1tb-disc-console-399-31 |
| 2026-08-10 | `playstation-5` | Active Military/Veterans: PS5 Disc Edition Console (disc tier) | $399.00 | slickdeals | 17.7% below this run's clean disc-tier median (need 20%) | https://slickdeals.net/f/17913330-active-military-veterans-sony-playstation-5-slim-console-disc-edition-399-free-shipping |
| 2026-08-10 | `portable-monitor` | 16" Portable Gaming Monitor 1920x1200P FHD, USB-C/HDMI | $159.99 | newegg | 15.8% below this run's clean median (need 20%) | https://www.newegg.com/p/3C6-07PK-007P9 |
| 2026-08-10 | `iphone-14-pro` | Refurb (Good): 128GB Apple iPhone 14 Pro Unlocked (A2650) | $320.00 | slickdeals | 11.1% below this run's clean median (need 15%); same listing family flagged and confirmed expired/third-party in the 2026-08-07 run | https://slickdeals.net/f/18952621-refurb-good-128gb-apple-iphone-14-pro-unlocked-smartphone-6-1-black-a2650-w-1-year-warranty-320-15 |
| 2026-08-07 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable FreeSync Gaming Monitor | $169.99 | staples | 15.0% below this run's clean median (need 20%) | https://www.staples.com/viewsonic-16-144-hz-lcd-gaming-monitor-vx1654/product_24616303 |
| 2026-08-07 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable Gaming Monitor | $179.99 | officedepot | 10.0% below this run's clean median (need 20%); same panel as the Staples row above, different retailer/price | https://www.officedepot.com/a/products/9857144/ViewSonic-VX1654-16-Inch-1080p-Portable/ |
| 2026-08-05 | `hotspot-phone` | Samsung Galaxy A26 5G, full price at Visible | $299.00 | visible | 14.3% below this run's clean median (need 20%) | https://www.visible.com/shop/smartphones/samsung-galaxy-a26-5g |
| 2026-08-05 | `portable-monitor` | ViewSonic VX1654 16" 144Hz Portable FreeSync Gaming Monitor | $169.99 | staples | 10.5% below this run's clean median (need 20%); this is the item's normal price, back up from the $149.99 promo verified 2026-08-04 | https://www.staples.com/viewsonic-16-144-hz-lcd-gaming-monitor-vx1654/product_24616303 |

_Prior runs (2026-08-04, 2026-08-05 x2) recorded no candidates — every apparent near-miss traced to noise (expired posts, carrier locks, off-spec panels)._

_2026-08-06 also recorded no candidates. Root cause found this run: scrape.js captures both a listing's fake "compare-at" price and its permanent sale price as two separate observations, so most apparent history-based gaps (Arzopa and otherwise) are an artifact, not movement — see RUNLOG.md for detail. Remaining near-misses were expired Slickdeals posts, third-party/locked sellers, or spec-tier mismatches in the cross-sectional set._
