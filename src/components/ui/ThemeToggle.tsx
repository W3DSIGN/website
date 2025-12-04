import { useEffect, useState } from 'react';
import { CyberpunkCursor } from './CyberpunkCursor';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      {isDark && <CyberpunkCursor />}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-3 text-3xl md:text-4xl lg:text-5xl uppercase hover:opacity-70 transition-opacity"
        aria-label={isDark ? 'Switch to formal mode' : 'Switch to cyberpunk mode'}
      >
        <span>{isDark ? '💼 Formal Mode' : '⚡ Cyberpunk'}</span>
      </button>
    </>
  );
};
