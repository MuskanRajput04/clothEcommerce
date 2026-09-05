import { IMG } from "./images";

export const BRAND = {
  name: "Tuba Collection",
  short: "Tuba",
  phone: "+91 87258 96160",
  email: "info@tubacollection.in",
  address:
    "Showroom No. 4, Ground Floor, ABP Maxspace, Singhpura, Zirakpur, Punjab 140603",
  hours: "Mon – Sun · 11:00 to 20:30",
  instagram: "@tubacollection",
};

export const ANNOUNCEMENTS = [
  "Free shipping across India above ₹2,999",
  "10% off your first order · WELCOME10",
  "Free stitching consult on unstitched sets",
  "The Autumn Atelier drop is live",
];

export const NAV = [
  {
    label: "New In",
    to: "/shop?sort=new",
    columns: [
      {
        title: "The Drop",
        links: [
          { label: "Autumn Atelier 2026", to: "/shop?sort=new" },
          { label: "Back in Stock", to: "/shop" },
          { label: "Under ₹2,500", to: "/shop?max=2500" },
        ],
      },
    ],
    feature: { image: IMG.emeraldGown, title: "Autumn Atelier", to: "/shop?sort=new" },
  },
  {
    label: "Kurta",
    to: "/shop/kurta",
    columns: [
      {
        title: "Silhouettes",
        links: [
          { label: "Straight Kurta", to: "/shop/kurta" },
          { label: "A-Line Kurta", to: "/shop/kurta" },
          { label: "Kurta with Pants", to: "/shop/kurta" },
          { label: "Short Kurti", to: "/shop/kurta" },
        ],
      },
      {
        title: "Craft",
        links: [
          { label: "Chikankari", to: "/shop/kurta" },
          { label: "Hand Block", to: "/shop/kurta" },
          { label: "Mirror Work", to: "/shop/kurta" },
        ],
      },
    ],
    feature: { image: IMG.kurtaWhite, title: "The Chikankari Edit", to: "/shop/kurta" },
  },
  {
    label: "Suits",
    to: "/shop/suits",
    columns: [
      {
        title: "Occasion",
        links: [
          { label: "Festive Suits", to: "/shop/suits" },
          { label: "Wedding & Couture", to: "/shop/suits" },
          { label: "Sharara Sets", to: "/shop/suits" },
          { label: "Anarkali", to: "/shop/suits" },
        ],
      },
      {
        title: "Fabric",
        links: [
          { label: "Chanderi Silk", to: "/shop/suits" },
          { label: "Georgette", to: "/shop/suits" },
          { label: "Raw Silk", to: "/shop/suits" },
        ],
      },
    ],
    feature: { image: IMG.bridalRed, title: "Riwaayat — Bridal", to: "/product/riwaayat-red-bridal-suit" },
  },
  { label: "Cord Sets", to: "/shop/cord-set" },
  { label: "Tops", to: "/shop/tops" },
  { label: "Unstitched", to: "/shop/unstitched" },
  { label: "Our Story", to: "/about" },
];

export const USP = [
  { title: "Handcrafted in India", text: "Every piece is finished by karigars in Punjab, Lucknow and Bhagalpur." },
  { title: "Made in small runs", text: "Never more than 40 pieces of a design. Sold out means sold out." },
  { title: "Free shipping over ₹2,999", text: "Dispatched within 48 hours, delivered in 3 to 6 days." },
  { title: "Easy 7-day returns", text: "Unworn, tags intact. We arrange the pickup ourselves." },
];

export const PILLARS = [
  {
    no: "01",
    title: "The Loom",
    text: "We buy directly from weaving families in Chanderi and Banaras — no middlemen, no mill substitutes. The fabric arrives with the weaver's name on the bale.",
    image: IMG.floralFabric,
  },
  {
    no: "02",
    title: "The Hand",
    text: "Chikankari, gota patti, zardozi, mirror work. Each craft has its own atelier and its own pace. A bridal yoke can take nine hundred hours.",
    image: IMG.bridalWork,
  },
  {
    no: "03",
    title: "The Fit",
    text: "Sixteen fit trials before a silhouette is signed off, on real bodies between XS and XXL. Nothing leaves Zirakpur until it drapes correctly.",
    image: IMG.atelierRack,
  },
];

export const TESTIMONIALS = [
  {
    name: "Kritika Malik",
    city: "Chandigarh",
    product: "Noor Navy Embroidered Suit",
    rating: 5,
    text: "The embroidery is so much finer in person than on screen. I wore it to a family wedding and three people asked me where it was from before dinner.",
  },
  {
    name: "Payal Sharma",
    city: "Delhi",
    product: "Safed Chikankari Kurta",
    rating: 5,
    text: "I have bought chikankari from Lucknow itself and this holds up. Soft voile, real needlework, and it survived four washes without losing shape.",
  },
  {
    name: "Neha Bansal",
    city: "Mohali",
    product: "Emerald Anarkali Gown",
    rating: 5,
    text: "I am 5'2\" and gowns never work on me. They altered the length before dispatch at no cost. That is not something big brands do.",
  },
  {
    name: "Simran Kaur",
    city: "Ludhiana",
    product: "Plum Chanderi Unstitched Set",
    rating: 4,
    text: "Beautiful chanderi and the dupatta is generous. Took one day longer than promised to arrive, but the fabric was worth the wait.",
  },
];

export const LOOKBOOK = [
  IMG.duoEthnic,
  IMG.sareeWalk,
  IMG.kurtiRed,
  IMG.emeraldGown,
  IMG.festiveRed,
  IMG.chikanWhite,
  IMG.sareeOrange,
  IMG.ivorySteps,
];

export const FAQ = [
  {
    q: "Do you offer custom stitching?",
    a: "Yes. Every unstitched set can be tailored to your measurements for ₹1,200 to ₹2,400 depending on the silhouette. Add it at checkout and our team will call you for measurements within 24 hours.",
  },
  {
    q: "How long does delivery take?",
    a: "In-stock pieces are dispatched within 48 hours and reach most Indian pin codes in 3 to 6 working days. Made-to-order couture takes 3 to 5 weeks.",
  },
  {
    q: "Can I return an item?",
    a: "Unworn pieces with tags intact can be returned within 7 days of delivery. We arrange the reverse pickup. Made-to-measure and altered pieces are final sale.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to the UK, UAE, Canada, Australia and Singapore. International orders are dispatched by DHL and typically arrive in 7 to 10 days.",
  },
];
