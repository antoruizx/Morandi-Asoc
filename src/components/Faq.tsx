import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/motion";

const Faq = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">{t.faq.eyebrow}</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl">{t.faq.title}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.faq.subtitle}</p>
          </Reveal>
          <Reveal delay={300}>
            <a href="#contacto" className="group mt-8 inline-flex items-center gap-2 font-semibold text-accent">
              {t.faq.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
          {t.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <AccordionItem
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-6 transition-all duration-300 data-[state=open]:border-accent/50 data-[state=open]:shadow-[0_20px_40px_-25px_hsl(var(--gold)/0.5)]"
              >
                <AccordionTrigger className="gap-4 py-6 text-left font-heading text-xl font-semibold hover:no-underline md:text-2xl [&>svg]:text-accent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
