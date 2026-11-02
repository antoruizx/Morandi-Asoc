import { ArrowUp, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FIRM, whatsappLink } from "@/lib/firm";
import { Logo } from "@/components/Navbar";
import { WhatsAppIcon } from "@/components/motion";

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { id: "areas", label: t.nav.areas },
    { id: "estudio", label: t.nav.about },
    { id: "proceso", label: t.nav.process },
    { id: "equipo", label: t.nav.team },
    { id: "faq", label: t.nav.faq },
    { id: "contacto", label: t.nav.contact },
  ];

  const socials = [
    { href: whatsappLink(t.whatsapp.message), icon: WhatsAppIcon, label: "WhatsApp" },
    { href: FIRM.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: FIRM.instagram, icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[hsl(222_50%_6%)] text-white">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-white/55">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-accent">{t.footer.nav}</h4>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm lg:grid-cols-1">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-white/60 transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-accent">{t.footer.contact}</h4>
          <ul className="mt-6 space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{FIRM.addressLine1}<br />{FIRM.addressLine2}</span>
            </li>
            <li>
              <a href={FIRM.phoneHref} className="flex gap-3 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {FIRM.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${FIRM.email}`} className="flex gap-3 break-all transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {FIRM.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 md:flex-row">
          <p>© {year} {FIRM.name}. {t.footer.rights}</p>
          <p className="text-center">{t.footer.disclaimer}</p>
          <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-accent">
            {t.footer.backToTop}
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
