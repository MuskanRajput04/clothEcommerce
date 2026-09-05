import { IMG } from "./images";

export const CATEGORIES = [
  { slug: "kurta", name: "Kurta", tagline: "Everyday poetry", image: IMG.kurtaWhite, count: 42 },
  { slug: "suits", name: "Suits", tagline: "Three-piece grace", image: IMG.suitNavy, count: 58 },
  { slug: "cord-set", name: "Cord Set", tagline: "Effortless pairs", image: IMG.tealDupatta, count: 24 },
  { slug: "tops", name: "Tops", tagline: "Modern staples", image: IMG.chikanWhite, count: 19 },
  { slug: "unstitched", name: "Unstitched", tagline: "Yours to tailor", image: IMG.floralFabric, count: 31 },
];

export const OCCASIONS = [
  { name: "Festive", count: 46, image: IMG.sareeOrange, tag: "festive" },
  { name: "Wedding", count: 28, image: IMG.lehengaRed, tag: "wedding" },
  { name: "Workwear", count: 34, image: IMG.kurtaWhite, tag: "workwear" },
  { name: "Everyday", count: 62, image: IMG.ivorySteps, tag: "everyday" },
];

const P = (o) => ({
  rating: 4.8,
  reviews: 24,
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  badge: null,
  ...o,
});

