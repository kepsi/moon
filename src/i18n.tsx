import React from "react";

// Adding a language: add its code here, create the sibling `*.de.ts`-style content files
// for it (lunarDaySource.<code>.ts, heroWisdomSource.<code>.ts, practiceWisdomSource.<code>.ts,
// tithiSource.<code>.ts, zodiacSource.<code>.ts), register the array in each of those files'
// switch, and add its entry to `strings.ts` and `LANGUAGES` below. Nothing else changes shape.
export type Language = "en" | "de";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" }
];

export const LANGUAGE_KEY = "mondkalender.language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "de";
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(() => {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    if (isLanguage(saved)) return saved;
    const browserLang = window.navigator.language?.slice(0, 2);
    return isLanguage(browserLang) ? browserLang : "en";
  });

  const setLanguage = React.useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(LANGUAGE_KEY, next);
  }, []);

  const value = React.useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
