import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FIRM, whatsappLink } from "@/lib/firm";
import { WhatsAppIcon } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Botones flotantes de WhatsApp y email, con un globo de ayuda que aparece unos segundos. */
const FloatingActions = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 1200);
    const open = setTimeout(() => setBubble(true), 4000);
    const close = setTimeout(() => setBubble(false), 11000);
    return () => [show, open, close].forEach(clearTimeout);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-700 md:bottom-8 md:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0",
      )}
    >
      <div
        className={cn(
          "relative max-w-[15rem] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm font-medium text-ink shadow-2xl transition-all duration-500",
          bubble ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
        role="status"
      >
        {t.whatsapp.tooltip}
      </div>

      <a
        href={`mailto:${FIRM.email}`}
        aria-label="Email"
        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink text-accent shadow-xl transition-all hover:-translate-y-1 hover:bg-accent hover:text-accent-foreground"
      >
        <Mail className="h-5 w-5" />
      </a>

      <a
        href={whatsappLink(t.whatsapp.message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        onMouseEnter={() => setBubble(true)}
        onMouseLeave={() => setBubble(false)}
        className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgb(37_211_102/0.7)] transition-transform duration-300 hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </a>
    </div>
  );
};

export default FloatingActions;
