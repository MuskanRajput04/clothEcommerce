import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, Move3d } from "lucide-react";
import { Instagram } from "../../lib/brandIcons";
import { CATEGORIES, OCCASIONS, PRODUCTS, byTag, colourways } from "../../data/products";
import { USP, PILLARS, TESTIMONIALS, LOOKBOOK } from "../../data/site";
import { IMG } from "../../data/images";
import { Img, Reveal, SectionHead, Btn, Stars, Marquee } from "../../lib/ui";
import ProductCard from "../ProductCard";
import View3D, { Inline3D } from "../View3D";

/* ------------------------------------------------------------- usp strip */

export function UspStrip() {
  return (
    <section className="border-y border-line bg-cream/50">
      <div className="mx-auto grid w-full max-w-[1400px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {USP.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.08} className="bg-ivory px-7 py-9">
            <p className="eyebrow text-gold">0{i + 1}</p>
            <h3 className="display mt-3 text-2xl">{u.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">{u.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------- category mosaic */

export function CategoryMosaic() {
  const spans = [
    "lg:col-span-5 lg:row-span-2",
    "lg:col-span-4",
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-4",
  ];
  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHead
          align="left"
          eyebrow="Shop by category"
          title="Five ways to dress"
          text="From a Tuesday morning kurta to the suit you will be photographed in — every category is cut from the same standard of cloth."
        />
        <Reveal delay={0.2}>
          <Link to="/shop" className="sweep eyebrow flex items-center gap-2 whitespace-nowrap text-wine">
            View all products <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-[240px] gap-4 lg:grid-cols-12 lg:auto-rows-[228px]">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.07} className={spans[i]}>
            <Link
              to={`/shop/${c.slug}`}
              className="group relative block h-full w-full overflow-hidden bg-cream"
            >
              <Img
                id={c.image}
                w={1100}
                h={1100}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent transition-opacity duration-700 group-hover:from-ink/85" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <span>
                  <span className="eyebrow block text-[0.62rem] text-gold-light">{c.tagline}</span>
                  <span className="display mt-1 block text-3xl text-cream lg:text-[2.2rem]">{c.name}</span>
                  <span className="mt-1 block text-[0.8rem] text-cream/55">{c.count} pieces</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/40 text-cream transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <ArrowRight size={15} strokeWidth={1.3} />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------- curated product tabs */

const TABS = [
  { key: "new", label: "New Arrivals" },
  { key: "festive", label: "Festive Edit" },
  { key: "everyday", label: "Everyday Luxe" },
  { key: "wedding", label: "Wedding" },
];

export function CuratedTabs() {
  const [tab, setTab] = useState("new");
  const items = byTag(tab).slice(0, 8);
  return (
    <section className="bg-cream/40 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          eyebrow="Curated for you"
          title="Pieces we are proud of"
          text="Every design starts on paper in Zirakpur and ends in the hands of a karigar who signs off on it."
        />

        <Reveal delay={0.15}>
          <div className="no-bar mt-10 flex justify-start gap-2 overflow-x-auto pb-1 lg:justify-center">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative shrink-0 px-6 py-3 eyebrow transition-colors duration-400 ${
                  tab === t.key ? "text-ink" : "text-mute hover:text-graphite"
                }`}
              >
                {t.label}
                {tab === t.key && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-4 bottom-1 h-px bg-wine"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6"
        >
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Btn as="link" to="/shop" variant="outline">
            View all products <ArrowRight size={14} strokeWidth={1.5} />
          </Btn>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- parallax editorial */

export function EditorialBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[78vh] min-h-[520px] overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 h-[124%] -top-[12%]">
        <Img id={IMG.atelierRack} w={2000} h={1300} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/35" />
      <div className="grain absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-center px-5 lg:px-10">
        <div className="max-w-xl">
          <SectionHead
            align="left"
            light
            eyebrow="The house standard"
            title="Nothing leaves until it drapes right"
            text="Sixteen fit trials on real bodies between XS and XXL. If a shoulder pulls or a hem swings wrong, the sample goes back to the table — however beautiful the fabric."
            action={
              <Btn as="link" to="/about" variant="ghostLight">
                Inside the atelier
              </Btn>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- split collection */

export function SplitCollections() {
  const panels = [
    {
      eyebrow: "The Festive Room",
      title: "Zari, mirrors and light",
      image: IMG.bridalWork,
      to: "/shop/suits",
      cta: "Shop festive",
    },
    {
      eyebrow: "The Quiet Edit",
      title: "White cotton, cool mornings",
      image: IMG.chikanWhite,
      to: "/shop/kurta",
      cta: "Shop everyday",
    },
  ];
  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {panels.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.12}>
            <Link to={p.to} className="group relative block aspect-[4/5] overflow-hidden bg-cream lg:aspect-[4/4.4]">
              <Img
                id={p.image}
                w={1200}
                h={1400}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                <span className="eyebrow block text-gold-light">{p.eyebrow}</span>
                <span className="display mt-3 block max-w-[14ch] text-4xl text-cream lg:text-[3rem]">
                  {p.title}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 eyebrow text-cream">
                  {p.cta}
                  <span className="h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-14" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- craft pillars */

export function CraftPillars() {
  return (
    <section className="border-y border-line bg-ivory py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          eyebrow="How it is made"
          title="Three hands before yours"
          text="A Tuba piece passes through a weaver, a karigar and a fit table before it is folded into tissue."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.12} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Img
                  id={p.image}
                  w={900}
                  h={700}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
                <span className="absolute left-0 top-0 bg-ivory px-4 py-2 display text-xl text-wine">{p.no}</span>
              </div>
              <h3 className="display mt-6 text-3xl">{p.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-mute">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ occasion rail */

export function OccasionRail() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-24">
      <SectionHead align="left" eyebrow="Shop by occasion" title="Where are you going?" />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {OCCASIONS.map((o, i) => (
          <Reveal key={o.name} delay={i * 0.08}>
            <Link to={`/shop?tag=${o.tag}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Img
                  id={o.image}
                  w={800}
                  h={1000}
                  alt={o.name}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-[1.3s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <span className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/70" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="display text-2xl">{o.name}</h3>
                <span className="text-[0.8rem] text-mute">{o.count} pieces</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- testimonials */

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const move = (d) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative overflow-hidden bg-wine py-20 text-cream lg:py-28">
      <div className="grain absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-10">
        <Quote size={34} strokeWidth={0.8} className="mx-auto text-gold-light" />
        <motion.blockquote
          key={i}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <p className="display text-2xl leading-[1.4] sm:text-3xl lg:text-[2.4rem] lg:leading-[1.35]">
            “{t.text}”
          </p>
          <footer className="mt-9">
            <Stars value={t.rating} size={13} className="justify-center" />
            <p className="mt-4 eyebrow text-gold-light">{t.name}</p>
            <p className="mt-1 text-[0.88rem] text-cream/55">
              {t.city} · purchased {t.product}
            </p>
          </footer>
        </motion.blockquote>

        <div className="mt-11 flex items-center justify-center gap-6">
          <button onClick={() => move(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold-light">
            <ArrowLeft size={15} strokeWidth={1.3} />
          </button>
          <span className="flex gap-2">
            {TESTIMONIALS.map((x, xi) => (
              <button
                key={x.name}
                onClick={() => setI(xi)}
                aria-label={`Review ${xi + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${xi === i ? "w-7 bg-gold-light" : "w-1.5 bg-cream/30"}`}
              />
            ))}
          </span>
          <button onClick={() => move(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold-light">
            <ArrowRight size={15} strokeWidth={1.3} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ lookbook */

export function Lookbook() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
        <SectionHead
          eyebrow="#TubaDiaries"
          title="Real people, real drape"
          text="Tag us in your Tuba moment for a chance to be featured on the wall."
        />
      </div>
      <Reveal delay={0.15} className="mt-12">
        <div className="marquee">
          <div className="marquee-track slow">
            {[...LOOKBOOK, ...LOOKBOOK].map((id, i) => (
              <a
                key={i}
                href="#"
                className="group relative mx-2 block h-[260px] w-[200px] shrink-0 overflow-hidden bg-cream lg:h-[340px] lg:w-[262px]"
              >
                <Img id={id} w={600} h={800} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram size={22} strokeWidth={1.2} className="text-cream" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ closing band */

export function ClosingBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-cream">
      <div className="grain absolute inset-0 opacity-30" aria-hidden />
      <div className="relative">
        <Marquee
          className="display text-5xl text-cream/90 lg:text-7xl"
          items={["Handcrafted", "Small batch", "Made in India", "Worn for years"]}
          sep="·"
        />
      </div>
      <div className="relative mx-auto mt-12 flex w-full max-w-[1400px] flex-col items-center gap-6 px-5 text-center lg:px-10">
        <p className="max-w-xl text-[1.02rem] leading-relaxed text-cream/60">
          Not sure what suits you? Send us your occasion and budget — a stylist from the Zirakpur
          store will put together three options for you.
        </p>
        <Btn as="link" to="/contact" variant="gold">
          Talk to a stylist
        </Btn>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- bestseller strip */

export function Bestsellers() {
  const items = PRODUCTS.filter((p) => p.badge === "Bestseller" || p.rating >= 4.9).slice(0, 4);
  return (
    <section className="mx-auto w-full max-w-[1400px] px-5 pb-20 lg:px-10 lg:pb-28">
      <div className="flex flex-col justify-between gap-6 border-t border-line pt-14 lg:flex-row lg:items-end">
        <SectionHead align="left" eyebrow="Loved most" title="Our bestsellers" />
        <Reveal delay={0.15}>
          <Link to="/shop" className="sweep eyebrow flex items-center gap-2 whitespace-nowrap text-wine">
            See everything <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 3D showcase */

export function Showcase3D() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const picks = PRODUCTS.filter((p) =>
    ["emerald-anarkali-gown", "safed-chikankari-kurta", "zumar-teal-cord-set", "plum-chanderi-unstitched"].includes(p.slug)
  );
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState(false);
  /* Autoload the 3D bundle on desktop only — phones ask first, to save data. */
  const auto = typeof window !== "undefined" && window.innerWidth >= 1024;
  const product = picks[i] || PRODUCTS[0];
  const ways = colourways(product);
  const [tint, setTint] = useState(ways[0].hex);

  const choose = (n) => {
    setI(n);
    setTint(colourways(picks[n])[0].hex);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
      <div className="grain absolute inset-0 opacity-25" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div>
          <SectionHead
            align="left"
            light
            eyebrow="New · Try before you buy"
            title="See how it falls, in 3D"
            text="Online shopping never shows you the drape. Spin the garment, change the colourway and judge the flare before it reaches your door — the way you would on a hanger in our Zirakpur showroom."
          />
          <div className="mt-9 flex flex-wrap gap-2.5">
            {picks.map((p, n) => (
              <button
                key={p.id}
                onClick={() => choose(n)}
                className={`border px-4 py-2.5 eyebrow text-[0.65rem] transition-colors duration-400 ${
                  i === n ? "border-gold bg-gold text-ink" : "border-cream/25 text-cream/70 hover:border-cream"
                }`}
              >
                {p.category === "unstitched" ? "Unstitched" : p.name.split(" ").slice(-2).join(" ")}
              </button>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="eyebrow text-[0.65rem] text-cream/50">Colourway</span>
            <div className="flex gap-2.5">
              {ways.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setTint(c.hex)}
                  title={c.name}
                  aria-label={c.name}
                  className={`h-7 w-7 rounded-full border transition-transform duration-300 hover:scale-110 ${
                    tint === c.hex ? "border-gold ring-1 ring-gold ring-offset-2 ring-offset-ink" : "border-cream/25"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn as="link" to={`/product/${product.slug}`} variant="gold">
              Shop this piece <ArrowRight size={14} strokeWidth={1.5} />
            </Btn>
            <Btn variant="ghostLight" onClick={() => setOpen(true)}>
              Open full screen
            </Btn>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-square overflow-hidden border border-cream/15 bg-cream">
            {inView && (auto || asked) ? (
              <Inline3D product={product} tint={tint} />
            ) : (
              <button
                onClick={() => setAsked(true)}
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-cream text-graphite"
              >
                <Move3d size={26} strokeWidth={1} className="text-gold" />
                <span className="eyebrow text-[0.65rem]">Tap to load the 3D preview</span>
              </button>
            )}
            <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 bg-ink/70 px-3 py-1.5 eyebrow text-[0.6rem] text-cream/80 backdrop-blur">
              <Move3d size={12} strokeWidth={1.4} className="text-gold-light" /> Live 3D
            </span>
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/70 px-4 py-2 text-[0.74rem] tracking-wider text-cream/80">
              Drag to rotate
            </span>
          </div>
        </Reveal>
      </div>

      <View3D product={product} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
