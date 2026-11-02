import { Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FIRM } from "@/lib/firm";
import { Reveal, SectionHeading } from "@/components/motion";

const GRADIENTS = [
  "from-[#1b2a4a] to-[#0c1220]",
  "from-[#3a2d1a] to-[#14100a]",
  "from-[#1d3340] to-[#0b151b]",
  "from-[#2e2140] to-[#120c1a]",
];

const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Dra\.)\s*/, "")
    .split(" ")
    .map((n) => n[0])
    .join("");

const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="equipo" className="py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} subtitle={t.team.subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 120} variant="scale">
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-card">
                <div className={`relative grid aspect-[4/5] place-items-center overflow-hidden bg-gradient-to-br ${GRADIENTS[i]}`}>
                  <div className="bg-grid absolute inset-0 opacity-50" />
                  <span className="font-heading text-8xl font-semibold text-gold-gradient transition-transform duration-700 group-hover:scale-110">
                    {initials(m.name)}
                  </span>
                  {/* Panel que sube en hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-6 text-sm leading-relaxed text-white/80 backdrop-blur transition-transform duration-500 group-hover:translate-y-0">
                    {m.bio}
                    <div className="mt-4 flex gap-3">
                      <a href={FIRM.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-accent hover:text-accent">
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${FIRM.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:border-accent hover:text-accent">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
