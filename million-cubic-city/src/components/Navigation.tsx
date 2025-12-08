import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  isNight: boolean;
  toggleTheme: () => void;
  customTitle?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ isNight, toggleTheme, customTitle }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['story', 'energy', 'tech', 'environment', 'population', 'upload'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.substring(1));
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: t('nav.story'), href: '#story' },
    { name: t('nav.energy'), href: '#energy' },
    { name: t('nav.tech'), href: '#tech' },
    { name: t('nav.environment'), href: '#environment' },
    { name: t('nav.population'), href: '#population' },
    { name: t('nav.upload'), href: '#upload' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white tracking-wider">{customTitle || t('hero.title')}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </a>
                );
              })}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title={isNight ? t('nav.switchToDay') : t('nav.switchToNight')}
              >
                {isNight ? <Moon className="text-blue-300" size={20} /> : <Sun className="text-yellow-300" size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1 text-gray-300"
              >
                <Languages size={20} />
                <span className="text-xs font-bold">{i18n.language === 'en' ? 'EN' : '中'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-white p-2"
            >
              <span className="font-bold">{i18n.language === 'en' ? 'EN' : '中'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === item.href.substring(1) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
            >
              {isNight ? t('nav.switchToDay') : t('nav.switchToNight')}
              {isNight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
