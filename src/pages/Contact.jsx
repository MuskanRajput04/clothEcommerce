import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Check, ChevronDown } from "lucide-react";
import { BRAND, FAQ } from "../data/site";
import { IMG } from "../data/images";
import { Img, Reveal, SectionHead, Btn } from "../lib/ui";

const REASONS = ["Styling advice", "Order status", "Custom stitching", "Bulk / bridal", "Something else"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: REASONS[0], message: "" });
  const [openFaq, setOpenFaq] = useState(0);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const field =
    "w-full border border-line bg-ivory px-4 py-3.5 text-[0.98rem] outline-none transition-colors focus:border-wine placeholder:text-mute/60";

  return (
    <>
      <section className="relative h-[42vh] min-h-[300px] overflow-hidden bg-ink">
        <Img id={IMG.jewellery} w={2000} h={900} eager alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="grain absolute inset-0 opacity-35" aria-hidden />
        <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-5 pb-12 lg:px-10 lg:pb-16">
          <p className="eyebrow text-gold-light">Client care</p>
          <h1 className="display mt-3 text-5xl text-cream lg:text-7xl">Talk to us</h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* form */}
          <Reveal className="lg:col-span-7">
            <SectionHead
              align="left"
              eyebrow="Write to us"
              title="We reply within a day"
              text="Tell us the occasion, your budget and your usual size — a stylist from the Zirakpur store will send you three options."
            />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 flex flex-col items-start gap-4 border border-line bg-cream/50 p-9"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-wine text-cream">
                    <Check size={18} strokeWidth={1.6} />
                  </span>
                  <h3 className="display text-3xl">Thank you, {form.name.split(" ")[0] || "friend"}</h3>
                  <p className="max-w-md text-[1rem] text-mute">
                    Your note is with our client care team. Expect a reply on {form.email || "your email"} within
                    one working day — sooner if it is about an order already placed.
                  </p>
                  <Btn variant="outline" onClick={() => setSent(false)}>Send another message</Btn>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="mt-10 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="eyebrow text-mute">Your name</label>
                      <input required value={form.name} onChange={set("name")} placeholder="Anjali Sharma" className={`mt-2 ${field}`} />
                    </div>
                    <div>
                      <label className="eyebrow text-mute">Email</label>
                      <input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={`mt-2 ${field}`} />
                    </div>
                    <div>
                      <label className="eyebrow text-mute">Phone</label>
                      <input value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={`mt-2 ${field}`} />
                    </div>
                    <div>
                      <label className="eyebrow text-mute">Reason</label>
                      <select value={form.reason} onChange={set("reason")} className={`mt-2 ${field}`}>
                        {REASONS.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow text-mute">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="I am looking for something for a mehendi in November, budget around ₹6,000…"
                      className={`mt-2 resize-none ${field}`}
                    />
                  </div>
                  <Btn type="submit">Send message</Btn>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* details */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="border border-line bg-cream/40 p-8 lg:p-10">
              <h3 className="display text-3xl">The showroom</h3>
              <ul className="mt-7 space-y-6 text-[0.98rem]">
                <li className="flex gap-4">
                  <MapPin size={17} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                  <span className="leading-relaxed text-graphite">{BRAND.address}</span>
                </li>
                <li className="flex gap-4">
                  <Clock size={17} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-graphite">{BRAND.hours}</span>
                </li>
                <li className="flex gap-4">
                  <Phone size={17} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                  <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="text-graphite hover:text-wine">{BRAND.phone}</a>
                </li>
                <li className="flex gap-4">
                  <Mail size={17} strokeWidth={1.2} className="mt-0.5 shrink-0 text-gold" />
                  <a href={`mailto:${BRAND.email}`} className="text-graphite hover:text-wine">{BRAND.email}</a>
                </li>
              </ul>

              <div className="mt-8 aspect-[4/3] overflow-hidden border border-line">
                <iframe
                  title="Tuba Collection showroom location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.79%2C30.62%2C76.85%2C30.66&layer=mapnik&marker=30.6425%2C76.8173"
                  className="h-full w-full grayscale-[35%]"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="border-t border-line bg-cream/40 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <SectionHead eyebrow="Good to know" title="Frequently asked" />
          <div className="mt-10 border-t border-line">
            {FAQ.map((f, i) => (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="display text-xl lg:text-2xl">{f.q}</span>
                  <ChevronDown size={17} strokeWidth={1.2} className={`shrink-0 text-mute transition-transform duration-400 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-[1rem] leading-relaxed text-mute">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
