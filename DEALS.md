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
| **Was** | $XX.XX — this listing's own prior daily low (`node baseline.js <url>`) |
| **History** | $A on YYYY-MM-DD → $B on YYYY-MM-DD → ... (verdict: MOVED \| DROP) |
| **Drop** | XX% below its own prior low / XX% below the comparable-set median |
| **Why it hit** | 15%+ below its own history \| 20%+ below comparables \| both |
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

## 2026-08-15 — Arzopa Z1FC Gray 16.1" 144Hz Portable Monitor with Sleeve Bag

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $129.99 USD |
| **Was** | $109.99 — this listing's own prior daily low (`node baseline.js arzopa-z1fc-gray`) |
| **History** | $109.99 on 2026-08-05 → $109.99 on 2026-08-06 → $129.98 on 2026-08-07 → $129.98 on 2026-08-10 → $109.99 on 2026-08-11 → $129.99 on 2026-08-15 (verdict: MOVED) |
| **Drop** | 28.2% below this run's clean cross-sectional median ($180.99, n=32 comparable 16"–18" listings) |
| **Why it hit** | 20%+ below comparables (cross-sectional only — today's price is a rise off this listing's own $109.99 low, not a fresh drop) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("In Stock — Estimated delivery in 2-4 business days") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/arzopa-z1fc-gray-144hz-portable-gaming-monitor-16-1-screen |

**Specs matched**

- Panel size: 16.1" — meets the 16"–18" must-have
- HDMI input: Mini HDMI (2.0) confirmed in the Interface spec row
- USB-C video input: confirmed, dual USB 3.1 Type-C, PD power + DP output
- Stand/cover: built-in stand, plus a bundled sleeve bag (box contents list it explicitly)
- Refresh rate: 144Hz — gaming-tier feature at a budget price

**Spec gaps / unconfirmed**

- Matte/anti-glare finish not stated

**Notes**

Distinct SKU/URL from the already-logged "Arzopa Z1FC 16.1" 144Hz IPS Laptop Portable Monitor" (2026-08-11 entry, same $129.99 price) — this one bundles a protective sleeve bag and is a different product page; not a duplicate. This is the first `portable-monitor` hit logged since the movement gate (README) took effect that genuinely clears it: baseline.js shows real historical price fluctuation ($109.99 ↔ $129.99) rather than the static was/now flash-sale display several sibling Arzopa SKUs show this run (Z1C, A1M, Z1RC, and the other Z1FC URL are all FLAT and were not re-logged).

---

## 2026-08-15 — Arzopa Z3FC 16.1" 2.5K 180Hz Portable Gaming Monitor FreeSync

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $139.99 USD |
| **Was** | $145.99 — this listing's own prior daily low (`node baseline.js arzopa-z3fc`) |
| **History** | $145.99 on 2026-08-05 → $145.99 on 2026-08-06 → $145.99 on 2026-08-07 → $145.99 on 2026-08-10 → $145.99 on 2026-08-11 → $139.99 on 2026-08-15 (verdict: MOVED, 4.1% below prior low — under the 15% longitudinal bar) |
| **Drop** | 22.7% below this run's clean cross-sectional median ($180.99, n=32 comparable 16"–18" listings) |
| **Why it hit** | 20%+ below comparables (cross-sectional); also clears the movement gate on a genuine (if modest) price decrease |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("In Stock - Estimated delivery in 2-4 business days") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/arzopa-z3fc-16-1-180hz-2560x1440-qhd-portable-gaming-monitor |

**Specs matched**

- Panel size: 16.1" — meets the 16"–18" must-have
- HDMI input: confirmed ("HDMI supports up to 144Hz")
- USB-C video input: confirmed ("DP supports up to 180Hz")
- Stand/cover: built-in stand, plus a bundled protective case
- Resolution/refresh: 2.5K QHD @ 180Hz — Arzopa's gaming-tier panel, priced below this run's mostly-1080p median

**Spec gaps / unconfirmed**

- Matte/anti-glare finish not stated

**Notes**

Supersedes the 2026-08-11 entry for this same listing ($145.99 then, $139.99 now) — genuinely lower, not a re-log. Unlike that earlier entry (logged before the movement gate existed, explicitly caveated as "not an independent baseline"), this price actually moved on baseline.js's own-history check, so it clears the current, stricter movement-gated rule on its merits rather than needing the caveat.

---

