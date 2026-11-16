# Home and About page outline (old site, solarlink-2.0)

Summaries paraphrase the old copy closely; nothing here is verified. Numbers are quoted as shown. Source files: `index.html`, `about-us.html`.

---

## HOME (`index.html`)

- Title tag: "Solarlink — Premier Solar Solutions & Tier-1 Installations in Pakistan"
- Meta description: "Power your home, business, or farm with Solarlink. Premium Tier-1 solar systems, net-metering approvals, zero-bill savings, and lifetime support across Punjab & Islamabad."
- Canonical: https://solarlink.com.pk/
- Main content about 1,097 words. No JSON-LD on this page.

### 1. Hero
- H1: "Custom Solar Systems for Punjab Homes & Businesses".
- Sub: high-performance, net-metered solar systems "engineered for maximum savings, long-term reliability, and a clean energy future".
- CTAs: "Get Free Consultation" (/get-quote.html), "View Our Projects" (/projects/).
- Hero image alt: "SolarLink Solar Panels with Solar Eclipse".
- Stat strip: **7+** Years Experience, **4** Branch Cities, **Tier-1** Equipment Only, **100%** Satisfaction.
- Contact strip: Lahore 042-37117713, Islamabad 051-5204555, Rawalpindi 051-5708488, Sargodha 048-3720111; WhatsApp 0321-8425777; "ISB & RWP" WhatsApp 0339-3555000; "Tier-1 Hardware: Growatt • Canadian • LONGi".

### 2. "Tier-1 Hardware Only" brand strip
- H2: "Engineered with certified global components." Every installation uses "BloombergNEF Tier-1 solar modules and smart inverters."
- Logos (alt text): Growatt, LONGi, Canadian Solar, Huawei, GoodWe, Solis, Jinko, Schneider Electric, Tesvolt, Trina Solar, Tesla Energy.

### 3. Problem: "The Energy Crisis in Pakistan"
- H2: "Tired of crushing electricity bills and endless load-shedding?" Claim: "Over the last 3 years, grid tariffs surged by 155%".
- Three cards: (01 Surging Tariffs) "Rs 30k - 150k+ Monthly Bills", peak unit rates "exceed Rs 65+/kWh"; (02 Grid Instability) "4 - 8 Hours Daily Load-Shedding", eliminates diesel generator and UPS cost; (03 DISCO Approvals) "Complex DISCO Red Tape" - navigating LESCO, IESCO and GEPCO load sanctioning, three-phase conversions and green meter licensing "requires certified PEC engineering expertise"; "SolarLink handles 100% turnkey approvals".
- Solution line: "A custom Tier-1 net-metered system reduces your WAPDA bill by 70% to 100% and guarantees zero blackout downtime." CTA "Calculate Savings" -> /get-quote.html.

### 4. Services: "Solar systems engineered for your exact needs."
- Residential Solar: "5 - 15kW Systems", zero-bill outcomes with net metering.
- Commercial & Industrial: "15 - 500kW+", "Cut corporate operating expenses by 40% to 70%."
- Agricultural Solar: farms and tubewells, "Reliable off-grid water pumping for Punjab farms."
- Net Metering Guide: "Turnkey Licensing", walkthrough of LESCO, IESCO, GEPCO green meters.

### 5. Reviews: "Real energy independence, verified by real customers."
- Lead: "With electricity tariffs climbing past PKR 65+ per unit, SolarLink customers see their monthly electricity costs drop by 70% to 100%, with full capital payback in 2.5 to 4 years."
- Six cards with before/after bills (all quotes are in `testimonials.json`): M. Usman (Islamabad, 10kW, Rs 45,000 to Rs 800); S. Tariq (Bahria Town Lahore, 10kW, Rs 52,000 to Rs 1,500); A. Hussain (Sargodha, 30kW commercial, Rs 180,000 to Rs 72,000); Maiza Rajput (Lahore, Rs 68,000 to Rs 2,100, "Verified Google Review - 5.0 Rating"); Aslam Ali (PWD Rawalpindi, 15kW hybrid, Rs 85,000 to Rs 3,400); Mian Amir Farooq (Industrial Gujranwala, Rs 350,000 to Rs 110,000, "Verified Google Review - 5.0 Rating").

### 6. Featured projects
- H2: "Featured projects across Punjab & Islamabad." One card: "600kW High-Capacity Industrial Rooftop Array", MD Textile, Gujranwala - "1,200 LONGi Hi-MO 6 panels on custom pole structures, powered through six 115kW Huawei on-grid inverters with full distribution safety gear." Links to /services/industrial-solar.html and /projects/.

### 7. Numbers: "SolarLink in numbers."
- "Seven years of dedicated solar engineering".
- **70-100%** Estimated Bill Savings ("Typical monthly electricity cost reduction for SolarLink customers"); **500+** Satisfied Clients ("Homes, factories, and farms powered across Punjab & Islamabad"); **7+** Years of Experience ("Founded in Lahore in 2018, with 5 regional outlet branches").

### 8. FAQ teaser (5 questions, verbatim in `faqs.json`)
- Typical 10kW cost "PKR 12 to 16 lakh installed"; load-shedding behaviour of grid-tied vs hybrid; payback "2.5 to 4 years, followed by 20+ years of free electricity generation"; net metering (SolarLink "handles 100% of the turnkey paperwork, PEC engineer certification, and DISCO approval with LESCO, IESCO, and GEPCO"); installation time "1 to 2 days" residential, "1 to 3 weeks" commercial. Link to /faqs.html.

