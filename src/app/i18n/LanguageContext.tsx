import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "../types";
import { translations, type Translation } from "./translations";

interface LanguageContextValue {
  language: Language;
  t: Translation;
  setLanguage: (language: Language) => void;
}

const LANGUAGE_KEY = "jp-language";

/** The visitor's last choice, or else the language of their browser. */
function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === "pt-BR" || saved === "en-US") {
      return saved;
    }
  } catch {
    // Storage blocked: fall back to the browser's language.
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt-BR" : "en-US";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Keep the document language and tab title in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      t: translations[language],
      setLanguage: (next) => {
        setLanguage(next);
        try {
          localStorage.setItem(LANGUAGE_KEY, next);
        } catch {
          // Storage blocked: the choice lasts until the page reloads.
        }
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
