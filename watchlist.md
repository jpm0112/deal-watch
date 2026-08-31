# Deal watchlist

One `##` section per item. The routine reads this file, searches for matching
products, and records prices in `prices.jsonl`.

Keep `id` stable — it's the key used in the price log. Everything under
**Must have** is a hard filter; **Nice to have** only breaks ties.

`scrape.js` machine-reads four lines per item — keep their format exactly:
`**Price cap:** $N`, `**Min price:** $N`, `**Search queries:** a; b; c`
(semicolon-separated), `**Match keywords:** a; b; c` (any-of title filter).
`median.js` reads two more, both optional: `**Exclude keywords:** a; b; c`
(any-of title filter — dropped from the comparable set, still logged) and
`**Tiers:** name: kw1 | kw2; name2: *` (first tier whose pattern matches the
title wins; `*` is the catch-all; no match = not comparable). Grow the
exclude lists here — never re-derive them per run. Everything else in a
section is for the reviewing agent, not the scraper.

## How "good deal" is decided

There are **no target prices**. The job is to find a good deal, not to wait
for a number I made up. A deal qualifies on *relative* evidence:

1. **Below its own history** — 15%+ under that product's median recorded
   price. Needs history, so this sharpens as `prices.jsonl` fills.
2. **Below the going rate** — meaningfully cheaper than other listings that
   meet the same **Must have** specs in the same run. This works from the
   very first run, and early on it's the rule that will actually fire.

`Price cap` is a **relevance filter only** — it excludes products that
aren't what I'm shopping for. Never search toward the cap, and never treat
"under the cap" as a deal. A $520 monitor is not a find.

---

## hotspot-phone

**Category:** Smartphone (primary use: mobile hotspot / tethering)
**Price cap:** $600 — relevance filter, not a goal. Ignore anything above it.
**Min price:** $80 — below this it's a case, cable, or junk, not a phone.
**Search queries:** unlocked 5g phone esim; moto g 5g unlocked; pixel 9a unlocked
**Match keywords:** phone; smartphone; galaxy; pixel; moto; oneplus; 5g
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
phones meeting the same must-haves
**Status:** active
**Exclude keywords:** cordless; dect; landline; corded; vtech; conference phone; smartwatch; moto watch; watch band; tablet; ipad; phone case; screen protector; charger; charging; phone drive; usb drive; flash drive; ssd; galaxy s8; galaxy s9; galaxy s10; galaxy buds; earbuds; pre-owned; prepaid; boost mobile; total by verizon; straight talk; tracfone

**Must have**

- Unlocked (carrier-free, no financing lock)
- eSIM capable
- 5G (sub-6 is fine; mmWave not required)
- Mobile hotspot / tethering not disabled in firmware
- New or manufacturer-refurbished — no third-party used

**Nice to have**

