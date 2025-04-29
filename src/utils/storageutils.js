const STORAGE_KEY = 'capy_gotchi_save';

/**
 * Save game state to localStorage
 * @param {Object} gameState - Current game state
 */
export function saveGameState(gameState) {
  try {
    const gameStateString = JSON.stringify(gameState);
    localStorage.setItem(STORAGE_KEY, gameStateString);
    return true;
  } catch (error) {
    console.error('Failed to save game state:', error);
    return false;
  }
}

/**
 * Load game state from localStorage
 * @returns {Object|null} Saved game state or null if none found
 */
export function loadGameState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return null;
    
    return JSON.parse(savedState);
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

/**
 * Clear saved game state
 * @returns {boolean} Success status
 */
export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear game state:', error);
    return false;
  }
}