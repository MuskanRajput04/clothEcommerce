import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ArrowRight } from "lucide-react";
import { inr, off, colourways } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Img, Btn, Stars, useLockScroll } from "../lib/ui";
import View3D, { View3DButton } from "./View3D";

export default function QuickView({ product, open, onClose }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const [size, setSize] = useState("M");
  const [shot, setShot] = useState(0);
  const [modal3D, setModal3D] = useState(false);
  useLockScroll(open);

  useEffect(() => {
    if (open) {
      setShot(0);
      setSize("M");
    }
  }, [open, product?.id]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;
  const ways = colourways(product);
  const wished = isWished(product.id);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[93] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-ivory sm:grid-cols-2"
            >
              {/* image */}
              <div className="relative bg-cream">
                <div className="relative aspect-[3/4]">
                  <Img
                    id={product.images[shot]}
                    w={800}
                    h={1066}
                    eager
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {product.images.map((im, i) => (
                      <button
                        key={i}
                        onClick={() => setShot(i)}
                        aria-label={`View image ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-400 ${i === shot ? "w-6 bg-ivory" : "w-1.5 bg-ivory/50"}`}
                      />
                    ))}
                  </div>
                )}
                {product.badge && (
                  <span className="absolute left-0 top-4 bg-ink/85 px-3 py-1.5 eyebrow text-[0.62rem] text-cream">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* detail */}
              <div className="relative flex flex-col p-6 sm:p-8">
                <button
                  onClick={onClose}
                  aria-label="Close quick view"
                  className="absolute right-4 top-4 text-mute hover:text-wine"
                >
                  <X size={19} strokeWidth={1.2} />
                </button>

                <p className="eyebrow text-gold">{product.fabric}</p>
                <h3 className="display mt-2 pr-8 text-3xl">{product.name}</h3>

                <div className="mt-3 flex items-center gap-2.5">
                  <Stars value={product.rating} size={12} />
                  <span className="text-[0.83rem] text-mute">({product.reviews})</span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="display text-2xl text-wine">{inr(product.price)}</span>
                  <span className="text-[0.93rem] text-mute line-through">{inr(product.mrp)}</span>
                  <span className="bg-gold/20 px-2 py-0.5 eyebrow text-[0.58rem] text-gold">{off(product)}% off</span>
                </div>

                <p className="mt-5 text-[0.98rem] leading-relaxed text-graphite">{product.blurb}</p>

                <div className="mt-5 flex gap-2.5">
                  {ways.slice(0, 4).map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className="h-7 w-7 rounded-full border border-line"
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>

                <div className="mt-6">
                  <span className="eyebrow">Size</span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-10 min-w-[46px] border px-3 text-[0.88rem] transition-colors ${
                          size === s ? "border-wine bg-wine text-cream" : "border-line text-graphite hover:border-graphite"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2.5">
                  <Btn
                    onClick={() => {
                      addToCart(product, size, 1);
                      onClose();
                    }}
                    className="h-12 flex-1 !py-0"
                  >
                    Add to bag
                  </Btn>
                  <button
                    onClick={() => toggleWish(product.id)}
                    aria-label="Save to wishlist"
                    className={`grid h-12 w-12 shrink-0 place-items-center border transition-colors ${
                      wished ? "border-wine bg-wine/5 text-wine" : "border-line text-graphite hover:border-graphite"
                    }`}
                  >
                    <Heart size={16} strokeWidth={1.3} className={wished ? "fill-wine" : ""} />
                  </button>
                </div>

                <div className="mt-3">
                  <View3DButton onClick={() => setModal3D(true)} className="w-full justify-center" />
                </div>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-2 text-[0.9rem] text-wine underline-offset-4 hover:underline"
                >
                  Full product details <ArrowRight size={13} strokeWidth={1.5} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <View3D product={product} open={modal3D} onClose={() => setModal3D(false)} />
    </>
  );
}
