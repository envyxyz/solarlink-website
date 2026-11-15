const L=require('./lib');const {fs,path}=L;
const P=JSON.parse(fs.readFileSync(path.join(L.OUT,'projects.json'),'utf8')).projects;
const R=[];const add=(c,w,t,o,why)=>R.push([c,w,t,o,why]);
for(const p of P){const w='projects/'+p.slug+'.html';
 const s=p.savings_or_generation_figures;
 add(`"${s.before_monthly_bill}" before and "${s.after_monthly_bill}" after (page labels both "Placeholder")`,w,'savings figure','unknown','Page itself says "Placeholder"; likely invented; no date or bill evidence');
 if(s.percentage_claim_in_text)add(`Intro line: "${p.narrative_summary.split('. ')[0].replace(/\.$/,'')}" (${s.percentage_claim_in_text} claim)`,w,'savings figure','unknown','Percentage in intro; derived from placeholder bills');
 add(`System size ${p.system_size_kw} kW, ${p.system_type}, ${p.area}, ${p.city}`,w,'system count / spec','unknown','No install date, customer name or proof; confirm project is real and spec is right');
 add(`Equipment brands: ${p.equipment_brands_named.join(', ')}`,w,'brand claim','unknown','Brand tags only; page says "Brands may vary"; confirm per project');
 add(`Testimonial: ${p.testimonial.quote} - ${p.testimonial.attribution}; label "${p.testimonial.verified_label}"`,w,'customer testimonial / name','unknown','Anonymous, "Verified SolarLink Customer"; need written consent and proof it is real');
 add(`JSON-LD datePublished ${p.date_in_jsonld.datePublished}, dateModified ${p.date_in_jsonld.dateModified}`,w,'date','yes','Same date on all 10 pages (1 Jan 2026), so not a real install date');}
