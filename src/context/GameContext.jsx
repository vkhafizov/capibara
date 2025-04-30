// src/context/GameContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loadGameState, saveGameState } from '../utils/storageUtils';
import { Heart } from 'lucide-react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  // Pet stats with initial values
  const [hunger, setHunger] = useState(80);
  const [happiness, setHappiness] = useState(80);
  const [energy, setEnergy] = useState(100);
  const [hydration, setHydration] = useState(80);
  const [age, setAge] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isAlive, setIsAlive] = useState(true);
  const [isEating, setIsEating] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastNotification, setLastNotification] = useState(0);
  
  // Load saved game on initial mount
  useEffect(() => {
    const savedGame = loadGameState();
    if (savedGame) {
      setHunger(savedGame.hunger);
      setHappiness(savedGame.happiness);
      setEnergy(savedGame.energy);
      setHydration(savedGame.hydration);
      setAge(savedGame.age);
      setIsSleeping(savedGame.isSleeping);
      setIsAlive(savedGame.isAlive);
      if (savedGame.isEating !== undefined) setIsEating(savedGame.isEating);
      if (savedGame.isHydrating !== undefined) setIsHydrating(savedGame.isHydrating);
      if (savedGame.isPlaying !== undefined) setIsPlaying(savedGame.isPlaying);
    }
  }, []);
  
  // Save game state whenever important stats change
  useEffect(() => {
    saveGameState({
      hunger,
      happiness,
      energy,
      hydration,
      age,
      isSleeping,
      isAlive,
      isEating,
      isHydrating,
      isPlaying
    });
  }, [hunger, happiness, energy, hydration, age, isSleeping, isAlive, isEating, isHydrating, isPlaying]);
  
  // Main game timer
  useEffect(() => {
    const gameTimer = setInterval(() => {
      if (isAlive) {
        // Update stats based on sleeping state
        if (!isSleeping) {
          // Decrease stats over time if awake
          setHunger(prev => Math.max(0, prev - 0.3));
          setHappiness(prev => Math.max(0, prev - 0.2));
          setEnergy(prev => Math.max(0, prev - 0.15));
          setHydration(prev => Math.max(0, prev - 0.4));
        } else {
          // Recover energy while sleeping
          setEnergy(prev => Math.min(100, prev + 1.5));
        }
        
        // Increase age every 20 seconds
        setAge(prev => prev + 1/60);
        
        // Check if capybara is still alive
        if (hunger <= 0 || happiness <= 0 || energy <= 0 || hydration <= 0) {
          setIsAlive(false);
          
          // Send death notification
          sendNotification('Oh no!', 'Your capybara has passed away. 😢');
        }
        
        // Send warning notifications
        checkAndSendWarningNotifications();
      }
    }, 1000);
    
    return () => clearInterval(gameTimer);
  }, [hunger, happiness, energy, hydration, isSleeping, isAlive]);
  
  // Send notifications if stats are critically low
  const checkAndSendWarningNotifications = () => {
    const now = Date.now();
    // Only send notifications at most once every 2 minutes
    if (now - lastNotification < 2 * 60 * 1000) return;
    
    if (hunger <= 15) {
      sendNotification('Your capybara is starving!', 'Feed your pet soon!');
    } else if (happiness <= 15) {
      sendNotification('Your capybara is sad!', 'Play with your pet!');
    } else if (energy <= 15) {
      sendNotification('Your capybara is exhausted!', 'Let your pet sleep!');
    } else if (hydration <= 15) {
      sendNotification('Your capybara is dehydrated!', 'Give your pet water!');
    }
  };
  
  // Send notification helper
  const sendNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
      setLastNotification(Date.now());
    }
  };
  
  // Game actions
  const feed = () => {
    if (isAlive && !isSleeping && !isEating && !isHydrating && !isPlaying) {
      setIsEating(true);
      playSound('eat');
      
      // Show eating animation for 2 seconds
      setTimeout(() => {
        setHunger(prev => Math.min(100, prev + 15));
        setEnergy(prev => Math.max(0, prev - 5));
        setIsEating(false);
      }, 2000);
    }
  };
  
  const play = () => {
    if (isAlive && !isSleeping && !isEating && !isHydrating && !isPlaying) {
      setIsPlaying(true);
      playSound('play');
      
      // Show playing animation for 2 seconds
      setTimeout(() => {
        setHappiness(prev => Math.min(100, prev + 15));
        setEnergy(prev => Math.max(0, prev - 10));
        setHunger(prev => Math.max(0, prev - 5));
        setHydration(prev => Math.max(0, prev - 5));
        setIsPlaying(false);
      }, 2000);
    }
  };
  
  const giveWater = () => {
    if (isAlive && !isSleeping && !isEating && !isHydrating && !isPlaying) {
      setIsHydrating(true);
      
      // Show hydrating animation for 2 seconds
      setTimeout(() => {
        setHydration(prev => Math.min(100, prev + 20));
        setIsHydrating(false);
      }, 2000);
    }
  };
  
  const toggleSleep = () => {
    if (isAlive && !isEating && !isHydrating && !isPlaying) {
      setIsSleeping(prev => !prev);
      playSound('sleep');
    }
  };
  
  const resetGame = () => {
    setHunger(80);
    setHappiness(80);
    setEnergy(100);
    setHydration(80);
    setAge(0);
    setIsSleeping(false);
    setIsAlive(true);
    setIsEating(false);
    setIsHydrating(false);
    setIsPlaying(false);
  };
  
  // Play sound effect
  const playSound = (soundName) => {
    try {
      const sound = new Audio(`/src/assets/sounds/${soundName}.mp3`);
      sound.play();
    } catch (err) {
      // Handle silently - the game can function without sound
      console.log('Sound not available:', err);
    }
  };
  
  // Get status message based on pet state
  const getStatusMessage = () => {
    if (!isAlive) return "Your capybara has passed away 😢";
    if (isSleeping) return "Your capybara is sleeping... Zzz";
    if (isEating) return "Your capybara is eating...";
    if (isHydrating) return "Your capybara is taking a bath...";
    if (isPlaying) return "Your capybara is playing...";
    if (hunger < 20) return "Your capybara is hungry!";
    if (happiness < 20) return "Your capybara is bored!";
    if (energy < 20) return "Your capybara is tired!";
    if (hydration < 20) return "Your capybara is thirsty!";
    return "Your capybara is doing great!";
  };
  
  const statusMessage = getStatusMessage();
  
  // Value object to be provided to context consumers
  const value = {
    hunger,
    happiness,
    energy,
    hydration,
    age,
    isSleeping,
    isAlive,
    isEating,
    isHydrating,
    isPlaying,
    statusMessage,
    feed,
    play,
    giveWater,
    toggleSleep,
    resetGame
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}