import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { PREMIUM_EASE } from "../constants/animation";
import { SOCIAL_LINKS } from "../constants/links";
import { useLanguage } from "../i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (copyState === "idle") {
      return;
    }
    const timer = window.setTimeout(() => setCopyState("idle"), 2500);
    return () => clearTimeout(timer);
  }, [copyState]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const copyMessage = copyState === "failed" ? t.contact.copyFailed : t.contact.emailCopied;

  return (
    <section id="contact" className="py-14 sm:py-32 scroll-mt-16 sm:scroll-mt-0 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="relative p-6 sm:p-16 lg:p-20 rounded-3xl bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] overflow-hidden border border-[#262626]"
      >
        <div className="relative z-10 max-w-2xl">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-6"
            style={{ fontWeight: 700 }}
          >
            {t.contact.title}
          </h2>
          <p className="text-lg sm:text-xl text-[#D4D4D4] mb-8 sm:mb-12 leading-relaxed">
            {t.contact.description}
          </p>
          <div className="flex flex-col gap-3 sm:gap-6">
            {/* On phones the copy icon is the end of the e-mail pill; on wider screens, a circle beside it. */}
            <div className="flex sm:items-center sm:gap-4 w-full sm:w-fit">
              <a
                href={`mailto:${t.contact.email}`}
                className="flex-1 min-w-0 inline-flex items-center justify-center gap-2 sm:gap-3 pl-4 pr-2 sm:px-8 py-4 sm:border-2 border-transparent text-[12px] min-[375px]:text-[13px] sm:text-base leading-6 bg-[#FACC15] text-[#0A0A0A] rounded-l-full sm:rounded-full hover:bg-[#FDE047] transition-all duration-300"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.sendEmail}
              >
                <Mail size={20} className="hidden sm:block shrink-0" />
                {/* Where it doesn't fit on one line, it breaks before the @. */}
                <span className="[overflow-wrap:anywhere]">
                  {t.contact.email.split("@")[0]}
                  <wbr />@{t.contact.email.split("@")[1]}
                </span>
              </a>
              <div className="relative shrink-0 flex">
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t.contact.copyEmail}
                  title={t.contact.copyEmail}
                  className="flex items-center justify-center w-13 sm:w-[60px] sm:h-[60px] rounded-r-full sm:rounded-full bg-[#FACC15] sm:bg-transparent border-l sm:border-2 border-[#0A0A0A]/20 sm:border-[#262626] text-[#0A0A0A] sm:text-[#F5F5F5] hover:bg-[#FDE047] sm:hover:bg-transparent sm:hover:border-[#FACC15] sm:hover:text-[#FACC15] active:scale-[0.97] transition-all duration-300"
                >
                  {copyState === "copied" ? <Check size={20} /> : <Copy size={20} />}
                </button>
                <span role="status" className="absolute bottom-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mb-2 pointer-events-none">
                  <AnimatePresence>
                    {copyState !== "idle" && (
                      <motion.span
                        key={copyState}
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: PREMIUM_EASE }}
                        className="block px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-sm text-[#0A0A0A] whitespace-nowrap"
                        style={{ fontWeight: 500 }}
                      >
                        {copyMessage}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4 sm:items-center">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.visitLinkedin}
              >
                <Linkedin size={20} className="shrink-0" />
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.visitGithub}
              >
                <Github size={20} className="shrink-0" />
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC15]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#262626]/20 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}
