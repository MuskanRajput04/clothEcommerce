import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Reveal, Btn } from "../lib/ui";

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
      <p className="eyebrow text-gold">Saved for later</p>
      <h1 className="display mt-2 text-5xl lg:text-7xl">Your Wishlist</h1>
      <p className="mt-3 text-[0.98rem] text-mute">
        {items.length === 0
          ? "Nothing saved yet."
          : `${items.length} ${items.length === 1 ? "piece" : "pieces"} kept aside.`}
      </p>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-5 border border-line py-24 text-center">
          <p className="display text-3xl">The heart icon saves things here</p>
          <p className="max-w-sm text-sm text-mute">
            Because our runs are small, saving a piece is the easiest way to keep an eye on it.
          </p>
          <Btn as="link" to="/shop">Browse the collection</Btn>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.07}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-16 border-t border-line pt-8">
        <Link to="/shop" className="sweep eyebrow text-wine">Continue shopping</Link>
      </div>
    </div>
  );
}
