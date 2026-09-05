import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { IMG } from "../data/images";
import ProductCard from "../components/ProductCard";
import { Img, Reveal, Btn, useLockScroll } from "../lib/ui";

const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "Newest first" },
  { key: "low", label: "Price: low to high" },
  { key: "high", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
];

const FABRICS = [...new Set(PRODUCTS.map((p) => p.fabric))];
const WORKS = [...new Set(PRODUCTS.map((p) => p.work))];
const PRICE_BANDS = [
  { key: "0-2500", label: "Under ₹2,500", test: (p) => p.price < 2500 },
  { key: "2500-5000", label: "₹2,500 – ₹5,000", test: (p) => p.price >= 2500 && p.price < 5000 },
  { key: "5000-8000", label: "₹5,000 – ₹8,000", test: (p) => p.price >= 5000 && p.price < 8000 },
  { key: "8000+", label: "₹8,000 and above", test: (p) => p.price >= 8000 },
];

const HEADERS = {
  all: { title: "The Full Collection", text: "Every piece currently in the atelier, from everyday cotton to made-to-order couture.", image: IMG.atelierRack },
  kurta: { title: "Kurta", text: "Straight, A-line and short kurtis in cotton, mul and linen — the pieces you will wear most.", image: IMG.kurtaWhite },
  suits: { title: "Suits", text: "Three-piece sets, shararas and anarkalis for festivals, weddings and everything between.", image: IMG.suitNavy },
  "cord-set": { title: "Cord Sets", text: "Matched tops and bottoms. One decision, made beautifully.", image: IMG.tealDupatta },
  tops: { title: "Tops", text: "Modern staples that sit as easily with denim as with a sharara.", image: IMG.chikanWhite },
  unstitched: { title: "Unstitched", text: "Handloom and printed fabric sets, ready for your own tailor.", image: IMG.floralFabric },
};

