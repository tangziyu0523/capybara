import { useState, useRef, Suspense, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { ArrowLeft, Maximize2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// --- Types ---
interface TerrainCard {
  id: string;
  titleKey: string;
  descKey: string;
  cameraPos: [number, number, number];
  target: [number, number, number];
}

// --- Mock Data (Static Config) ---
const CARD_CONFIG: TerrainCard[] = [
  {
    id: '1',
    titleKey: 'environment.design_module.cards.central.title',
    descKey: 'environment.design_module.cards.central.desc',
    cameraPos: [10, 10, 10],
    target: [0, 0, 0]
  },
  {
    id: '2',
    titleKey: 'environment.design_module.cards.energy.title',
    descKey: 'environment.design_module.cards.energy.desc',
    cameraPos: [-15, 5, 5],
    target: [-5, 0, 0]
  },
  {
    id: '3',
    titleKey: 'environment.design_module.cards.residential.title',
    descKey: 'environment.design_module.cards.residential.desc',
    cameraPos: [5, 15, -10],
    target: [2, 5, -2]
  },
  {
    id: '4',
    titleKey: 'environment.design_module.cards.eco.title',
    descKey: 'environment.design_module.cards.eco.desc',
    cameraPos: [0, 8, 15],
    target: [0, 2, 5]
  }
];

// --- 3D Components ---

const LoadingScreen = () => {
  const { progress } = useProgress();
  const { t } = useTranslation();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-black/80 p-4 rounded-xl backdrop-blur-md border border-white/10">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <div className="text-sm font-mono">{progress.toFixed(0)}% {t('environment.design_module.loading')}</div>
      </div>
    </Html>
  );
};

const CameraRig = ({
  targetPos,
  targetLookAt,
  isAnimating
}: {
  targetPos: THREE.Vector3,
  targetLookAt: THREE.Vector3,
  isAnimating: boolean
}) => {
  const { controls } = useThree();

  useFrame((state, delta) => {
    if (isAnimating) {
      // Smoothly interpolate camera position
      state.camera.position.lerp(targetPos, 2.5 * delta);

      // For OrbitControls, we need to animate the target, not just camera.lookAt
      // casting controls to any because OrbitControls type definition can be tricky with useRef
      const controlsTarget = (controls as unknown as { target: THREE.Vector3 })?.target;
      if (controlsTarget) {
        controlsTarget.lerp(targetLookAt, 2.5 * delta);
      }
    }
  });

  return null;
};

// Simple procedural city for demo purposes
const CityModel = ({ highlightedId }: { highlightedId: string | null }) => {
  return (
    <group>
      <gridHelper args={[100, 100, 0x444444, 0x222222]} />

      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial color={highlightedId === '1' ? "#4ade80" : "#444"} wireframe={false} />
      </mesh>
      {/* Blinking Effect Overlay */}
      {highlightedId === '1' && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4.2, 8.2, 4.2]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* Energy Core */}
      <mesh position={[-5, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color={highlightedId === '2' ? "#60a5fa" : "#333"} />
      </mesh>
      {highlightedId === '2' && (
        <mesh position={[-5, 0, 0]}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* Residential */}
      <mesh position={[2, 5, -2]}>
        <cylinderGeometry args={[1, 1, 6, 32]} />
        <meshStandardMaterial color={highlightedId === '3' ? "#f472b6" : "#555"} />
      </mesh>
      {highlightedId === '3' && (
        <mesh position={[2, 5, -2]}>
          <cylinderGeometry args={[1.2, 1.2, 6.2, 32]} />
          <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.3} />
        </mesh>
      )}

      {/* Eco */}
      <mesh position={[0, 2, 5]}>
        <coneGeometry args={[3, 4, 4]} />
        <meshStandardMaterial color={highlightedId === '4' ? "#a3e635" : "#222"} />
      </mesh>
      {highlightedId === '4' && (
        <mesh position={[0, 2, 5]}>
          <coneGeometry args={[3.2, 4.2, 4]} />
          <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

// --- Main Page Component ---

const EnvironmentDesign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Memoize cards with translations
  const cards = useMemo(() => CARD_CONFIG.map(card => ({
    ...card,
    title: t(card.titleKey),
    description: t(card.descKey)
  })), [t]);

  // State
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cameraTarget, setCameraTarget] = useState({
    pos: new THREE.Vector3(20, 20, 20),
    lookAt: new THREE.Vector3(0, 0, 0)
  });

  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Initialize or reset view
  const handleResetView = () => {
    setCameraTarget({
      pos: new THREE.Vector3(20, 20, 20),
      lookAt: new THREE.Vector3(0, 0, 0)
    });
    setSelectedCardId(null);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Handle card selection
  const handleCardClick = (card: TerrainCard) => {
    setSelectedCardId(card.id);
    setCameraTarget({
      pos: new THREE.Vector3(...card.cameraPos),
      lookAt: new THREE.Vector3(...card.target)
    });
    setIsAnimating(true);
    // Stop animating after transition (approx 1s)
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const handleBack = () => {
    // Check if we have history state to go back to specific section
    if (location.state?.from) {
      navigate(-1);
    } else {
      // Default fallback
      navigate('/', { state: { target: '#environment' } });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden relative">
      {/* Back Button (Floating) */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-all group bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm">{t('environment.design_module.back')}</span>
      </button>

      {/* LEFT PANEL: Cards (40%) */}
      <div className="w-full md:w-[40%] h-[40vh] md:h-full flex flex-col border-r border-white/10 bg-gray-900/95 backdrop-blur-sm z-10">
        <div className="p-8 pt-20 pb-4 border-b border-white/10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            {t('environment.design_module.title')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('environment.design_module.subtitle')}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card)}
              className={`p-5 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${selectedCardId === card.id
                ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
            >
              {selectedCardId === card.id && (
                <motion.div
                  layoutId="active-glow"
                  className="absolute inset-0 bg-blue-500/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <h3 className={`text-lg font-semibold mb-2 ${selectedCardId === card.id ? 'text-blue-300' : 'text-gray-200'}`}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 flex items-center text-xs text-gray-500 gap-2">
                  <span className="px-2 py-1 bg-black/30 rounded border border-white/5 font-mono">
                    COORD: {card.target.join(', ')}
                  </span>
                  {selectedCardId === card.id && (
                    <span className="ml-auto text-blue-400 flex items-center gap-1 animate-pulse">
                      <Maximize2 size={12} /> {t('environment.design_module.viewing')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: 3D Viewer (60%) */}
      <div className="w-full md:w-[60%] h-[60vh] md:h-full relative bg-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [20, 20, 20], fov: 45 }}>
          <Suspense fallback={<LoadingScreen />}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />

            <CityModel highlightedId={selectedCardId} />

            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={50}
            />

            <CameraRig
              targetPos={cameraTarget.pos}
              targetLookAt={cameraTarget.lookAt}
              isAnimating={isAnimating}
            />
          </Suspense>
        </Canvas>

        {/* Overlay Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button
            onClick={handleResetView}
            className="p-3 bg-black/50 hover:bg-blue-600/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg"
            title={t('environment.design_module.reset_view')}
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Error Fallback (Visual Mockup) */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/5 text-xs text-gray-400 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            WebGL Active | 60 FPS
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDesign;
