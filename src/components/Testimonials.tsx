import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, SectionHeading } from "@/components/motion";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const { t } = useLanguage();
  const items = t.testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <section className="relative overflow-hidden bg-secondary py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <Reveal variant="scale">
          <div
            className="relative mx-auto max-w-4xl rounded-[2rem] border border-border bg-card px-8 py-14 text-center shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.35)] md:px-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg">
              <Quote className="h-6 w-6" />
            </span>

            <div className="relative min-h-[15rem] sm:min-h-[12rem]">
              {items.map((item, i) => (
                <figure
                  key={i}
                  aria-hidden={i !== index}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-700",
                    i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-heading text-2xl italic leading-snug text-foreground md:text-3xl">
                    “{item.text}”
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-bold">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <button onClick={() => go(-1)} aria-label="Anterior" className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`${i + 1}`}
                    className={cn("h-2 rounded-full transition-all duration-500", i === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/50")}
                  />
                ))}
              </div>
              <button onClick={() => go(1)} aria-label="Siguiente" className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