add('"Every card below is a real SolarLink project — system specs, actual bill savings, and customer feedback."','projects/index.html','project authenticity claim','yes','Contradicted by detail pages (placeholder bills and photos)');
add('Meta: "Real before/after bill data, equipment details, and customer testimonials."','projects/index.html','project authenticity claim','yes','Same contradiction');
add('Testimonial containing "Payback in under 4 years" (see row above for full quote)','projects/dha-phase-5-lahore-15kw.html and index','payback claim','unknown','Payback figure unsupported');
add('"Our electricity overheads dropped by more than two-thirds overnight" / "cutting business operating costs by 70%" (95,000 to 28,000)','projects/gulberg-iii-lahore-20kw-commercial.html','savings figure','unknown','Placeholder; 95,000 to 28,000 is a 70.5% drop');
add('"Installed within two days and I was generating power by the third morning."','projects/johar-town-lahore-4-5kw.html','installation time','unknown','Timeline claim from anonymous quote');
add('Blog posts: "we answer solar questions within 2 hours" / "we typically respond within 2 hours"','blog/*.html (10 posts), blog/index.html','service level','unknown','Confirm response-time promise');
add('"deliver a transparent, no-obligation proposal within 48 hours"','blog/*.html, projects/*.html, guides','service level','unknown','Confirm 48-hour quote turnaround');
add('"Solarlink is an independent solar installation company based in Lahore, Pakistan, operating since 2018 with offices in Lahore, Islamabad, Rawalpindi, and Sargodha."','blog/*.html (10 posts)','company fact / date','unknown','Confirm 2018 founding date and four offices (nav also lists Multan and Gilgit as "Coming soon")');
add('"someone who has installed hundreds of systems in your area"','blog/index.html','system count','unknown','Unquantified; confirm count');
add('"57 questions answered across 7 categories" (FAQs link)','blog/index.html','content count','unknown','Confirm against faqs.html');
add('Blog stub JSON-LD datePublished/dateModified 2026-02-01 for 10 posts that have no content','blog/*.html','date','yes','Posts are unpublished stubs; do not carry dates');
add('Title tags end "— Coming Soon | SolarLink"; titles promise "7 Net Metering Mistakes", "10 Red Flags", "(2026)", "2026 tariff rates"','blog/*.html','publication promise','yes','Content does not exist; counts and 2026 tariff claims are untested');
add('Meta (growatt-vs-fronus): "features, warranties, price points"; meta (solar-panel-brands): "Canadian Solar, JA Solar & More" as Tier-1 brands','blog/growatt-vs-fronus-inverter-comparison.html; blog/solar-panel-brands-comparison-pakistan.html','brand comparison','unknown','Brand comparison intended but not written; need client position');
add('Meta (net-metering-vs-battery-storage): "real-world payback calculations for 2026 tariff rates"','blog/net-metering-vs-battery-storage-pakistan.html','tariff / payback','unknown','No calculations present');
add('Meta (net-metering-lesco-application-guide): "how long approval actually takes"','blog/net-metering-lesco-application-guide.html','regulation / timeline','unknown','No content');
const pairs=[
 [0,'Timeline from application to bi-directional meter varies by DISCO — expect 4–12 weeks.','timeline','unknown','Repeated 4 times; DISCO timelines change; confirm current'],
 [0,'As of 2024, Pakistan has issued over 100,000 net metering connections nationwide','statistic','yes','Dated 2024; unsourced beyond "AEDB Pakistan Solar Report"; verify'],
 [0,'NEPRA regulations allow net metering for systems between 1kW and 1MW','regulation','yes','Regulations were amended after 2023; check current NEPRA rules on net billing and buy-back before reuse'],
 [0,'Source: NEPRA Net Metering Regulations 2015 (amended 2023); AEDB Pakistan Solar Report','regulation citation','yes','Out of date if later amendments exist'],
 [0,'Your system must be grid-tied and between 1kW and 1MW in capacity.','regulation','yes','Same as above'],
 [0,'Solarlink handles steps 1–5 on your behalf for all customers.','service claim','unknown','Confirm scope of service'],
 [0,'"Your solar system is installed by a NEPRA-licensed EPC contractor (SolarLink is a licensed contractor)." and "Copy of SolarLink\'s NEPRA generation licence"','licence claim','unknown','Need licence number, validity period and exact licence type (the guide states no licence period)'],
 [0,'"The system capacity does not exceed your sanctioned load"','regulation','unknown','Confirm current NEPRA rule'],
 [0,'"Imported kWh − (Exported kWh × export rate factor)", annual settlement, credits roll over','regulation','yes','Net metering buy-back and settlement rules have been revised; no buy-back rate is given (FAQ says "determined by NEPRA ... subject to revision")'],
 [0,'DISCO table: LESCO, IESCO, GEPCO = "Yes" relevant; MEPCO, FESCO = "Partial"','coverage claim','unknown','Confirm service area, especially Multan (outlet marked "Coming soon")'],
 [0,'"This is less common for residential systems under 10 kW." / "Commercial and industrial consumers often install larger systems (20 kW and above)"','technical claim','unknown','Unsourced generalisation'],
 [0,'"Our team visits your site... usually within 48 hours."','service level','unknown','Confirm'],
 [0,'"no restriction on consumer category — residential, commercial, agricultural, and industrial consumers ... are all eligible"','regulation','unknown','Confirm current rules'],
 [0,'JSON-LD datePublished 2025-03-01 (no visible date)','date','yes','Over 12 months old; re-date after review'],
 [1,'Panels last 25+ years; inverters typically 10–12 years with proper maintenance.','lifespan','unknown','Generic; the lifespan table says inverters 10–15 years'],
 [1,'Most residential 5–10 kW systems in Pakistan pay back in 4–6 years (2025 tariffs).','payback','yes','Labelled 2025 tariffs; calculator shows about 3-3.7 years, so figures conflict'],
 [1,'Residential 5–10 kW on-grid systems typically range from PKR 750,000 to PKR 1,800,000 (2025 estimates)','price','yes','Labelled 2025; calculator packages run PKR 1,415,900 (6 kW hybrid) to 1,869,900 (8 kW hybrid); confirm'],
 [1,'A 10kWp system produces approximately 40–50 units (kWh) of electricity per day','generation','unknown','Calculator says 1,170-1,300 units per month for 10.2 kW (39-43 per day)'],
 [1,'A single panel might be 580 W, so a 5 kW system contains roughly 8–9 panels.','spec','unknown','Calculator uses 545 W panels; confirm what is stocked'],
 [1,'300–500 kWh/month → 3–5 kW; 500–900 → 5–8 kW; 900–1,500 → 8–12 kW; 1,500+ → 12 kW and above','sizing','unknown','Differs from FAQ ("5 kW suits 400–600 kWh/month; 10 kW suits 800–1,200") and from the calculator (3.84 kWh/kW/day)'],
 [1,'Temperature — panels lose ~0.35–0.45% efficiency per degree Celsius above 25°C','technical','unknown','Generic spec'],
 [1,'The angle is typically fixed at 25–30° in Pakistan','technical','unknown','Generic'],
 [1,'LiFePO₄ batteries offer 4,000–6,000 charge cycles; "A 10 kWh battery bank typically provides 6–8 hours of basic household backup."','technical','unknown','Confirm against stocked batteries (calculator uses 12V lithium)'],
 [1,'Dust and bird droppings can reduce output by 10–20%; clean every 4–8 weeks (FAQ: monthly inspection and quarterly cleaning)','maintenance','unknown','Internal inconsistency (4-8 weeks vs quarterly)'],
 [1,'A 10 kW system typically needs 50–65 m² of unshaded roof.','technical','unknown','Calculator "roof" field for 10.2 kW is 700 (unit unstated)'],
 [1,'Power output degrades roughly 0.5–0.7% per year, so after 25 years panels still produce ~83% of original capacity.','warranty / degradation','unknown','Confirm manufacturer warranty figures'],
 [1,'Warranty table: panels 25-yr performance; inverter 5–10 years; LiFePO₄ 10 years / 4,000 cycles; mounting 10 years; lifespans 30–35, 10–15, 12–15, 25+ years','warranty','unknown','Confirm actual manufacturer and SolarLink workmanship warranty terms'],
 [1,'"The inverter (Growatt or Fronus) converts DC into 220V AC"','brand claim','unknown','Names two brands as the supplied inverters'],
 [1,'"A standard on-grid system shuts off during grid outages by law (anti-islanding protection)."','regulation','unknown','"By law" claim; confirm'],
 [1,'On-grid vs hybrid vs off-grid table: cost "Lowest / Medium / Highest"; off-grid "Net metering eligible: No"','comparison','unknown','Stated as fact'],
 [1,'"In Pakistan in 2025, on-grid with net metering is the most popular choice for urban homes and businesses."','market statement','yes','Dated 2025; unsourced'],
 [1,'"SolarLink offers annual maintenance contracts that include performance checks and panel cleaning."','service claim','unknown','Confirm offer and pricing'],
 [1,'JSON-LD datePublished 2025-03-01 (no visible date)','date','yes','Over 12 months old']];
