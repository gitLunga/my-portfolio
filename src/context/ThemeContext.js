import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "portfolio-theme";

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  // Fall back to the OS preference rather than assuming dark.
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    /*
     * The theme is applied as `data-theme` on <html> rather than a class on
     * <body>, so the token layer in tokens.css can redefine custom properties
     * at the document root. Everything downstream inherits automatically —
     * previously each component needed its own `body.light-mode ...` override,
     * and any component that was missed rendered white-on-white.
     */
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
