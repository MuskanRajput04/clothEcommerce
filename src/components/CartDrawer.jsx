import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { inr } from "../data/products";
import { Img, Btn, useLockScroll } from "../lib/ui";

const FREE_AT = 2999;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, subtotal, saved, changeQty, removeLine, shipping } = useStore();
  useLockScroll(cartOpen);
  const progress = Math.min(100, (subtotal / FREE_AT) * 100);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[90] bg-ink/45 backdrop-blur-[3px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[440px] flex-col bg-ivory"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <p className="eyebrow text-gold">Your selection</p>
                <h2 className="display text-2xl">Shopping Bag</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="p-1 hover:text-wine">
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            {cart.length > 0 && (
              <div className="border-b border-line bg-cream/60 px-6 py-4">
                <p className="flex items-center gap-2 text-[0.8rem] text-graphite">
                  <Truck size={13} strokeWidth={1.3} className="text-gold" />
                  {subtotal >= FREE_AT ? (
                    <span>Shipping is on us — enjoy.</span>
                  ) : (
                    <span>
                      Add <b className="text-wine">{inr(FREE_AT - subtotal)}</b> more for free shipping
                    </span>
                  )}
                </p>
                <div className="mt-2.5 h-[3px] w-full bg-sand">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-line text-mute">
                    <ShoppingBag size={22} strokeWidth={1} />
                  </span>
                  <div>
                    <p className="display text-2xl">Your bag is empty</p>
                    <p className="mt-1 text-sm text-mute">Let us find something you will keep for years.</p>
                  </div>
                  <Btn as="link" to="/shop" onClick={() => setCartOpen(false)}>
                    Explore the collection
                  </Btn>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {cart.map((line) => (
                    <motion.li
                      key={line.key}
                      layout
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 py-5"
                    >
                      <Link
                        to={`/product/${line.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="relative h-28 w-[84px] shrink-0 overflow-hidden bg-cream"
                      >
                        <Img id={line.image} w={200} h={266} alt={line.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-[0.98rem] text-ink">{line.name}</p>
                            <p className="mt-1 text-[0.8rem] text-mute">
                              {line.colour} · Size {line.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeLine(line.key)}
                            aria-label="Remove item"
                            className="text-mute hover:text-wine"
                          >
                            <X size={14} strokeWidth={1.3} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-line">
                            <button
                              onClick={() => changeQty(line.key, -1)}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center text-mute hover:text-ink"
                            >
                              <Minus size={12} strokeWidth={1.4} />
                            </button>
                            <span className="w-7 text-center text-[0.88rem]">{line.qty}</span>
                            <button
                              onClick={() => changeQty(line.key, 1)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center text-mute hover:text-ink"
                            >
                              <Plus size={12} strokeWidth={1.4} />
                            </button>
                          </div>
                          <span className="text-[0.98rem] text-wine">{inr(line.price * line.qty)}</span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-line px-6 py-5">
                <dl className="space-y-2 text-[0.93rem]">
                  <div className="flex justify-between text-graphite">
                    <dt>Subtotal</dt>
                    <dd>{inr(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-graphite">
                    <dt>Shipping</dt>
                    <dd>{shipping === 0 ? "Complimentary" : inr(shipping)}</dd>
                  </div>
                  {saved > 0 && (
                    <div className="flex justify-between text-gold">
                      <dt>You save</dt>
                      <dd>{inr(saved)}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                  <span className="eyebrow">Total</span>
                  <span className="display text-2xl text-wine">{inr(subtotal + shipping)}</span>
                </div>
                <Btn as="link" to="/cart" onClick={() => setCartOpen(false)} className="mt-5 w-full">
                  Proceed to checkout
                </Btn>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-3 w-full py-2 text-center text-[0.83rem] text-mute underline-offset-4 hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
