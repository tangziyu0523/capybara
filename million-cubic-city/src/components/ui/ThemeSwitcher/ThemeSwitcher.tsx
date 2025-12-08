import React from 'react';
import { useTheme, type ThemeType } from '../../../context/ThemeContext';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes: { id: ThemeType; name: string; color: string }[] = [
    { id: 'pastoral', name: 'Chinese Pastoral', color: '#4A6D58' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#00F3FF' },
    { id: 'minimalist', name: 'Minimalist', color: '#FFFFFF' },
    { id: 'dark', name: 'Dark Mode', color: '#121212' },
    { id: 'nature', name: 'Nature Eco', color: '#2C5F2D' },
  ];

  return (
    <div className="fixed top-24 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors shadow-lg"
        title="Change Theme"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="absolute top-14 right-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-48 shadow-2xl"
          >
            <div className="space-y-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${theme === t.id
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