export const PRODUCTS = [
  P({
    id: 1, slug: "noor-navy-embroidered-suit", name: "Noor Navy Embroidered Suit",
    category: "suits", price: 5099, mrp: 6800, badge: "Bestseller",
    colour: "Midnight Navy", fabric: "Chanderi Silk", work: "Resham & Zari Hand Embroidery",
    images: [IMG.suitNavy, IMG.zariDetail, IMG.atelierRack], rating: 4.9, reviews: 86,
    tags: ["festive", "new"],
    blurb: "A three-piece silhouette in midnight chanderi, hand-worked with resham blossoms.",
  }),
  P({
    id: 2, slug: "rani-luxe-sharara-suit", name: "Rani Luxe Sharara Suit",
    category: "suits", price: 5600, mrp: 7400, badge: "Limited",
    colour: "Rani Pink", fabric: "Georgette", work: "Mirror & Dori Work",
    images: [IMG.lehengaRed, IMG.bridalWork, IMG.festiveRed], rating: 4.9, reviews: 61,
    tags: ["festive", "wedding"],
    blurb: "Flared sharara, mirror-worked bodice and a tissue dupatta that catches every light.",
  }),
  P({
    id: 3, slug: "saanjh-scarlet-kurti", name: "Saanjh Scarlet Kurti",
    category: "kurta", price: 1799, mrp: 2400,
    colour: "Scarlet", fabric: "Cotton Mul", work: "Hand Block Print",
    images: [IMG.kurtiRed, IMG.sleeveDetail], rating: 4.7, reviews: 44,
    tags: ["everyday", "new"],
    blurb: "A straight-cut mul kurti in scarlet, block-printed by hand in small batches.",
  }),
  P({
    id: 4, slug: "safed-chikankari-kurta", name: "Safed Chikankari Kurta",
    category: "kurta", price: 2499, mrp: 3200, badge: "Bestseller",
    colour: "Ivory", fabric: "Cotton Voile", work: "Lucknowi Chikankari",
    images: [IMG.kurtaWhite, IMG.chikanWhite], rating: 4.9, reviews: 118,
    tags: ["everyday", "workwear"],
    blurb: "Six weeks of Lucknowi needlework on breathable voile. The one you will reach for daily.",
  }),
  P({
    id: 5, slug: "meher-ivory-cord-set", name: "Meher Ivory Cord Set",
    category: "cord-set", price: 2099, mrp: 2799, badge: "New",
    colour: "Ivory", fabric: "Cotton Cambric", work: "Thread Embroidery",
    images: [IMG.ivorySteps, IMG.chikanWhite], rating: 4.8, reviews: 37,
    tags: ["everyday", "new"],
    blurb: "Matched top and trouser in cambric — one decision, made beautifully.",
  }),
  P({
    id: 6, slug: "zumar-teal-cord-set", name: "Zumar Teal Cord Set",
    category: "cord-set", price: 2299, mrp: 2999,
    colour: "Deep Teal", fabric: "Rayon Slub", work: "Screen Printed",
    images: [IMG.tealDupatta, IMG.floralFabric], rating: 4.6, reviews: 29,
    tags: ["everyday"],
    blurb: "A fluid teal co-ord with a printed dupatta, cut for long days and warm evenings.",
  }),
  P({
    id: 7, slug: "emerald-anarkali-gown", name: "Emerald Anarkali Gown",
    category: "suits", price: 6999, mrp: 8999, badge: "Editors Pick",
    colour: "Emerald", fabric: "Viscose Georgette", work: "Sequin & Zardozi",
    images: [IMG.emeraldGown, IMG.bridalWork], rating: 5.0, reviews: 52,
    tags: ["festive", "wedding", "new"],
    blurb: "Floor-sweeping anarkali with a zardozi yoke — our most requested silhouette.",
  }),
  P({
    id: 8, slug: "kesar-orange-handwork-suit", name: "Kesar Orange Handwork Suit",
    category: "suits", price: 5099, mrp: 6499,
    colour: "Saffron", fabric: "Silk Blend", work: "Hand Work",
    images: [IMG.sareeOrange, IMG.zariDetail], rating: 4.8, reviews: 40,
    tags: ["festive"],
    blurb: "Saffron silk with a woven gold border, finished with hand-knotted tassels.",
  }),
  P({
    id: 9, slug: "plum-chanderi-unstitched", name: "Plum Chanderi Unstitched Set",
    category: "unstitched", price: 4394, mrp: 5600,
    colour: "Dusty Plum", fabric: "Chanderi Silk", work: "Woven Butis",
    images: [IMG.sareePlum, IMG.floralFabric], rating: 4.7, reviews: 33,
    tags: ["festive"],
    blurb: "Three metres of woven chanderi, a matching bottom and dupatta. Tailor it your way.",
  }),
  P({
    id: 10, slug: "rust-chanderi-unstitched", name: "Rust Chanderi Unstitched Set",
    category: "unstitched", price: 4394, mrp: 5600,
    colour: "Rust", fabric: "Chanderi Silk", work: "Woven Butis",
    images: [IMG.zariDetail, IMG.sareeOrange], rating: 4.6, reviews: 21,
    tags: ["festive"],
    blurb: "The warmest rust in our archive, woven with fine gold butis throughout.",
  }),
  P({
    id: 11, slug: "midnight-bloom-kurta-set", name: "Midnight Bloom Kurta & Pant Set",
    category: "kurta", price: 2099, mrp: 2799, badge: "Bestseller",
    colour: "Midnight Blue", fabric: "Cotton Poplin", work: "Floral Print",
    images: [IMG.floralFabric, IMG.suitNavy], rating: 4.8, reviews: 94,
    tags: ["workwear", "everyday"],
    blurb: "Night-garden florals on crisp poplin, with a pant that actually has pockets.",
  }),
  P({
    id: 12, slug: "gulaab-blush-top", name: "Gulaab Blush Top",
    category: "tops", price: 1299, mrp: 1799, badge: "New",
    colour: "Blush", fabric: "Cotton Dobby", work: "Pintuck Detail",
    images: [IMG.chikanWhite, IMG.ivorySteps], rating: 4.5, reviews: 18,
    tags: ["everyday", "new"],
    blurb: "Pintucked dobby top that sits as easily with denim as with a sharara.",
  }),
  P({
    id: 13, slug: "sona-zari-festive-suit", name: "Sona Zari Festive Suit",
    category: "suits", price: 5654, mrp: 7200,
    colour: "Mustard & Black", fabric: "Art Silk", work: "Zari Embroidery",
    images: [IMG.bridalWork, IMG.sareeOrange], rating: 4.9, reviews: 57,
    tags: ["festive", "wedding"],
    blurb: "Mustard and black, edged in zari — a contrast that photographs beautifully.",
  }),
  P({
    id: 14, slug: "riwaayat-red-bridal-suit", name: "Riwaayat Red Bridal Suit",
    category: "suits", price: 12999, mrp: 16500, badge: "Couture",
    colour: "Bridal Red", fabric: "Raw Silk", work: "Zardozi & Sequin",
    images: [IMG.bridalRed, IMG.bridalWork, IMG.lehengaRed], rating: 5.0, reviews: 26,
    tags: ["wedding"],
    blurb: "Nine hundred hours of zardozi across the bodice. Made to order, made once.",
  }),
  P({
    id: 15, slug: "shirt-style-kurti", name: "Shirt Style Kurti",
    category: "kurta", price: 1799, mrp: 2299,
    colour: "Powder Blue", fabric: "Cotton Linen", work: "Minimal Tailoring",
    images: [IMG.ivorySteps, IMG.kurtaWhite], rating: 4.6, reviews: 51,
    tags: ["workwear", "everyday"],
    blurb: "Collared, cuffed and calmly tailored. Linen that softens with every wash.",
  }),
  P({
    id: 16, slug: "noor-black-tunic", name: "Noor Black Short Tunic",
    category: "tops", price: 4500, mrp: 5600,
    colour: "Onyx", fabric: "Silk Georgette", work: "Sequin Work",
    images: [IMG.sareePortrait, IMG.jewellery], rating: 4.7, reviews: 22,
    tags: ["festive"],
    blurb: "A short sequinned tunic for the evening you did not plan for.",
  }),
  P({
    id: 17, slug: "banarasi-woven-unstitched", name: "Banarasi Woven Unstitched Set",
    category: "unstitched", price: 6499, mrp: 8200, badge: "Limited",
    colour: "Wine", fabric: "Banarasi Silk", work: "Handloom Weave",
    images: [IMG.sareeWalk, IMG.zariDetail], rating: 4.9, reviews: 30,
    tags: ["wedding", "festive"],
    blurb: "Handloom Banarasi from a family of weavers we have worked with for nine years.",
  }),
  P({
    id: 18, slug: "sanjh-fuchsia-cord-set", name: "Sanjh Fuchsia Cord Set",
    category: "cord-set", price: 2099, mrp: 2699,
    colour: "Fuchsia", fabric: "Cotton Cambric", work: "A-line Cut",
    images: [IMG.duoEthnic, IMG.kurtiRose], rating: 4.7, reviews: 42,
    tags: ["everyday", "festive"],
    blurb: "A radiant A-line co-ord that needs nothing else but earrings.",
  }),
  P({
    id: 19, slug: "aab-e-rawaan-white-suit", name: "Aab-e-Rawaan White Suit",
    category: "suits", price: 3899, mrp: 4900,
    colour: "Pearl White", fabric: "Cotton Silk", work: "Thread & Mirror",
    images: [IMG.chikanWhite, IMG.ivorySteps], rating: 4.8, reviews: 47,
    tags: ["everyday", "workwear"],
    blurb: "Pearl-white cotton silk with mirror flecks — quiet luxury for daylight.",
  }),
  P({
    id: 20, slug: "aarzu-printed-top", name: "Aarzu Printed Top",
    category: "tops", price: 1499, mrp: 1999,
    colour: "Indigo", fabric: "Rayon", work: "Hand Block",
    images: [IMG.floralFabric, IMG.sleeveDetail], rating: 4.5, reviews: 16,
    tags: ["everyday"],
    blurb: "Indigo hand-block on rayon, cut relaxed through the body.",
  }),
  P({
    id: 21, slug: "mehfil-maroon-kurta-set", name: "Mehfil Maroon Kurta Set",
    category: "kurta", price: 2199, mrp: 2899,
    colour: "Maroon", fabric: "Cotton Silk", work: "V-neck Embroidery",
    images: [IMG.lehengaRed, IMG.bridalWork], rating: 4.7, reviews: 63,
    tags: ["festive", "everyday"],
    blurb: "Deep maroon with an embroidered V-neck and a printed dupatta.",
  }),
  P({
    id: 22, slug: "raat-rani-sharara", name: "Raat Rani Sharara Set",
    category: "suits", price: 7499, mrp: 9400, badge: "New",
    colour: "Wine", fabric: "Velvet & Georgette", work: "Dori & Sequin",
    images: [IMG.sareePlum, IMG.bridalWork], rating: 4.9, reviews: 19,
    tags: ["wedding", "festive", "new"],
    blurb: "Velvet bodice, georgette sharara, and a dupatta finished with hand-strung moti.",
  }),
  P({
    id: 23, slug: "kaanch-mirror-unstitched", name: "Kaanch Mirror Unstitched Set",
    category: "unstitched", price: 3799, mrp: 4800,
    colour: "Sea Green", fabric: "Cotton Satin", work: "Mirror Work",
    images: [IMG.tealDupatta, IMG.floralFabric], rating: 4.6, reviews: 25,
    tags: ["festive"],
    blurb: "Sea-green satin scattered with real glass mirrors, ready for your tailor.",
  }),
  P({
    id: 24, slug: "husn-ivory-anarkali", name: "Husn Ivory Anarkali",
    category: "suits", price: 8499, mrp: 10800, badge: "Editors Pick",
    colour: "Ivory Gold", fabric: "Silk Chanderi", work: "Gota Patti",
    images: [IMG.ivorySteps, IMG.jewellery, IMG.chikanWhite], rating: 5.0, reviews: 34,
    tags: ["wedding", "festive"],
    blurb: "Gota patti on ivory chanderi. Made for the mehendi, kept for a lifetime.",
  }),
];

