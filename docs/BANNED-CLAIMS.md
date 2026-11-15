# Claims that must not be reused without the client's written confirmation

The old site (solarlink-2.0) states many things as fact that have no evidence behind them, and several contradict each other between pages. None of them may appear on the new site, in schema, or in a tool until SolarLink confirms them in writing. `pnpm check:content` blocks the patterns; a confirmed claim is allowed on a line by adding `claim-ok: <where it was confirmed>`.

Full evidence, with the page each claim came from:
- `docs/research/content-inventory/claims-to-confirm.md` (843 rows: home, about, services, products, outlets, FAQs)
- `docs/research/content-inventory/claims-to-confirm-content.md` (113 rows: projects, blog, guides, calculator)

## What the old site gets wrong or cannot back up

| Claim | Problem found |
|---|---|
| Number of offices | 4 on some pages, 5 on others, 6 outlet pages. Only 4 addresses exist. Multan and Gilgit are 22-word "coming soon" stubs |
| Lahore address | Two spellings (Munawar / Munawer Center) and two postcodes (54000 / 54700). Four different map coordinates |
| WhatsApp numbers | The old Islamabad and Sargodha location pages link to the Lahore number |
| Installation warranty | 1 year on some pages, 2 years on others |
| Rating "4.8 from 47 reviews" | Hard-coded in every page's schema with no platform named. Another page says "100% Daraz rating". Self-declared ratings are ignored by Google and are a policy risk |
| Testimonials | The same people are quoted with different wording on different pages. No link or date shows any is a real review |
| Staff | The same names hold different jobs at different outlets (one person is Installation Lead in Islamabad and Branch Manager in Rawalpindi). No photos are wired in. Treat every name as a placeholder until confirmed |
| Projects | All 10 project pages use a placeholder image; the before and after bills are labelled "Placeholder"; every page carries the same date. The index says each is "a real SolarLink project" |
| Blog | All 10 posts are "article in progress" stubs of about 200 words |
| Brands | Pages disagree on the list (Growatt, Fronus, Canadian Solar on some; Growatt, Canadian, LONGi on the home page). No dealer status is evidenced. "Tier-1" is used throughout |
| Calculator | Eight hard-coded package prices, a flat rupee value per unit saved and a yearly tariff rise, none sourced. The city choice does not change the result |
| Net metering | Sargodha's page names two different distribution companies. The guide gives no buy-back rate, and the rules have since changed |
| Response and install times | "2 hours", "24 hours" and "48 hours" all appear. Install durations vary by page |
| FAQ count | "57" and "67" are claimed; the page has 60 |
| Employees "51 to 200", "founded 2018" | Stated in schema and llms.txt; unconfirmed |
| Installments | Said to be available in Islamabad and Rawalpindi; no terms or provider |

## Kinds of claim the guard blocks

Counts with a plus sign, star ratings and review counts, warranty terms, time promises ("same day", "within 24 hours", "24/7"), certifications and registrations (AEDB, PPIB, PEC, NEPRA, ISO), dealer status, "Tier-1", superlatives (best, leading, premier, number one, most trusted), prices, savings percentages, payback periods, guarantees, and free-service offers.

## Public facts are a separate matter

Tariffs, net-metering rules, sun hours and tax rates are not client claims, but they change and must be right. They live in one data file with the source document and its date for every figure, and each tool shows that date. The research notes in `docs/research/agy/7-pk-facts.md` are a starting list only: an AI assistant compiled them and they cite home pages rather than the documents themselves, so every figure is unverified until someone opens the NEPRA notification or the distribution company's tariff sheet and checks it.