function FilterGroup({ title, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-line py-5">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <span className="eyebrow">{title}</span>
        <ChevronDown size={14} strokeWidth={1.3} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2.5">
              {options.map((o) => {
                const value = typeof o === "string" ? o : o.key;
                const label = typeof o === "string" ? o : o.label;
                const on = selected.includes(value);
                return (
                  <li key={value}>
                    <button onClick={() => onToggle(value)} className="group flex w-full items-center gap-3 text-left">
                      <span className={`grid h-[15px] w-[15px] shrink-0 place-items-center border transition-colors ${on ? "border-wine bg-wine" : "border-line group-hover:border-mute"}`}>
                        {on && <Check size={10} strokeWidth={2.5} className="text-cream" />}
                      </span>
                      <span className={`text-[0.92rem] transition-colors ${on ? "text-ink" : "text-mute group-hover:text-graphite"}`}>
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Shop() {
  const { category = "all" } = useParams();
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");
  const [sort, setSort] = useState(params.get("sort") || "featured");
  const [fabrics, setFabrics] = useState([]);
  const [works, setWorks] = useState([]);
  const [bands, setBands] = useState(params.get("max") === "2500" ? ["0-2500"] : []);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  useLockScroll(mobileFilters);

  const head = HEADERS[category] || HEADERS.all;

  const toggle = (setter) => (v) =>
    setter((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const items = useMemo(() => {
    let list = category === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === category);
    if (tag) list = list.filter((p) => p.tags?.includes(tag));
    if (fabrics.length) list = list.filter((p) => fabrics.includes(p.fabric));
    if (works.length) list = list.filter((p) => works.includes(p.work));
    if (bands.length) {
      const tests = PRICE_BANDS.filter((b) => bands.includes(b.key));
      list = list.filter((p) => tests.some((t) => t.test(p)));
    }
    switch (sort) {
      case "low": list.sort((a, b) => a.price - b.price); break;
      case "high": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "new": list.sort((a, b) => Number(b.tags?.includes("new")) - Number(a.tags?.includes("new"))); break;
      default: break;
    }
    return list;
  }, [category, tag, fabrics, works, bands, sort]);

  const activeCount = fabrics.length + works.length + bands.length + (tag ? 1 : 0);

  const clearAll = () => {
    setFabrics([]);
    setWorks([]);
    setBands([]);
    setParams({});
  };

  const Filters = (
    <>
      <FilterGroup title="Price" options={PRICE_BANDS} selected={bands} onToggle={toggle(setBands)} />
      <FilterGroup title="Fabric" options={FABRICS} selected={fabrics} onToggle={toggle(setFabrics)} />
      <FilterGroup title="Craft" options={WORKS} selected={works} onToggle={toggle(setWorks)} />
    </>
  );

  return (
    <>
      {/* page head */}
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden bg-ink">
        <Img id={head.image} w={2000} h={1000} eager alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="grain absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-5 pb-12 lg:px-10 lg:pb-16">
          <nav className="eyebrow text-[0.68rem] text-cream/50">
            <Link to="/" className="hover:text-cream">Home</Link>
            <span className="px-2">/</span>
            <Link to="/shop" className="hover:text-cream">Shop</Link>
            {category !== "all" && (
              <>
                <span className="px-2">/</span>
                <span className="text-gold-light">{head.title}</span>
              </>
            )}
          </nav>
          <h1 className="display mt-4 text-5xl text-cream lg:text-7xl">{head.title}</h1>
          <p className="mt-3 max-w-lg text-[1rem] text-cream/65">{head.text}</p>
        </div>
      </section>

      {/* category pills */}
      <div className="border-b border-line bg-ivory">
        <div className="no-bar mx-auto flex w-full max-w-[1400px] gap-2 overflow-x-auto px-5 py-4 lg:px-10">
          <Link
            to="/shop"
            className={`shrink-0 border px-5 py-2.5 eyebrow transition-colors ${category === "all" ? "border-wine bg-wine text-cream" : "border-line text-graphite hover:border-wine hover:text-wine"}`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/shop/${c.slug}`}
              className={`shrink-0 border px-5 py-2.5 eyebrow transition-colors ${category === c.slug ? "border-wine bg-wine text-cream" : "border-line text-graphite hover:border-wine hover:text-wine"}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
        <div className="flex gap-10">
          {/* desktop filters */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-32">
              <div className="flex items-center justify-between border-b border-ink/20 pb-3">
                <span className="eyebrow">Filters</span>
                {activeCount > 0 && (
                  <button onClick={clearAll} className="text-[0.8rem] text-wine underline-offset-4 hover:underline">
                    Clear ({activeCount})
                  </button>
                )}
              </div>
              {Filters}
              <div className="mt-8 border border-line p-5">
                <p className="eyebrow text-gold">Need help?</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">
                  Our stylists can shortlist three pieces for your occasion and budget.
                </p>
                <Link to="/contact" className="mt-3 inline-block text-[0.88rem] text-wine underline underline-offset-4">
                  Ask a stylist
                </Link>
              </div>
            </div>
          </aside>

          {/* grid */}
          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-[0.9rem] text-mute">
                <span className="text-ink">{items.length}</span> {items.length === 1 ? "piece" : "pieces"}
                {tag && <span className="ml-2 text-wine capitalize">· {tag}</span>}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFilters(true)}
                  className="flex items-center gap-2 border border-line px-4 py-2.5 eyebrow lg:hidden"
                >
                  <SlidersHorizontal size={13} strokeWidth={1.4} />
                  Filter {activeCount > 0 && `(${activeCount})`}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 border border-line px-4 py-2.5 eyebrow"
                  >
                    {SORTS.find((s) => s.key === sort)?.label}
                    <ChevronDown size={13} strokeWidth={1.4} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute right-0 top-full z-30 mt-1 w-56 border border-line bg-ivory py-1 shadow-[0_20px_40px_-20px_rgba(25,20,16,0.3)]"
                      >
                        {SORTS.map((s) => (
                          <li key={s.key}>
                            <button
                              onClick={() => { setSort(s.key); setSortOpen(false); }}
                              className={`block w-full px-4 py-2.5 text-left text-[0.9rem] transition-colors hover:bg-cream ${sort === s.key ? "text-wine" : "text-graphite"}`}
                            >
                              {s.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-5 border border-line py-24 text-center">
                <p className="display text-3xl">Nothing matches those filters</p>
                <p className="max-w-sm text-sm text-mute">
                  Try widening the price band, or clear the filters to see the whole collection.
                </p>
                <Btn onClick={clearAll} variant="outline">Clear filters</Btn>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3 lg:gap-x-6 xl:grid-cols-4">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.06}>
                    <ProductCard product={p} index={i} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter sheet */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="fixed inset-0 z-[90] bg-ink/50 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[95] max-h-[82vh] overflow-y-auto rounded-t-2xl bg-ivory px-6 pb-8 pt-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="display text-2xl">Filters</span>
                <button onClick={() => setMobileFilters(false)} aria-label="Close filters"><X size={20} strokeWidth={1.2} /></button>
              </div>
              <div className="mt-2">{Filters}</div>
              <div className="mt-6 flex gap-3">
                <Btn variant="outline" className="flex-1" onClick={clearAll}>Clear</Btn>
                <Btn className="flex-1" onClick={() => setMobileFilters(false)}>
                  Show {items.length} pieces
                </Btn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
