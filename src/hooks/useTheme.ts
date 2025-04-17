import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;
  
  const getInitialTheme = (): Theme => {
    if (isLocalStorageAvailable) {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return 'light';
  };
  
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('theme', theme);
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, isLocalStorageAvailable]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
};
