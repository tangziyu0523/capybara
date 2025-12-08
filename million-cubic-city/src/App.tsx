import { useState, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { CityModel } from './components/CityModel';
import { ThemeSwitcher } from './components/ui/ThemeSwitcher/ThemeSwitcher';
import { Home } from './components/pages/Home';
import ArchiveDetail from './components/pages/ArchiveDetail';
import TechDetail from './components/pages/TechDetail';
import GenericSectionDetail from './components/pages/GenericSectionDetail';
import EnvironmentDesign from './components/pages/EnvironmentDesign';
import { AdminControls } from './components/admin/AdminControls';
import { useTranslation } from 'react-i18next';

function App() {
  const [isNight, setIsNight] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { t } = useTranslation();

  // Editable Hero State
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: ''
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setHeroData({
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const toggleTheme = () => setIsNight(!isNight);

  return (
    <main className="relative w-full min-h-screen text-gray-100 bg-gray-900 overflow-x-hidden font-sans selection:bg-blue-500/30 transition-colors duration-500">
      <ThemeSwitcher />
      <AdminControls />
      <Navigation isNight={isNight} toggleTheme={toggleTheme} customTitle={heroData.title} />

      {/* Background 3D City - Persistent */}
      <div
        className={`fixed inset-0 w-full h-full pointer-events-auto transition-all duration-1000 ease-in-out ${hasStarted ? 'opacity-50 blur-[2px]' : 'opacity-100 blur-0'}`}
      >
        <Suspense fallback={<div className="w-full h-full bg-gray-900 flex items-center justify-center">Loading 3D Model...</div>}>
          <CityModel isNight={isNight} />
        </Suspense>
      </div>

      <Routes>
        <Route path="/" element={
          <Home
            isNight={isNight}
            heroData={heroData}
            setHeroData={setHeroData}
            isEditingHero={isEditingHero}
            setIsEditingHero={setIsEditingHero}
            onStart={() => setHasStarted(true)}
          />
        } />
        <Route path="/archive/:id" element={<ArchiveDetail />} />
        <Route path="/tech/:id" element={<TechDetail />} />
        <Route path="/energy/:id" element={<GenericSectionDetail sectionName="energy" />} />
        <Route path="/environment/:id" element={<EnvironmentDesign />} />
        <Route path="/population/:id" element={<GenericSectionDetail sectionName="population" />} />
      </Routes>
    </main>
  );
}

export default App;
