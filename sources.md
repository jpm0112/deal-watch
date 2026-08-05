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
| Target | target.com | 42 | Verified 2026-08-04 with scrape.js behavior — needs the scroll (probe.js's static look saw 0). Refurb-heavy results; watch condition. |
| Visible | visible.com | 46 | Verified 2026-08-04, `/shop/smartphones`. Carrier — **verify unlocked/no plan lock per listing** before trusting, same caveat as Mint Mobile. |
| Office Depot | officedepot.com | 34 | Verified 2026-08-04, search is `catalog/search.do?Ntt=`. Real titles (ViewSonic portable monitors seen). |
| Acer Store | store.acer.com | 21 | Verified 2026-08-04. Nitro PG1 portable line direct. Fixed page (baked search URL). |
| Arzopa | arzopa.com | 19 | Verified 2026-08-04, `/collections/portable-monitors`. Brand watchlist names directly; frequent discounts. |
| Motorola | motorola.com | 6 | Few prices on the listing page; product pages needed for real numbers. |

## Blocked — do not scrape directly

| Site | Domain | Result | Notes |
|---|---|---|---|
| Amazon | amazon.com | HTTP 503 | Blocked even from a residential IP. Reach via Slickdeals/Woot. |
| Camelcamelcamel | camelcamelcamel.com | HTTP 403 | Cloudflare challenge ("Just a moment..."). **Not usable** as an Amazon proxy. |
| eBay | ebay.com | HTTP 403 | Blocked on the search endpoint. |
| Dell | dell.com | HTTP 403 | "Access Denied" — aggressive filtering. |
| Walmart | walmart.com | extractor crash | Tested 2026-08-04: page DOM crashed the generic extractor mid-walk. Known hostile; parked. |
| Costco | costco.com | not tested | Membership pricing behind login. Low priority. |

## Thin or unresolved — need work before use

| Site | Domain | Result | What's needed |
|---|---|---|---|
| Google Store | store.google.com | 0 prices, HTTP 200 | Re-tested 2026-08-04 with scroll + 10s wait: still 0 — the generic extractor gets nothing from its markup. Parked. |
| PCPartPicker | pcpartpicker.com | 3 prices | Lazy table, but it's a *desktop* monitor category — its prices would pollute the portable-monitor cross-sectional median. Deliberately excluded. |
| DealNews | dealnews.com | 1 junk price | Real search endpoint found (2026-08-04): `dealnews.com/search.html?search=<q>` — but it returns pagination chrome, not deals. Parked. |
| Crutchfield | crutchfield.com | 40 prices, junk titles | 2026-08-04: `shopsearch/<q>.html` loads fine, but the star-rating link is the *only* qualifying link in the card ancestry (longest-link variant A/B'd: identical junk). Product title isn't reachable by the generic walk — needs a real per-site selector. |
| OnePlus | oneplus.com | HTTP 404 | `/us/store/phone` and `/us/store/smartphones` both 404. Correct store path still unknown. |
| Abt | abt.com | HTTP 404 | Two search-URL guesses 404'd (2026-08-02, 2026-08-04). Correct search path still unknown. |

## Untested backlog — ideas, in rough priority order

Candidates not yet probed, or excluded on watchlist grounds. Probe with
scrape.js behavior (scroll included) before promoting — probe.js's static
look undercounts (Target proved this).

| Site | Why it might help | Why it's still here |
|---|---|---|
| UPERFECT (uperfect.com) | Portable-monitor specialist, direct discounts | `/collections/portable-monitor` 404'd; find the right collection URL |
| INNOCN (innocn.com) | Watchlist names it as a candidate brand | Same — collection URL guess 404'd |
| ViewSonic (viewsonic.com) | VX16 series on the watchlist | Mostly sells via retailers; direct store unverified |
| Sam's Club (samsclub.com) | Occasional sharp monitor/phone deals | Membership pricing may be gated like Costco |
| HP (hp.com) | Sells some portable displays | Catalog likely thin for this watchlist |
| Dell Outlet (dell.com/outlet) | Refurb monitors cheap | dell.com blocked the main probe; outlet subdomain untested |
| Gazelle / Swappa | Cheap used phones | **Excluded**: third-party used violates the watchlist must-have (new or manufacturer-refurb only) |
| Costco (costco.com) | Member prices are genuinely good | Pricing behind login; low priority |

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
