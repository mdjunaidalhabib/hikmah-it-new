import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en/index.js";
import bn from "./locales/bn/index.js";

const dictionaries = { en, bn };
const STORAGE_KEY = "hikmah-lang";

const LanguageContext = createContext(null);

function getFromDict(dict, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "bn" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = dictionaries[lang] || dictionaries.en;

    const t = (path, fallback) => {
      const value = getFromDict(dict, path);
      if (value === undefined) return fallback !== undefined ? fallback : path;
      return value;
    };

    const tList = (path) => {
      const value = getFromDict(dict, path);
      return Array.isArray(value) ? value : [];
    };

    const toggleLang = () => setLang((prev) => (prev === "en" ? "bn" : "en"));

    return { lang, setLang, toggleLang, t, tList };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
