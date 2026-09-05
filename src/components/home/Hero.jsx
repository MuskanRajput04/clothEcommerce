import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { IMG } from "../../data/images";
import { Img, Btn } from "../../lib/ui";

const SLIDES = [
  {
    eyebrow: "Autumn Atelier · 2026",
    title: ["Woven for", "the long", "evenings"],
    text: "Chanderi, raw silk and hand-set zardozi — cut in small runs at our Zirakpur atelier.",
    cta: { label: "Shop the edit", to: "/shop?sort=new" },
    image: IMG.emeraldGown,
  },
  {
    eyebrow: "The Bridal Room",
    title: ["Nine hundred", "hours of", "zardozi"],
    text: "Made to order, made once. A single Riwaayat bodice passes through four ateliers.",
    cta: { label: "Discover couture", to: "/product/riwaayat-red-bridal-suit" },
    image: IMG.lehengaRed,
  },
  {
    eyebrow: "Everyday Luxe",
    title: ["Chikankari", "you can", "live in"],
    text: "Six weeks of Lucknowi needlework on voile that only gets softer with wear.",
    cta: { label: "Shop kurtas", to: "/shop/kurta" },
    image: IMG.kurtaWhite,
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);
  const slide = SLIDES[i];

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative -mt-[72px] h-[100svh] min-h-[620px] overflow-hidden bg-ink lg:-mt-[86px]">
      {/* backdrop */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          <motion.div style={{ y }} className="absolute inset-0 h-[115%]">
            <Img
              id={slide.image}
              w={2000}
              h={1400}
              eager
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />
      <div className="grain absolute inset-0 opacity-40" aria-hidden />

      {/* copy */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center px-5 pt-[72px] lg:px-10 lg:pt-[86px]"
      >
        <div key={i} className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow flex items-center gap-3 text-gold-light"
          >
            <span className="h-px w-10 bg-gold-light/60" />
            {slide.eyebrow}
          </motion.p>

          <h1 className="display mt-6 text-[3.1rem] leading-[1.02] text-cream sm:text-7xl lg:text-[5.4rem]">
            {slide.title.map((line, li) => (
              <span key={line} className="block overflow-hidden py-[0.04em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.2 + li * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-cream/75"
          >
            {slide.text}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Btn as="link" to={slide.cta.to} variant="gold">
              {slide.cta.label} <ArrowRight size={14} strokeWidth={1.5} />
            </Btn>
            <Btn as="link" to="/shop" variant="ghostLight">
              All collections
            </Btn>
          </motion.div>
        </div>
      </motion.div>

      {/* slide controls */}
      <div className="absolute bottom-9 right-5 z-10 flex items-center gap-4 lg:right-10">
        {SLIDES.map((s, si) => (
          <button
            key={s.eyebrow}
            onClick={() => setI(si)}
            aria-label={`Go to slide ${si + 1}`}
            className="group flex items-center gap-2"
          >
            <span className={`eyebrow text-[0.68rem] transition-colors ${si === i ? "text-gold-light" : "text-cream/40"}`}>
              0{si + 1}
            </span>
            <span className="relative block h-px w-10 bg-cream/25">
              {si === i && (
                <motion.span
                  key={`bar-${i}`}
                  className="absolute inset-y-0 left-0 bg-gold-light"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-9 left-5 z-10 hidden items-center gap-3 text-cream/50 lg:left-10 lg:flex">
        <ArrowDown size={14} strokeWidth={1.3} className="animate-bounce" />
        <span className="eyebrow text-[0.68rem]">Scroll to explore</span>
      </div>

      <Link
        to="/shop?sort=new"
        className="absolute bottom-24 right-5 z-10 hidden h-28 w-28 place-items-center rounded-full border border-gold-light/40 text-center lg:right-10 lg:grid"
      >
        <span className="spin-slow absolute inset-0">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path id="circlePath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            </defs>
            <text fill="#D8B26A" fontSize="8.5" letterSpacing="3.2">
              <textPath href="#circlePath">NEW SEASON · TUBA COLLECTION · 2026 · </textPath>
            </text>
          </svg>
        </span>
        <ArrowRight size={16} strokeWidth={1.2} className="text-gold-light" />
      </Link>
    </section>
  );
}
