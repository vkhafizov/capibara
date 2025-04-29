import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function CapybaraDisplay({ isAlive, isSleeping }) {
  const { hunger, happiness, energy, hydration } = useContext(GameContext);
  
  // Determine mood based on stats
  const getMood = () => {
    if (!isAlive) return 'dead';
    if (isSleeping) return 'sleeping';
    
    const average = (hunger + happiness + energy + hydration) / 4;
    if (average > 75) return 'happy';
    if (average > 40) return 'okay';
    return 'sad';
  };
  
  const mood = getMood();
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Different states based on mood */}
      {mood === 'dead' && (
        <div className="text-8xl animate-pulse">💀</div>
      )}
      
      {mood === 'sleeping' && (
        <div className="relative">
          <div className="text-8xl transform rotate-6">🦫</div>
          <div className="absolute top-0 right-0 text-3xl animate-bounce-slow">
            💤
          </div>
          <div className="absolute top-12 left-20 text-3xl">
            😴
          </div>
        </div>
      )}
      
      {mood === 'happy' && (
        <div className="relative">
          <div className="text-8xl animate-bounce-slow">🦫</div>
          <div className="absolute top-12 left-20 text-3xl">
            😊
          </div>
        </div>
      )}
      
      {mood === 'okay' && (
        <div className="relative">
          <div className="text-8xl">🦫</div>
          <div className="absolute top-12 left-20 text-3xl">
            😐
          </div>
        </div>
      )}
      
      {mood === 'sad' && (
        <div className="relative">
          <div className="text-8xl transform -rotate-3">🦫</div>
          <div className="absolute top-12 left-20 text-3xl">
            ☹️
          </div>
        </div>
      )}
    </div>
  );
}