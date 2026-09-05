import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, Check } from "lucide-react";
import { Instagram, Facebook } from "../lib/brandIcons";
import { BRAND } from "../data/site";
import { CATEGORIES } from "../data/products";
import { Reveal, Marquee } from "../lib/ui";

const COLUMNS = [
  {
    title: "Shop",
    links: CATEGORIES.map((c) => ({ label: c.name, to: `/shop/${c.slug}` })).concat([
      { label: "New Arrivals", to: "/shop?sort=new" },
    ]),
  },
  {
    title: "The House",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "The Atelier", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Store Visit", to: "/contact" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Delivery", to: "/contact" },
      { label: "Returns & Exchange", to: "/contact" },
      { label: "Size Guide", to: "/contact" },
      { label: "Track Your Order", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
    ],
  },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
      className="mt-7"
    >
      <div className="flex items-center border-b border-cream/25 pb-2 focus-within:border-gold">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 bg-transparent py-2 text-sm text-cream outline-none placeholder:text-cream/40"
        />
        <button type="submit" aria-label="Subscribe" className="p-2 text-gold-light hover:text-cream">
          {done ? <Check size={17} strokeWidth={1.4} /> : <ArrowRight size={17} strokeWidth={1.4} />}
        </button>
      </div>
      <p className="mt-3 text-[0.8rem] text-cream/45">
        {done
          ? "Welcome. Your 10% code is on its way."
          : "Join for early access to drops, atelier notes and 10% off your first order."}
      </p>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-wine-deep text-cream">
      <div className="grain absolute inset-0 opacity-30" aria-hidden />

      <div className="relative border-b border-cream/10 py-5 eyebrow text-[0.7rem] text-cream/50">
        <Marquee
          slow
          items={[
            "Handcrafted in India",
            "Small batch production",
            "Free shipping over ₹2,999",
            "7-day easy returns",
            "Custom stitching available",
          ]}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Link to="/" className="inline-block">
              <span className="display block text-4xl leading-none">Tuba</span>
              <span className="eyebrow block text-[0.62rem] text-gold-light">Collection</span>
            </Link>
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-cream/60">
              An ethnic wear house from Zirakpur, working with weavers and karigars across India to
              make clothes that outlive a season.
            </p>
            <Newsletter />
          </Reveal>

          {COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={0.08 * (i + 1)} className="lg:col-span-2">
              <p className="eyebrow text-gold-light">{col.title}</p>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[0.96rem] text-cream/65 transition-colors duration-300 hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.32} className="lg:col-span-2">
            <p className="eyebrow text-gold-light">Visit Us</p>
            <ul className="mt-5 space-y-4 text-[0.96rem] text-cream/65">
              <li className="flex gap-3">
                <MapPin size={15} strokeWidth={1.3} className="mt-0.5 shrink-0 text-gold-light" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} strokeWidth={1.3} className="shrink-0 text-gold-light" />
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-cream">{BRAND.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail size={15} strokeWidth={1.3} className="shrink-0 text-gold-light" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-cream">{BRAND.email}</a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-400 hover:border-gold hover:text-gold-light"
                >
                  <Icon size={15} strokeWidth={1.3} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-6 text-[0.8rem] text-cream/45 lg:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="flex items-center gap-5">
            <span>Secure payments</span>
            <span className="hidden h-3 w-px bg-cream/20 sm:block" />
            <span>UPI · Cards · Net Banking · COD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
