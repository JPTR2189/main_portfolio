import { motion } from "motion/react";
import { Globe } from "lucide-react";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";
import { scrollToSection } from "../../utils/scrollToSection";

export function Header() {
  const { t, toggleLanguage } = useLanguage();

  const navItems = [
    { sectionId: "about", label: t.nav.about },
    { sectionId: "projects", label: t.nav.projects },
    { sectionId: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#262626]"
    >
      <div className="max-w-[88rem] mx-auto pl-6 pr-4 lg:pl-12 lg:pr-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg tracking-tight text-[#F5F5F5] font-semibold"
        >
          JP
        </motion.div>

        <nav className="ml-auto flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.sectionId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-sm text-[#A3A3A3] hover:text-[#FACC15] transition-colors duration-300"
            >
              {item.label}
            </motion.button>
          ))}

          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#262626]">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-[#171717] transition-colors duration-300"
              aria-label={t.a11y.toggleLanguage}
            >
              <Globe size={18} className="text-[#A3A3A3]" />
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
