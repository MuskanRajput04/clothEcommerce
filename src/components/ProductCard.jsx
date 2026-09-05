import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Eye } from "lucide-react";
import { inr, off, colourways } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Img, Stars } from "../lib/ui";
import QuickView from "./QuickView";

export default function ProductCard({ product, index = 0, compact = false }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const [picking, setPicking] = useState(false);
  const [quick, setQuick] = useState(false);
  const wished = isWished(product.id);
  const discount = off(product);
  const ways = colourways(product);

  const quickAdd = (s) => {
    addToCart(product, s, 1);
    setPicking(false);
  };

  return (
    <article className="group relative" onMouseLeave={() => setPicking(false)}>
      <div className="relative overflow-hidden bg-cream">
        <Link to={`/product/${product.slug}`} className="block" data-cursor="View">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Img
              id={product.images[0]}
              w={700}
              h={933}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] group-hover:opacity-0"
            />
            <Img
              id={product.images[1] || product.images[0]}
              w={700}
              h={933}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute left-0 top-4 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="bg-ink/85 px-3 py-1.5 eyebrow text-[0.62rem] text-cream backdrop-blur">
              {product.badge}
            </span>
          )}
          {discount >= 20 && (
            <span className="bg-gold px-3 py-1.5 eyebrow text-[0.62rem] text-ink">{discount}% off</span>
          )}
        </div>

        {/* side actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWish(product.id)}
            aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
            className="grid h-9 w-9 place-items-center rounded-full bg-ivory/85 text-ink backdrop-blur transition-all duration-500 hover:bg-ivory hover:text-wine"
          >
            <Heart size={15} strokeWidth={1.3} className={wished ? "fill-wine text-wine" : ""} />
          </button>
          {!compact && (
            <button
              onClick={() => setQuick(true)}
              aria-label="Quick view"
              className="grid h-9 w-9 translate-x-2 place-items-center rounded-full bg-ivory/85 text-ink opacity-0 backdrop-blur transition-all duration-500 hover:bg-ivory hover:text-wine group-hover:translate-x-0 group-hover:opacity-100"
            >
              <Eye size={15} strokeWidth={1.3} />
            </button>
          )}
        </div>

        {/* quick add */}
        {!compact && (
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            {picking ? (
              <div className="flex items-center gap-1 bg-ivory/95 p-1.5 backdrop-blur">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => quickAdd(s)}
                    className="flex-1 py-2 text-[0.76rem] tracking-wider text-graphite transition-colors hover:bg-wine hover:text-cream"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setPicking(true)}
                className="flex w-full items-center justify-center gap-2 bg-ivory/95 py-3.5 eyebrow text-[0.68rem] text-ink backdrop-blur transition-colors duration-400 hover:bg-wine hover:text-cream"
              >
                <Plus size={13} strokeWidth={1.5} /> Quick add
              </button>
            )}
          </div>
        )}
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow min-w-0 truncate text-[0.62rem] text-mute">{product.fabric}</p>
          {!compact && (
            <span className="flex shrink-0 gap-1.5">
              {ways.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-3 w-3 rounded-full border border-line"
                  style={{ background: c.hex }}
                />
              ))}
            </span>
          )}
        </div>
        <h3 className="mt-1.5 text-[1.02rem] font-normal leading-snug tracking-wide text-ink">
          <Link to={`/product/${product.slug}`} className="sweep">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
          <span className="flex items-baseline gap-2.5">
            <span className="text-[1.02rem] text-wine">{inr(product.price)}</span>
            <span className="text-[0.86rem] text-mute line-through">{inr(product.mrp)}</span>
          </span>
          {!compact && (
            <span className="flex items-center gap-1">
              <Stars value={product.rating} size={10} />
              <span className="text-[0.74rem] text-mute">({product.reviews})</span>
            </span>
          )}
        </div>
      </div>

      {!compact && <QuickView product={product} open={quick} onClose={() => setQuick(false)} />}
    </article>
  );
}
