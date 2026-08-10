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

## 2026-08-10 — Arzopa Z1C 16.1" FHD 100% sRGB Portable Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $89.99 USD |
| **Was** | $189.99 (this run's clean cross-sectional median, n=43 comparable 16"–18.5" listings) |
| **Drop** | 52.6% below this run's going rate (no useful own-history baseline — every prior observation of this URL is the same $89.99, so 0% longitudinal drop) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("Availability: In Stock") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/z1c-16-1-100-srgb-fhd-1080p-portable-monitor |

**Specs matched**

- Panel size: 16.1" — meets the 16"–18" must-have
- HDMI input: Mini HDMI — confirmed ("Input Interface: Mini HD(Video Signal)"; box includes a Mini HDMI-to-HDMI cable)
- USB-C video input: confirmed — "Type-C Full Function (Video Data, Power Supply)"
- Stand/cover: built-in kickstand confirmed ("no bulky covers needed"); no separate cover bundled
- Portability: listed as lightweight/thin, single USB-C cable for one-cable operation

**Spec gaps / unconfirmed**

- No case/cover included (kickstand only) — a mild negative per watchlist notes, not a disqualifier
- Matte/anti-glare finish not stated
- Refresh rate 60Hz (basic panel, not gaming-tier — still meets all stated must-haves)

**Notes**

Page shows "$89.99 $159.99 SAVE 44%" with no stated end date. scrape.js logged this same URL at both $89.99 and $159.99 in every run since 2026-08-05 (list price vs. sale price captured as two separate rows) — live page confirms $89.99 is the real, current, standing price, not a badge artifact. Because it's been steady at $89.99 for 5+ days, this is more "persistently good" than "just dropped," but it still clears the cross-sectional bar on its own merits and has not been recorded in DEALS.md before.

---

## 2026-08-07 — Motorola Moto G Stylus 5G (2024), 256GB, Unlocked (Caramel Latte)

| | |
|---|---|
| **Item** | `hotspot-phone` |
| **Price** | $199.99 USD |
| **Was** | $349.00 (this run's clean cross-sectional median, n=106 comparable listings) |
| **Drop** | 42.7% below this run's going rate (no own-history baseline yet — first observation of this URL) |
| **Why it hit** | 20%+ below going rate (cross-sectional) |
| **Retailer** | Best Buy |
| **Seller** | Best Buy (first-party) |
| **Condition** | new |
| **Stock** | in stock for pickup ("Pick up today"; "Shipping unavailable" at time of check) |
| **Link** | https://www.bestbuy.com/product/motorola-moto-g-stylus-5g-2024-256gb-unlocked-caramel-latte/J39QWY66FW/sku/6578951 |

**Specs matched**

- Unlocked: confirmed — Best Buy lists it under "No Contract/Unlocked > Unlocked" and in the title
- eSIM capable: confirmed via Motorola's own spec page (motorola.com) — "SIM Card: Dual SIM (1 Nano SIM + eSIM)"
- 5G: confirmed — model name and Motorola product page both state 5G
- Mobile hotspot: not disabled — standard unlocked retail SKU, no carrier-lock bundle
- Condition: new retail listing (no open-box/refurb tag on the Best Buy listing)

**Spec gaps / unconfirmed**

- Battery capacity (5000 mAh+ nice-to-have) not independently confirmed this run
- USB-C PD passthrough not independently confirmed this run

**Notes**

Surfaced via a Slickdeals post pointing at a Best Buy listing scraped at $189.99; that Slickdeals post was still live (not expired) but Best Buy's own live search this run showed the current real price as $199.99 ("Top Deal," "Save $200," comparable value $399.99) — used the live-verified number, not the stale scraped one. The Best Buy product page itself would not load directly through the proxy (net::ERR_HTTP2_PROTOCOL_ERROR on repeated attempts, both via Playwright and curl) — price/stock/title/seller were confirmed instead from Best Buy's live search results page, and specs from Motorola's own product page. Motorola.com sells the same configuration directly at an even lower $179.99, but that listing showed "Currently Out of Stock" at check time, so it isn't cited as the buyable link. "Shipping unavailable" on the Best Buy listing means local pickup only — worth confirming stock at a nearby store before treating this as guaranteed available.

---

## 2026-08-07 — UPERFECT 16" 2K QHD Portable Monitor (2560x1600, VESA Mount)

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $149.99 USD |
| **Was** | $200.00 (this run's clean cross-sectional median, n=73 comparable listings) |
| **Drop** | 25.0% below this run's going rate (no own-history baseline yet — first accurate observation of this URL) |
| **Why it hit** | 20%+ below going rate (cross-sectional) |
| **Retailer** | Newegg |
| **Seller** | Uperfect (Newegg-hosted brand store, "Hot Seller," 4.7★/121 ratings), shipped by Uperfect |
| **Condition** | new |
| **Stock** | in stock ("Add to cart" live, free shipping, delivery in 3 days) |
| **Link** | https://www.newegg.com/p/2NY-008V-000T9 |

**Specs matched**

- Panel size: 16" — meets the 16"–18" must-have
- HDMI input: confirmed (full-size HDMI per listing copy)
- USB-C video input: confirmed — "USB-C 3.1 (video + data)," DP Alt Mode, compatible with laptops/MacBooks/Android/Switch/PS4/PS5
- Stand/cover: confirmed — magnetic protective cover doubling as an adjustable stand, included
- Portability: 1.48 lbs — backpack-sleeve friendly

**Spec gaps / unconfirmed**

- Matte/anti-glare finish not stated on the listing
- No "was/reg" discount badge shown on the product page itself — this is the item's listed price, not a temporary markdown; it qualifies on being genuinely cheaper than this run's comparable-listing median, not on a price cut

**Notes**

scrape.js had logged this URL at $119.99, but that price belongs to a different, unrelated *sponsored* product card (a "KurieTim 21.5\" Monitor") that renders on the same page — a new extraction-contamination pattern, distinct from the previously-documented was/now duplicate-price artifact. The real product's price, read directly from the page's price element, is $149.99. Used the verified $149.99, not the scraped $119.99; it still clears the cross-sectional bar (25.0%) at the correct price. Worth a scrape.js fix: the generic extractor should stay within the main product's card boundary and not wander into a nearby sponsored widget.

---

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