## 2026-08-11 — Arzopa A1M 17.3" Large 1080p Portable Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $119.99 USD |
| **Was** | $189.99 (this run's clean cross-sectional median, n=35 comparable 16"–18" listings) |
| **Drop** | 36.8% below this run's going rate (no useful own-history baseline — page shows a permanent-looking "$189.99 $119.99 SAVE 37%" flash-sale display on every visit, same non-independent-anchor pattern documented since 2026-08-06) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("Availability: In Stock") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/a1m-17-3-1080p-fhd-ips-portable-monitor |

**Specs matched**

- Panel size: 17.3" — meets the 16"–18" must-have, close to the preferred 18"
- HDMI input: Mini HDMI confirmed ("Features 2 full-featured Type-C ports and 1 MiniHDMI port")
- USB-C video input: confirmed, 2x full-function Type-C (video + power)
- Stand/cover: built-in kickstand confirmed
- Single-cable USB-C operation: yes (full-function Type-C carries video + power)

**Spec gaps / unconfirmed**

- No case/cover bundled (kickstand only)
- Matte/anti-glare finish not stated
- 60Hz panel, 1080p — basic tier, still meets all stated must-haves

**Notes**

Same "permanent flash sale" display pattern as Arzopa's other listed models (countdown-free here, but identical was/now price on every observation since first logged) — not treated as a fresh price-drop event, but it independently clears the cross-sectional bar against this run's clean median the same way Z1C did on 2026-08-10. Not previously recorded in DEALS.md.

---

## 2026-08-11 — Arzopa Z1RC 16" 2.5K QHD Portable Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $124.99 USD |
| **Was** | $189.99 (this run's clean cross-sectional median, n=35 comparable 16"–18" listings) |
| **Drop** | 34.2% below this run's going rate (page shows a permanent-looking "$199.99 $124.99 SAVE 38%" display with a rolling countdown timer on every visit — not an independent baseline, same caveat as other Arzopa listings) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("Availability: In Stock") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/z1rc-2k-portable-monitor |

**Specs matched**

- Panel size: 16" — meets the 16"–18" must-have
- HDMI input: Mini HDMI confirmed ("Input Interface: Mini HD(Video Signal), Type-C Full Function")
- USB-C video input: confirmed, dual full-function Type-C ports
- Stand/cover: built-in kickstand confirmed
- Resolution: 2560x1600 QHD — well above the 1080p "nice to have" bar

**Spec gaps / unconfirmed**

- No case/cover bundled by default (a bag is offered as a paid add-on)
- Matte/anti-glare finish not stated

**Notes**

Notably a QHD panel at a price usually reserved for 1080p budget monitors in this catalog — genuinely below going rate for its spec tier, not just its brand tier. Same "flash sale" display caveat as A1M/Z1FC above (not claimed as a fresh drop). Not previously recorded in DEALS.md.

---

## 2026-08-11 — Arzopa Z1FC 16.1" 144Hz Portable Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $129.99 USD |
| **Was** | $189.99 (this run's clean cross-sectional median, n=35 comparable 16"–18" listings) |
| **Drop** | 31.6% below this run's going rate (page shows a permanent-looking "$179.99 $129.99 SAVE 28%" display with a rolling countdown timer on every visit — not an independent baseline) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("Availability: In Stock") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/z1fc-16-1-fhd-144hz-portable-monitor |

**Specs matched**

- Panel size: 16.1" — meets the 16"–18" must-have
- HDMI input: Mini HDMI confirmed
- USB-C video input: confirmed, dual full-function Type-C ports
- Stand/cover: built-in kickstand confirmed
- Refresh rate: 144Hz — gaming-tier feature at a budget price

**Spec gaps / unconfirmed**

- No case/cover bundled (sleeve bag is a separate SKU/variant)
- Matte/anti-glare finish not stated

**Notes**

144Hz is normally a premium feature in this catalog; this SKU carries it well below the going rate for comparable panels. Same "flash sale" display caveat as the other Arzopa entries above. Not previously recorded in DEALS.md.

---

## 2026-08-11 — Arzopa Z3FC 16.1" 2.5K 180Hz Portable Gaming Monitor

| | |
|---|---|
| **Item** | `portable-monitor` |
| **Price** | $145.99 USD |
| **Was** | $189.99 (this run's clean cross-sectional median, n=35 comparable 16"–18" listings) |
| **Drop** | 23.2% below this run's going rate (page shows a permanent-looking "$359.99 $145.99 SAVE 59%" display with a rolling countdown timer on every visit — not an independent baseline, same caveat as the other Arzopa entries above) |
| **Why it hit** | 20%+ below going rate (cross-sectional only) |
| **Retailer** | Arzopa (arzopa.com, direct) |
| **Seller** | Arzopa (first-party) |
| **Condition** | new |
| **Stock** | in stock ("In Stock - Estimated delivery in 2-4 business days") |
| **Link** | https://www.arzopa.com/collections/portable-monitors/products/arzopa-z3fc-16-1-180hz-2560x1440-qhd-portable-gaming-monitor |

**Specs matched**

- Panel size: 16.1" — meets the 16"–18" must-have
- HDMI input: Mini HDMI (2.0) confirmed
- USB-C video input: confirmed, 2x USB-C (PD power + DP output)
- Stand/cover: integrated stand *and* a premium protective sleeve included in the box — clears the must-have with margin
- Resolution/refresh: 2.5K QHD @ 180Hz — Arzopa's top gaming tier, priced below this run's median for the whole (mostly 1080p/60Hz) comparable set

**Spec gaps / unconfirmed**

- Matte/anti-glare finish not stated
- HDMI port caps out at 144Hz (180Hz requires the USB-C/DP path) — not a must-have gap, just a usage note

**Notes**

Arzopa's flagship model in the comparable set, priced *higher* than the brand's other three hits this run (A1M/Z1RC/Z1FC) but still 23.2% under the run's overall clean median — a 2026-08-05T14:12Z entry previously used this same higher-than-siblings pricing as a reason to distrust a *longitudinal* "42.3% below its own fake median" claim on this exact listing; that reasoning doesn't apply to the cross-sectional comparison made here, which only requires being cheaper than the going rate for comparable specs across the whole run, and it clears that independently. Not previously recorded in DEALS.md.

---

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
