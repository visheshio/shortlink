import Image from "next/image";
import HeroWordmark from "./components/HeroWordmark";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-14">
        {/* Left column: wordmark anchored to the left edge, supporting text below it */}
        <div className="flex flex-col items-start">
          <HeroWordmark />
          <div className="max-w-xl text-left mx-12">
            <p className="text-[18px] font-bold uppercase tracking-[0.28em] text-brass">
              The best shortener URL
            </p>
            <p className="mt-3 text-[20px] leading-relaxed text-shell-muted font-serif">
              We are the most straightforward URL shortener in the world.
            </p>
            
          </div>
        </div>

        {/* Right column: home.png blended into the graphite / brass palette */}
        <div className="mix-blend-lighten relative ml-8 aspect-[12/7] w-full overflow-hidden  rounded-[2px]">
          <Image
            src="/home.jpg"
            alt="ShortLink dashboard preview"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </section>
    </main>
  );
}
