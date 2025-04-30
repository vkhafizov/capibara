import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { LanguageContext } from '../context/LanguageContext';
import { X, Award, Clock, TrendingUp, Trophy } from 'lucide-react';

export default function StatsModal({ isOpen, onClose }) {
  const { 
    age, 
    hunger, 
    happiness, 
    energy, 
    hydration, 
    isAlive
  } = useContext(GameContext);
  
  const { t } = useContext(LanguageContext);

  // State for the current tip with 3-second delay
  const [currentTip, setCurrentTip] = useState("");
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    recordAge: 0,
    sessionStart: null,
    playTime: 0
  });
  
  // Load game stats on initial render
  useEffect(() => {
    const savedStats = loadGameStats();
    if (savedStats) {
      setGameStats(prev => ({
        ...prev,
        gamesPlayed: savedStats.gamesPlayed || 0,
        recordAge: savedStats.recordAge || 0
      }));
    }
    
    // Set session start time if not already set
    if (!localStorage.getItem('session_start_time')) {
      localStorage.setItem('session_start_time', Date.now().toString());
    }
    
    // Calculate play time
    const startTime = parseInt(localStorage.getItem('session_start_time') || Date.now().toString());
    const currentPlayTime = Math.floor((Date.now() - startTime) / (1000 * 60)); // in minutes
    
    setGameStats(prev => ({
      ...prev,
      sessionStart: startTime,
      playTime: currentPlayTime
    }));
    
    // Update record age if current age is higher
    if (isAlive && age > gameStats.recordAge) {
      const updatedStats = {
        ...gameStats,
        recordAge: age
      };
      setGameStats(updatedStats);
      saveGameStats(updatedStats);
    }
    
    // Update play time every minute
    const timer = setInterval(() => {
      const startTime = parseInt(localStorage.getItem('session_start_time') || Date.now().toString());
      const currentPlayTime = Math.floor((Date.now() - startTime) / (1000 * 60)); // in minutes
      
      setGameStats(prev => ({
        ...prev,
        playTime: currentPlayTime
      }));
    }, 60000); // update every minute
    
    return () => clearInterval(timer);
  }, [age, isAlive]);
  
  // Set tip with 3-second delay
  useEffect(() => {
    if (!isOpen) return;
    
    // Initial tip
    setCurrentTip(getTip());
    
    // Change tip every 3 seconds
    const timer = setInterval(() => {
      setCurrentTip(getTip());
    }, 3000);
    
    return () => clearInterval(timer);
  }, [isOpen]);
  
  // Calculate overall wellness
  const overallWellness = ((hunger + happiness + energy + hydration) / 4).toFixed(1);
  
  // Format time from minutes to hours and minutes
  const formatPlayTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} ${mins === 1 ? t('minute') : t('minutes')}`;
    return `${hours} ${hours === 1 ? t('hour') : t('hours')} ${mins} ${mins === 1 ? t('minute') : t('minutes')}`;
  };
  
  // Load game stats from localStorage
  function loadGameStats() {
    try {
      const savedStats = localStorage.getItem('capy_game_stats');
      if (!savedStats) return null;
      
      return JSON.parse(savedStats);
    } catch (error) {
      console.error('Failed to load game stats:', error);
      return null;
    }
  }
  
  // Save game stats to localStorage
  function saveGameStats(stats) {
    try {
      localStorage.setItem('capy_game_stats', JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error('Failed to save game stats:', error);
      return false;
    }
  }
  
  // Get a capybara fact
  function getTip() {
    const facts = [
      "In the wild, capybaras can hold their breath underwater for up to 5 minutes!",
      "Capybaras communicate using a variety of sounds including whistles, clicks, and barks.",
      "A group of capybaras is called a 'herd' and can have up to 100 members in the wild.",
      "Capybaras have partially webbed feet which helps them swim efficiently.",
      "Capybaras are related to guinea pigs and rock cavies.",
      "Baby capybaras can swim from birth and are called 'pups'.",
      "Capybaras can sleep in water, keeping just their noses above the surface.",
      "In Japan, capybaras are known for enjoying hot spring baths during winter.",
      "Capybaras can run as fast as 35 km/h (22 mph) when they feel threatened.",
      "The scientific name for capybaras is 'Hydrochoerus hydrochaeris' which means 'water hog'.",
      "Many animals like to sit on top of relaxed capybaras, including birds, monkeys, and even other capybaras!",
      "Capybaras can grow up to 1.3 meters (4.3 feet) in length.",
      "The average weight of an adult capybara is about 50 kg (110 pounds).",
      "Capybaras can eat up to 3 kg (6.6 pounds) of grass per day."
    ];
    
    // Use current time divided by 3000ms to get a stable index that changes every 3 seconds
    const tipIndex = Math.floor(Date.now() / 5000) % facts.length;
    return facts[tipIndex];
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-amber-50 dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300">{t('statsModal.title')}</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={24} className="text-amber-800 dark:text-amber-300" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Records Section */}
            <section>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
                <Trophy size={20} className="mr-2" />
                {t('statsModal.records')}
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t('statsModal.gamesPlayed')}:</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">{gameStats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t('statsModal.longestLife')}:</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">{gameStats.recordAge.toFixed(1)} {t('days')}</span>
                </div>
              </div>
            </section>
            
            {/* Current Game Stats */}
            <section>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
                <TrendingUp size={20} className="mr-2" />
                {t('statsModal.current')}
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t('statsModal.ageInHours')}:</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">{(age * 24).toFixed(1)} {t('hours')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t('stats.wellness')}:</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">{overallWellness}%</span>
                </div>
              </div>
            </section>
            
            {/* Session Stats */}
            <section>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
                <Clock size={20} className="mr-2" />
                {t('statsModal.session')}
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t('statsModal.playSession')}:</span>
                  <span className="font-medium text-amber-800 dark:text-amber-300">{formatPlayTime(gameStats.playTime)}</span>
                </div>
              </div>
            </section>
            
            {/* Capybara Facts with 3-second rotation */}
            <section className="bg-amber-100 dark:bg-gray-700 p-3 rounded-lg">
              <h3 className="text-md font-semibold text-amber-800 dark:text-amber-300 mb-2">{t('statsModal.factTitle')}</h3>
              <p className="text-sm text-amber-700 dark:text-amber-200">
                {currentTip || "Loading fun fact..."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}