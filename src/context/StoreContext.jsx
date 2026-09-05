import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const StoreCtx = createContext(null);
export const useStore = () => useContext(StoreCtx);

const KEY = "tuba.store.v1";

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* storage blocked — fall through to defaults */
  }
  return { cart: [], wishlist: [] };
};

const lineKey = (id, size) => `${id}::${size}`;

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const { product, size, qty } = action;
      const key = lineKey(product.id, size);
      const existing = state.cart.find((l) => l.key === key);
      const cart = existing
        ? state.cart.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
        : [
            ...state.cart,
            {
              key,
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              mrp: product.mrp,
              image: product.images[0],
              colour: product.colour,
              size,
              qty,
            },
          ];
      return { ...state, cart };
    }
    case "qty":
      return {
        ...state,
        cart: state.cart
          .map((l) => (l.key === action.key ? { ...l, qty: Math.max(0, l.qty + action.delta) } : l))
          .filter((l) => l.qty > 0),
      };
    case "remove":
      return { ...state, cart: state.cart.filter((l) => l.key !== action.key) };
    case "clear":
      return { ...state, cart: [] };
    case "wish": {
      const has = state.wishlist.includes(action.id);
      return {
        ...state,
        wishlist: has
          ? state.wishlist.filter((x) => x !== action.id)
          : [...state.wishlist, action.id],
      };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(() => {
    const subtotal = state.cart.reduce((s, l) => s + l.price * l.qty, 0);
    const saved = state.cart.reduce((s, l) => s + (l.mrp - l.price) * l.qty, 0);
    const count = state.cart.reduce((s, l) => s + l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= 2999 ? 0 : 149;

    return {
      cart: state.cart,
      wishlist: state.wishlist,
      subtotal,
      saved,
      count,
      shipping,
      total: subtotal + shipping,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      toast,
      addToCart: (product, size = "M", qty = 1) => {
        dispatch({ type: "add", product, size, qty });
        setToast({ name: product.name, image: product.images[0] });
        setCartOpen(true);
      },
      changeQty: (key, delta) => dispatch({ type: "qty", key, delta }),
      removeLine: (key) => dispatch({ type: "remove", key }),
      clearCart: () => dispatch({ type: "clear" }),
      toggleWish: (id) => dispatch({ type: "wish", id }),
      isWished: (id) => state.wishlist.includes(id),
    };
  }, [state, cartOpen, searchOpen, toast]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
