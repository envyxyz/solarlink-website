# solar-calculator.html: full documentation

Source: `solarlink-2.0/solar-calculator.html` (1,700 lines). All logic is one inline `<script>` at lines 1284-1698. `js/site.js` (788 bytes) only does scroll-reveal; it contains no calculator code. No form posts anywhere: results lead to a WhatsApp deep link and `/get-quote.html`.

Page title/H1: "Solar Savings & System Sizing Calculator". Subtitle (line 533): "Estimate your recommended system size, monthly electricity bill reduction, payback period, and 25-year financial ROI in seconds." JSON-LD `WebApplication`, price 0 PKR, description "...with live tariff modeling."

## Structure: three tabs
Tabs (`switchCalcTab`, line 1403): "Savings & Payback", "System Sizing", "System Quotation". The sizing tab has two modes (`switchSizingMode`, line 1424): "Simple Sizing" and "Appliance Load Matrix".

## Inputs

### Tab 1: Savings & Payback
| Label | id | Type | Default | Range / options |
|---|---|---|---|---|
| Average Monthly Electricity Bill | `input-bill` | number | 35000 | min 5000, max 500000, step 1000 |
| (bill slider, badge "PKR 5k"...) | `bill-slider` | range | 35000 | min 5000, max 250000, step 1000 (JS clamps with `Math.min(bill, 250000)`, line 1493) |
| Quick Select | 6 buttons `setPresetBill(...)` | button | - | 20k, 35k, 50k, 80k, 120k, 200k (PKR 20,000 / 35,000 / 50,000 / 80,000 / 120,000 / 200,000) |
| 2. Target System Package | `select-system-size` | select | `auto` | Auto-Recommend Best Tier (Recommended); 1.6 kW (Hybrid + 1 Battery) PKR 398,000; 3 kW (Hybrid + 2 Batteries) PKR 734,400; 4 kW (Hybrid + 2 Batteries) PKR 929,900; 6 kW (Hybrid + 4 Batteries) PKR 1,415,900; 8 kW (Hybrid + 4 Batteries) PKR 1,869,900; 10.2 kW (Hybrid + 4 Batteries) PKR 2,322,000; 15 kW (On-Grid + Net Metering) PKR 2,783,000; 20 kW (On-Grid + Net Metering) PKR 3,668,500 |
| Years Projection | `savings-year-slider` | range | 5 | min 1, max 25, step 1 |

Helper text under the bill field (line 634): "Includes standard fuel price adjustment (FPA), surcharges, and taxes." Under the projection (line 717): "Includes 8% annual grid electricity tariff escalation compounding."

### Tab 2a: Simple Sizing
| Label | id | Type | Default | Options |
|---|---|---|---|---|
| City / Location | `simple-city` | select | lahore (first) | Lahore (4.8 Peak Sun Hours); Islamabad (4.8); Rawalpindi (4.8); Sargodha (5.0); Multan (5.2) |
| Monthly Electricity Bill (PKR) | `simple-bill` | number | 35000 | min 5000, max 500000, step 1000 |
| Bill Offset Goal (%) | `simple-goal` | select | 100 (first) | 100% Offset (Zero Out Grid Bill); 80% Offset (Optimal Sizing); 60% Offset (Daytime Priority) |

### Tab 2b: Appliance Load Matrix (qty / hours inputs; wattage is fixed)
| Appliance | Watts (fixed) | Qty id, default, max | Hours id, default, max |
|---|---|---|---|
| 1.5 Ton Inverter AC | 1,200 W | `app-ac-qty`, 2, max 20 | `app-ac-hrs`, 8, max 24 |
| Refrigerator / Deep Freezer | 125 W | `app-fridge-qty`, 1, max 10 | `app-fridge-hrs`, 24, max 24 |
| Ceiling Fans (Standard/Inverter) | 75 W | `app-fan-qty`, 6, max 30 | `app-fan-hrs`, 12, max 24 |
| LED Lights & Fixtures | 12 W | `app-led-qty`, 10, max 100 | `app-led-hrs`, 6, max 24 |
| Water Pump / Motor | 1,000 W | `app-pump-qty`, 1, max 5 | `app-pump-hrs`, 1, max 24 |
All min 0.

### Tab 3: Quotation
No inputs. It mirrors the package chosen in Tab 1.

