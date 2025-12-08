import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeType = 'pastoral' | 'cyberpunk' | 'minimalist' | 'dark' | 'nature';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
}

const themeColors: Record<ThemeType, ThemeContextType['colors']> = {
  pastoral: {
    primary: '#4A6D58',
    secondary: '#F2E6D8',
    accent: '#8B4513',
    bg: '#F2E6D8',
    text: '#2C3E50',
  },
  cyberpunk: {
    primary: '#0B0C15',
    secondary: '#00F3FF',
    accent: '#FF00FF',
    bg: '#0B0C15',
    text: '#E0E0E0',
  },
  minimalist: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    accent: '#333333',
    bg: '#FFFFFF',
    text: '#1A1A1A',
  },
  dark: {
    primary: '#121212',
    secondary: '#1E1E1E',
    accent: '#BB86FC',
    bg: '#121212',
    text: '#E0E0E0',
  },
  nature: {
    primary: '#2C5F2D',
    secondary: '#97BC62',
    accent: '#FFC857',
    bg: '#F0F7E6',
    text: '#1B3A1B',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('cyberpunk'); // Default to cyberpunk

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme];

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-bg', colors.bg);
    root.style.setProperty('--color-text', colors.text);

    // Also update body background
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
