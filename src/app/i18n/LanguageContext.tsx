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
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  // Keep the document language and tab title in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      t: translations[language],
      toggleLanguage: () =>
        setLanguage((previous) => (previous === "pt-BR" ? "en-US" : "pt-BR")),
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
