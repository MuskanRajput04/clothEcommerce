import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart, Minus, Plus, Truck, RefreshCw, Scissors, ShieldCheck, ChevronDown,
  ArrowRight, Move3d, Ruler, MapPin, Check, ZoomIn, Share2,
} from "lucide-react";
import { bySlug, related, inr, off, colourways, SIZE_CHART, PRODUCTS } from "../data/products";
import { TESTIMONIALS } from "../data/site";
import { useStore } from "../context/StoreContext";
import { Img, Reveal, Btn, Stars, SectionHead, useLockScroll } from "../lib/ui";
import ProductCard from "../components/ProductCard";
import View3D, { Inline3D, View3DButton } from "../components/View3D";

const PROMISES = [
  { icon: Truck, title: "Free shipping over ₹2,999", text: "Dispatched in 48 hours" },
  { icon: RefreshCw, title: "7-day easy returns", text: "We arrange the pickup" },
  { icon: Scissors, title: "Custom stitching", text: "From ₹1,200, add at checkout" },
  { icon: ShieldCheck, title: "Authentic handwork", text: "Karigar-signed pieces" },
];

const RECENT_KEY = "tuba.recent.v1";

/* ------------------------------------------------------------------ helpers */

function useRecentlyViewed(product) {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    } catch {
      ids = [];
    }
    setRecent(PRODUCTS.filter((p) => ids.includes(p.id) && p.id !== product.id).slice(0, 4));
    const next = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 8);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* private mode — skip */
    }
  }, [product.id]);
  return recent;
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-10 border-t border-line">
      {items.map((it, i) => (
        <div key={it.q} className="border-b border-line">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="text-[1rem] text-ink">{it.q}</span>
            <ChevronDown size={15} strokeWidth={1.3} className={`shrink-0 text-mute transition-transform duration-400 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 pr-8 text-[0.96rem] leading-relaxed text-mute">{it.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- size guide */

function SizeGuide({ open, onClose, active }) {
  useLockScroll(open);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[92] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[96] w-full max-w-md overflow-y-auto bg-ivory px-6 py-7 lg:px-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow flex items-center gap-2 text-gold">
                  <Ruler size={13} strokeWidth={1.4} /> Fit & measurements
                </p>
                <h3 className="display mt-1.5 text-3xl">Size guide</h3>
              </div>
              <button onClick={onClose} aria-label="Close size guide" className="text-mute hover:text-wine">✕</button>
            </div>

            <p className="mt-4 text-[0.94rem] leading-relaxed text-mute">
              All measurements are body measurements in inches. Our kurtas carry 2 to 3 inches of
              ease over these numbers, so pick your usual size.
            </p>

            <div className="mt-7 overflow-x-auto">
              <table className="w-full border-collapse text-[0.92rem]">
                <thead>
                  <tr className="border-y border-line text-left eyebrow text-[0.62rem] text-mute">
                    <th className="py-3 pr-3">Size</th>
                    <th className="py-3 pr-3">Bust</th>
                    <th className="py-3 pr-3">Waist</th>
                    <th className="py-3 pr-3">Hip</th>
                    <th className="py-3">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((r) => (
                    <tr
                      key={r.size}
                      className={`border-b border-line/70 ${r.size === active ? "bg-wine/5 text-ink" : "text-graphite"}`}
                    >
                      <td className="py-3 pr-3">
                        {r.size} {r.size === active && <span className="text-wine">· yours</span>}
                      </td>
                      <td className="py-3 pr-3">{r.bust}"</td>
                      <td className="py-3 pr-3">{r.waist}"</td>
                      <td className="py-3 pr-3">{r.hip}"</td>
                      <td className="py-3">{r.length}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border border-line bg-cream/50 p-6">
              <p className="eyebrow text-gold">Between two sizes?</p>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-mute">
                Take the larger one for anarkalis and shararas, the smaller for straight kurtas.
                Or send us your measurements — every piece can be altered before dispatch, free.
              </p>
              <Link to="/contact" className="mt-3 inline-block text-[0.9rem] text-wine underline underline-offset-4">
                Ask a stylist
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------ pincode check */

function PincodeCheck() {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState(null);

  const check = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setResult({ ok: false, text: "Please enter a valid 6-digit pin code." });
      return;
    }
    const days = 3 + (Number(pin.slice(-1)) % 4);
    const eta = new Date();
    eta.setDate(eta.getDate() + days);
    setResult({
      ok: true,
      text: `Delivers by ${eta.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · Cash on delivery available`,
    });
  };

  return (
    <div className="mt-7 border border-line bg-cream/40 p-5">
      <p className="eyebrow flex items-center gap-2 text-mute">
        <MapPin size={13} strokeWidth={1.4} className="text-gold" /> Delivery check
      </p>
      <form onSubmit={check} className="mt-3 flex">
        <input
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setResult(null); }}
          placeholder="Enter pin code"
          inputMode="numeric"
          className="min-w-0 flex-1 border border-line bg-ivory px-4 py-3 text-[0.93rem] outline-none focus:border-wine"
        />
        <button type="submit" className="border border-l-0 border-line bg-ink px-5 eyebrow text-[0.68rem] text-cream hover:bg-wine">
          Check
        </button>
      </form>
      {result && (
        <p className={`mt-2.5 flex items-center gap-1.5 text-[0.86rem] ${result.ok ? "text-sage" : "text-wine"}`}>
          {result.ok && <Check size={12} strokeWidth={2} />} {result.text}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export default function Product() {
  const { slug } = useParams();
  const product = bySlug(slug);
  const { addToCart, toggleWish, isWished } = useStore();

  const [active, setActive] = useState(0);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [stitch, setStitch] = useState("unstitched");
  const [colour, setColour] = useState(0);
  const [guide, setGuide] = useState(false);
  const [modal3D, setModal3D] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [sticky, setSticky] = useState(false);
  const [copied, setCopied] = useState(false);
  const buyRef = useRef(null);

  const recent = useRecentlyViewed(product || { id: -1 });

  useEffect(() => {
    const onScroll = () => {
      const box = buyRef.current?.getBoundingClientRect();
      setSticky(!!box && box.bottom < 90);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActive(0);
    setColour(0);
    setQty(1);
  }, [slug]);

  if (!product) return <Navigate to="/shop" replace />;

  const ways = colourways(product);
  const wished = isWished(product.id);
  const gallery = product.images.length > 1 ? product.images : [product.images[0], product.images[0]];
  const isUnstitched = product.category === "unstitched";
  const stitchFee = stitch === "custom" ? 1200 : 0;
  const unitPrice = product.price + stitchFee;
  const is3D = active === gallery.length;

  const share = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
        <nav className="eyebrow text-[0.68rem] text-mute">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="px-2">/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-ink capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <span className="px-2">/</span>
          <span className="text-graphite">{product.name}</span>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------------------- gallery */}
          <div className="flex gap-4">
            <div className="hidden w-20 shrink-0 flex-col gap-3 lg:flex">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative aspect-[3/4] overflow-hidden border transition-colors ${active === i ? "border-wine" : "border-transparent hover:border-line"}`}
                >
                  <Img id={g} w={200} h={266} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
              <button
                onClick={() => setActive(gallery.length)}
                className={`grid aspect-[3/4] place-items-center gap-1 border bg-cream transition-colors ${is3D ? "border-wine text-wine" : "border-line text-graphite hover:border-graphite"}`}
              >
                <Move3d size={20} strokeWidth={1.2} />
                <span className="eyebrow text-[0.58rem]">3D</span>
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="group relative aspect-[3/4] overflow-hidden bg-cream"
                onMouseMove={(e) => {
                  if (is3D) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
                }}
                onMouseLeave={() => setZoom(null)}
              >
                {is3D ? (
                  <div className="absolute inset-0">
                    <Inline3D product={product} tint={ways[colour].hex} />
                    <button
                      onClick={() => setModal3D(true)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink/80 px-5 py-2.5 eyebrow text-[0.65rem] text-cream backdrop-blur hover:bg-wine"
                    >
                      Open full screen
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Img
                        id={gallery[active]}
                        w={1100}
                        h={1466}
                        eager
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out"
                      />
                      {zoom && (
                        <div
                          className="pointer-events-none absolute inset-0 hidden bg-cover bg-no-repeat lg:block"
                          style={{
                            backgroundImage: `url(https://images.unsplash.com/${gallery[active]}?auto=format&fit=crop&w=1800&h=2400&q=85)`,
                            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                            backgroundSize: "190%",
                          }}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {product.badge && !is3D && (
                  <span className="absolute left-0 top-5 bg-ink/85 px-4 py-2 eyebrow text-[0.62rem] text-cream">
                    {product.badge}
                  </span>
                )}

                {!is3D && (
                  <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-1.5 bg-ivory/85 px-3 py-1.5 text-[0.74rem] tracking-wider text-graphite opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 lg:flex">
                    <ZoomIn size={12} strokeWidth={1.4} /> Hover to zoom
                  </span>
                )}
              </div>

              {/* mobile thumbnails */}
              <div className="mt-3 flex gap-3 lg:hidden">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden border ${active === i ? "border-wine" : "border-transparent"}`}
                  >
                    <Img id={g} w={160} h={210} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
                <button
                  onClick={() => setActive(gallery.length)}
                  className={`grid h-20 w-16 shrink-0 place-items-center border bg-cream ${is3D ? "border-wine text-wine" : "border-line text-graphite"}`}
                >
                  <Move3d size={18} strokeWidth={1.2} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <View3DButton onClick={() => setModal3D(true)} />
                <button
                  onClick={share}
                  className="flex items-center gap-2 border border-ink/20 px-5 py-3 eyebrow text-[0.68rem] transition-colors duration-500 hover:border-ink"
                >
                  <Share2 size={13} strokeWidth={1.3} /> {copied ? "Link copied" : "Share"}
                </button>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- detail */}
          <div className="lg:pt-4">
            <p className="eyebrow text-gold">{product.work}</p>
            <h1 className="display mt-3 text-4xl lg:text-[3.2rem] lg:leading-[1.05]">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <Stars value={product.rating} size={13} />
              <span className="text-[0.88rem] text-mute">{product.rating} · {product.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="display text-3xl text-wine">{inr(unitPrice)}</span>
              <span className="text-mute line-through">{inr(product.mrp)}</span>
              <span className="bg-gold/20 px-2.5 py-1 eyebrow text-[0.62rem] text-gold">{off(product)}% off</span>
            </div>
            <p className="mt-1.5 text-[0.83rem] text-mute">Inclusive of all taxes</p>

            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-graphite">{product.blurb}</p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-line py-5 text-[0.92rem]">
              {[["Fabric", product.fabric], ["Colour", ways[colour].name], ["Craft", product.work], ["Fit", "True to size"]].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="text-mute">{k}:</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {/* colourways */}
            <div className="mt-7">
              <span className="eyebrow">Colour — <span className="text-mute">{ways[colour].name}</span></span>
              <div className="mt-3 flex gap-3">
                {ways.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColour(i)}
                    title={c.name}
                    aria-label={c.name}
                    className={`h-9 w-9 rounded-full border transition-transform duration-300 hover:scale-110 ${
                      colour === i ? "border-wine ring-1 ring-wine ring-offset-2 ring-offset-ivory" : "border-line"
                    }`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* size */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Select size</span>
                <button
                  onClick={() => setGuide(true)}
                  className="flex items-center gap-1.5 text-[0.83rem] text-wine underline underline-offset-4"
                >
                  <Ruler size={12} strokeWidth={1.4} /> Size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-[52px] border px-4 text-[0.9rem] transition-all duration-300 ${
                      size === s ? "border-wine bg-wine text-cream" : "border-line text-graphite hover:border-graphite"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* stitching */}
            {isUnstitched && (
              <div className="mt-7">
                <span className="eyebrow">Stitching</span>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {[
                    { key: "unstitched", label: "Unstitched fabric", note: "Included" },
                    { key: "custom", label: "Custom stitched", note: "+ ₹1,200" },
                  ].map((o) => (
                    <button
                      key={o.key}
                      onClick={() => setStitch(o.key)}
                      className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                        stitch === o.key ? "border-wine bg-wine/5" : "border-line hover:border-graphite"
                      }`}
                    >
                      <span className="text-[0.93rem]">{o.label}</span>
                      <span className="text-[0.83rem] text-mute">{o.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* buy */}
            <div ref={buyRef} className="mt-8 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center border border-line">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease" className="grid h-[54px] w-12 place-items-center text-mute hover:text-ink">
                  <Minus size={14} strokeWidth={1.4} />
                </button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase" className="grid h-[54px] w-12 place-items-center text-mute hover:text-ink">
                  <Plus size={14} strokeWidth={1.4} />
                </button>
              </div>
              <Btn onClick={() => addToCart(product, size, qty)} className="h-[54px] min-w-[220px] flex-1 !py-0">
                Add to bag — {inr(unitPrice * qty)}
              </Btn>
              <button
                onClick={() => toggleWish(product.id)}
                aria-label="Save to wishlist"
                className={`grid h-[54px] w-[54px] place-items-center border transition-colors ${
                  wished ? "border-wine bg-wine/5 text-wine" : "border-line text-graphite hover:border-graphite"
                }`}
              >
                <Heart size={17} strokeWidth={1.3} className={wished ? "fill-wine" : ""} />
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-[0.88rem] text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              In stock — only {4 + (product.id % 5)} left in this colour
            </p>

            <PincodeCheck />

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
              {PROMISES.map((p) => (
                <div key={p.title} className="flex gap-3">
                  <p.icon size={17} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                  <div>
                    <p className="text-[0.9rem] text-ink">{p.title}</p>
                    <p className="text-[0.8rem] text-mute">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Accordion
              items={[
                {
                  q: "Product details",
                  a: `${product.blurb} Crafted in ${product.fabric.toLowerCase()} with ${product.work.toLowerCase()}. The set includes a top, bottom and dupatta unless stated otherwise. Slight irregularity in hand-worked areas is a mark of the craft, not a defect.`,
                },
                {
                  q: "Care instructions",
                  a: "Dry clean only for embroidered and silk pieces. Cotton kurtas may be hand washed cold with a mild detergent, dried in shade and steam pressed on the reverse. Store hand-worked pieces in muslin.",
                },
                {
                  q: "Shipping & returns",
                  a: "Dispatched within 48 hours and delivered in 3 to 6 working days across India. Free above ₹2,999. Unworn pieces can be returned within 7 days with tags intact — we arrange the pickup. Custom stitched pieces are final sale.",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* reviews */}
      <section className="border-y border-line bg-cream/40 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
          <SectionHead align="left" eyebrow="Client notes" title="What buyers said" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="border border-line bg-ivory p-7">
                <Stars value={t.rating} size={12} />
                <p className="mt-4 text-[0.98rem] leading-relaxed text-graphite">“{t.text}”</p>
                <p className="mt-5 eyebrow text-[0.68rem] text-gold">{t.name}</p>
                <p className="mt-1 text-[0.83rem] text-mute">{t.city}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="flex items-end justify-between gap-6">
          <SectionHead align="left" eyebrow="Complete the look" title="You may also like" />
          <Link to="/shop" className="sweep hidden eyebrow items-center gap-2 whitespace-nowrap text-wine sm:flex">
            View all <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {related(product, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* recently viewed */}
      {recent.length > 0 && (
        <section className="border-t border-line bg-cream/30 py-14">
          <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
            <p className="eyebrow text-gold">Recently viewed</p>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
              {recent.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* sticky buy bar */}
      <AnimatePresence>
        {sticky && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[80] border-t border-line bg-ivory/97 backdrop-blur"
          >
            <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-5 py-3 lg:px-10">
              <span className="relative hidden h-14 w-11 shrink-0 overflow-hidden bg-cream sm:block">
                <Img id={product.images[0]} w={120} h={160} alt="" className="h-full w-full object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.98rem]">{product.name}</p>
                <p className="text-[0.83rem] text-mute">Size {size} · {ways[colour].name}</p>
              </div>
              <span className="hidden text-[1.02rem] text-wine sm:block">{inr(unitPrice * qty)}</span>
              <Btn onClick={() => addToCart(product, size, qty)} className="h-11 !py-0 whitespace-nowrap">
                Add to bag
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SizeGuide open={guide} onClose={() => setGuide(false)} active={size} />
      <View3D product={product} open={modal3D} onClose={() => setModal3D(false)} />
    </>
  );
}
