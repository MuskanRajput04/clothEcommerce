import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { img, FALLBACK } from "../data/images";

/* ---------------------------------------------- image with graceful fallback */

export function Img({ id, w = 900, h = 1200, alt = "", className = "", eager = false }) {
  const [src, setSrc] = useState(img(id, w, h));
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <span className="absolute inset-0 skeleton" aria-hidden />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => {
          setSrc(FALLBACK);
          setReady(true);
        }}
        className={className}
      />
    </>
  );
}

/* --------------------------------------------------- scroll reveal container */

export function Reveal({ children, delay = 0, y = 26, className = "", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Letter-by-letter reveal for display headlines */
export function RevealWords({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------- buttons */

const base =
  "inline-flex items-center justify-center gap-2.5 eyebrow transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] disabled:opacity-40 disabled:pointer-events-none";

const variants = {
  solid: "bg-wine text-cream px-9 py-4 hover:bg-wine-deep",
  gold: "bg-gold text-ink px-9 py-4 hover:bg-gold-light",
  outline: "border border-ink/25 text-ink px-9 py-4 hover:border-ink hover:bg-ink hover:text-ivory",
  ghostLight: "border border-cream/45 text-cream px-9 py-4 hover:bg-cream hover:text-ink",
  quiet: "text-ink px-0 py-1 border-b border-ink/30 hover:border-ink",
};

export function Btn({ as = "button", to, variant = "solid", className = "", children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (as === "link") return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (as === "a") return <a href={to} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}

/* ------------------------------------------------------------------ headings */

export function SectionHead({ eyebrow, title, text, align = "center", light = false, action }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls} gap-4`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow flex items-center gap-3 ${light ? "text-gold-light" : "text-gold"}`}>
            <span className={`h-px w-8 ${light ? "bg-gold-light/60" : "bg-gold/60"}`} />
            {eyebrow}
            {align === "center" && <span className={`h-px w-8 ${light ? "bg-gold-light/60" : "bg-gold/60"}`} />}
          </span>
        </Reveal>
      )}
      <h2 className={`display text-4xl sm:text-5xl lg:text-[3.4rem] ${light ? "text-cream" : "text-ink"}`}>
        <RevealWords text={title} />
      </h2>
      {text && (
        <Reveal delay={0.12}>
          <p className={`max-w-xl text-[1.02rem] leading-relaxed ${light ? "text-cream/70" : "text-mute"}`}>
            {text}
          </p>
        </Reveal>
      )}
      {action && <Reveal delay={0.2} className="mt-2">{action}</Reveal>}
    </div>
  );
}

/* -------------------------------------------------------------------- stars */

export function Stars({ value = 5, size = 12, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.2}
          className={i <= Math.round(value) ? "fill-gold text-gold" : "text-sand"}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ marquee */

export function Marquee({ items, className = "", slow = false, sep = "✦" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track ${slow ? "slow" : ""}`}>
        {row.map((it, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-7">{it}</span>
            <span className="text-gold/70">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- lock body scroll */

export function useLockScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