## Outputs
- Tab 1: `output-units` "Estimated Monthly Consumption" (units/month); `output-rec-tier` (package label); `output-rec-cost` ("Price: PKR ..."); `output-generation` (e.g. "690-780 Units"); `output-payback` ("x.xx Years", label "Estimated Payback", "@ 4.8 Peak Sun Hours" at line 697); `output-cumulative-savings` ("PKR ..."), badge "N Years Projection".
- Tab 2a: `simple-out-kw` (package label), `simple-out-cost`, `simple-out-savings` ("PKR x / mo").
- Tab 2b: per-row kWh (`app-*-kwh`, 2 decimals), `adv-out-daily` ("x kWh / day"), `adv-out-tier` (package label).
- Tab 3: `quote-out-tier`, `quote-out-type`, `quote-out-cost`, `quote-out-savings`, `quote-out-payback`, "SolarLink Estimate #SL-2026-ONLINE" (static text, line 949), and a deliverables list (inverter, panels, mounting, storage/net metering, turnkey wiring) built from the package record.

## Formulas and constants (quoted from code)

### Package table, `PACKAGES` (lines 1285-1398)
Fields per package: kw, label, type, cost (PKR), generationMin/Max (units per month), roof (no unit; appears unused in outputs), inverter, panels, stands, storage, wiring.

| kW | type | cost PKR | gen/month | roof | inverter | panels | stands | storage |
|---|---|---|---|---|---|---|---|---|
| 1.6 | Hybrid with Battery | 398,000 | 180-220 | 120 | 1-Hybrid Inverter 2200VA | 4-Solar Panel 545W (Tier-1) | 2-Solar Stand 14 Gage L2 | 1-Lithium ION 12V Battery |
| 3 | Hybrid with Battery | 734,400 | 340-400 | 220 | 1-Hybrid Inverter 3200VA | 6 x 545W | 3 stands | 2-Lithium ION 12V Battery |
| 4 | Hybrid with Battery | 929,900 | 460-520 | 280 | 1-Hybrid Inverter PV5200 | 8 x 545W | 4 | 2 batteries |
| 6 | Hybrid with Battery | 1,415,900 | 690-780 | 420 | 1-Hybrid Inverter 7200VA | 12 x 545W | 6 | 4 batteries |
| 8 | Hybrid with Battery | 1,869,900 | 920-1050 | 550 | 1-Hybrid Inverter PV9200 | 14 x 545W | 7 | 4 batteries |
| 10.2 | Hybrid with Battery | 2,322,000 | 1170-1300 | 700 | 1-Hybrid Inverter 12000VA | 18 x 545W | 9 | 4 batteries |
| 15 | On-Grid + Net Metering | 2,783,000 | 1400-1800 | 1050 | 1-On-Grid Inverter 15KW | 28 x 545W | 14 | "Net Metering with Earth and Boring" |
| 20 | On-Grid + Net Metering | 3,668,500 | 2000-2400 | 1400 | 1-On-Grid Inverter 20KW | 38 x 545W | 19 | "Net Metering with Earth and Boring" |
Wiring for all: "Wiring Material & Turnkey Installation". Brand names for inverter and battery are not given (only "Hybrid Inverter", "Lithium ION 12V Battery"); panels are "545W (Tier-1)". Note 4 x 545 W = 2.18 kW for the "1.6 kW" package, and 18 x 545 W = 9.81 kW for "10.2 kW", so the kW label is not the panel total (see outdated list).

### Bill to units, `convertBillToUnits` (lines 1459-1476), "Tiered LESCO/IESCO Bill-to-Units Converter"
```
if (bill <= 2000)  units = bill / 20;
else if (bill <= 5000)  units = 100 + (bill - 2000) / 30;
else if (bill <= 8800)  units = 200 + (bill - 5000) / 38;
else if (bill <= 18400) units = 300 + (bill - 8800) / 48;
else if (bill <= 29400) units = 500 + (bill - 18400) / 55;
else units = 700 + (bill - 29400) / 62;
return Math.round(units);
```
So the implied all-in PKR per unit by slab is 20 (0-100 units), 30 (100-200), 38 (200-300), 48 (300-500), 55 (500-700), 62 (700+). These include taxes per the on-page note; no source is cited. The FAQ on the page (line 1039) lists slabs "1-100 units, 101-200, 201-300, 301-700, and 700+", which does not match the code's 300-500 / 500-700 split.

