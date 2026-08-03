# Sources

Sites the routine checks. The **Access** column is the design-critical one:
it says how the routine can actually read the page, and it's the difference
between a real result and a silent zero.

All entries below were tested with a real headless browser on **2026-08-02**
via [`probe.js`](probe.js). Re-run it whenever a source starts returning
nothing — retailers change markup and bot rules without warning.

- **WORKS** — a real browser gets prices back. Use it.
- **THIN** — page loads but few prices found; selector or URL needs work.
- **BLOCKED** — 403/CAPTCHA. Treat any "no results" here as *unproven*,
  never as "no deals."
- **URL WRONG** — my search URL 404'd. Not a blocking verdict; unverified.

Every domain here must also be in the cloud environment's **Allowed domains**
list, or the request dies with `403 host_not_allowed`.

---

## Confirmed working — the routine's roster

| Site | Domain | Prices seen | Notes |
|---|---|---|---|
| Newegg | newegg.com | 113 | Best yield of any retailer. Strong on monitors. Watch third-party sellers. |
| Slickdeals | slickdeals.net | 101 | **The Amazon workaround.** Human-vetted deals incl. Amazon listings. |
| Back Market | backmarket.com | 93 | Refurb grading explicit. Confirm "unlocked" per listing. |
| Adorama | adorama.com | 84 | B&H competitor, similar monitor stock. |
| Lenovo | lenovo.com | 55 | ThinkVision M-series, discounted hard and often. |
| B&H Photo | bhphotovideo.com | 53 | Payboo/instant-rebate prices differ from list. |
| Woot | woot.com | 51 | Amazon-owned closeouts. High variance, occasionally excellent. |
| Best Buy | bestbuy.com | 45 | Prices at `[data-testid="price-block-customer-price"]`. Open-box worth checking. |
| Mint Mobile | mintmobile.com | 43 | Cheap unlocked stock — verify no carrier lock before trusting. |
| ASUS | asus.com | 41 | ZenScreen line direct. |
| Micro Center | microcenter.com | 28 | Prices are per-store; needs a store set or results mislead. |
| Samsung | samsung.com | 28 | Verify eSIM by exact model number, US variant. |
| Monoprice | monoprice.com | 25 | Own-brand portable monitors, plain site, cheap. |
| Staples | staples.com | 15 | Thin catalog but reliably readable. |
| Motorola | motorola.com | 6 | Few prices on the listing page; product pages needed for real numbers. |

## Blocked — do not scrape directly

| Site | Domain | Result | Notes |
|---|---|---|---|
| Amazon | amazon.com | HTTP 503 | Blocked even from a residential IP. Reach via Slickdeals/Woot. |
| Camelcamelcamel | camelcamelcamel.com | HTTP 403 | Cloudflare challenge ("Just a moment..."). **Not usable** as an Amazon proxy. |
| eBay | ebay.com | HTTP 403 | Blocked on the search endpoint. |
| Dell | dell.com | HTTP 403 | "Access Denied" — aggressive filtering. |
| Walmart | walmart.com | not tested | Known hostile; assume blocked until proven otherwise. |
| Costco | costco.com | not tested | Membership pricing behind login. Low priority. |

## Thin or unresolved — need work before use

| Site | Domain | Result | What's needed |
|---|---|---|---|
| Target | target.com | 0 prices, HTTP 200 | Page loads but renders no prices in 3.5s. Needs longer wait or is silently gated. |
| Google Store | store.google.com | 0 prices, HTTP 200 | Prices load in a later JS pass. Needs a wait-for-selector. |
| PCPartPicker | pcpartpicker.com | 3 prices | Table is lazy-loaded; needs scroll before extraction. |
| DealNews | dealnews.com | 4 prices | Category URL was too broad. Try a keyword search URL. |
| Visible | visible.com | 1 price | Wrong landing URL. |
| OnePlus | oneplus.com | 2 prices | Wrong landing URL. |
| Abt | abt.com | HTTP 404 | My search URL was wrong — not blocked. Needs the correct search path. |
| Office Depot | officedepot.com | HTTP 404 | Same — URL wrong, unverified. |
| Crutchfield | crutchfield.com | HTTP 404 | Same — URL wrong, unverified. |
| Gazelle | gazelle.com | HTTP 404 | Same — URL wrong, unverified. |

I didn't chase the four 404s. Fifteen working sources is already more than
this watchlist needs, and guessing search URLs is low-value work.

## scrape.js behavior notes (2026-08-02, local test runs)

- **Back Market** — intermittent Cloudflare ("Just a moment"). Worked in the
  first probe, blocked in later runs. Expect flakiness; error lines are normal.
- **B&H, Micro Center** — occasionally Cloudflare-challenge one query then
  serve the rest. Repeated same-site requests in one run trigger it.
- **Adorama** — loads (HTTP 200) but the generic extractor gets nothing;
  likely shadow-DOM or iframe pricing. Parked.
- **Best Buy** — serves a facet-only skeleton until the page is scrolled;
  scrape.js scrolls for this reason. Its "$25 – $49.99" facet labels look
  like prices; the min-price filter absorbs most of them.
- **Known noise**: "Save $50"-style badges get captured as prices. This is
  why every candidate deal must be verified on its product page before it
  reaches DEALS.md.
- Yield varies run to run (anti-bot serving is nondeterministic). A site
  yielding 0 in one run and 25 in the next is normal; only a site erroring
  consistently across weeks needs attention.

---

## Rules

- A source returning zero results is logged as an **error**, never as "no
  deals found." Silent failure is the main way this routine rots.
- Record the seller for marketplace listings (Newegg/eBay/Walmart). A
  third-party seller at a suspiciously good price is usually not a deal.
- Prefer Slickdeals for *Amazon* pricing; use retailer pages for their own.
- Shipping and tax are excluded from recorded prices unless the site makes
  them unavoidable — note it if so.
