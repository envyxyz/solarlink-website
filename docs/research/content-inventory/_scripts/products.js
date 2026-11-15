const fs=require('fs');
const OUT='C:/obsidian/05-PROJECTS/ah-growth/SolarLink/solarlink-website/docs/research/content-inventory/';
const base=JSON.parse(fs.readFileSync(OUT+'_products_base.json','utf8'));
const extra={
 'products/index':{brands_named:['Canadian Solar (as "Canadian Solar & Tier-1 equivalents")','Growatt','Fronus'],models_named:[],specs:['25-year linear power warranty','High-efficiency monocrystalline cells','5-year standard warranty (extendable) on inverters','On-grid, off-grid & hybrid options','Lithium & lead-acid batteries'],prices_shown:[]},
 'products/solar-panels':{brands_named:['Canadian Solar ("primarily Canadian Solar")'],models_named:[
  {model:'Canadian Solar HiHero 430W Mono Panel',visibility:'JSON-LD only, not visible on page',description:'430W monocrystalline panel with 25-year performance warranty'},
  {model:'Canadian Solar HiKu6 540W Mono-PERC Panel',visibility:'JSON-LD only',description:'ideal for residential rooftops in Pakistan'},
  {model:'Canadian Solar HiKu7 580W Mono Panel',visibility:'JSON-LD only',description:'large-format monocrystalline panel for high-yield installations'},
  {model:'Canadian Solar BiHiKu 540W Bifacial Panel',visibility:'JSON-LD only',description:'captures light on both sides for higher yield'}],specs:['Tier-1 mono & polycrystalline panels (stated in intro)','Tier-1 defined as rated by Bloomberg NEF as financially bankable, fully automated production lines'],prices_shown:[],note:'Visible text has no models, wattages or prices (models above are JSON-LD only). "Full product catalogue and pricing available on request." Panel spec "580W" and "25-year linear power output warranty" appear only on service pages and faqs.html.'},
 'products/inverters':{brands_named:['Growatt','Fronus'],models_named:[
  {model:'Fronus Platinum PV2200',visibility:'visible table + JSON-LD',capacity:'2.2kW',price_pkr:59900,best_for:'Small homes'},
  {model:'Fronus Platinum PV3200',capacity:'3.2kW',price_pkr:86900,best_for:'Medium homes'},
  {model:'Fronus Platinum PV5200',capacity:'5.2kW',price_pkr:126900,best_for:'Standard homes'},
  {model:'Fronus Platinum PV7200',capacity:'7.2kW',price_pkr:158900,best_for:'Large homes'},
  {model:'Growatt MIN 3000TL-X On-Grid Inverter',visibility:'JSON-LD only, no price',description:'3kW on-grid string inverter'},
  {model:'Growatt SPH5000 Hybrid Inverter',visibility:'JSON-LD only, no price',description:'5kW hybrid inverter, battery-ready'},
  {model:'Growatt SPH10000 Hybrid Inverter',visibility:'JSON-LD only, no price',description:'10kW hybrid inverter'}],
  specs:['Hybrid (battery-ready), on-grid and off-grid configurations from 3kW to 100kW+','Growatt: 5-year warranty (extendable to 10)','Growatt "handle voltage fluctuations common on the Pakistani grid"'],
  prices_shown:[
   {item:'Fronus Platinum PV2200 (2.2kW)',price:'PKR 59,900',source:'table "Fronus Inverter Models & Prices in Pakistan" and Product JSON-LD offers (priceCurrency PKR, InStock)'},
   {item:'Fronus Platinum PV3200 (3.2kW)',price:'PKR 86,900',source:'same'},
   {item:'Fronus Platinum PV5200 (5.2kW)',price:'PKR 126,900',source:'same'},
   {item:'Fronus Platinum PV7200 (7.2kW)',price:'PKR 158,900',source:'same'},
   {item:'Growatt inverters (range)',price:'"approximately PKR 65,000 for a 3kW on-grid model to PKR 250,000+ for a 10kW hybrid model"',source:'FAQ "What is the price of Growatt inverter in Pakistan?"'}],
  note:'Only product page with model-level prices. Table has no date. JSON-LD marks the Fronus items availability InStock. "Best price" appears in title tag and meta description.'},
 'products/batteries':{brands_named:['Growatt (JSON-LD only)','Osaka (JSON-LD only)','Phoenix (JSON-LD only)'],models_named:[
  {model:'Growatt ARK 2.5H-A1 Lithium Battery (2.5kWh)',visibility:'JSON-LD only, no price'},
  {model:'Growatt ARK 5.0H-A1 Lithium Battery (5kWh)',visibility:'JSON-LD only, no price'},
  {model:'Osaka Titan Plus 200Ah AGM Battery',visibility:'JSON-LD only, no price',description:'lead-acid AGM for off-grid backup'},
  {model:'Phoenix UPS Plus 200Ah Tubular Battery',visibility:'JSON-LD only, no price',description:'deep-cycle tubular'}],specs:['Lithium-ion: "longer life, lighter weight, deeper discharge"','Lead-acid: "lower upfront cost"'],prices_shown:[],note:'Visible page text names no brands, capacities or prices; the models above exist only in structured data. Industrial page and home page logo strip mention TESVOLT / Tesvolt Energy Storage and Tesla Energy as logos, not as products offered here.'},
 'products/accessories':{brands_named:[],models_named:[],specs:['galvanised steel and aluminium mounting structures','UV-rated DC cabling','AC isolators','surge protection devices (SPDs)','earthing kits'],prices_shown:[]},
};
const pages=base.map(p=>{const slug=p.slug;return {...p,...(extra[slug]||{})}});
const sitewide={
 brand_mentions_across_scope:{
  Growatt:'inverters; named on home, about, get-quote, outlets/lahore+islamabad, all service pages, faqs, products',
  'Fronus (also spelled "Fronus" only; llms.txt says "Fronus inverters")':'inverters; models and prices only on products/inverters.html',
  'Canadian Solar':'panels; "580W" (service pages), "Tier-1 BF", 25-year linear power output warranty; faqs: "10-year product workmanship warranty and a 25-year linear performance warranty"',
  LONGi:'LONGi Hi-MO 6 panels (1,200 of them) in the 600kW MD Textile Gujranwala project on index.html and services/industrial-solar.html; logo on home, about, industrial',
  Huawei:'six 115kW Huawei on-grid inverters in the same project; logo on home and industrial page',
  'GoodWe, Solis, Jinko Solar, Trina Solar, Schneider Electric, Tesvolt (TESVOLT), Tesla Energy':'logo strips only (home: all of them; about: Growatt, Canadian Solar, LONGi, GoodWe, Solis as "Equipment Brand Partners"; industrial: Growatt, Canadian Solar, LONGi, Huawei, Schneider Electric, TESVOLT, Solis). Industrial FAQ text names Growatt, Canadian Solar, Schneider Electric, TESVOLT.'},
 brand_list_conflicts:[
  'llms.txt / about-us / get-quote / outlets: "Growatt, Fronus, Canadian Solar"',
  'index.html hero: "Growatt • Canadian • LONGi"',
  'about-us logos: Growatt, Canadian Solar, LONGi, GoodWe, Solis; index logos add Huawei, Jinko, Schneider Electric, Tesvolt, Trina, Tesla',
  'Fronus is named on products/inverters, services pages and outlets but is absent from the home page brand strip and hero line'],
 wattage_specs:['Canadian Solar 580W (service pages)','"A single 580W Tier-1 panel in Punjab generates approximately 2-2.5 kWh per day" (faqs)'],
 other_prices_on_site_outside_products:'System cost ranges (PKR) appear on faqs.html cost guide table, service FAQs and outlet FAQs; see claims-to-confirm.md category price/cost.'
};
fs.writeFileSync(OUT+'products.json',JSON.stringify({note:'Section summaries are extractive (first sentences as written). Bullets and FAQs verbatim. Word count = main content excluding header/footer chrome.',pages,sitewide},null,1));
fs.unlinkSync(OUT+'_products_base.json');
console.log('ok');