### Required kW (line 1531-1532 and 1595, 1636)
```
dailyKwh = units / 30;
calculatedKw = dailyKwh / 3.84;
```
3.84 = daily kWh per kW. It is not commented. It equals 4.8 peak sun hours x 0.80 (inferred, not stated in code). The same 3.84 is used for every city; the city select in Tab 2a is never read by `calculateSimpleSizing` (lines 1589-1604), so Multan (5.2 PSH) and Sargodha (5.0) get no different result. Simple mode applies `goalPercent` (100/80/60) to units before dividing.

### Package tier thresholds, `getRecommendedPackage` (lines 1479-1488)
requiredKw <= 2.2 -> 1.6 kW; <= 3.5 -> 3 kW; <= 5.0 -> 4 kW; <= 7.0 -> 6 kW; <= 9.0 -> 8 kW; <= 12.5 -> 10.2 kW; <= 17.5 -> 15 kW; else 20 kW. Anything above 20 kW demand still returns the 20 kW package (no cap warning).

### Savings and payback (lines 1549-1553)
```
avgGen = (generationMin + generationMax) / 2;
monthlySavings = Math.round(Math.min(units, avgGen) * 45);
annualSavings = monthlySavings * 12;
paybackYears = (selectedPkg.cost / Math.max(annualSavings, 1)).toFixed(2);
```
Constants: tariff value per unit saved = PKR 45 flat (regardless of slab, and not tied to the slab rates above); sun-hours/loss factor embedded in generation ranges; no export/buy-back rate; no degradation; no battery replacement; no O&M. If a manual package is picked, a missing match falls back to `PACKAGES[4]` (8 kW).

### Cumulative savings (lines 1577-1584)
```
multiplier = currentSelectedYear;
if (year === 5) multiplier = 5.86;
else if (year === 10) multiplier = 14.48;
else if (year === 15) multiplier = 27.15;
else if (year === 25) multiplier = 73.10;
else multiplier = year * (1 + (year * 0.04));
cumulative = Math.round(annualSavings * multiplier);
```
Check: the hard-coded values equal the geometric sum of 8% growth, sum(1.08^k, k=0..n-1) = 5.87, 14.49, 27.15, 73.11 (hard-coded values are truncated: 5.86, 14.48). Every other year uses a different formula, year x (1 + year x 0.04), which does not match the 8% series (year 20 gives 36 vs 45.76; year 1 gives 1.04 vs 1.00). So the line is not smooth across the slider.

### Appliance matrix (lines 1607-1639)
Daily kWh = qty x watts x hours / 1000, watts 1200 / 125 / 75 / 12 / 1000 (lines 1610, 1615, 1620, 1625, 1630). Fridge runs 24 h at full 125 W (no duty cycle). Total / 3.84 = required kW, then `getRecommendedPackage`. Default total shows 29.32 kWh/day.

### Sample outputs (computed from the code, default 100% auto mode)
| Bill PKR | Units/mo | Package | Cost | Monthly saving | Payback yrs | 5-yr cumulative |
|---|---|---|---|---|---|---|
| 5,000 | 200 | 1.6 kW | 398,000 | 9,000 | 3.69 | 632,880 |
| 20,000 | 529 | 4 kW | 929,900 | 22,050 | 3.51 | 1,550,556 |
| 35,000 (default) | 790 | 6 kW | 1,415,900 | 33,075 | 3.57 | 2,325,834 |
| 50,000 | 1,032 | 8 kW | 1,869,900 | 44,325 | 3.52 | 3,116,934 |
| 80,000 | 1,516 | 15 kW | 2,783,000 | 68,220 | 3.40 | 4,797,230 |
| 120,000 | 2,161 | 20 kW | 3,668,500 | 97,245 | 3.14 | 6,838,268 |
Payback is always about 3-3.7 years by construction. Note the static HTML placeholder values in the Quotation tab (10.2 kW, PKR 51,525, 3.76 years) differ from what the script produces on load (6 kW, 33,075, 3.57), so they are stale markup that `calculateSavings()` overwrites at DOMContentLoaded (line 1695).

