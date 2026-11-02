import { useEffect, useState } from "react";
import { Check, ChevronDown, Globe, Menu, Scale } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/i18n/translations";
import { FIRM, whatsappLink } from "@/lib/firm";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/motion";

export const Logo = ({ className }: { className?: string }) => (
  <a href="#top" className={cn("group flex items-center gap-3", className)} aria-label={FIRM.name}>
    <span className="grid h-10 w-10 place-items-center rounded-full border border-accent/50 text-accent transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-accent group-hover:text-accent-foreground">
      <Scale className="h-5 w-5" strokeWidth={1.5} />
    </span>
    <span className="leading-none">
      <span className="block font-heading text-2xl font-semibold text-white">Morandi &amp; Asociados</span>
      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/90">Estudio Jurídico</span>
    </span>
  </a>
);

const LanguageMenu = ({ compact = false }: { compact?: boolean }) => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={t.nav.language}
      >
        <Globe className="h-4 w-4" />
        {language}
        {!compact && <ChevronDown className="h-3 w-3 opacity-60" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)} className="flex cursor-pointer items-center justify-between gap-4">
            <span>
              <span className="mr-2 text-xs font-bold text-accent">{l.flag}</span>
              {l.label}
            </span>
            {language === l.code && <Check className="h-4 w-4 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const links = [
    { id: "areas", label: t.nav.areas },
    { id: "estudio", label: t.nav.about },
    { id: "proceso", label: t.nav.process },
    { id: "equipo", label: t.nav.team },
    { id: "faq", label: t.nav.faq },
    { id: "contacto", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta el link de la sección visible
  useEffect(() => {
    const sections = ["areas", "estudio", "proceso", "equipo", "faq", "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ink/85 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl" : "bg-transparent py-6",
      )}
    >
      <div className="container flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300",
                active === link.id ? "text-accent after:scale-x-100" : "text-white/75 after:scale-x-0 hover:text-white hover:after:scale-x-100",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageMenu />
          <a href={whatsappLink(t.whatsapp.message)} target="_blank" rel="noopener noreferrer" className="btn-gold !px-5 !py-2.5">
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageMenu compact />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
              aria-label={t.nav.menu}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm border-l-white/10 bg-ink text-white">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <nav className="mt-12 flex flex-col">
                {links.map((link, i) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="fade-in-up border-b border-white/10 py-4 font-heading text-3xl text-white/90 transition-colors hover:text-accent"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <a
                href={whatsappLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-10 w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.hero.ctaPrimary}
              </a>
              <p className="mt-6 text-center text-sm text-white/50">{FIRM.phoneDisplay}</p>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Barra de progreso de lectura */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </header>
  );
};

export default Navbar;
