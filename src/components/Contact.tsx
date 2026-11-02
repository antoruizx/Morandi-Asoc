import { useState } from "react";
import { Clock, Lock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { FIRM, mapsEmbedUrl, mapsLink, whatsappLink } from "@/lib/firm";
import { Reveal, SectionHeading, WhatsAppIcon } from "@/components/motion";

const fieldClass =
  "peer w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 pb-2.5 pt-6 text-sm text-white placeholder-transparent outline-none transition-all focus:border-accent focus:bg-white/[0.07] focus:ring-2 focus:ring-accent/20";
const labelClass =
  "pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-wider text-white/45 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-accent";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const buildMessage = () =>
    [
      t.contact.messageIntro,
      "",
      `${t.contact.name}: ${form.name}`,
      form.email && `${t.contact.email}: ${form.email}`,
      form.phone && `${t.contact.phone}: ${form.phone}`,
      form.area && `${t.contact.area}: ${form.area}`,
      "",
      form.message,
    ]
      .filter((line): line is string => typeof line === "string")
      .join("\n");

  const send = (channel: "whatsapp" | "email") => (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    const formEl = (e.currentTarget as HTMLElement).closest("form");
    if (formEl && !formEl.reportValidity()) return;
    const text = buildMessage();
    const url =
      channel === "whatsapp"
        ? whatsappLink(text)
        : `mailto:${FIRM.email}?subject=${encodeURIComponent(`${t.contact.area}: ${form.area || "-"} · ${form.name}`)}&body=${encodeURIComponent(text)}`;
    window.open(url, channel === "whatsapp" ? "_blank" : "_self");
    toast.success(t.contact.sentTitle, { description: t.contact.sentDesc });
  };

  const info = [
    { icon: MapPin, label: t.contact.addressLabel, value: <>{FIRM.addressLine1}<br />{FIRM.addressLine2}</>, href: mapsLink },
    { icon: Phone, label: t.contact.phoneLabel, value: FIRM.phoneDisplay, href: FIRM.phoneHref },
    { icon: Mail, label: t.contact.emailLabel, value: FIRM.email, href: `mailto:${FIRM.email}` },
    { icon: Clock, label: t.contact.hoursLabel, value: t.contact.hoursValue },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
      <div className="container relative">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} light />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Formulario */}
          <Reveal variant="left">
            <form onSubmit={send("whatsapp")} className="glass rounded-[2rem] p-6 md:p-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative sm:col-span-2">
                  <input id="name" name="name" required placeholder=" " value={form.name} onChange={onChange} className={fieldClass} autoComplete="name" />
                  <label htmlFor="name" className={labelClass}>{t.contact.name}</label>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" placeholder=" " value={form.email} onChange={onChange} className={fieldClass} autoComplete="email" />
                  <label htmlFor="email" className={labelClass}>{t.contact.email}</label>
                </div>
                <div className="relative">
                  <input id="phone" name="phone" type="tel" placeholder=" " value={form.phone} onChange={onChange} className={fieldClass} autoComplete="tel" />
                  <label htmlFor="phone" className={labelClass}>{t.contact.phone}</label>
                </div>
                <div className="relative sm:col-span-2">
                  <select
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={onChange}
                    className={`${fieldClass} appearance-none [&>option]:bg-ink`}
                  >
                    <option value="">{t.contact.areaPlaceholder}</option>
                    {t.areas.items.map((a) => (
                      <option key={a.title} value={a.title}>{a.title}</option>
                    ))}
                    <option value={t.contact.areaOther}>{t.contact.areaOther}</option>
                  </select>
                  <label htmlFor="area" className="pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                    {t.contact.area}
                  </label>
                </div>
                <div className="relative sm:col-span-2">
                  <textarea id="message" name="message" required rows={5} placeholder=" " value={form.message} onChange={onChange} className={`${fieldClass} resize-none`} />
                  <label htmlFor="message" className={labelClass}>{t.contact.message}</label>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-gold flex-1">
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.contact.sendWhatsapp}
                </button>
                <button type="button" onClick={send("email")} className="btn-ghost-light flex-1">
                  <Mail className="h-4 w-4" />
                  {t.contact.sendEmail}
                </button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/45">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                {t.contact.privacy}
              </p>
            </form>
          </Reveal>

          {/* Datos + mapa */}
          <Reveal variant="right" delay={150} className="flex flex-col gap-6">
            <ul className="glass grid gap-6 rounded-[2rem] p-6 sm:grid-cols-2 md:p-8">
              {info.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/45">{label}</span>
                      <span className="mt-1 block break-words text-sm leading-relaxed text-white/85">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex gap-4">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="group relative min-h-[260px] flex-1 overflow-hidden rounded-[2rem] border border-white/10">
              <iframe
                title="Mapa"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[85%] invert-[90%] hue-rotate-180 transition-all duration-700 group-hover:grayscale-0 group-hover:invert-0 group-hover:hue-rotate-0"
              />
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-gold absolute bottom-4 left-4 !px-5 !py-2.5">
                <Navigation className="h-4 w-4" />
                {t.contact.directions}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
