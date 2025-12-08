import { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface CityModelProps {
  isNight: boolean;
}

const Building = ({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { theme } = useTheme();

  const buildingColor = useMemo(() => {
    if (hovered) return 'hotpink';
    if (theme === 'pastoral') return Math.random() > 0.5 ? '#4A6D58' : '#8B4513'; // Green & Wood
    if (theme === 'nature') return Math.random() > 0.5 ? '#2C5F2D' : '#97BC62'; // Forest greens
    if (theme === 'minimalist') return Math.random() > 0.5 ? '#F5F5F5' : '#E0E0E0'; // Whites
    return color; // Default for cyberpunk/dark
  }, [hovered, theme, color]);

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={buildingColor} roughness={0.5} metalness={0.2} />
    </mesh>
  );
};

const Hotspot = ({ position, label, content }: { position: [number, number, number]; label: string; content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <group position={position}>
      <mesh onClick={() => setIsOpen(!isOpen)}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="red" transparent opacity={0.6} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="pointer-events-none relative">
          <div
            className="bg-white/90 text-black px-2 py-1 rounded cursor-pointer pointer-events-auto whitespace-nowrap font-bold text-sm transform -translate-x-1/2 -translate-y-full shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {label}
          </div>
          {isOpen && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-48 bg-black/80 text-white p-3 rounded text-xs pointer-events-auto backdrop-blur-sm border border-gray-700 z-50">
              {content}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

const ProceduralCity = () => {
  const buildings = useMemo(() => {
    const temp = [];
    const gridSize = 10;
    const gap = 2;

    for (let x = -gridSize; x <= gridSize; x += gap) {
      for (let z = -gridSize; z <= gridSize; z += gap) {
        if (Math.random() > 0.7) continue; // Random gaps
        const height = Math.random() * 5 + 1;
        temp.push(
          <Building
            key={`${x}-${z}`}
            position={[x, height / 2, z]}
            size={[1.5, height, 1.5]}
            color={Math.random() > 0.5 ? '#4a5568' : '#2d3748'}
          />
        );
      }
    }

    // Add a tall landmark
    temp.push(
      <Building
        key="landmark"
        position={[0, 5, 0]}
        size={[2, 10, 2]}
        color="#63b3ed"
      />
    );
    return temp;
  }, []);

  return <group>{buildings}</group>;
};

export const CityModel: React.FC<CityModelProps> = ({ isNight }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const fogColor = useMemo(() => {
    if (isNight) return '#1a202c';
    if (theme === 'pastoral') return '#F2E6D8';
    if (theme === 'minimalist') return '#FFFFFF';
    if (theme === 'nature') return '#F0F7E6';
    return '#f7fafc';
  }, [isNight, theme]);

  return (
    <div className="h-screen w-full absolute top-0 left-0 -z-10">
      <Canvas shadows camera={{ position: [15, 15, 15], fov: 50 }}>
        <fog attach="fog" args={[fogColor, 10, 50]} />
        <ambientLight intensity={isNight ? 0.2 : 0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={isNight ? 0.5 : 1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {isNight && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

        <group position={[0, -1, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={isNight ? '#1a202c' : (theme === 'pastoral' ? '#F2E6D8' : '#e2e8f0')} />
          </mesh>
          <ProceduralCity />
          <Hotspot
            position={[0, 10, 0]}
            label={t('city.hotspots.hub.label')}
            content={t('city.hotspots.hub.content')}
          />
          <Hotspot
            position={[8, 3, 8]}
            label={t('city.hotspots.eco.label')}
            content={t('city.hotspots.eco.content')}
          />
        </group>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute bottom-10 left-10 text-white/50 text-sm pointer-events-none z-10">
        <p>{t('city.controls')}</p>
      </div>
    </div>
  );
};
