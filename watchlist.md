# Deal watchlist

One `##` section per item. The routine reads this file, searches for matching
products, and records prices in `prices.jsonl`.

Keep `id` stable — it's the key used in the price log. Everything under
**Must have** is a hard filter; **Nice to have** only breaks ties.

`scrape.js` machine-reads four lines per item — keep their format exactly:
`**Price cap:** $N`, `**Min price:** $N`, `**Search queries:** a; b; c`
(semicolon-separated), `**Match keywords:** a; b; c` (any-of title filter).
Everything else in a section is for the reviewing agent, not the scraper.

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

## portable-monitor

**Category:** Portable external monitor
**Price cap:** $600 — relevance filter, not a goal. Ignore anything above it.
**Min price:** $50 — below this it's a stand, cable, or sleeve, not a panel.
**Search queries:** portable monitor 16 inch; portable monitor 18 inch usb-c
**Match keywords:** monitor; display; screen extender
**Alert if:** 15%+ below its own median, OR clearly under the going rate for
monitors meeting the same must-haves
**Status:** active

**Must have**

- Panel size 16"–18", as close to 18" as still fits a backpack
- Fits a laptop backpack sleeve (hard requirement — size yields to this)
- HDMI input (mini or full size)
- USB-C input with video (DisplayPort Alt Mode)
- Includes or works with a stand/cover

**Nice to have**

- No built-in battery (preferred, not required — bus-powered is lighter)
- 1080p or better
- Slim, low-profile chassis
- Matte / anti-glare finish
- Single-cable USB-C operation (video + power on one port)
- Wireless Apple connectivity — built-in AirPlay receiver or wireless
  screen mirroring from Mac/iPad/iPhone (no cable). Rare on portable
  panels, which are almost all wired USB-C/HDMI displays; a genuine
  bonus when present, never required.

**Known candidates to check**

- Arzopa A1 Gaming / Z1FC — 16", frequently discounted
- ASUS ZenScreen MB16 series
- Innocn 15A1F / 18" models
- ViewSonic VX16 series, Lepow, KYY 16"

**Notes**

Size is flexible; backpack fit is not. Prefer the largest panel that still
sleeves, targeting 18". Portable monitors cluster at 15.6"–16", so 18" will
be the uncommon find — a 16" at a good price beats an 18" at a bad one.

A built-in battery is a mild negative (weight, and it's dead weight when the
monitor is bus-powered anyway), not a disqualifier. Don't skip an otherwise
good deal over it.

**Condition:** new or open-box, including Best Buy open-box and
manufacturer-refurbished. No third-party used listings.

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
