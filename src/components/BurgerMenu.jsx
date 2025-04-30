import { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';
import { Menu, X, RotateCcw, PieChart, Moon, Sun, Share2, Info, Globe } from 'lucide-react';
import StatsModal from './StatsModal';
import AboutModal from './AboutModal';
import LanguageModal from './LanguageModal';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { resetGame } = useContext(GameContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const openStatsModal = () => {
    setShowStatsModal(true);
    closeMenu();
  };
  
  const openAboutModal = () => {
    setShowAboutModal(true);
    closeMenu();
  };
  
  const openLanguageModal = () => {
    setShowLanguageModal(true);
    closeMenu();
  };
  
  const handleThemeToggle = () => {
    toggleTheme();
    closeMenu();
  };
  
  return (
    <div className="relative">
      {/* Burger Icon Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-30 p-2 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-gray-400 transition-colors"
        aria-label="Open menu"
      >
        {isOpen ? <X size={24} className="text-amber-800 dark:text-gray-200" /> : 
                 <Menu size={24} className="text-amber-800 dark:text-gray-200" />}
      </button>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeMenu}
        />
      )}
      
      {/* Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-amber-50 dark:bg-gray-800 z-20 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200 dark:border-gray-700 mt-3">
            <h2 className="text-xl font-bold text-amber-800 dark:text-gray-200">{t('menu.title')}</h2>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <button 
                  className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200" 
                  onClick={() => {
                    resetGame();
                    closeMenu();
                  }}
                >
                  <RotateCcw size={20} className="mr-3" />
                  <span>{t('menu.newGame')}</span>
                </button>
              </li>
              
              <li>
                <button 
                  className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200"
                  onClick={openStatsModal}
                >
                  <PieChart size={20} className="mr-3" />
                  <span>{t('menu.stats')}</span>
                </button>
              </li>
              
              <li>
                <button 
                  className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200"
                  onClick={handleThemeToggle}
                >
                  {isDarkMode ? 
                    <Sun size={20} className="mr-3" /> : 
                    <Moon size={20} className="mr-3" />
                  }
                  <span>{isDarkMode ? t('menu.lightTheme') : t('menu.darkTheme')}</span>
                </button>
              </li>
              
              <li>
                <button 
                  className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200"
                  onClick={openLanguageModal}
                >
                  <Globe size={20} className="mr-3" />
                  <span>{t('menu.language')}</span>
                </button>
              </li>
              
                  {/* 
              <li>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200">
                  <Share2 size={20} className="mr-3" />
                  <span>{t('menu.share')}</span>
                </button>
              </li>
              */}

              <li>
                <button 
                  className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 dark:hover:bg-gray-700 transition-colors text-amber-800 dark:text-gray-200"
                  onClick={openAboutModal}
                >
                  <Info size={20} className="mr-3" />
                  <span>{t('menu.about')}</span>
                </button>
              </li>
              
              
            </ul>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-amber-200 dark:border-gray-700 text-center text-sm text-amber-700 dark:text-gray-400">
            {t('appName')} v1.0.0
          </div>
        </div>
      </div>
      
      {/* Stats Modal */}
      <StatsModal 
        isOpen={showStatsModal} 
        onClose={() => setShowStatsModal(false)} 
      />
      
      {/* About Modal */}
      <AboutModal 
        isOpen={showAboutModal} 
        onClose={() => setShowAboutModal(false)} 
      />
      
      {/* Language Modal */}
      <LanguageModal 
        isOpen={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
      />
    </div>
  );
}