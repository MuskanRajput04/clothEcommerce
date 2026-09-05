import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { PRODUCTS, inr } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Img, useLockScroll } from "../lib/ui";

const SUGGESTIONS = ["Chikankari", "Sharara", "Anarkali", "Unstitched", "Cord set", "Under 2500"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const input = useRef(null);
  useLockScroll(searchOpen);

  useEffect(() => {
    if (searchOpen) setTimeout(() => input.current?.focus(), 250);
    else setQ("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.category, p.fabric, p.work, p.colour, ...(p.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(term)
    ).slice(0, 6);
  }, [q]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-ink/60 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ivory px-5 pb-10 pt-8 lg:px-10"
          >
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-4 border-b border-ink/20 pb-4">
                <Search size={20} strokeWidth={1.2} className="text-gold" />
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search kurta, sharara, chanderi…"
                  className="display flex-1 bg-transparent text-2xl outline-none placeholder:text-mute/60 lg:text-3xl"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-mute hover:text-ink">
                  <X size={20} strokeWidth={1.2} />
                </button>
              </div>

              {!q && (
                <div className="mt-7">
                  <p className="eyebrow text-mute">Popular searches</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQ(s)}
                        className="border border-line px-4 py-2 text-[0.86rem] text-graphite transition-colors hover:border-wine hover:text-wine"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q && (
                <div className="mt-7 max-h-[52vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="py-10 text-center text-mute">
                      Nothing matched “{q}”. Try a fabric or a silhouette.
                    </p>
                  ) : (
                    <ul className="divide-y divide-line">
                      {results.map((p) => (
                        <li key={p.id}>
                          <Link
                            to={`/product/${p.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="group flex items-center gap-4 py-3.5"
                          >
                            <span className="relative h-[72px] w-14 shrink-0 overflow-hidden bg-cream">
                              <Img id={p.images[0]} w={160} h={210} alt={p.name} className="h-full w-full object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[1.02rem] group-hover:text-wine">{p.name}</span>
                              <span className="block text-[0.8rem] text-mute">{p.fabric} · {p.work}</span>
                            </span>
                            <span className="text-[0.98rem] text-wine">{inr(p.price)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