## Where the result leads
- Tab 1 button "View Official Quote" and Tab 2 button "Generate Detailed Quote" call `switchCalcTab('quote')`.
- Tab 3 bottom bar (lines 996-1010): "Ready to book your official survey for this package?" with
  - `<a href="/get-quote.html">` "Book Free Site Assessment" and
  - `#quote-whatsapp-btn` "Chat on WhatsApp". Default href: `https://wa.me/923218425777?text=Hello%20SolarLink%2C%20I%20used%20your%20Solar%20Calculator%20and%20would%20like%20to%20discuss%20a%20quotation.` `updateQuoteSummary` (lines 1652-1653) rewrites it to: `Hello SolarLink, I am interested in your ${pkg.label} (PKR ${pkg.cost.toLocaleString()}) from the Solar Calculator. Please share further details.` to `https://wa.me/923218425777`.
- Bottom CTA section "Get an On-Site Engineering Survey" (line 1080): "...a 100% customized CAD layout and guaranteed proposal."
- No lead capture of bill amount, city, or contact details; the WhatsApp message only carries the package name and price.

## FAQ on the page (3, verbatim answers)
1. "How does this calculator estimate my monthly units from bill amount?" - "In Pakistan, residential electricity tariffs use progressive slabs (e.g. 1-100 units, 101-200, 201-300, 301-700, and 700+ units). Our calculator factors in standard base tariffs, fuel price adjustments (FPA), and DISCO surcharges to model the true unit consumption corresponding to your bill."
2. "What does Peak Sun Hours (PSH) mean?" - "Peak Sun Hours refers to the equivalent number of hours per day when solar irradiance equals 1,000 W/m². Across Punjab (Lahore, Islamabad, Rawalpindi, Sargodha, Multan), Pakistan enjoys between 4.8 and 5.4 peak sun hours daily, producing roughly 115–125 kWh per kW installed each month."
3. "How does net metering help shorten my payback period?" - "With bi-directional net metering, any surplus electricity your system generates during daytime is exported to the grid and credited against your off-peak night consumption. This eliminates peak grid charges and typically reduces the capital payback period to under 4 years."

## Constants that look outdated, unsourced or inconsistent
1. Package prices (PKR 398,000 to 3,668,500): unsourced, no date. Labelled "Official" in the code comments; likely 2025/early 2026 flyer prices. Confirm with client; pricing on a public page is likely to be stale.
2. PKR 45 per unit flat saving (line 1550): unsourced; does not follow the code's own slab rates (20-62) or the current 2026 tariff.
3. Slab rates 20/30/38/48/55/62 PKR per unit (lines 1459-1476): unsourced, not NEPRA/LESCO figures; slab boundaries disagree with the FAQ text.
4. 3.84 kWh/kW/day (lines 1532, 1595, 1636): undocumented; inferred 4.8 PSH x 0.8. City selector ignored.
5. Generation ranges per package: unsourced; per-kW ratios range 112-137 units/month on small hybrids and 100-120 on the 20 kW package, versus FAQ claim "115-125 kWh per kW installed each month"; the 15 kW range 1,400-1,800 is 93-120 per kW.
6. 8% annual tariff escalation (line 717): unsourced; the year formula is inconsistent (year x (1 + year x 0.04)) for non-milestone years.
7. 545 W panel count mismatch: "1.6 kW" has 4 panels = 2.18 kW; "3 kW" has 6 = 3.27 kW; "4 kW" has 8 = 4.36 kW; "6 kW" has 12 = 6.54 kW; "8 kW" 14 = 7.63 kW; "10.2 kW" 18 = 9.81 kW; "15 kW" 28 = 15.26 kW; "20 kW" 38 = 20.71 kW. Labels are not consistent with panel totals.
8. No net metering buy-back rate, no export credit, no degradation, no battery replacement cost, no O&M; "payback under 4 years" claim in the FAQ is a product of these omissions.
9. "SolarLink Estimate #SL-2026-ONLINE": fixed reference number, not unique per estimate.
10. `roof` field (120-1400) has no unit and is never displayed.
11. Appliance wattages (1200 W AC, 125 W fridge at 24 h, 75 W fan, 12 W LED, 1000 W pump): rough, unsourced.
12. Slider max (250,000) is lower than the input max (500,000) and the 200k preset is the highest chip.
13. Hard-coded WhatsApp number 923218425777 (confirm it is current).
14. Page promises "guaranteed proposal" and "100% customized CAD layout" (line 1080): marketing claim to confirm.
