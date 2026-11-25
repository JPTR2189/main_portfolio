import { motion } from "motion/react";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import { scrollToSection } from "../../utils/scrollToSection";
import { useActiveSection } from "../../utils/useActiveSection";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { t } = useLanguage();
  const activeSection = useActiveSection();

  const navItems = [
    { sectionId: "projects", label: t.nav.projects },
    { sectionId: "about", label: t.nav.about },
    { sectionId: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#262626]"
    >
      <div className="max-w-[88rem] mx-auto pl-6 pr-4 lg:pl-12 lg:pr-6 h-16 sm:h-20 flex items-center justify-between">
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`JP, ${t.a11y.backToTop}`}
          className="py-2 text-lg tracking-tight text-[#F5F5F5] font-semibold hover:text-[#FACC15] transition-colors duration-300"
        >
          JP
        </motion.button>

        <nav className="ml-auto flex items-center gap-3 min-[380px]:gap-5 sm:gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.sectionId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => scrollToSection(item.sectionId)}
              aria-current={item.sectionId === activeSection ? "location" : undefined}
              className={`relative py-3 text-sm hover:text-[#FACC15] transition-colors duration-300 ${item.sectionId === activeSection ? "text-[#F5F5F5]" : "text-[#A3A3A3]"}`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-1.5 h-0.5 rounded-full bg-[#FACC15] transition-transform duration-300 ${item.sectionId === activeSection ? "scale-x-100" : "scale-x-0"}`}
              />
            </motion.button>
          ))}

          <div className="flex items-center sm:ml-4 pl-2 min-[380px]:pl-3 sm:pl-4 border-l border-[#262626]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <LanguageSwitch />
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
