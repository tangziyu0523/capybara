import React, { useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Story, Energy, Tech, Environment, Population, Upload } from '../sections';

interface HomeProps {
  isNight: boolean;
  heroData: { title: string; subtitle: string };
  setHeroData: React.Dispatch<React.SetStateAction<{ title: string; subtitle: string }>>;
  isEditingHero: boolean;
  setIsEditingHero: React.Dispatch<React.SetStateAction<boolean>>;
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ heroData, setHeroData, isEditingHero, setIsEditingHero, onStart }) => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.target) {
      const targetId = location.state.target.substring(1);

      const attemptScroll = (attempts: number) => {
        const element = document.getElementById(targetId);
        if (element) {
          onStart();
          // Use 'auto' for instant jump or 'smooth' for animation. 
          // 'smooth' might be interrupted if the user scrolls.
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Clear state to prevent re-scrolling on re-renders (optional, but good practice if we could modify history)
          // history.replaceState({}, document.title); // This is a bit hacky in React Router
        } else if (attempts > 0) {
          setTimeout(() => attemptScroll(attempts - 1), 100);
        }
      };

      attemptScroll(5);
    }
  }, [location, onStart]);

  const saveHeroData = () => {
    if (heroData.title.trim() && heroData.subtitle.trim()) {
      setIsEditingHero(false);
    }
  };

  const handleStartJourney = () => {
    onStart();
    const storyElement = document.getElementById('story');
    if (storyElement) {
      storyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 pointer-events-none">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center pointer-events-auto">
        <div className="text-center px-4 max-w-4xl mx-auto relative group">
          {!isEditingHero ? (
            <>
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tight drop-shadow-2xl">
                  {heroData.title}
                </h1>
                <button
                  onClick={() => setIsEditingHero(true)}
                  className="absolute -right-12 top-0 p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 size={20} />
                </button>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                {heroData.subtitle}
              </p>
            </>
          ) : (
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 mb-8 animate-in fade-in zoom-in-95 duration-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 text-left">City Name</label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => setHeroData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-2xl font-bold text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 text-left">Description</label>
                  <textarea
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-lg text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none h-32"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsEditingHero(false)}
                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <X size={18} /> Cancel
                  </button>
                  <button
                    onClick={saveHeroData}
                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleStartJourney}
            className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            {t('hero.start')}
          </button>
        </div>
      </section>

      {/* Content Sections - Enable pointer events for interaction */}
      <div className="pointer-events-auto bg-gradient-to-b from-transparent via-gray-900/95 to-gray-900">
        <Story />
        <Energy />
        <Tech />
        <Environment />
        <Population />
        <Upload />

        <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5">
          <p className="mb-2">{t('footer.rights')}</p>
          <p className="text-gray-600">{t('footer.design')}</p>
        </footer>
      </div>
    </div>
  );
};
