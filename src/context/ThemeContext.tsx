import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Tokens = {
  primary: string;
  background: string;
  foreground: string;
  accent: string;
  border: string;
  radius: number; // in px
  spacingBase: number; // multiplier
};

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  tokens: Tokens | null;
  updateToken: (key: keyof Tokens, value: any) => void;
  resetTokens: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  const [tokens, setTokens] = useState<Tokens | null>(null);

  useEffect(() => {
    document.documentElement.className = theme;
    // When theme changes, we might want to clear overrides or keep them.
    // For now, let's reset custom tokens on theme change so the theme is fully visible.
    setTokens(null);
  }, [theme]);

  const updateToken = (key: keyof Tokens, value: any) => {
    setTokens(prev => ({
      ...prev,
      [key]: value
    }) as Tokens);
  };

  const resetTokens = () => setTokens(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, tokens, updateToken, resetTokens }}>
      {children}
      {tokens && (
        <style>
          {`
            :root {
              ${tokens.primary ? `--primary: ${tokens.primary};` : ''}
              ${tokens.background ? `--background: ${tokens.background};` : ''}
              ${tokens.foreground ? `--foreground: ${tokens.foreground};` : ''}
              ${tokens.accent ? `--accent: ${tokens.accent};` : ''}
              ${tokens.border ? `--border: ${tokens.border};` : ''}
              ${tokens.radius ? `
                --radius-sm: ${tokens.radius / 2}px;
                --radius-md: ${tokens.radius}px;
                --radius-lg: ${tokens.radius * 2}px;
                --radius-full: 9999px;
              ` : ''}
              ${tokens.spacingBase ? `
                --spacing-1: ${0.25 * tokens.spacingBase}rem;
                --spacing-2: ${0.5 * tokens.spacingBase}rem;
                --spacing-3: ${0.75 * tokens.spacingBase}rem;
                --spacing-4: ${1 * tokens.spacingBase}rem;
                --spacing-5: ${1.25 * tokens.spacingBase}rem;
                --spacing-6: ${1.5 * tokens.spacingBase}rem;
                --spacing-8: ${2 * tokens.spacingBase}rem;
                --spacing-10: ${2.5 * tokens.spacingBase}rem;
                --spacing-12: ${3 * tokens.spacingBase}rem;
                --spacing-16: ${4 * tokens.spacingBase}rem;
              ` : ''}
            }
          `}
        </style>
      )}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