export const bySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const byCategory = (cat) =>
  cat && cat !== "all" ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;

export const byTag = (tag) => PRODUCTS.filter((p) => p.tags?.includes(tag));

export const related = (p, n = 4) =>
  PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category)
    .concat(PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category))
    .slice(0, n);

export const inr = (n) =>
  "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const off = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

/* Swatch colours used by the product cards, the PDP and the 3D preview. */
export const COLOUR_HEX = {
  "Midnight Navy": "#22314F",
  "Rani Pink": "#B4165A",
  Scarlet: "#B32B2B",
  Ivory: "#E8DECD",
  "Deep Teal": "#1F5D63",
  Emerald: "#1E5945",
  Saffron: "#D2762A",
  "Dusty Plum": "#6C4A63",
  Rust: "#A34F2A",
  "Midnight Blue": "#243A63",
  Blush: "#E3B8B4",
  "Mustard & Black": "#C89B2A",
  "Bridal Red": "#8E1B2B",
  "Powder Blue": "#9FB6C8",
  Onyx: "#221F1E",
  Wine: "#5C1A2B",
  Fuchsia: "#B02E6E",
  "Pearl White": "#EFE8DC",
  Indigo: "#2E3E66",
  "Sea Green": "#4E8C7C",
  "Ivory Gold": "#DCC79A",
};

export const hexOf = (p) => COLOUR_HEX[p.colour] || "#8A6A4B";

/* Alternate colourways offered on the product page. */
export const colourways = (p) => {
  const base = { name: p.colour, hex: hexOf(p) };
  const others = [
    { name: "Ivory Gold", hex: COLOUR_HEX["Ivory Gold"] },
    { name: "Wine", hex: COLOUR_HEX.Wine },
    { name: "Emerald", hex: COLOUR_HEX.Emerald },
    { name: "Midnight Navy", hex: COLOUR_HEX["Midnight Navy"] },
  ].filter((c) => c.name !== base.name);
  return [base, ...others.slice(0, 3)];
};

/* Size chart in inches — shown in the size guide drawer. */
export const SIZE_CHART = [
  { size: "XS", bust: 32, waist: 26, hip: 35, length: 46 },
  { size: "S", bust: 34, waist: 28, hip: 37, length: 46 },
  { size: "M", bust: 36, waist: 30, hip: 39, length: 47 },
  { size: "L", bust: 38, waist: 32, hip: 41, length: 47 },
  { size: "XL", bust: 40, waist: 34, hip: 43, length: 48 },
  { size: "XXL", bust: 42, waist: 36, hip: 45, length: 48 },
];