- Battery 5000 mAh or larger (it's running as a hotspot all day)
- USB-C PD passthrough charging
- Band support for major US carriers (n41 / n71 / n77)

**Known candidates to check**

- Google Pixel 8a / 9a — eSIM is reliable here, but usually above target
- Samsung Galaxy A16 5G / A25 5G — verify eSIM per exact model number
- Motorola Moto G Power 5G / G Stylus 5G — eSIM support is inconsistent
- TCL 50 series, OnePlus Nord N series

**Notes**

eSIM is the binding constraint, not price. Most sub-$150 unlocked 5G phones
are physical-SIM only, and US variants often differ from the international
model sold under the same name. Any candidate needs its eSIM support
confirmed against the specific model number, not the product family.

---

## iphone-14-pro

**Category:** Smartphone (Apple iPhone 14 Pro, discontinued — mostly a refurb market)
**Price cap:** $650 — relevance filter, not a goal. Ignore anything above it.
**Min price:** $150 — below this it's a case, screen protector, or scam listing.
**Search queries:** iphone 14 pro unlocked; iphone 14 pro refurbished unlocked
**Match keywords:** iphone 14 pro
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
listings meeting the same must-haves
**Status:** active
**Exclude keywords:** pro max; phone case; screen protector; charger; cable; magsafe; wallet; band; pre-owned

**Must have**

- iPhone 14 Pro exactly — not 14, not 14 Plus, not 14 Pro Max
- Unlocked (carrier-free, no financing lock)
- 128 GB or larger
- New, open-box, or manufacturer/Apple-certified refurbished — no
  third-party used listings

**Nice to have**

- 256 GB at a 128 GB-tier price
- Battery health stated at 90%+ (refurb listings that disclose it)
- Full accessory kit / original box

**Notes**

Discontinued September 2023, so new-in-box units are rare and command a
premium; expect most qualifying listings to be certified refurbished
(Apple Certified Refurbished, Best Buy Geek Squad, Amazon Renewed Premium).
"Renewed" grades below Premium/Excellent count as third-party used — skip.
Verify the listing says **Pro**, not Pro Max — titles blur them constantly,
and a Pro Max price mixed into the Pro pool poisons the cross-sectional
median.

---

## playstation-5

**Category:** Game console (any PS5 model that runs GTA 6 — all of them do)
**Price cap:** $800 — relevance filter, not a goal. Ignore anything above it.
**Min price:** $250 — below this it's a controller, headset, or gift card.
**Search queries:** playstation 5 console; ps5 slim console; ps5 pro console
**Match keywords:** playstation 5; ps5
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
the same model tier
**Status:** active
**Exclude keywords:** controller; dualsense; headset; headphone; ssd; heatsink; faceplate; cover plate; skin; charging station; gift card; game drive; media remote; camera
**Tiers:** pro: ps5 pro | playstation 5 pro; digital: digital; disc: *

**Must have**

- A PS5 console — Slim Disc, Slim Digital, or PS5 Pro all qualify
  (GTA 6 is confirmed on every PS5 model; PS4 is not supported)
- Sold as the console, not a controller/accessory/gift-card listing
- New, open-box, or Sony/retailer-certified refurbished — no
  third-party used listings

**Nice to have**

- Disc drive (Slim Disc, or Pro bundled with the add-on drive) — keeps
  the used-game option open
- 1 TB or larger storage — GTA 6 is estimated at 150–250 GB, tight on
  the 825 GB Digital Edition
- Game bundle at the bare-console price

**Notes**

Compare within model tiers, never across them: list prices differ by
hundreds (Digital ≈ $449, Slim Disc ≈ $549, Pro ≈ $749 after the 2025
hike), so a Digital at its normal price looks like a "deal" against a
Pro median. Match the tier from the title before pooling. Bundles are
fine but note the bundle contents — a bundle's price isn't comparable
to a bare console's.

---

## streaming-stick

**Category:** HDMI streaming device (to drive the portable monitor)
**Price cap:** $260 — relevance filter, not a goal. Ignore anything above it.
Raised from $160 on 2026-08-16: Apple's June price hike put the Apple TV 4K
at $199/$249, and the old cap would have filtered out one of the two
candidates entirely.
**Min price:** $15 — below this it's a remote, cable, case, or mount.
**Search queries:** google tv streamer 4k; chromecast with google tv; apple tv 4k
**Match keywords:** chromecast; google tv streamer; google tv 4k; apple tv
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
devices in the same tier
**Status:** active
**Exclude keywords:** roku; fire tv; firestick; fire stick; onn\.; onn 4k; shield; remote control; replacement remote; voice remote; case; cover; mount; wall mount; hdmi cable; ethernet adapter; power adapter; usb cable; soundbar; projector; class; led tv; qled; smart tv; 32 inch; 43 inch; 50 inch; 55 inch; 65 inch; 75 inch; apple tv\+; subscription; gift card; android tv box; kp1
**Tiers:** apple: apple tv; google: *

**Must have**

- One of the two devices below — this is a two-horse list, not an open
  category search
- Built-in Wi-Fi and its own apps (Netflix, YouTube, Prime, Disney+),
  able to join an iPhone Personal Hotspot as its network
- Its own remote in the box
- New, open-box, or manufacturer-refurbished — no third-party used

**Nice to have**

- Powered from a 5 V USB port rather than a wall-only supply — one fewer
  outlet on the road
- Bluetooth audio out, to pair headphones or a speaker

**Known candidates to check**

- **Chromecast / Google TV Streamer 4K** — $99.99 list. The current
  Chromecast successor and the same Google TV experience. USB-C powered.
  No AirPlay.
- **Apple TV 4K** — $199 (64 GB) / $249 (128 GB) list, ~$169 refurb direct
  from Apple. Native AirPlay 2. Needs a wall outlet.

**Notes**

Two devices, nothing else. Roku, Fire TV, Onn, and NVIDIA SHIELD are all
out and are in the exclude list so they can't creep back in on a good
price — the exclusions are what keep this list to two horses.

**The AirPlay trade-off, settled 2026-08-16 — don't re-research it.** The
source phone is an iPhone and there is no Wi-Fi network; internet is the
phone's hotspot only. Content is Netflix/Disney+, YouTube and browser
video, and downloaded personal files.

- Netflix and Disney+ block screen mirroring (DRM), so they only work as
  apps running *on the streaming device*, over the hotspot, burning
  cellular data. Both candidates do this equally well.
- Downloaded personal files are the opposite case: peer-to-peer AirPlay
  mirrors them from the iPhone with no network and no data at all. Only
  the Apple TV can do this — no Google TV device has native AirPlay 2, and
  that is settled, not pending further research.

So the split is: Apple TV costs ~$70–100 more and needs a wall outlet, and
buys exactly one thing — the personal-files path. If that path stops
mattering, the Chromecast wins on price and on USB-C power.

Cellular data, not hardware, is the binding constraint either way: ~3 GB/hr
at 1080p and ~7 GB/hr at 4K. The monitor is 1080p, so cap the streaming
bitrate and treat 4K output as irrelevant. Check the carrier plan's hotspot
allowance before assuming this setup works for a full evening.

Compare within tiers, never across. Apple TV lists at $199–$249 and the
Chromecast at $99.99, so an Apple TV at its normal price would read as a
"deal" against a Chromecast median. Match the tier from the title first.

Buy-point reference, verified on the product pages 2026-08-16: Chromecast /
Google TV Streamer 4K is $99.99 at both Best Buy and Target — that's list,
not a deal, and Best Buy open-box ran $88.99–$124.99. It reportedly hit
$76.99 at Best Buy earlier this year, so treat high-$70s as the real buy
point. Apple TV went *up* on 2026-06-25 (64 GB $129 → $199, 128 GB $149 →
$249, DRAM supply), so there is no promotional dip to wait for there; the
~$169 Apple refurb is the standing best price.

Portable-monitor specifics: the monitor's speakers are weak or absent, so
audio out (Bluetooth, or the monitor's 3.5 mm jack) matters more than
resolution here. Check the monitor's HDMI port type — either device may
need a short HDMI extender or adapter into a recessed mini-HDMI port, so
budget for one rather than treating it as a dealbreaker.

**Condition:** new or open-box, including Best Buy open-box and
manufacturer-refurbished. No third-party used listings.

---

## airpods

**Category:** Apple AirPods Pro 3 — narrowed from the whole AirPods line on
2026-08-25. AirPods 4 and Max are out; the decision is made, this item now
tracks one product and only wants a better price on it.
**Price cap:** $280 — relevance filter, not a goal. List is $249.99.
**Min price:** $120 — a Pro 3 below this is a counterfeit, a single bud, or a
case. Raised from $50 when the item narrowed from the full AirPods line.
**Search queries:** airpods pro 3
**Match keywords:** airpods pro 3
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
listings in the same condition tier
**Status:** active
**Exclude keywords:** airpods 4; airpods pro 2; airpods max; max; bundle; 8 in 1; with accessories; earpiece; case .{0,15}for airpods; ear tips; eartips; ear cushions; case only; replacement case; silicone case; hard case; cover; skin; keychain; lanyard; strap; holder; pouch; sleeve; clip; hook; stand; cradle; dock; wireless charger; charging station; juice pack; battery pack; belkin; mophie; cleaning; cleaner; adapter; cable; applecare; apple care; gift card; beats; galaxy buds; pixel buds
**Tiers:** refurb: refurbished | refurb | open.box | pre.owned | renewed; new: *

**Must have**

- Genuine Apple AirPods Pro 3, complete pair with its MagSafe charging case
- Any condition: new, open-box, manufacturer- or retailer-certified
  refurbished, or third-party used, as long as the condition is stated
- Seller must state the condition grade. An unlabelled "refurbished" listing
  from a marketplace seller is not a hit.

**Nice to have**

- First-party seller (Target, Best Buy, Apple) over a marketplace third party
- Stated warranty or return window on a refurbished unit

**Known prices, verified on-page 2026-08-25**

This is the going rate to beat, not a target. Every number below was read off
the product page, not a search card.

| Price | Condition | Seller |
|---|---|---|
| $174.99 | Target Certified Refurbished, Grade A | Target, first-party |
| $183.99 | Refurbished - Excellent | Best Buy, first-party |
| $199.99 | New, sale (reg $249.99, 20% off) | Target, first-party |
| $199.99 | Open-Box Excellent | Best Buy, store pickup only |
| $199.97-204.99 | Refurbished - Excellent | Best Buy **marketplace** third parties |
| $249-250 | New, full list | Best Buy, Staples, B&H |

So: **beat $174.99 refurbished, or $199.99 new.** Anything at or above list is
noise. The three marketplace refurb rows near $200 are worse than both
first-party refurbs and should never be recorded as hits.

**Notes**

Unreachable sources for this item, so a "no results" here proves nothing:
Apple's own refurb store carries no AirPods at all right now (Pro 3 has never
entered that program); Back Market lists a Pro 3 (2025) but 403s on both its
search and product pages; Amazon, eBay, Walmart are blocked per sources.md and
Costco is behind a membership login. Costco is the one worth checking by hand.

**Timing, as of 2026-08-25.** AirPods Pro 3 shipped September 2025. AirPods
Pro 4 is unannounced and the reporting conflicts: some analysts say Q4 2026,
others say it slipped to 2027 with the infrared-camera feature. Apple's
September event is the next real signal. If a successor lands, Pro 3 stock
gets cleared harder than the 20-30% seen now — so a run in late September is
worth more than a run this week.

---

## ups

**Category:** Consumer UPS / battery backup, pure sine wave, ~1000–1500 VA desktop tier
**Price cap:** $350 — relevance filter, not a goal. Above this is the rack /
online double-conversion market, which is a different product.
**Min price:** $90 — below this it's a surge strip, a replacement battery, or
a 350–600 VA unit too small for the load.
**Search queries:** pure sine wave ups battery backup; cyberpower pfclcd; apc back-ups pro
**Match keywords:** battery backup; uninterruptible; back-ups; cyberpower; cp1500pfclcd; cp1000pfclcd; br1000ms; br1500ms2
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
units in the same VA/watt tier
**Status:** active
**Exclude keywords:** replacement battery; battery cartridge; rbc\d; rb1290; rb1280; surge protector; surge suppressor; power strip; extension cord; pdu; rack mount; rackmount; 1u; 2u; online double conversion; generator; inverter only; solar; car battery; jump starter; power bank; ups shipping; backups of; network card; ap9\d; management card; replacement remote
**Tiers:** 1500va: 1500va | 1500 va | cp1500 | br1500 | 1500VA; 1000va: *

**Must have**

- **Pure sine wave output** — not simulated/stepped sine. Active-PFC power
  supplies can shut down or buzz on a stepped-wave unit, which defeats the
  purpose of buying one.
- True UPS with battery backup, not a surge protector or a power strip
- At least 6 battery-backed outlets, separate from the surge-only bank
- AVR (automatic voltage regulation) that corrects brownouts without
  switching to battery
- USB data port that a Linux daemon can talk to (NUT or apcupsd) for
  automatic shutdown
- User-replaceable battery
- New or manufacturer-refurbished — no third-party used. A used UPS is a
  used *battery*, and the battery is most of the value.

**Nice to have**

- 900 W+ real output — watts, not VA, is the binding number
- Standard replaceable battery (a pair of 12 V 9 Ah bricks) rather than a
  proprietary cartridge, so the mid-life battery swap is $40 and not $111
- LCD showing load, runtime and input voltage
- 10+ total outlets, with spacing for wall warts

**Known candidates to check — verified reference set, 2026-08-31**

This is the going rate to beat, not a target. Compare within the VA tier.

| Unit | Price | Source | VA / W | Outlets | Battery |
|---|---|---|---|---|---|
| CyberPower CP1500PFCLCD | $240 | Amazon | 1500 / 1000 | 12 (6 batt / 6 surge) | RB1290X2, dual |
| CyberPower CP1000PFCLCD | $180 | B&H | 1000 / 600 | 10 (6 / 4) | RB1290, single |
| APC BR1000MS | $191 | Amazon | 1000 / 600 | 10 (6 / 4) | proprietary cartridge, $111 |
| APC BR1500MS2 | $300 | B&H | 1500 / 900 | — (adds USB-C charging) | proprietary cartridge |

- **CP1500PFCLCD, $240 — the benchmark.** Most watts per dollar, most
  headroom, longest runtime at load. Any hit has to beat this on $/W, not
  just on sticker price.
- **CP1000PFCLCD, $180** — the budget-correct pick if $60 matters. ~3 min at
  full load, ~9–10 min at half.
- **BR1000MS, $191** — same class as the CP1000 for $11 more. Worth it only
  for apcupsd, the more mature Linux daemon. Note the proprietary $111
  cartridge, which erases the difference at the first battery swap.
- **BR1500MS2, $300** — $60 more than the CP1500 for 100 W *less*. Only if
  the APC ecosystem is worth a premium.

**Notes**

Compare within VA tiers, never across: a 1500 VA unit at its normal price
reads as a "deal" against a pool containing 1000 VA units. That's what the
**Tiers** line is for.

**VA is marketing; watts is the spec.** The two CyberPower units are both
"PFCLCD" and look like the same product family, but 1500 VA / 1000 W against
1000 VA / 600 W is a 67% difference in real capacity for a 33% price
difference. Rank candidates on $/W and treat the VA number in the title as a
tier label only.

Runtime scales sharply and non-linearly with headroom, so a unit at half load
lasts several times longer than the same unit near its rating — buying up a
tier buys minutes, not just watts. Whatever the listing claims for runtime is
at *its* stated load, which is rarely yours.

Total cost of ownership includes one battery swap at roughly year 3–5. A
proprietary APC cartridge is ~$111; the CyberPower units take a pair of
standard 12 V 9 Ah bricks for well under half that. A $10 sticker saving on
an APC unit is a real loss over the unit's life.

Watch for the usual noise in this category: replacement batteries and
cartridges list near unit prices and will pollute the median, as will surge
protectors and PDUs — all excluded above. "UPS" as a bare term also collides
with the shipping carrier, which is why **Match keywords** uses "battery
backup" / "uninterruptible" / model numbers rather than the acronym.

**Source reachability, checked against sources.md 2026-08-31.** Two of the
four reference prices above came from sources the scraper cannot read: Amazon
is blocked (HTTP 503, and Camelcamelcamel and eBay are blocked too, so there
is no back door since Slickdeals was dropped), and B&H intermittently
Cloudflare-challenges. So a "no results" for this item proves nothing about
Amazon or B&H pricing, and the $240 and $180 benchmarks above will mostly not
be re-verified automatically — check those two by hand before concluding a
scraped listing beats them. The reachable sources that actually stock this
category are Newegg (best yield overall), Office Depot, Staples, Target and
Micro Center; Monoprice, Woot and the monitor-brand stores are irrelevant here.
