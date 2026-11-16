/*
  Homepage section 6, Shop preview (docs/COPY-HOME.md). The twelve products are samples: generic, no brand, price,
  warranty or stock, and each is flagged like a fact, so a production build leaves them out until real stock is
  confirmed. The optional fields are for a future store: the card prints them when present.
  Images and alt text sit on the category (not on the flagged product), so the content check does not read
  them as unconfirmed claims. The UPS category has no render yet.
*/
const SAMPLE = "Sample item from docs/COPY-HOME.md. Replace with real stock before launch";

export type Product = {
  slug: string;
  name: string;
  spec: string;
  /** Store fields, all optional. A number is a price in rupees. */
  brand?: string;
  price?: number;
  pricePerWatt?: number;
  stock?: string;
  warranty?: string;
  sample: boolean;
  confirmed: boolean;
  source: string;
};

export type ShopCategory = {
  slug: string;
  label: string;
  alt: string;
  imagePending: boolean;
  image?: { src: string; width: number; height: number };
  products: Product[];
};

const sample = (slug: string, name: string, spec: string): Product => ({ slug, name, spec, sample: true, confirmed: false, source: SAMPLE });

const categories: ShopCategory[] = [
  {
    slug: "panels",
    label: "Solar panels",
    alt: "A solar panel, front view",
    imagePending: false,
    image: { src: "/images/product-panel-640.webp", width: 640, height: 640 },
    products: [
      sample("panel-580", "580 W N-type panel", "N-type, 580 W"),
      sample("panel-550", "550 W mono panel", "Mono, 550 W"),
      sample("panel-450", "450 W mono panel", "Mono, 450 W"),
    ],
  },
  {
    slug: "inverters",
    label: "Inverters",
    alt: "A solar inverter on a wall",
    imagePending: false,
    image: { src: "/images/product-inverter-640.webp", width: 640, height: 640 },
    products: [
      sample("inverter-5", "5 kW hybrid inverter", "Hybrid, 5 kW"),
      sample("inverter-10", "10 kW on-grid inverter", "On-grid, 10 kW"),
      sample("inverter-12", "12 kW hybrid inverter", "Hybrid, 12 kW"),
    ],
  },
  {
    slug: "batteries",
    label: "Batteries",
    alt: "A lithium battery unit",
    imagePending: false,
    image: { src: "/images/product-battery-640.webp", width: 640, height: 640 },
    products: [
      sample("battery-5", "5 kWh lithium battery", "Lithium, 5 kWh"),
      sample("battery-10", "10 kWh lithium battery", "Lithium, 10 kWh"),
      sample("battery-200", "200 Ah lead-acid battery", "Lead-acid, 200 Ah"),
    ],
  },
  {
    slug: "ups",
    label: "UPS and backup",
    alt: "A home UPS unit",
    imagePending: true,
    products: [
      sample("ups-1", "1 kVA home UPS", "Home UPS, 1 kVA"),
      sample("ups-3", "3 kVA home UPS", "Home UPS, 3 kVA"),
      sample("ups-5", "5 kVA solar-ready UPS", "Solar-ready UPS, 5 kVA"),
    ],
  },
];

export const shopSection = {
  id: "shop",
  title: "Panels, inverters and batteries, over the counter.",
  lead: "Walk in, or send us the spec you want. We reply with today's rate.",
  switchLabel: "Product type",
  ask: "Ask on WhatsApp",
  /** {name} is the product name. */
  askLabel: "Ask about {name} on WhatsApp",
  message: "Assalam o Alaikum SolarLink. Please tell me today's rate for the {name}.",
  perWatt: "per W",
  prev: "Previous products",
  next: "Next products",
  all: "See all products",
  allHref: "/products/",
  categories,
};
