import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ArrowUp, Check } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { Img } from "../lib/ui";

/* Reset scroll on navigation */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* Added-to-bag confirmation */
export function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 border border-line bg-ivory px-4 py-3 shadow-[0_20px_50px_-20px_rgba(25,20,16,0.4)]"
        >
          <span className="relative h-11 w-9 overflow-hidden bg-cream">
            <Img id={toast.image} w={120} h={150} alt="" className="h-full w-full object-cover" />
          </span>
          <span>
            <span className="flex items-center gap-1.5 eyebrow text-[0.62rem] text-gold">
              <Check size={11} strokeWidth={2} /> Added to bag
            </span>
            <span className="mt-0.5 block max-w-[200px] truncate text-[0.93rem]">{toast.name}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Back to top */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-[85] grid h-11 w-11 place-items-center rounded-full border border-line bg-ivory text-ink transition-colors duration-400 hover:bg-wine hover:text-cream"
        >
          <ArrowUp size={16} strokeWidth={1.3} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* Thin page-scroll progress bar */
export function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[110] h-[2px] bg-transparent">
      <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}
