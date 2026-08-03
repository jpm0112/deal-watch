# Deal watchlist

One `##` section per item. The routine reads this file, searches for matching
products, and records prices in `prices.jsonl`.

Keep `id` stable — it's the key used in the price log. Everything under
**Must have** is a hard filter; **Nice to have** only breaks ties.

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
