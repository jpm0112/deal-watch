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
| https://www.officedepot.com/a/products/7784160/APC-Back-UPS-900-9-Outlet1/ | APC Back-UPS BVN900M1 (900VA) — stepped/simulated sine wave output, confirmed via APC/Schneider Electric and multiple retailer spec sheets (manufacturer's plain "Back-UPS" line, not the Back-UPS Pro/PFCLCD lines). Fails the pure-sine-wave must-have. Also below the 1000-1500VA desktop tier this item tracks. Cleared the 20% cross-sectional bar as a false HIT this run at $99.99 (down from $124.99). officedepot's product page returned a persistent ERR_HTTP2_PROTOCOL_ERROR through the proxy this run (retried 5x), so this is verified via manufacturer/retailer spec, not the live page — re-check the page directly if the block clears. | 2026-09-18 |
| https://www.officedepot.com/a/products/868683/CyberPower-Ecologic-EC650LCD-8-Outlet-Uniterruptible/ | CyberPower Ecologic EC650LCD — CyberPower's own site states the Ecologic line is simulated sine wave, not pure sine wave. Fails the pure-sine-wave must-have; also 650VA, below the 1000-1500VA tier. Recurs weekly as a false near-miss/HIT purely because it's FLAT and cheap. | 2026-09-18 |
| https://www.officedepot.com/a/products/8007060/APC-Back-UPS-BVN650M1-Battery-Backup/ | APC Back-UPS BVN650M1 (650VA) — same plain Back-UPS line as BVN900M1 above, stepped/simulated sine wave per APC/Schneider Electric specs. Fails the pure-sine-wave must-have; also below the tier this item tracks. | 2026-09-18 |
| https://www.officedepot.com/a/products/660678/APC-Back-UPS-ES-650VA-Battery/ | APC Back-UPS ES 650VA — entry-level ES line, stepped approximated sine wave per manufacturer/retailer specs. Fails the pure-sine-wave must-have; also below the tier this item tracks. | 2026-09-18 |
| https://www.officedepot.com/a/products/869009/CyberPower-EC850LCD-Ecologic-UPS-Systems-850VA510W/ | CyberPower EC850LCD — same Ecologic line as EC650LCD above, simulated sine wave per CyberPower's own site. Fails the pure-sine-wave must-have; also below the tier this item tracks. | 2026-09-18 |
| https://www.monoprice.com/product | Eaton Tripp Lite Series BC600R (600VA/300W) "Standby UPS" — manufacturer/reseller spec pages (Eaton, Blaisdell's) confirm pulse-width-modulated ("PWM") sine wave output, i.e. simulated, not pure sine wave. Fails the pure-sine-wave must-have; also 600VA, below the 1000-1500VA tier this item tracks. scrape.js's link extraction for this monoprice listing resolves to the bare `/product` path (no SKU), so the real product page can't be opened directly — verified via manufacturer spec instead. Cleared the 20% cross-sectional bar as a false HIT this run ($113.99, flat 2026-09-09 through 2026-09-21). | 2026-09-21 |
| https://www.officedepot.com/a/products/7024775/Speak-510-MS-WiredWireless-Bluetooth-Speakerphone/ | Poly/HP "Speak 510 MS" conference speakerphone — not a phone at all, matched hotspot-phone's Match keywords only because "Speakerphone" contains the substring "phone". No SIM, no cellular radio, fails every must-have. Added "speakerphone" to hotspot-phone's Exclude keywords in watchlist.md so it stops recurring. | 2026-09-21 |
| https://www.officedepot.com/a/products/9334745/APC-8-Outlet-Uninterruptible-Power-Supply/ | APC Back-UPS BN1050M (1050VA/600W) — same plain "Back-UPS" line as BVN900M1/BVN650M1/ES 650VA above (not Back-UPS Pro/PFCLCD), stepped/simulated sine wave per APC/Schneider Electric specs. Fails the pure-sine-wave must-have. Price itself is real (confirmed via the page's own JSON: crossed_out_price 164.990, instant_savings_price 109.990, in stock, new) — this is a spec disqualification, not a price artifact. officedepot's product page and even its homepage returned a persistent ERR_HTTP2_PROTOCOL_ERROR through Playwright this run (retried 5x across configs); price/stock confirmed via a direct HTTPS fetch of the same URL instead. | 2026-09-28 |
| https://www.newegg.com/apc-bx1500m-5-x-nema-5-15r-5-x-nema-5-15r/p/N82E16842301561 | Scraped "$100" is a sponsored ad card's price (JONSBO N5 NAS PC Case) that appears on the same search-results page, not the BX1500M's price — real price on the product page is $189.99. Also moot: the page's own spec table lists "Waveform Type: Stepped Approximated Sine Wave," so the BX1500M itself fails the pure-sine-wave must-have regardless of price. | 2026-09-28 |
| https://www.adorama.com/elation-pixel-bc50-50-ft-ip65-power-data-cable/p/elpix424 | Elation Pixel BC50 — a stage-lighting power/data cable, matched hotspot-phone's Match keywords only because "Pixel" (the Elation brand line) contains the substring "pixel". Not a phone; fails every must-have. Product page 404s ("Page Not Found") as of this run. Added "elation" to hotspot-phone's Exclude keywords in watchlist.md so it stops recurring. | 2026-09-30 |
| https://www.adorama.com/elation-pixel-bc50-12-50-ft-power-data-cable/p/elpix589 | Same Elation Pixel brand collision as elpix424 above — another power/data cable, not a phone. Product page 404s. | 2026-09-30 |
| https://www.adorama.com/elation-pixel-tape-16ip-rgb-outdoor-led-strip-light-ip65/p/elpix618 | Same Elation Pixel brand collision — an LED strip light, not a phone. Product page 404s. | 2026-09-30 |
| https://www.adorama.com/used-apple-siri-remote-for-apple-tv-3nd-generation/p/vdxacmw5g3am | Apple TV Siri Remote sold on its own — matched streaming-stick's Match keywords on "Apple TV" in the title, but it's the remote accessory, not the device, and is also third-party used. Fails the "own remote in the box" and "no third-party used" must-haves. Product page 404s. Added "siri remote" and "used" to streaming-stick's Exclude keywords in watchlist.md. | 2026-09-30 |
| https://www.adorama.com/used-apple-tv-4k-wi-fi-ethernet-128gb-2022/p/vdxacmn893ll | "Used" Apple TV 4K, 128GB — third-party used, fails the new/open-box/manufacturer-refurb-only must-have. Title states "Used" plainly. Product page 404s as of this run. | 2026-09-30 |
| https://www.adorama.com/used-apple-tv-4k-wi-fi-64gb-2022/p/cuxacmn873ll | Same as the 128GB row above — "Used" Apple TV 4K, 64GB, third-party used. Product page 404s. | 2026-09-30 |
| https://www.newegg.com/p/2W4-00NZ-00001 | HDMI 2.1 Switch/Switcher/Splitter — an HDMI switch box, not a streaming device, matched streaming-stick's Match keywords only incidentally. Fails the "one of the two devices" must-have outright. Added "hdmi switch", "switcher", "splitter" to streaming-stick's Exclude keywords in watchlist.md. | 2026-10-09 |
| https://www.newegg.com/p/0V4-0003-019U8 | Scraped "$100" is a sponsored ad card's price shown on the same search-results page, not this Motorola Moto G Stylus 5G's price — real price on the product page is $296.00, confirmed live. Same artifact pattern as the APC BX1500M row above (2026-09-28). | 2026-10-09 |
| https://www.newegg.com/apc-br1500ms2/p/N82E16842301736 | Scraped "$100" is a sponsored ad card's price (unrelated item on the same search-results page), not the BR1500MS2's price — real price on the product page is $329.99, confirmed live. Same artifact pattern as the APC BX1500M row above (2026-09-28). | 2026-10-09 |
