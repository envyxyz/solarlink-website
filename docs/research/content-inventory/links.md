# Navigation, footer and broken links

## Header nav (rendered by js/nav.js, lines 559-840)
Top utility bar: phone chips Lahore 042-37117713, Islamabad 051-5204555, Rawalpindi 051-5708488, Sargodha 048-3720111; WhatsApp links Lahore 923218425777, Islamabad 923393555000, Rawalpindi 923235551795, Sargodha 923137084973.

Primary nav (id sl-primary-nav), in order:
1. Home - /
2. Solutions (dropdown, var SOLUTIONS)
   - Residential Solar - /services/residential-solar.html - "Solar systems for homes & villas"
   - Commercial Solar - /services/commercial-solar.html - "Offices, factories & businesses"
   - Industrial & Large-Scale - /services/industrial-solar.html - "100kW+ factories & plants"
   - Agricultural Solar - /services/agricultural-solar.html - "Tube-wells & farm operations"
   - Net Metering Support - /services/net-metering-support.html - "DISCO approval & export billing"
3. Projects - /projects/
4. Products (dropdown, var PRODUCTS)
   - Solar Panels - /products/solar-panels.html - "Tier-1 mono & poly panels"
   - Inverters - /products/inverters.html - "Hybrid, on-grid & off-grid"
   - Batteries - /products/batteries.html - "Lithium & lead-acid storage"
   - Accessories - /products/accessories.html - "Mounting, cabling & protection"
5. Resources (dropdown, var RESOURCES)
   - Solar Calculator - /solar-calculator.html - "Instant ROI & sizing estimator"
   - How Solar Works - /how-solar-works.html - "Understand your solar system"
   - Net Metering Guide - /net-metering-guide.html - "Step-by-step DISCO guide"
   - FAQs - /faqs.html - "Common questions answered"
   - Blog - /blog/ - "Tips, news & case studies"
6. About Us (dropdown, var ABOUT)
   - Our Story - /about-us.html - "Punjab's trusted solar company since 2018"
   - Contact Us - /contact-us.html - "Visit our 4 branch offices or message on WhatsApp"
7. Outlets (dropdown, var OUTLETS)
   - Lahore /outlets/lahore.html (Mall Road); Islamabad /outlets/islamabad.html (Sector I-14/3); Rawalpindi /outlets/rawalpindi.html (PWD Main Road); Sargodha /outlets/sargodha.html (Company Bagh); Multan /outlets/multan.html (sub-label "Coming soon"); Gilgit /outlets/gilgit.html (sub-label "Coming soon")
8. CTA button "Get Free Quote" - /get-quote.html

Mobile panel: same lists, plus WhatsApp 923218425777 and a "Get Free Quote" link to /get-quote/ (line 834; the desktop CTA uses /get-quote.html, so the mobile link is a different URL form).

## Footer (index.html <footer>)
- Follow SolarLink (social): YouTube https://www.youtube.com/@Solarlinkcompanyofficial; Facebook https://www.facebook.com/solarlinkpk; TikTok https://www.tiktok.com/@solarlink.pk; Instagram https://www.instagram.com/solarlinkpk; LinkedIn https://www.linkedin.com/company/solarlinkpk; Pinterest https://www.pinterest.com/solarlinkpk
- Resources: FAQs /faqs.html; How Solar Works /how-solar-works.html; Net Metering Guide /net-metering-guide.html; Blog /blog/; Solar Calculator /solar-calculator.html
- Services: Residential Solar; Commercial Solar; Agricultural Solar; Net Metering Support; Industrial & Large-Scale (all /services/*.html)
- Offices:
  - Lahore Outlet: Shop No. 05, Munawar Center, Opp. State Bank Building, 30-The Mall Road, Lahore 54000; tel 042-37117713, 042-37117714; WhatsApp 923218425777
  - Islamabad: House No. 514, North Service Road, Sector I-14/3, Islamabad 44000; tel 051-5204555; WhatsApp 923393555000
  - Rawalpindi: Shop No. 05, PWD Main Road, Opp. Shaafi Hospital, Rawalpindi 45400; tel 051-5708488; WhatsApp 923235551795
  - Sargodha: Block No. 05, Aslahy Wali Gali, Near Company Bagh, Sargodha 40100; tel 048-3720111; WhatsApp 923137084973
- Bottom line: "© 2026 Solarlink. All rights reserved. · Founded 2018 in Lahore, Pakistan."; email info@solarlink.com.pk; "Top" anchor.
- No Terms or Privacy link in the footer (terms.html exists and is not in the footer or header nav; no privacy page exists).

## Internal links pointing at files that do not exist (checked against the repo; trailing-slash URLs tested as folder/index.html and as .html)
| href | pages linking | note |
|---|---|---|
| /services/installment-plans/ | 4 (locations/rawalpindi.html, outlets/islamabad.html, outlets/rawalpindi.html) | no installment-plans page exists |
| /net-metering-guide/ | 3 (outlets/islamabad.html, outlets/lahore.html, outlets/sargodha.html) | clean URL; file is net-metering-guide.html (works only if host rewrites) |
| /projects/bahria-town-phase-2-lahore-10kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/johar-town-lahore-4-5kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/dha-phase-5-lahore-15kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/gulberg-iii-lahore-20kw-commercial.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/model-town-lahore-6kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/bahria-town-phase-6-islamabad-10kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/sector-i14-islamabad-8kw-hybrid.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/pwd-rawalpindi-12kw-hybrid.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/company-bagh-sargodha-4-5kw.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /projects/company-bagh-sargodha-10kw-farm.html.html | 1 (sitemap.html) | double .html extension typo in sitemap.html |
| /get-quote/ | 1 (js/nav.js) | mobile menu uses clean URL; file is get-quote.html (works only if host rewrites) |

## URL pattern notes
- Internal links use .html filenames. Every canonical, hreflang and sitemap.xml entry (except faqs.html and outlets/*.html) uses clean URLs without .html (for example https://solarlink.com.pk/about-us/). Whether those resolve depends on host rewrites; the repo has none (_headers has no redirects).
- sitemap.xml has 48 <loc> entries. It omits services/industrial-solar, terms, home facelift/test pages (intended) and lists outlets as .html but projects and blog posts as clean URLs.
- sitemap.html links all 10 project pages with a doubled extension (.html.html), so those 10 links are broken.
