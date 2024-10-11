import { useState, useEffect, useCallback } from 'react';
import MooDengSvg from 'src/svg/MooDengSvg';

interface FallingMooDeng {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
}

interface FallingMooDengsProps {
  trigger: boolean;
}

const FallingMooDengs: React.FC<FallingMooDengsProps> = ({ trigger }) => {
  const [mooDengs, setMooDengs] = useState<FallingMooDeng[]>([]);

  const createMooDengs = useCallback(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -100 - Math.random() * 500,
      speed: 3 + Math.random() * 7,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5,
    }));
  }, []);

  useEffect(() => {
    if (trigger) {
      setMooDengs(createMooDengs());
    }
  }, [trigger, createMooDengs]);

  useEffect(() => {
    if (mooDengs.length > 0) {
      const animationInterval = setInterval(() => {
        setMooDengs((prev) => {
          const updatedMooDengs = prev
            .map((mooDeng): FallingMooDeng => ({
              ...mooDeng,
              y: mooDeng.y + mooDeng.speed,
              rotation: (mooDeng.rotation + mooDeng.rotationSpeed) % 360,
            }))
            .filter((mooDeng) => mooDeng.y < window.innerHeight + 100);

          return updatedMooDengs.length === 0 ? [] : updatedMooDengs;
        });
      }, 16);

      return () => clearInterval(animationInterval);
    }
  }, [mooDengs]);

  if (mooDengs.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {mooDengs.map((mooDeng) => (
        <div
          key={mooDeng.id}
          className="absolute"
          style={{
            left: `${mooDeng.x}px`,
            top: `${mooDeng.y}px`,
            transform: `rotate(${mooDeng.rotation}deg)`,
          }}
        >
          <MooDengSvg />
        </div>
      ))}
    </div>
  );
};

export default FallingMooDengs;
