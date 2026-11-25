import { useEffect, useState } from "react";
import { motion } from "motion/react";
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

  const copyLabel = {
    idle: t.contact.copyEmail,
    copied: t.contact.emailCopied,
    failed: t.contact.copyFailed,
  }[copyState];

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
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <a
                href={`mailto:${t.contact.email}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 min-[380px]:px-5 sm:px-8 py-4 border-2 border-transparent text-[13px] min-[380px]:text-sm sm:text-base leading-6 bg-[#FACC15] text-[#0A0A0A] rounded-full hover:bg-[#FDE047] transition-all duration-300 w-full sm:w-fit justify-center"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.sendEmail}
              >
                <Mail size={20} className="shrink-0" />
                <span className="[overflow-wrap:anywhere]">{t.contact.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                style={{ fontWeight: 500 }}
              >
                {copyState === "copied" ? <Check size={20} className="shrink-0 text-[#4ADE80]" /> : <Copy size={20} className="shrink-0" />}
                <span aria-live="polite">{copyLabel}</span>
              </button>
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
