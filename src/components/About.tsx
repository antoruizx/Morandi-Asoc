import { Eye, Lock, Quote, Receipt, UserCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";

const ICONS = [UserCheck, Receipt, Eye, Lock];

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="estudio" className="relative overflow-hidden bg-secondary py-24 md:py-32">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        {/* Bloque visual */}
        <Reveal variant="left" className="relative">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-10 text-white md:p-14">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative">
              <p className="font-heading text-[7rem] font-semibold leading-none text-gold-gradient md:text-[9rem]">1999</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">San Miguel de Tucumán</p>
              <div className="my-10 h-px w-full bg-gradient-to-r from-gold/60 to-transparent" />
              <Quote className="h-8 w-8 text-accent" />
              <blockquote className="mt-4 font-heading text-2xl italic leading-snug text-white/90 md:text-3xl">
                {t.why.quote}
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-accent">— {t.why.quoteAuthor}</p>
            </div>
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <span className="eyebrow">{t.why.eyebrow}</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.1] md:text-5xl">{t.why.title}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.why.description}</p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.why.items.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={item.title} delay={250 + i * 100}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_40px_-20px_hsl(var(--gold)/0.4)]">
                    <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
                    <h3 className="mt-4 font-body text-base font-bold tracking-normal">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
