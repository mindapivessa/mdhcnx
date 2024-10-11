import { useState, useEffect } from 'react';
import MooDengSvg from 'src/svg/MooDengSvg';

interface FallingMooDeng {
  id: number;
  x: number;
  y: number;
  speed: number;
  rotation: number;
}

const FallingMooDengs: React.FC<{ show: boolean }> = ({ show }) => {
  const [mooDengs, setMooDengs] = useState<FallingMooDeng[]>([]);

  useEffect(() => {
    if (show) {
      const newMooDengs = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -100,
        speed: 1 + Math.random() * 4,
        rotation: Math.random() * 360,
      }));
      setMooDengs(newMooDengs);

      const animationInterval = setInterval(() => {
        setMooDengs((prev) =>
          prev.map((mooDeng) => ({
            ...mooDeng,
            y: mooDeng.y + mooDeng.speed,
            rotation: mooDeng.rotation + 2,
          }))
        );
      }, 50);

      return () => clearInterval(animationInterval);
    } else {
      setMooDengs([]);
    }
  }, [show]);

  if (!show) return null;

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