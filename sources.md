# Sources

Sites the routine checks. The **Access** column is the design-critical one:
it says how the routine can actually read the page, and it's the difference
between a real result and a silent zero.

- **Open** — a plain fetch works.
- **Playwright** — needs a real browser (price is rendered by JS).
- **Hostile** — actively blocks datacenter IPs; expect CAPTCHAs and empty
  results regardless of browser. Treat any "no results" from these as
  unproven, not as "no deals."

Entries marked **verified** were tested with a real browser on 2026-08-02.
Unmarked entries are still estimates and should be confirmed before the
routine depends on them.

Every domain listed here must also be in the cloud environment's **Allowed
domains** list, or the request dies with `403 host_not_allowed`.

---

## Retailers — general

| Site | Domain | Access | Notes |
|---|---|---|---|
| Amazon | amazon.com | **Hostile — verified blocked** | Returned HTTP 503 from a residential IP with a real browser (2026-08-02). Do not scrape directly; reach via price-history sites below. |
| Best Buy | bestbuy.com | **Playwright — verified working** | Prices at `[data-testid="price-block-customer-price"]`. Open-box deals are often the real bargain. |
| B&H Photo | bhphotovideo.com | **Playwright — verified working** | Prices extract cleanly; product-title selector still needs pinning down. Payboo/instant-rebate prices differ from list. |
| Newegg | newegg.com | Playwright | Strong on monitors, weak on phones. Watch third-party marketplace sellers. |
| Walmart | walmart.com | Hostile | Heavy bot protection. Marketplace sellers muddy results. |
| Target | target.com | Playwright | Thin selection for both categories. |
| Micro Center | microcenter.com | Playwright | Prices are per-store; needs a store set or results are meaningless. |
| Adorama | adorama.com | Playwright | B&H competitor, similar monitor stock. |
| Costco | costco.com | Hostile | Membership pricing hidden behind login. Low priority. |
| Woot | woot.com | Playwright | Amazon-owned closeouts. High variance, occasionally excellent. |
| eBay | ebay.com | Playwright | Manufacturer-refurbished listings only — see watchlist condition rules. |

## Retailers — phone-specific

| Site | Domain | Access | Notes |
|---|---|---|---|
| Google Store | store.google.com | Playwright | Pixel A-series; eSIM support is dependable here. |
| Motorola | motorola.com | Playwright | Frequent direct discounts well below retail. |
| Samsung | samsung.com | Playwright | Verify eSIM by exact model number, US variant. |
| Back Market | backmarket.com | Playwright | Refurb grading is explicit. Confirm "unlocked" per listing. |

## Price history / aggregators

These are the highest-value sources for the money, because they solve the
Amazon problem without fighting Amazon.

| Site | Domain | Access | Notes |
|---|---|---|---|
| Camelcamelcamel | camelcamelcamel.com | Open | Amazon price history. Gives a real baseline, not just today's number. |
| Keepa | keepa.com | Playwright | Same idea, richer data. API is paid. |
| Slickdeals | slickdeals.net | Playwright | Human-vetted deals. Front-page items are usually genuine. |
| DealNews | dealnews.com | Open | Editorially curated, clean structure, easy to parse. |
| r/buildapcsales | reddit.com/r/buildapcsales | Open | Monitors show up here constantly. Old reddit + `.json` is trivially parseable. |

---

## Rules

- A source returning zero results is logged as an **error**, never as "no
  deals found." Silent failure is the main way this routine rots.
- Record the seller for marketplace listings (Amazon/Walmart/Newegg/eBay).
  A third-party seller at a suspiciously good price is usually not a deal.
- Prefer the price-history sources for the *baseline*; use retailer pages
  for *today's* price.
- Shipping and tax are excluded from recorded prices unless the site makes
  them unavoidable — note it if so.
