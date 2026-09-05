import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { inr } from "../data/products";
import { Img, Btn } from "../lib/ui";

export default function Cart() {
  const { cart, subtotal, saved, shipping, changeQty, removeLine } = useStore();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null);

  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const applyCode = (e) => {
    e.preventDefault();
    setApplied(code.trim().toUpperCase() === "WELCOME10" ? "WELCOME10" : "invalid");
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-5 py-24 text-center">
        <p className="eyebrow text-gold">Your bag</p>
        <h1 className="display text-5xl">Nothing here yet</h1>
        <p className="max-w-sm text-mute">
          Everything we make is produced in runs of forty or fewer. Have a look before it goes.
        </p>
        <Btn as="link" to="/shop">Start with new arrivals</Btn>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
      <p className="eyebrow text-gold">Checkout</p>
      <h1 className="display mt-2 text-4xl lg:text-6xl">Shopping Bag</h1>
      <p className="mt-3 text-[0.96rem] text-mute">
        {cart.length} {cart.length === 1 ? "design" : "designs"} · reserved for 30 minutes
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 xl:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {cart.map((line) => (
              <motion.li key={line.key} layout className="flex gap-5 py-6">
                <Link to={`/product/${line.slug}`} className="relative h-40 w-[120px] shrink-0 overflow-hidden bg-cream sm:h-48 sm:w-36">
                  <Img id={line.image} w={320} h={430} alt={line.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link to={`/product/${line.slug}`} className="display text-xl sm:text-2xl hover:text-wine">
                        {line.name}
                      </Link>
                      <p className="mt-1.5 text-[0.88rem] text-mute">
                        {line.colour} · Size {line.size}
                      </p>
                      <p className="mt-3 text-[0.98rem] text-wine sm:hidden">{inr(line.price)}</p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-[1.02rem] text-wine">{inr(line.price * line.qty)}</p>
                      <p className="text-[0.83rem] text-mute line-through">{inr(line.mrp * line.qty)}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-line">
                      <button onClick={() => changeQty(line.key, -1)} aria-label="Decrease" className="grid h-10 w-10 place-items-center text-mute hover:text-ink">
                        <Minus size={13} strokeWidth={1.4} />
                      </button>
                      <span className="w-8 text-center text-[0.93rem]">{line.qty}</span>
                      <button onClick={() => changeQty(line.key, 1)} aria-label="Increase" className="grid h-10 w-10 place-items-center text-mute hover:text-ink">
                        <Plus size={13} strokeWidth={1.4} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(line.key)}
                      className="flex items-center gap-1.5 text-[0.86rem] text-mute transition-colors hover:text-wine"
                    >
                      <X size={13} strokeWidth={1.4} /> Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 whitespace-nowrap eyebrow text-wine sweep">
            Continue shopping
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-32 border border-line bg-cream/40 p-7">
            <h2 className="display text-2xl">Order summary</h2>

            <form onSubmit={applyCode} className="mt-6">
              <label className="eyebrow text-mute">Promo code</label>
              <div className="mt-2 flex">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="WELCOME10"
                  className="min-w-0 flex-1 border border-line bg-ivory px-4 py-3 text-[0.93rem] outline-none focus:border-wine"
                />
                <button type="submit" className="border border-l-0 border-line bg-ink px-5 eyebrow text-[0.68rem] text-cream hover:bg-wine">
                  Apply
                </button>
              </div>
              {applied === "WELCOME10" && (
                <p className="mt-2 flex items-center gap-1.5 text-[0.83rem] text-sage">
                  <Tag size={12} strokeWidth={1.5} /> WELCOME10 applied — 10% off
                </p>
              )}
              {applied === "invalid" && (
                <p className="mt-2 text-[0.83rem] text-wine">That code is not valid. Try WELCOME10.</p>
              )}
            </form>

            <dl className="mt-7 space-y-3 border-t border-line pt-6 text-[0.96rem]">
              <div className="flex justify-between text-graphite">
                <dt>Subtotal</dt><dd>{inr(subtotal)}</dd>
              </div>
              {saved > 0 && (
                <div className="flex justify-between text-mute">
                  <dt>Bundle savings</dt><dd>− {inr(saved)}</dd>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-sage">
                  <dt>Promo (WELCOME10)</dt><dd>− {inr(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-graphite">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Complimentary" : inr(shipping)}</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
              <span className="eyebrow">Total</span>
              <span className="display text-3xl text-wine">{inr(total)}</span>
            </div>

            <Btn className="mt-6 w-full">
              Place order <ArrowRight size={14} strokeWidth={1.5} />
            </Btn>

            <p className="mt-4 flex items-center justify-center gap-2 text-[0.8rem] text-mute">
              <ShieldCheck size={13} strokeWidth={1.3} className="text-gold" />
              Secure payment · UPI, cards, net banking, COD
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
