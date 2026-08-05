# Deals found

Newest first. The routine prepends to this file and never removes entries —
a past deal is useful evidence about what a good price looks like.

Each entry records why it qualified, so a hit can be judged without
re-deriving the math.

---

<!-- Template — the routine copies this shape for every hit.
     Kept here so the format stays stable across runs. Do not delete.

## YYYY-MM-DD — <product title>

| | |
|---|---|
| **Item** | `watchlist-id` |
| **Price** | $XX.XX USD |
| **Was** | $XX.XX (baseline: median of N observations) |
| **Drop** | XX% below baseline / XX% below target |
| **Why it hit** | under target price \| 15%+ drop \| both |
| **Retailer** | Best Buy |
| **Seller** | Best Buy (first-party) \| third-party: <name> |
| **Condition** | new \| open-box \| manufacturer refurbished |
| **Stock** | in stock \| limited \| backordered |
| **Link** | <full URL> |

**Specs matched**

- spec: value  ← confirmed against the listing, not assumed

**Spec gaps / unconfirmed**

- anything the listing didn't state outright

**Notes**

Shipping, tax, rebate conditions, return window, expiry of the sale.

-->

## 2026-08-04 — UPERFECT 16" Portable Monitor 2K 144HZ HDR FreeSync (M160C01W)

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $149.99 USD |
| **Was** | $189.99 (baseline: median of 5 prior observations of this exact listing) |
| **Drop** | 21% below its own baseline; 55% below this run's $329.99 median for comparable 16"+ portable monitors |
| **Why it hit** | both — 15%+ own-history drop AND 20%+ below going rate |
| **Retailer** | Newegg |
| **Seller** | Uperfect (Newegg-hosted brand store), shipped by Newegg |
| **Condition** | new |
| **Stock** | in stock ("Add to cart" live, "Hot Seller", 4.7★/121 ratings) |
| **Link** | https://www.newegg.com/uperfect-m160c01w-16-qhd/p/0JC-00VS-00013 |

**Specs matched**

- Panel size: 16" — meets the 16"–18" must-have
- HDMI input: Mini HDMI port — confirmed
- USB-C video input: USB-C (DisplayPort Alt Mode) — confirmed, 144Hz over Type-C
- Stand/cover: no bundled cover; 75×75mm VESA mount confirmed instead
- Portability: 1.7 lbs, 0.4" thin — backpack-sleeve friendly

**Spec gaps / unconfirmed**

- No bundled case/cover confirmed on the listing (VESA mount is the stated accessory path) — a mild negative per watchlist notes, not a disqualifier
- Matte/anti-glare finish not stated

**Notes**

Scraper had logged this listing consistently at $189.99 across 5 prior runs; live page price verified at $149.99 (Save $40.00, 21% off) at time of this run. No stated end date on the discount. Free 30-day returns, free shipping.

---

## 2026-08-04 — ViewSonic VX1654 16" 144Hz Portable FreeSync Gaming Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $149.99 USD |
| **Was** | $329.99 (this run's median across 11 comparable 16"+ portable monitor listings) |
| **Drop** | 55% below the going rate this run (own-history drop only 12%, below the 15% longitudinal threshold) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Staples |
| **Seller** | Staples (first-party) |
| **Condition** | new |
| **Stock** | in stock ("Add to cart" live, ships / pickup by Aug 10) |
| **Link** | https://www.staples.com/viewsonic-16-144-hz-lcd-gaming-monitor-vx1654/product_24616303 |

**Specs matched**

- Panel size: 16" (1080p, 144Hz) — meets the 16"–18" must-have
- HDMI input: Mini HDMI — confirmed
- USB-C video input: USB-C with 60W PD passthrough — confirmed
- Stand/cover: built-in stand + protective cover — confirmed, bundled
- Portability: 1.5–2 lbs, ~0.6" thin — backpack-sleeve friendly

**Spec gaps / unconfirmed**

- Matte/anti-glare finish not stated (page notes "anti-glare display" in body copy but not as a spec line)

**Notes**

Page lists "Final price $149.99, Original price $169.99, 11% off," but the scraper's own price-log history for this exact URL shows $169.99 recorded consistently across 8 prior runs — the live discounted price is not yet reflected in prices.jsonl, so this hit rests on the cross-sectional comparison, not the longitudinal one. Limit 10 at promotional price.
