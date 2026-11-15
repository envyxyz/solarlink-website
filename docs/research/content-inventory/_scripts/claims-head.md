# Claims the client must confirm before reuse

Source: old static site `solarlink-2.0`, files in scope (home, about, contact, get-quote, faqs, resources, 404, services/*, products/*, outlets/*, locations/*, js/nav.js, js/employees.js, llms.txt, README.md, plus visible text and JSON-LD of each page).

**Rule for the new site: nothing below is reusable until the client confirms it in writing.** None of it is verified. Several figures contradict each other across pages.

## How the master table was built
- Every sentence, bullet, table row, heading, title tag, meta description, JSON-LD value, nav string and staff bio in scope was tested against 16 claim patterns (counts, years, ratings and rankings, warranty, time promises, certifications/registrations, savings, payback, tariff, price, instalments, performance, areas served, staff, promise wording, opening hours).
- Rows are de-duplicated on normalised text; "Appears N times" counts every occurrence across the files in scope, including JSON-LD copies.
- "Conflict" column points to the topic in section A when another page states a different value for the same fact. The detector is pattern-based, so a blank cell does not prove consistency; check section A and the master table by topic.
- The master table (section C) is deliberately broad. A row is a claim to confirm if it states a number, a time promise, a comparison or a credential, even when it also reads as an FAQ explainer.

## What the old site does NOT state (so nothing to confirm, but do not invent)
- No AEDB registration or licence number, no PEC licence number, no NEPRA licence number for Solarlink itself (PEC and NEPRA appear only as process references: "PEC engineer certification", "NEPRA-licensed contractor", "under NEPRA regulations").
- No ISO certification, no "authorised dealer" or "official distributor" claim for any brand (only "Equipment Brand Partners" heading on about-us.html over five logos: Growatt, Canadian Solar, LONGi, GoodWe, Solis; and "same manufacturer partners" on industrial page).
- No "same day" promise. "Lifetime support" appears in the home meta description and in faqs.html.
- No company registration number, NTN, or physical-address proof.
- No terms and conditions text (terms.html is a redirect only).

## A. Cross-page conflicts (highest priority)

| Topic | Values found (with where) |
|---|---|
| Number of offices/branches | 4 (nav.js "4 branch offices"; contact-us "4 major cities"; faqs "4 cities"; index "4 Branch Cities"; industrial "4 Branch Cities"; about "Four outlet locations") vs 5 (about-us "five locations", "5 Physical Offices", title/meta "5 locations"; get-quote "5 physical offices"; index "5 regional outlet branches") vs 6 outlet pages (nav.js lists Multan and Gilgit as "Coming soon"). Only 4 addresses exist. |
| Years in business | "7+ years" / "seven years" (index, about, get-quote, industrial) vs "since 2018" (footer 2026) vs "over 10 years of experience" (Lahore and Rawalpindi manager bios in employees.js). |
| Installation workmanship warranty | 1-year (llms.txt; about-us "1-year installation warranty"; residential FAQ "Does Solarlink provide after-sales support?") vs 2-year (residential list and FAQ "What warranty does SolarLink provide?"; agricultural; outlets/lahore "2-year workmanship warranty"). Inside residential page both appear. |
| Panel warranty | "25-year linear power output warranty" (service pages, products) vs faqs.html "10-year product workmanship warranty and a 25-year linear performance warranty"; panel pages JSON-LD "25-year performance warranty"; outlets "10-25 year manufacturer warranties". |
| Inverter warranty | "5-year standard warranty (extendable to 10)" (products, faqs, residential). Consistent, but still manufacturer-sourced and unconfirmed for Fronus. |
| Customer rating | "4.8 out of 5 · 47 reviews" (about-us, JSON-LD, industrial "47 verified customer reviews") vs "100% Daraz rating" (get-quote.html) vs "5.0 Rating" per Google review label (index). Platform for 4.8/47 never named. |
| Installs completed | Lahore 500+ (outlets/lahore, "#1 Lahore Installer"); Islamabad 350+ (hero stat) vs "400+ Solar installations in Islamabad & Rawalpindi since 2018" (same page); Rawalpindi 400+ (own page); Sargodha 350+; Sitewide "500+ Satisfied Clients" (index). Lahore alone claims 500+, equal to the sitewide figure; the per-outlet figures sum to 1,600+ (500+350+400+350, with Islamabad/Rawalpindi overlap). "Hundreds of solar installations" in Lahore FAQ. |
| Rankings | "#1 Lahore Installer", "#1 Islamabad Installer", "Lahore's #1 Installer", "Rawalpindi's Top Installer", "Sargodha's Solar Leader", "Global No.1 solar inverter brand by shipments" (Growatt), "Growatt ... most widely deployed inverter in Pakistan". No ranking source. |
| Payback period | 2.5-4 years (index); 3-4 (residential page, faqs cost table); 3-5 (faqs "Lahore, Islamabad and Rawalpindi", outlets/lahore, outlets/islamabad, Sargodha); 2-4 (agricultural FAQ); 3-5 (commercial FAQ) vs 3-4 (commercial headline) vs "3.5 years" (A. Hussain, home) vs "about 4 years" (A. Hussain, about) vs "just over 3 years" (commercial case study). |
| Bill savings % (residential) | 70-100% (index, residential); "up to 90%" and "90% average bill reduction" (outlets Lahore, Islamabad); 85% (Sargodha); 80-100% (faqs); 85% / 80% / 92% in outlet installation tables. |
| Savings % (commercial) | 40-70% (index "Commercial & Industrial"); 40%+ (services/index); 70-90% (commercial page headline and FAQ); 60% (home testimonial). |
| Tariff rise | "155%" in three years (index, residential, commercial); "over 80% in the last three years" (outlets/lahore, LESCO); "over 150% between 2021 and 2024" (faqs). Peak unit rate "Rs 65+/kWh" (index). |
| Quote/survey/response time | "within 2 hours" (note under every service-page quote form); "within 24 hours" (get-quote, contact-us, locations forms); "within 48 hours" (about-us proposal; outlets site-visit promise; "Site survey booked within 48 hours"). The three promises sit on different pages of the same site. |
| Residential install duration | 1-2 days (index FAQ); 1-3 days (residential FAQ); 2-5 days (residential body, outlets/lahore); "installed within 3 days" (JSON-LD S. Tariq) vs "2 days" (home S. Tariq). Overall project 2-4 weeks (residential FAQ) / 3-6 weeks (faqs). Lahore "begin installation within 1-2 weeks of quote approval". |
| Commercial install duration | 1-3 weeks (index FAQ) vs 1-2 weeks (commercial FAQ, two versions on the page). |
| Net metering approval time | 4-8 weeks (residential FAQ); 6-10 weeks (net-metering page for LESCO/IESCO, with MEPCO/GEPCO 8-12); 4-12 weeks (net-metering FAQ); "8 weeks" (case study quote). |
| System cost (10kW residential) | PKR 12 to 16 lakh (index FAQ, residential FAQ); PKR 1,200,000-1,800,000 (outlets/lahore FAQ, faqs cost guide, "1.2M-1.8M" residential body). 5kW: 600,000-900,000. 15kW: 1,800,000-2,500,000; 25kW: 3,000,000-4,000,000 (faqs table "Solar System Cost Guide Pakistan 2025"). JSON-LD "Starting price" values: residential 600000, commercial 1800000, agricultural 800000. |
| Solar tubewell cost | "PKR 400,000 and PKR 1,200,000" (agricultural FAQ) vs "10HP ... PKR 8-15 lakh" (agricultural FAQ) vs "starts at approximately PKR 800,000 for a 7.5HP; 10HP PKR 1,000,000-1,400,000" (outlets/sargodha). |
| Instalment offer | Islamabad and Rawalpindi: "exclusively for customers in Islamabad and Rawalpindi" (outlets/islamabad), but Sargodha page also lists "Installment Plans: Easy monthly financing options" and llms.txt says "Installment plans available in Islamabad/Rawalpindi"; "0% markup options", "12 to 36 month tenures", "Instant approval & quick dispatch" appear on Islamabad, Rawalpindi, Sargodha cards linking to /services/installment-plans/ (a page not in the audited set). JSON-LD paymentAccepted "Cash, Bank Transfer, Installment". |
| Net metering DISCO for Sargodha | GEPCO (outlet text, FAQ, install table) vs FESCO (outlet service card, hero stat, manager bio). MEPCO also named for Sargodha-region residential net metering. |
| FAQ count | "57 FAQs / 57 solar questions" (resources.html, residential, contact) vs "67 questions across 7 categories" (faqs.html title area). Actual visible count on faqs.html: 60. |
| Staff / team | "51-200 professionals" (about, llms.txt, JSON-LD) vs outlet teams of 3 each (employees.js; names reused across outlets) vs "Team profiles will be updated with verified names and roles." (about-us). |
| Tier-1 brands | "Growatt, Fronus, Canadian Solar" (llms.txt, about, get-quote, outlets) vs "Growatt • Canadian • LONGi" (index hero) vs logo strips adding Huawei, GoodWe, Solis, Jinko, Schneider, Tesvolt, Trina, Tesla (index, about, industrial). "Tier-1" is defined as Bloomberg NEF "bankable" but with no list or date. |
| Tier-1 definition | "5+ year track record" (residential, faqs) vs "BloombergNEF Tier-1" (index, products). |
| Lahore address/phone | See business.json conflicts: Munawar/Munawer, 54000/54700, 042-37117714 only on some pages, four different map coordinates. |
| Industrial largest install | "600kW" (industrial stat, index project) while services/index says "100kW-500kW+" range and index card says "15 - 500kW+". |
| Residential size range | 5-15kW (index, services index, about); 4kW-15kW (residential body, outlets related links, JSON-LD "4kW to 15kW"); PKR "8-25 lakh (5-15kW)" in residential FAQ vs "12-16 lakh" for 10kW. |

## B. Claims that must be confirmed with specific evidence (not just consistency)
1. Rankings and superlatives: "#1 Installer" (Lahore, Islamabad), "Top Installer" (Rawalpindi), "Solar Leader" (Sargodha), "most established", "premier", "best prices in Pakistan" (inverters title tag).
2. Brand partnership wording: "Equipment Brand Partners" (about-us), "manufacturer partners" (industrial), logo use for Jinko, Trina, Tesla, Schneider, Tesvolt, Huawei, GoodWe, Solis, LONGi (logo permissions and any dealer/partner status).
3. Counts: "500+ Satisfied Clients", per-city install counts, "51-200 staff", "5 / 4 offices", "7+ years", "100% Satisfaction", "47 reviews".
4. Reviews: 14 named visible testimonials; 5 labelled "Verified Google Review" with no link/date; before/after bills; 4 anonymous case studies marked "A real SolarLink customer story - no exaggerated claims." Written permission for names, locations and bill figures.
5. Warranty terms: installation 1-year vs 2-year; manufacturer warranties quoted from brand documents; "lifetime support".
6. Time promises: 2h / 24h / 48h response; 1-5 days install; 4-12 weeks net metering; "installed in 2 days"; "zero downtime"; "instant approval & quick dispatch".
7. Pricing: Fronus model prices (PKR 59,900 to 158,900) and "best price" claim; Growatt range; system price tables; tubewell prices; JSON-LD "Starting price" offers; instalment "0% markup".
8. Savings and tariff figures: 70-100%, up to 90%, 40-70%, Rs 65+/kWh, 155%, "Rs 30k - 150k+ Monthly Bills", "4 - 8 Hours Daily Load-Shedding" vs "6-8 hours" (Lahore) and typical "average 4-8"; generation (e.g. "1,400-1,500 kWh per month for 10kW in Lahore"; "40-50 units/day"), "300+ sunny days", cited sources (IRENA 2023, NEPRA Tariff 2024).
9. Registrations: "All Lahore/Islamabad/Sargodha solar installations registered with LESCO/IESCO/GEPCO for net metering", "NEPRA-licensed contractor", "PEC engineer certification", "handles 100% turnkey approvals".
10. Areas served: Lahore neighbourhood list (19 items), Islamabad/Rawalpindi list (16), Sargodha list (12, incl. Bhalwal, Bhera, Kot Momin, Shahpur, Sillanwali); JSON-LD areaServed also lists Punjab and neighbourhoods not on pages; projects in Gujranwala (MD Textile) are outside the four named cities.
11. Staff: all names, titles and "over 10 years of experience" bios in employees.js (names reused across outlets; no photos).
12. Opening hours Mon-Sat 9-6 for all four outlets; Sunday closed.

## C. Master table (machine extracted, one row per distinct claim sentence)

