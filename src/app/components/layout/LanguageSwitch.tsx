import { useId } from "react";
import { motion } from "motion/react";
import type { Language } from "../../types";
import { PREMIUM_EASE } from "../../constants/animation";
import { useLanguage } from "../../i18n/LanguageContext";

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: "pt-BR", label: "PT", name: "Português" },
  { code: "en-US", label: "EN", name: "English" },
];

/** Both languages side by side, with the current one marked. */
export function LanguageSwitch() {
  const { t, language, setLanguage } = useLanguage();
  // The intro and the header each show one, so the sliding mark can't share an id.
  const markId = useId();

  return (
    <div
      role="group"
      aria-label={t.a11y.languageSwitch}
      className="flex items-center rounded-full border border-[#262626] bg-[#111111] px-0.5"
    >
      {LANGUAGES.map(({ code, label, name }) => {
        const current = code === language;
        return (
          // The taller hit area reaches past the pill, so it stays easy to tap on phones.
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLanguage(code)}
            aria-label={name}
            aria-pressed={current}
            className={`relative -my-1.5 h-11 w-7 min-[380px]:w-8 sm:w-9 text-xs font-semibold transition-colors duration-300 ${current ? "text-[#F5F5F5]" : "text-[#A3A3A3] hover:text-[#F5F5F5]"}`}
          >
            {current && (
              <motion.span
                layoutId={markId}
                transition={{ duration: 0.35, ease: PREMIUM_EASE }}
                className="absolute inset-x-0 inset-y-2 rounded-full bg-[#2E2E2E]"
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
