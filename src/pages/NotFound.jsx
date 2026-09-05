import { Btn } from "../lib/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[64vh] max-w-xl flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <p className="eyebrow text-gold">Error 404</p>
      <h1 className="display text-6xl lg:text-8xl">Lost a thread</h1>
      <p className="text-mute">
        This page does not exist — or the piece sold out and we retired the link. Let us take you
        back to the collection.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Btn as="link" to="/">Back home</Btn>
        <Btn as="link" to="/shop" variant="outline">Shop the collection</Btn>
      </div>
    </div>
  );
}
