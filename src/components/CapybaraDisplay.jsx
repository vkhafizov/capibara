import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export default function CapybaraDisplay() {
  const { 
    hunger, 
    happiness, 
    energy, 
    hydration, 
    isAlive, 
    isSleeping,
    isEating,
    isHydrating,
    isPlaying
  } = useContext(GameContext);
  
  // Determine mood based on stats
  const getMood = () => {
    if (!isAlive) return 'dead';
    if (isSleeping) return 'sleeping';
    if (isEating) return 'eating';
    if (isHydrating) return 'hydrating';
    if (isPlaying) return 'playing';
    
    const average = (hunger + happiness + energy + hydration) / 4;
    if (average > 75) return 'happy';
    if (average > 40) return 'okay';
    return 'sad';
  };
  
  const mood = getMood();
  
  // Helper to get the right image based on mood
  const getCapyImageSrc = () => {
    switch(mood) {
      case 'sleeping':
        return './src/assets/images/capy-sleep.png';
      case 'eating':
        return './src/assets/images/capy-eat.png';
      case 'hydrating':
        return './src/assets/images/capy-bath.png';
      case 'playing':
        return './src/assets/images/capybara-play.png';
      case 'happy':
        return './src/assets/images/capy-happy.png';
      case 'okay':
        return './src/assets/images/capy-okay.png';
      case 'sad':
        return './src/assets/images/capy-sad.png';
      default:
        return './src/assets/images/capy-okay.png';
    }
  };
  
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Different states based on mood */}
      {mood === 'dead' ? (
        <div className="text-8xl animate-pulse">💀</div>
      ) : (
        <div className="relative">
          <img 
            src={getCapyImageSrc()} 
            alt={`Capybara ${mood}`} 
            className="w-64 h-64 object-contain"
          />
          
          {/* Additional effects based on state */}
          {mood === 'sleeping' && (
            <div className="absolute top-0 right-0 text-3xl animate-bounce-slow">
              💤
            </div>
          )}
        </div>
      )}
    </div>
  );
}