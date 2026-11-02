import { ArrowRight, CheckCircle2, Clock, Scale, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappLink } from "@/lib/firm";
import { Counter, WhatsAppIcon } from "@/components/motion";

const AnimatedWords = ({ text, startDelay = 0, className }: { text: string; startDelay?: number; className?: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <span key={i} className={`word ${className ?? ""}`} style={{ animationDelay: `${startDelay + i * 70}ms` }}>
        {word}&nbsp;
      </span>
    ))}
  </>
);

const Hero = () => {
  const { t, language } = useLanguage();
  const wordsA = t.hero.titleA.split(" ").length;
  const wordsH = t.hero.titleHighlight.split(" ").length;

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      {/* Fondo */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="animate-float-slow absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gold/20 blur-[120px]" />
      <div className="animate-float absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="container relative grid min-h-[100svh] items-center gap-16 pb-56 pt-32 md:pb-40 lg:grid-cols-[1.15fr_0.85fr] lg:pb-40">
        {/* Texto */}
        <div key={language}>
          <p className="fade-in-up eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <AnimatedWords text={t.hero.titleA} startDelay={150} />
            <br className="hidden sm:block" />
            <span className="italic">
              <AnimatedWords text={t.hero.titleHighlight} startDelay={150 + wordsA * 70} className="text-gold-gradient" />
            </span>
            <br className="hidden sm:block" />
            <AnimatedWords text={t.hero.titleB} startDelay={150 + (wordsA + wordsH) * 70} className="text-white/80" />
          </h1>
          <p className="fade-in-up mt-8 max-w-xl text-lg leading-relaxed text-white/65" style={{ animationDelay: "900ms" }}>
            {t.hero.description}
          </p>
          <div className="fade-in-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "1100ms" }}>
            <a href={whatsappLink(t.whatsapp.message)} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.ctaPrimary}
            </a>
            <a href="#areas" className="btn-ghost-light group">
              {t.hero.ctaSecondary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Composición visual */}
        <div className="fade-in-up relative mx-auto hidden aspect-square w-full max-w-md lg:block" style={{ animationDelay: "600ms" }}>
          <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/30" />
          <div className="absolute inset-10 rounded-full border border-white/10" />
          <div className="absolute inset-20 grid place-items-center rounded-full bg-gradient-to-br from-ink-soft to-ink shadow-[0_0_120px_-20px_hsl(var(--gold)/0.45)]">
            <Scale className="h-28 w-28 text-gold" strokeWidth={0.8} />
          </div>

          <div className="glass animate-float absolute -left-10 top-6 w-64 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <ShieldCheck className="h-4 w-4" />
              {t.hero.cardTitle}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{t.hero.cardText}</p>
          </div>

          <div className="glass animate-float-slow absolute -right-6 bottom-16 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl" style={{ animationDelay: "1.5s" }}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-2xl font-semibold leading-none">+1.200</p>
              <p className="mt-1 text-xs text-white/60">{t.hero.badgeCases}</p>
            </div>
          </div>

          <div className="glass absolute -bottom-2 left-8 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Clock className="h-3.5 w-3.5" />
            {t.hero.cardBadge}
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a href="#areas" className="absolute bottom-32 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex lg:bottom-36">
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-2">
          <span className="animate-scroll-dot h-1.5 w-1 rounded-full bg-accent" />
        </span>
        {t.hero.scroll}
      </a>

      {/* Estadísticas */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/60 backdrop-blur">
        <div className="container grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="py-5 text-center md:py-7">
              <p className="font-heading text-3xl font-semibold text-accent md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-white/55 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Marquee = () => {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="relative overflow-hidden border-y border-border bg-secondary py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-heading text-3xl italic text-foreground/70 md:text-4xl">
            {item}
            <Scale className="h-5 w-5 text-accent not-italic" strokeWidth={1.5} />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent" />
    </div>
  );
};

export default Hero;
