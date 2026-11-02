import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal, SectionHeading, useInView } from "@/components/motion";
import { cn } from "@/lib/utils";

const Process = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section id="proceso" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      <div className="container relative">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} light />

        <div ref={ref} className="relative grid gap-12 md:grid-cols-4 md:gap-8">
          {/* Línea que se dibuja */}
          <div className="absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-white/10 md:block">
            <div
              className={cn("h-full origin-left bg-gradient-to-r from-gold to-gold-light transition-transform duration-[1800ms] ease-out", inView ? "scale-x-100" : "scale-x-0")}
            />
          </div>
          <div className="absolute bottom-0 left-7 top-7 w-px bg-white/10 md:hidden" />

          {t.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 250} className="relative flex gap-6 md:block">
              <span
                className={cn(
                  "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border font-heading text-2xl font-semibold transition-all duration-700",
                  inView ? "border-accent bg-accent text-accent-foreground shadow-[0_0_40px_-5px_hsl(var(--gold)/0.6)]" : "border-white/20 bg-ink text-white",
                )}
                style={{ transitionDelay: `${i * 400 + 300}ms` }}
              >
                {i + 1}
              </span>
              <div className="md:mt-8">
                <h3 className="text-2xl font-semibold md:text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/60">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
