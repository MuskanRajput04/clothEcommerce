import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IMG } from "../data/images";
import { Img, Btn } from "../lib/ui";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [note, setNote] = useState("");

  const field =
    "w-full border border-line bg-ivory px-4 py-3.5 text-[0.98rem] outline-none transition-colors focus:border-wine placeholder:text-mute/60";

  return (
    <div className="grid min-h-[calc(100svh-118px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <Img id={IMG.ivorySteps} w={1200} h={1600} eager alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/40" />
        <div className="grain absolute inset-0 opacity-35" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="eyebrow text-gold-light">Members first</p>
          <p className="display mt-4 max-w-sm text-4xl text-cream">
            Early access to every drop, before it reaches the shop page
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="inline-block">
            <span className="display block text-3xl leading-none">Tuba</span>
            <span className="eyebrow block text-[0.58rem] text-gold">Collection</span>
          </Link>

          <h1 className="display mt-9 text-4xl">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-[0.96rem] text-mute">
            {mode === "login"
              ? "Sign in to track orders and see your saved pieces."
              : "One account for orders, wishlist and early access."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNote("This is a design prototype — the backend is not connected yet.");
            }}
            className="mt-8 space-y-4"
          >
            {mode === "register" && (
              <div>
                <label className="eyebrow text-mute">Full name</label>
                <input required placeholder="Anjali Sharma" className={`mt-2 ${field}`} />
              </div>
            )}
            <div>
              <label className="eyebrow text-mute">Email</label>
              <input required type="email" placeholder="you@email.com" className={`mt-2 ${field}`} />
            </div>
            <div>
              <label className="eyebrow text-mute">Password</label>
              <input required type="password" placeholder="••••••••" className={`mt-2 ${field}`} />
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-[0.86rem]">
                <label className="flex items-center gap-2 text-mute">
                  <input type="checkbox" className="accent-wine" /> Remember me
                </label>
                <button type="button" className="text-wine underline-offset-4 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Btn type="submit" className="w-full">
              {mode === "login" ? "Sign in" : "Create account"}
            </Btn>

            {note && <p className="text-[0.86rem] text-mute">{note}</p>}
          </form>

          <div className="my-7 flex items-center gap-4 text-[0.78rem] text-mute">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>

          <button className="w-full border border-line py-3.5 text-[0.93rem] text-graphite transition-colors hover:border-graphite">
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[0.93rem] text-mute">
            {mode === "login" ? "New to Tuba?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setNote(""); }}
              className="text-wine underline underline-offset-4"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
