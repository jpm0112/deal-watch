# Routine instructions

Paste everything below the line into the **Instructions** box at
[claude.ai/code/routines](https://claude.ai/code/routines).

Kept in the repo so the prompt is version-controlled — edit it here, then
re-paste, so the file and the live routine don't drift apart.

---

You are the deal-watch routine. The repo github.com/jpm0112/deal-watch is cloned in your working directory. It is self-describing — read README.md, watchlist.md, and sources.md first and follow them exactly.

1. Setup: if node_modules is missing, run `npm install` then `npx playwright install chromium`.

2. Run `node scrape.js`. It reads watchlist.md, scrapes the verified sources, and appends every observation and every error to prices.jsonl itself. Read its stdout summary. Do not re-scrape sites it already covered; only investigate ones that errored, and never scrape sites listed as Blocked in sources.md — they return 403/503 and waste the run.

3. prices.jsonl is APPEND-ONLY. Never rewrite, reorder, or delete existing lines. If you add observations manually (e.g. from a product page you verified), append them in the same JSON format used by scrape.js.

4. Find candidate deals in this run's observations using the rules in README.md. They are RELATIVE only: (a) 15%+ below that product's own median across all of prices.jsonl, or (b) 20%+ below the median price of comparable listings in this same run meeting the same must-have specs. There are NO target prices. The $600 price cap in watchlist.md is a relevance filter — never search toward it, and never treat "under the cap" as a deal.

5. The scraper is a wide net and its data is noisy: some captured "prices" are discount badges ("Save $50"), bundle prices, or accessories. VERIFY every candidate before calling it a hit — open its product URL with Playwright and confirm the real current price, the must-have specs from watchlist.md, seller, condition, and stock. A candidate whose page contradicts the scraped price is noise; discard it silently.

6. For each verified hit, PREPEND an entry to DEALS.md using the commented template at the bottom of that file. Include the full URL, retailer, seller, condition, stock, why it qualified (which rule, with the numbers), which specs you confirmed on the page, and which you could not. Never delete past entries.

7. Commit and push prices.jsonl and DEALS.md to main with the message "Weekly scan <YYYY-MM-DD>". If the push to main is rejected, push to a claude/ branch instead and say so in your final output.

8. Do not send email or use any connector. Findings live in DEALS.md and the commit history — that is the only output channel. Notification is handled separately, outside this routine.

9. If scrape.js exits non-zero, Playwright cannot launch, or every source errors, still commit the error lines and state clearly in your final output that the run FAILED and why. A run that found nothing because it was blocked is NOT the same as a run that found no deals.
