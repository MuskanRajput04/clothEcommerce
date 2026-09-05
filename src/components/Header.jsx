import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown, Phone } from "lucide-react";
import { ANNOUNCEMENTS, NAV, BRAND } from "../data/site";
import { useStore } from "../context/StoreContext";
import { Img, useLockScroll } from "../lib/ui";

/* ------------------------------------------------------------ announcement */

function Announcement() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative z-50 bg-wine text-cream/90">
      <div className="mx-auto flex h-9 w-full max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2 eyebrow text-[0.68rem] text-cream/60 hover:text-cream md:flex">
          <Phone size={11} strokeWidth={1.5} /> {BRAND.phone}
        </a>
        <div className="relative mx-auto h-9 flex-1 overflow-hidden md:max-w-lg">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[0.62rem] uppercase tracking-[0.16em] sm:text-[0.68rem] sm:tracking-[0.3em]"
            >
              {ANNOUNCEMENTS[i]}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="hidden eyebrow text-[0.68rem] text-cream/60 md:block">Ships worldwide</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- mega menu */

function Mega({ item, onLeave }) {
  if (!item.columns) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={onLeave}
      className="absolute inset-x-0 top-full border-t border-line bg-ivory shadow-[0_30px_60px_-30px_rgba(25,20,16,0.25)]"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 gap-10 px-10 py-11">
        <div className="col-span-7 grid grid-cols-2 gap-10">
          {item.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5 text-gold">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="display text-[1.45rem] text-graphite transition-colors duration-300 hover:text-wine"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.feature && (
          <Link to={item.feature.to} className="group relative col-span-5 block overflow-hidden">
            <div className="relative h-64 overflow-hidden bg-cream">
              <Img
                id={item.feature.image}
                w={900}
                h={620}
                alt={item.feature.title}
                className="h-64 w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-6 left-7">
                <p className="eyebrow text-gold-light">Featured</p>
                <p className="display mt-1 text-3xl text-cream">{item.feature.title}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------ mobile drawer */

function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  useLockScroll(open);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[80] flex w-[86%] max-w-sm flex-col bg-ivory lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <span className="display text-2xl">{BRAND.name}</span>
              <button onClick={onClose} aria-label="Close menu"><X size={20} strokeWidth={1.2} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-line/70">
                  <div className="flex items-center justify-between py-4">
                    <Link to={item.to} onClick={onClose} className="display text-2xl">
                      {item.label}
                    </Link>
                    {item.columns && (
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        aria-label={`Expand ${item.label}`}
                        className="p-2"
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.2}
                          className={`transition-transform duration-300 ${expanded === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {expanded === item.label && item.columns && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-1">
                          {item.columns.flatMap((c) => c.links).map((l) => (
                            <Link
                              key={l.label}
                              to={l.to}
                              onClick={onClose}
                              className="block py-2 text-sm text-mute"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="border-t border-line px-6 py-6 text-sm text-mute">
              <p className="eyebrow mb-3 text-gold">Client care</p>
              <p>{BRAND.phone}</p>
              <p>{BRAND.email}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------- header */

export default function Header() {
  const { count, setCartOpen, setSearchOpen, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setHovered(null), [pathname]);

  const tone = overHero ? "text-cream" : "text-ink";

  return (
    <header className="sticky top-0 z-[60]">
      <Announcement />
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          overHero && !hovered
            ? "bg-transparent"
            : "border-b border-line bg-ivory/95 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center gap-6 px-5 lg:h-[86px] lg:px-10">
          <button
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            className={`lg:hidden ${hovered || !overHero ? "text-ink" : tone}`}
          >
            <Menu size={20} strokeWidth={1.2} />
          </button>

          <nav className="hidden flex-1 items-center gap-7 lg:flex xl:gap-9">
            {NAV.slice(0, 4).map((item) => (
              <div key={item.label} onMouseEnter={() => setHovered(item.columns ? item.label : null)}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `eyebrow transition-colors duration-300 ${
                      hovered || !overHero ? "text-ink" : tone
                    } ${isActive ? "text-wine" : "hover:text-wine"}`
                  }
                >
                  {item.label}
                </NavLink>
              </div>
            ))}
          </nav>

          <Link
            to="/"
            onMouseEnter={() => setHovered(null)}
            className="absolute left-1/2 shrink-0 -translate-x-1/2 text-center lg:static lg:translate-x-0 lg:px-6"
          >
            <span
              className={`display block text-[1.65rem] leading-none tracking-[0.02em] lg:text-[2rem] ${
                hovered || !overHero ? "text-ink" : tone
              }`}
            >
              Tuba
            </span>
            <span
              className={`eyebrow block text-[0.58rem] ${
                hovered || !overHero ? "text-gold" : "text-gold-light"
              }`}
            >
              Collection
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-7 lg:flex xl:gap-9">
            {NAV.slice(4).map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onMouseEnter={() => setHovered(null)}
                className={({ isActive }) =>
                  `eyebrow transition-colors duration-300 ${
                    hovered || !overHero ? "text-ink" : tone
                  } ${isActive ? "text-wine" : "hover:text-wine"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className={`ml-auto flex items-center gap-4 lg:ml-8 lg:gap-5 ${hovered || !overHero ? "text-ink" : tone}`}>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:text-wine">
              <Search size={19} strokeWidth={1.2} />
            </button>
            <Link to="/login" aria-label="Account" className="hidden hover:text-wine sm:block">
              <User size={19} strokeWidth={1.2} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden hover:text-wine sm:block">
              <Heart size={19} strokeWidth={1.2} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[0.68rem] text-ink">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative hover:text-wine">
              <ShoppingBag size={19} strokeWidth={1.2} />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[0.68rem] text-cream">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {hovered && (
            <Mega item={NAV.find((n) => n.label === hovered)} onLeave={() => setHovered(null)} />
          )}
        </AnimatePresence>
      </div>

      <MobileNav open={mobile} onClose={() => setMobile(false)} />
    </header>
  );
}
