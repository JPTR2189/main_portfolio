import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { PREMIUM_EASE } from "../constants/animation";
import { SOCIAL_LINKS } from "../constants/links";
import { useLanguage } from "../i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="relative p-16 lg:p-20 rounded-3xl bg-gradient-to-br from-[#171717] via-[#111111] to-[#0A0A0A] overflow-hidden border border-[#262626]"
      >
        <div className="relative z-10 max-w-2xl">
          <h2
            className="text-5xl lg:text-6xl tracking-tight text-[#F5F5F5] mb-6"
            style={{ fontWeight: 700 }}
          >
            {t.contact.title}
          </h2>
          <p className="text-xl text-[#D4D4D4] mb-12 leading-relaxed">
            {t.contact.description}
          </p>
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${t.contact.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FACC15] text-[#0A0A0A] rounded-full hover:bg-[#FDE047] transition-all duration-300 w-fit"
              style={{ fontWeight: 500 }}
              aria-label={t.a11y.sendEmail}
            >
              <Mail size={20} />
              {t.contact.email}
            </a>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.visitLinkedin}
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#262626] text-[#F5F5F5] rounded-full hover:border-[#FACC15] hover:text-[#FACC15] transition-all duration-300"
                style={{ fontWeight: 500 }}
                aria-label={t.a11y.visitGithub}
              >
                <Github size={20} />
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
