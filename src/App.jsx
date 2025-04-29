import { useContext, useEffect } from 'react';
import CapybaraDisplay from './components/CapybaraDisplay';
import StatBar from './components/StatBar';
import ActionButton from './components/ActionButton';
import { GameContext } from './context/GameContext';
import { Cookie, Gamepad2, Droplets, Moon, Heart } from 'lucide-react';

function App() {
  const { 
    hunger, happiness, energy, hydration, age, 
    isSleeping, isAlive, statusMessage,
    feed, play, giveWater, toggleSleep, resetGame
  } = useContext(GameContext);

  // Request notification permission on app load
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-amber-50 p-6 touch-manipulation">
      {/* Header */}
      <div className="w-full text-center mb-4">
        <h1 className="text-3xl font-bold text-amber-800">Capy-gotchi</h1>
        <p className="text-amber-600">Age: {age.toFixed(1)} days</p>
      </div>
      
      {/* Capybara Display */}
      <div className="flex-grow flex flex-col items-center justify-center w-full relative">
        <CapybaraDisplay isAlive={isAlive} isSleeping={isSleeping} />
        
        <p className="text-xl mt-4 text-center font-medium text-amber-700">
          {statusMessage}
        </p>
        
        {/* Stats Bars */}
        {isAlive && (
          <div className="w-full max-w-md mt-6 space-y-2">
            <StatBar label="Hunger" value={hunger} icon={<Cookie size={18} />} color="amber" />
            <StatBar label="Happiness" value={happiness} icon={<Heart size={18} />} color="red" />
            <StatBar label="Energy" value={energy} icon={<Gamepad2 size={18} />} color="green" />
            <StatBar label="Hydration" value={hydration} icon={<Droplets size={18} />} color="blue" />
          </div>
        )}
      </div>
      
      {/* Control Buttons */}
      <div className="w-full max-w-md grid grid-cols-2 gap-3 mb-6">
        {isAlive ? (
          <>
            <ActionButton 
              onClick={feed}
              disabled={isSleeping}
              icon={<Cookie size={20} />}
              label="Feed"
              color="amber"
            />
            <ActionButton 
              onClick={play}
              disabled={isSleeping}
              icon={<Gamepad2 size={20} />}
              label="Play"
              color="red"
            />
            <ActionButton 
              onClick={giveWater}
              disabled={isSleeping}
              icon={<Droplets size={20} />}
              label="Water"
              color="blue"
            />
            <ActionButton 
              onClick={toggleSleep}
              icon={<Moon size={20} />}
              label={isSleeping ? 'Wake Up' : 'Sleep'}
              color="indigo"
              active={isSleeping}
            />
          </>
        ) : (
          <button 
            onClick={resetGame}
            className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-medium"
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
