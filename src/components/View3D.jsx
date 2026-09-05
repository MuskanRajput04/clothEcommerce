import { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCcw, Pause, Play, Move3d, Maximize2 } from "lucide-react";
import { colourways, inr } from "../data/products";
import { useLockScroll } from "../lib/ui";

/* three.js only ships to the browser when someone actually opens the viewer. */
const Product3D = lazy(() => import("./Product3D"));

function Loader() {
  return (
    <div className="grid h-full w-full place-items-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border border-sand border-t-gold" />
          <Move3d size={18} strokeWidth={1.2} className="text-gold" />
        </span>
        <p className="eyebrow text-[0.68rem] text-mute">Preparing the drape…</p>
      </div>
    </div>
  );
}

/* Small inline preview used on the product page. */
export function Inline3D({ product, tint }) {
  return (
    <Suspense fallback={<Loader />}>
      <Product3D product={product} tint={tint} sway />
    </Suspense>
  );
}

export default function View3D({ product, open, onClose }) {
  const ways = colourways(product);
  const [tint, setTint] = useState(ways[0].hex);
  const [spin, setSpin] = useState(true);
  const [key, setKey] = useState(0);
  useLockScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-ink/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-3 flex flex-col overflow-hidden bg-ivory sm:inset-6 lg:inset-10"
          >
            <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 lg:px-8">
              <div>
                <p className="eyebrow flex items-center gap-2 text-gold">
                  <Move3d size={13} strokeWidth={1.4} /> 3D drape preview
                </p>
                <h3 className="display mt-1 text-2xl lg:text-3xl">{product.name}</h3>
              </div>
              <button onClick={onClose} aria-label="Close 3D view" className="p-1.5 text-mute hover:text-wine">
                <X size={20} strokeWidth={1.2} />
              </button>
            </header>

            <div className="relative min-h-0 flex-1">
              <Suspense fallback={<Loader />}>
                <Product3D key={key} product={product} tint={tint} sway={spin} />
              </Suspense>

              <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/70 px-4 py-2 text-[0.76rem] tracking-wider text-cream/80">
                Drag to rotate · scroll to zoom
              </p>

              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  onClick={() => setSpin(!spin)}
                  aria-label={spin ? "Pause rotation" : "Play rotation"}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ivory/90 text-graphite backdrop-blur hover:border-wine hover:text-wine"
                >
                  {spin ? <Pause size={15} strokeWidth={1.3} /> : <Play size={15} strokeWidth={1.3} />}
                </button>
                <button
                  onClick={() => setKey((k) => k + 1)}
                  aria-label="Reset view"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ivory/90 text-graphite backdrop-blur hover:border-wine hover:text-wine"
                >
                  <RotateCcw size={15} strokeWidth={1.3} />
                </button>
              </div>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4 lg:px-8">
              <div className="flex items-center gap-4">
                <span className="eyebrow text-mute">Colourway</span>
                <div className="flex gap-2.5">
                  {ways.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setTint(c.hex)}
                      title={c.name}
                      aria-label={c.name}
                      className={`h-7 w-7 rounded-full border transition-transform duration-300 hover:scale-110 ${
                        tint === c.hex ? "border-wine ring-1 ring-wine ring-offset-2 ring-offset-ivory" : "border-line"
                      }`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[0.86rem] text-mute">
                Colour tint is indicative — the weave and fall are taken from the actual{" "}
                <span className="text-graphite">{product.fabric}</span>. · {inr(product.price)}
              </p>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* The button that opens it — reused on the product page and in quick view. */
export function View3DButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2.5 border border-ink/20 px-5 py-3 eyebrow text-[0.68rem] transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory ${className}`}
    >
      <Move3d size={14} strokeWidth={1.3} className="text-gold group-hover:text-gold-light" />
      View in 3D
      <Maximize2 size={11} strokeWidth={1.3} className="opacity-50" />
    </button>
  );
}
