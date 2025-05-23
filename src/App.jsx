import { useContext, useEffect } from 'react';
import CapybaraDisplay from './components/CapybaraDisplay';
import StatBar from './components/StatBar';
import ActionButton from './components/ActionButton';
import BurgerMenu from './components/BurgerMenu';
import { GameContext } from './context/GameContext';
import { ThemeContext } from './context/ThemeContext';
import { LanguageContext } from './context/LanguageContext';
import { Cookie, Gamepad2, Droplets, Moon, Heart } from 'lucide-react';

function App() {
  const { 
    hunger, happiness, energy, hydration, age, 
    isSleeping, isAlive, statusMessage,
    feed, play, giveWater, toggleSleep, resetGame
  } = useContext(GameContext);
  
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  // Request notification permission on app load
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-amber-50 dark:bg-gray-900 p-6 touch-manipulation transition-colors duration-300">
      {/* Header */}
      <div className="w-full text-center mb-4">
        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-400">{t('appName')}</h1>
        <p className="text-amber-600 dark:text-amber-300">{t('age')}: {age.toFixed(1)} {t('days')}</p>
      </div>
      
      {/* Burger Menu */}
      <BurgerMenu />
      
      {/* Capybara Display */}
      <div className="flex-grow flex flex-col items-center justify-center w-full relative">
        <CapybaraDisplay />
        
        <p className="text-xl mt-4 text-center font-medium text-amber-700 dark:text-amber-300">
          {statusMessage}
        </p>
        
        {/* Stats Bars */}
        {isAlive && (
          <div className="w-full max-w-md mt-6 mb-6 space-y-2">
            <StatBar label={t('stats.hunger')} value={hunger} icon={<Cookie size={18} />} color="amber" />
            <StatBar label={t('stats.happiness')} value={happiness} icon={<Heart size={18} />} color="red" />
            <StatBar label={t('stats.energy')} value={energy} icon={<Gamepad2 size={18} />} color="green" />
            <StatBar label={t('stats.hydration')} value={hydration} icon={<Droplets size={18} />} color="blue" />
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
              label={t('actions.feed')}
              color="amber"
            />
            <ActionButton 
              onClick={play}
              disabled={isSleeping}
              icon={<Gamepad2 size={20} />}
              label={t('actions.play')}
              color="red"
            />
            <ActionButton 
              onClick={giveWater}
              disabled={isSleeping}
              icon={<Droplets size={20} />}
              label={t('actions.water')}
              color="blue"
            />
            <ActionButton 
              onClick={toggleSleep}
              icon={<Moon size={20} />}
              label={isSleeping ? t('actions.wakeUp') : t('actions.sleep')}
              color="indigo"
              active={isSleeping}
            />
          </>
        ) : (
          <button 
            onClick={resetGame}
            className="col-span-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            {t('actions.restart')}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;