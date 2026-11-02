import { ArrowUpRight, Briefcase, Building2, Car, Gavel, HeartHandshake, Landmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { whatsappLink } from "@/lib/firm";
import { Reveal, SectionHeading } from "@/components/motion";

const ICONS = [Landmark, Briefcase, HeartHandshake, Gavel, Building2, Car];

const PracticeAreas = () => {
  const { t } = useLanguage();

  return (
    <section id="areas" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} subtitle={t.areas.subtitle} />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.areas.items.map((area, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={area.title} delay={(i % 3) * 120} className="h-full">
                <a
                  href={whatsappLink(`${t.contact.messageIntro} (${area.title})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden bg-card p-8 transition-colors duration-500 hover:bg-ink md:p-10"
                >
                  <span className="pointer-events-none absolute -right-6 -top-10 font-heading text-[9rem] font-semibold leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-white/[0.05]">
                    0{i + 1}
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="relative mt-8 text-3xl font-semibold text-foreground transition-colors duration-500 group-hover:text-white">
                    {area.title}
                  </h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/65">
                    {area.desc}
                  </p>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    <span className="translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {t.areas.more}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-700 group-hover:w-full" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