for(const [i,c,t,o,why] of pairs)add(c,i===0?'net-metering-guide.html':'how-solar-works.html',t,o,why);
const calc=[
 ['Package prices: 1.6 kW PKR 398,000; 3 kW 734,400; 4 kW 929,900; 6 kW 1,415,900; 8 kW 1,869,900; 10.2 kW 2,322,000; 15 kW 2,783,000; 20 kW 3,668,500','price','yes','No date or source; code comment says "Official"; equipment prices change quickly'],
 ['Saving per unit "* 45" (PKR 45 flat)','tariff','yes','Unsourced; ignores slabs; check against current LESCO/IESCO tariff'],
 ['Bill-to-units slabs 20/30/38/48/55/62 PKR per unit at boundaries 2,000/5,000/8,800/18,400/29,400','tariff','yes','Unsourced; FAQ lists different slab edges'],
 ['"Includes 8% annual grid electricity tariff escalation compounding."','tariff forecast','unknown','Unsourced assumption; hard-coded multipliers 5.86/14.48/27.15/73.10 only partly match'],
 ['"typically reduces the capital payback period to under 4 years" (net metering FAQ)','payback','yes','Computed paybacks of 3.1-3.7 years rely on 45/unit and full self-use; conflicts with how-solar-works.html "4–6 years"'],
 ['"Pakistan enjoys between 4.8 and 5.4 peak sun hours daily, producing roughly 115–125 kWh per kW installed each month."','generation','unknown','Package data ranges 93-137 per kW; city selector values 4.8/4.8/4.8/5.0/5.2 differ from the 5.4 upper bound'],
 ['3.84 kWh per kW per day constant','generation','unknown','Undocumented; implies 4.8 PSH x 0.8'],
 ['"Estimate #SL-2026-ONLINE" and WhatsApp number 923218425777','contact / reference','unknown','Static reference; confirm number'],
 ['Package contents: "545W (Tier-1)" panels, "Lithium ION 12V Battery", inverter sizes (2200VA ... 20KW), "Net Metering with Earth and Boring"','equipment / spec','unknown','Brand not named; 4 panels at 545 W is 2.18 kW vs label 1.6 kW; confirm actual bills of materials'],
 ['"a 100% customized CAD layout and guaranteed proposal"','service claim','unknown','"Guaranteed" needs definition'],
 ['"live tariff modeling" (JSON-LD description)','claim','yes','Tariffs are hard-coded, not live']];
for(const [c,t,o,why] of calc)add(c,'solar-calculator.html',t,o,why);
add('robots.txt: "Sitemap: https://solarlink.com.pk/sitemap.xml"; sitemap lastmod 2026-07-30 / 2026-08-22','robots.txt, sitemap.xml','date','unknown','Dates reflect last build, not content changes');
const esc=s=>String(s).replace(/\|/g,'\\|').replace(/\n/g,' ');
let md='# Claims to confirm (content scope: projects, blog, guides, calculator)\n\nClaims quoted from the old site. "Likely outdated" is a flag for the client, not a finding of fact. Rows: '+R.length+'.\n\n| # | claim (quoted) | where | type | likely outdated? |\n|---|---|---|---|---|\n';
R.forEach((r,i)=>{md+=`| ${i+1} | ${esc(r[0])} | ${esc(r[1])} | ${esc(r[2])} | ${r[3]}: ${esc(r[4])} |\n`;});
fs.writeFileSync(path.join(L.OUT,'claims-to-confirm-content.md'),md);console.log(R.length);
