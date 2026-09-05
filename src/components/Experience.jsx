import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ loader */

export function Preloader() {
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem("tuba.seen") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (done) return undefined;
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem("tuba.seen", "1");
      } catch {
        /* private mode */
      }
    }, 1900);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-ivory"
        >
          <div className="flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="display text-6xl lg:text-8xl"
              >
                Tuba
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="eyebrow mt-2 text-[0.68rem] text-gold"
            >
              Collection · Est. 2017
            </motion.p>
            <div className="mt-8 h-px w-40 bg-sand">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                className="h-full bg-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ cursor */

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || window.innerWidth < 1024) return undefined;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const soft = { ...pos };
    let raf;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
    };

    const tick = () => {
      soft.x += (pos.x - soft.x) * 0.16;
      soft.y += (pos.y - soft.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${soft.x}px, ${soft.y}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const over = (e) => {
      const t = e.target.closest?.("[data-cursor], a, button, input, select, textarea");
      if (!ring.current) return;
      const tag = t?.dataset?.cursor;
      ring.current.dataset.state = t ? (tag ? "label" : "link") : "idle";
      if (label.current) label.current.textContent = tag || "";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <span ref={dot} className="cursor-dot" aria-hidden />
      <span ref={ring} className="cursor-ring" data-state="idle" aria-hidden>
        <span ref={label} className="cursor-label" />
      </span>
    </>
  );
}
