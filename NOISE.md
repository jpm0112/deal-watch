# Known noise

Listings verified on their own product page and found to be junk — for a
reason that will still be true next week. `median.js` excludes these URLs
from every median and candidate list, and step 6 of the routine skips them
without re-opening the page.

This ledger exists because the routine re-verified the same ViewSonic
VA1653 "16-inch that is actually 15.6" contradiction four separate weeks
(2026-08-05, -07, -10, -11), each time rediscovering the precedent in
RUNLOG prose.

Rules:

- Add a row the FIRST time a candidate is discarded for a durable reason:
  failed must-have spec, badge-as-price artifact, unbranded third-party
  seller, wrong product category. One row per URL, query string stripped.
- A wrong PRICE alone does not belong here — record the real price with
  `node verify.js` instead; the listing may genuinely go on sale later.
- Re-admit a listing by deleting its row (say why in the commit message).
- The URL must start the row's first cell — `median.js` parses `| http`.
  Query strings and #fragments are ignored when matching. A row ending in
  `*` matches as a URL prefix — for a seller that mints a new SKU URL per
  listing.

| URL | Reason | Flagged |
|---|---|---|
| https://www.officedepot.com/a/products/4486121/ViewSonic-VA1653-16-Inch-1080p-FHD/ | Spec table says 15.6" (396.24mm viewable) contradicting the "16 Inch" title — fails the 16" floor. Confirmed 4 runs. | 2026-08-05 |
| https://www.target.com/p/viewsonic-va1653-16-inch-1080p-fhd-ips-portable-monitor-with-eye-care-built-in-stand-usb-c-mini-hdmi-and-protective-case-external-second-screen/-/A-1003028407 | Same VA1653 panel, same 15.6" contradiction as the Office Depot listing. | 2026-08-05 |
| https://www.target.com/p/manufacturer-refurbished-viewsonic-va1653-16-fhd-ips-portable-monitor-built-in-stand-cr/-/A-1005994584 | Same VA1653 panel again, refurb SKU. | 2026-08-05 |
| https://www.newegg.com/lg-16mr70-asda8-16/p/N82E16824026386 | Scraped "$50.12" is the "Save: $50.12 (10%)" badge, not a price — real price $443.87. Confirmed live twice (2026-08-07, -11). | 2026-08-07 |
| https://www.newegg.com/p/3C6-07PK-* | Whole SKU family of the unbranded zero-review third-party seller ("Jeronrtion" / "Generic Logic, Inc.") — new SKU URLs appear weekly. | 2026-08-05 |
| https://www.target.com/p/motorola-mobility-moto-g-play-2024-64-gb-smartphone-6-5-lcd-hd-1600-x-720/-/A-1009755865 | Snapdragon 680 is 4G-only — no 5G radio, fails the 5G must-have outright. | 2026-08-11 |
| https://www.target.com/p/motorola-mobility-moto-g-5g-2024-128-gb-smartphone-6-6-lcd-hd-1612-x-720/-/A-1009759115 | Third-party seller "antonline", no sale price on page — apparent gap is a median artifact. Confirmed 2 runs. | 2026-08-05 |
| https://www.target.com/p/samsung-galaxy-s23-128gb-s911u-unlocked-smartphone-manufacturer-refurbished/-/A-91025070 | Sold & shipped by third-party "CellFeee"; description states "signs of light to moderate usage" — third-party used, fails the new/manufacturer-refurb must-have. Also Out of Stock. Verified $269.99 on page. | 2026-08-20 |
| https://www.target.com/p/factory-refurbished-samsung-galaxy-a54-5g-unlocked-128gb-6gb-ram-6-4-super-amoled-screen-50mp-camera/-/A-1011281783 | Third-party "232 Inc.", "signs of light to moderate usage" — third-party used, fails must-have. Confirmed weekly. | 2026-08-05 |
| https://www.officedepot.com/a/products/2737356/Google-Chromecast-Network-Streaming-Audio-And/ | Original (non-4K, non-Google-TV) Chromecast — page's own bullet says "Remote free," i.e. no physical remote in the box, and description only claims "high-definition video," not 4K. Fails the "own remote in the box" must-have and isn't the Chromecast/Google TV Streamer 4K or Chromecast with Google TV product on the watchlist. | 2026-08-17 |
| https://www.newegg.com/cyberpower-pr3000lcdsl-nema-l5-30r-nema-5-20r/p/N82E16842102222 | Scraped "$119.99" is the "$119.99 shipping" line, not a price — real price $1,375.95 (3000VA/2700W rack-tower unit, also well outside this item's ~1000-1500VA desktop tier). Confirmed on page 2026-09-04. | 2026-09-04 |
