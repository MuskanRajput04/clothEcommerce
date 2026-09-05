import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMG } from "../data/images";
import { PILLARS, BRAND } from "../data/site";
import { Img, Reveal, SectionHead, Btn, RevealWords } from "../lib/ui";

const NUMBERS = [
  { value: "9", label: "Years in Zirakpur" },
  { value: "140+", label: "Karigars & weavers" },
  { value: "40", label: "Pieces per design, max" },
  { value: "12k", label: "Women dressed" },
];

const TIMELINE = [
  { year: "2017", title: "One rack, one room", text: "Tuba began as a single rack of chikankari kurtas in a Zirakpur front room, sold to friends and their mothers." },
  { year: "2019", title: "The first loom partner", text: "We drove to Chanderi and came back with three weaver families who still weave every metre of our silk." },
  { year: "2022", title: "The showroom", text: "ABP Maxspace opened its doors — a proper fitting room, a tailoring desk, and chai that never stops." },
  { year: "2026", title: "The atelier online", text: "The same clothes, the same karigars, now shipped to nine countries and every pin code in India." },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <>
      {/* hero */}
      <section className="relative h-[72vh] min-h-[480px] overflow-hidden bg-ink">
        <Img id={IMG.duoEthnic} w={2000} h={1300} eager alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/50" />
        <div className="grain absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-5 pb-14 lg:px-10 lg:pb-20">
          <p className="eyebrow flex items-center gap-3 text-gold-light">
            <span className="h-px w-10 bg-gold-light/60" /> Our story
          </p>
          <h1 className="display mt-5 max-w-3xl text-5xl text-cream lg:text-[5rem] lg:leading-[1.02]">
            <RevealWords text="A house built around the people who make the clothes" />
          </h1>
        </div>
      </section>

      {/* intro */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Since 2017 · Zirakpur, Punjab</p>
            <h2 className="display mt-4 text-4xl lg:text-[3.2rem] lg:leading-[1.08]">
              We make fewer things, slowly
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="space-y-5 text-[1.05rem] leading-[1.85] text-graphite lg:col-span-7">
            <p>
              Tuba Collection started because good ethnic wear had become two things: cheap and
              disposable, or expensive and inaccessible. We wanted a third option — clothes made
              honestly, priced honestly, and finished by people we know by name.
            </p>
            <p>
              Every design begins as a sketch on our studio table in Zirakpur. The fabric is bought
              directly from weaving families in Chanderi, Banaras and Bhagalpur. The embroidery goes
              out to ateliers in Lucknow and Punjab, where a single bridal yoke can take nine hundred
              hours of hand work. Then it comes back here, to a fit table, and it is tried on real
              bodies until it drapes correctly.
            </p>
            <p>
              We never make more than forty pieces of a design. It means we sell out often, and it
              also means that when you wear a Tuba piece to a wedding, you are unlikely to meet
              yourself across the room.
            </p>
          </Reveal>
        </div>
      </section>

      {/* numbers */}
      <section className="border-y border-line bg-cream/50">
        <div className="mx-auto grid w-full max-w-[1400px] gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.08} className="bg-ivory px-7 py-12 text-center">
              <p className="display text-5xl text-wine lg:text-6xl">{n.value}</p>
              <p className="eyebrow mt-3 text-mute">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* parallax quote */}
      <section ref={ref} className="relative h-[70vh] min-h-[440px] overflow-hidden bg-ink">
        <motion.div style={{ y }} className="absolute -top-[10%] inset-x-0 h-[120%]">
          <Img id={IMG.zariDetail} w={2000} h={1300} alt="" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/60" />
        <div className="relative mx-auto flex h-full max-w-3xl items-center px-5 text-center lg:px-10">
          <p className="display text-3xl leading-[1.4] text-cream lg:text-[2.9rem] lg:leading-[1.32]">
            “If the hem swings wrong, it goes back to the table — however beautiful the fabric.”
          </p>
        </div>
      </section>

      {/* pillars */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <SectionHead
          eyebrow="The process"
          title="Three hands before yours"
          text="A Tuba piece passes through a weaver, a karigar and a fit table before it is folded into tissue."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.1} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Img id={p.image} w={900} h={1120} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
              </div>
              <p className="eyebrow mt-6 text-gold">{p.no}</p>
              <h3 className="display mt-2 text-3xl">{p.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-mute">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="border-t border-line bg-cream/40 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-10">
          <SectionHead align="left" eyebrow="Milestones" title="Nine years, one table" />
          <div className="mt-14 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1} className="bg-ivory p-8">
                <p className="display text-4xl text-gold">{t.year}</p>
                <h3 className="mt-4 text-[1.05rem] text-ink">{t.title}</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-mute">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* visit */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Img id={IMG.atelierRack} w={1200} h={900} alt="The Zirakpur showroom" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHead
              align="left"
              eyebrow="Come and see"
              title="The showroom in Zirakpur"
              text="Two fitting rooms, a tailoring desk and every fabric we work with, in daylight. Walk in, or book a styling appointment and we will keep pieces aside for you."
              action={<Btn as="link" to="/contact">Book an appointment</Btn>}
            />
            <p className="mt-8 text-[0.94rem] leading-relaxed text-mute">
              {BRAND.address}
              <br />
              {BRAND.hours}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
