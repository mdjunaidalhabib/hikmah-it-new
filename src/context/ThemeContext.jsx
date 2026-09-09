import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "hikmah-theme";

const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [theme]);

  const value = useMemo(() => {
    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