### 9. Closing CTA
- H2: "Ready to cut your electricity bill by 70% to 100%?" "Book a free on-site load audit and receive a custom system design with exact payback calculations." CTA "Book Free Consultation" -> /get-quote.html.

### Home page figures that disagree with other pages
- "4 Branch Cities" (hero) vs "5 regional outlet branches" (numbers section) on the same page.
- Payback "2.5 to 4 years" vs "3-4" (residential page) vs "3-5" (outlets, faqs.html).
- Commercial savings "40% to 70%" here vs "70-90%" on services/commercial-solar.html.
- Brand line "Growatt • Canadian • LONGi" vs "Growatt, Fronus, Canadian Solar" elsewhere.

---

## ABOUT (`about-us.html`)

- Title tag: "About Solarlink – Punjab's Trusted Solar Company"
- Meta description: "Solarlink has been installing solar systems across Punjab since 2018. 5 locations, 51–200 staff, Tier-1 equipment only. Learn our story."
- Canonical: https://solarlink.com.pk/about-us/ . Main content about 1,091 words. "Last updated: March 2026" shown in Our Story.
- JSON-LD: AboutPage, a Person ("Solarlink Engineering Team", Solar Engineers), Organization (foundingDate 2018, email, Lahore Mall Road address, four sameAs social links, five contactPoints), BreadcrumbList, WebPage (datePublished 2026-01-01, dateModified 2026-03-03).

### 1. Hero
- H1: "About Solarlink – Punjab's Local Solar Experts". Sub: "From a single Lahore office to five locations across Punjab and Islamabad — SolarLink has been guiding families, businesses, and farms to zero-bill solar for over seven years." CTAs: Get Free Quote, Contact Us.

### 2. Our Story
- Founded 2018 in Lahore "with a simple mission: make reliable, affordable solar energy accessible to homes and businesses across Punjab". Grew from a small team "to 51–200 professionals serving customers from offices in Lahore, Islamabad & Rawalpindi, and Sargodha".
- Belief statement: every Pakistani family and business deserves freedom from high bills and load-shedding, "one rooftop at a time".
- "Today we run five locations across Punjab and Islamabad, covering Lahore, Islamabad, Rawalpindi, and Sargodha" (four names for five locations). Each project gets "a site survey, a correctly specified system, and genuine after-sales support."
- "What we do" list: Residential Solar (5-15 kW on-grid & hybrid for homes); Commercial Solar (15-100 kW for businesses and factories); Agricultural Solar (solar tubewells and farm power); Net Metering Support (DISCO application, approval, commissioning).

### 3. Our Promise (four principles)
- Honest Advice ("No upsells, no surprises"); Tier-1 Equipment Only ("Your investment should last 25+ years"); Professional Installation (trained engineers, strict safety and quality standards); Responsive Local Support (five locations).

### 4. By the Numbers
- 7+ Years Experience; 5 Locations; Tier-1 Equipment Only; Local Support Always.

### 5. Our Team
- Intro line: "Team profiles will be updated with verified names and roles." Four generic cards, no names: Engineering Team, Project Team, Sales Team, After-Sales & Support ("across all five locations").

### 6. Our Offices
- Intro "Four outlet locations across Punjab and Islamabad". Cards for Islamabad, Rawalpindi, Sargodha only (Lahore head office not listed in this section): address with postcode, landline, WhatsApp, Get Directions link.

### 7. Why Customers Trust Solarlink (six ticks)
- Founded 2018 (over 7 years); "5 Physical Offices — Lahore, Islamabad, Rawalpindi, Sargodha"; Tier-1 only "Growatt, Fronus, Canadian Solar"; Local Expertise (Punjab grid, load-shedding patterns, WAPDA net metering); After-Sales Support "1-year installation warranty with ongoing maintenance services"; "51–200 Professionals".

### 8. What Customers Say
- Badge "4.8 out of 5 · 47 reviews". Eight quotes (three unlabelled, five labelled "Verified Google Review"). Footnote: "These are the same reviews published in Solarlink's site-wide business listing data." Full text in `testimonials.json`.
- "Equipment Brand Partners" logo row: Growatt, Canadian Solar, LONGi, GoodWe, Solis.

### 9. Why SolarLink (three numbered points)
- "Local offices, not a call centre"; "Proven installations across Punjab & Islamabad" ("referrals are our primary growth channel"); "After-sales support you can count on" ("Solar is a 25-year investment").

### 10. CTA
- "Get a Free Solar Assessment": engineers visit, assess, deliver a transparent no-obligation proposal "usually within 48 hours". CTAs Get Free Quote and Contact Us. Related-resources links: services, projects, how solar works, net metering guide, get quote, contact.

### About page figures that disagree with other pages
- "5 Locations / five physical offices" vs "Four outlet locations" (same page) and "4 branch offices" (nav).
- "1-year installation warranty" vs "2-year workmanship warranty" on service and outlet pages.
- "within 48 hours" proposal vs "within 24 hours" (get-quote.html) vs "within 2 hours" (service pages' form note).
- Quotes attributed to the same names read differently on index.html.
