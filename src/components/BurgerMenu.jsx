import { useState } from 'react';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Menu, X, RotateCcw, PieChart, Moon, Share2, Info } from 'lucide-react';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { resetGame } = useContext(GameContext);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      {/* Burger Icon Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-30 p-2 rounded-full bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Open menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
        className={`fixed top-0 right-0 h-full w-64 bg-amber-50 z-20 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-amber-200 mt-3">
            <h2 className="text-xl font-bold text-amber-800">Menu</h2>
            
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
              <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 transition-colors" onClick={() => {
              resetGame();
              closeMenu();
              }}>
              <RotateCcw size={20} className="mr-3" />
              <span>New Game</span>
              </button>
              </li>
              
              <li>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 transition-colors">
                  <PieChart size={20} className="mr-3" />
                  <span>Stats</span>
                </button>
              </li>
              
              <li>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 transition-colors">
                  <Moon size={20} className="mr-3" />
                  <span>Dark Theme</span>
                </button>
              </li>
              
              <li>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 transition-colors">
                  <Share2 size={20} className="mr-3" />
                  <span>Share</span>
                </button>
              </li>
              
              <li>
                <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-200 transition-colors">
                  <Info size={20} className="mr-3" />
                  <span>About</span>
                </button>
              </li>
            </ul>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-amber-200 text-center text-sm text-amber-700">
            Capy-gotchi v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}