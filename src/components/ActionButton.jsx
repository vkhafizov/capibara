import React from 'react';

export default function ActionButton({ onClick, disabled, icon, label, color, active = false }) {
  // Generate button color classes based on props
  const getButtonClass = () => {
    if (disabled) return 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed';
    
    // Map of color prop values to actual tailwind classes
    const colorMap = {
      amber: {
        default: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700 dark:active:bg-amber-800',
        active: 'bg-amber-700 hover:bg-amber-800 dark:bg-amber-800 dark:hover:bg-amber-900'
      },
      red: {
        default: 'bg-red-500 hover:bg-red-600 active:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800',
        active: 'bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900'
      },
      blue: {
        default: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800',
        active: 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900'
      },
      green: {
        default: 'bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800',
        active: 'bg-green-700 hover:bg-green-800 dark:bg-green-800 dark:hover:bg-green-900'
      },
      indigo: {
        default: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:active:bg-indigo-800',
        active: 'bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-900'  
      },
      // Add other colors as needed
    };
    
    // Return the appropriate class from our map
    const state = active ? 'active' : 'default';
    return colorMap[color]?.[state] || 'bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700';
  };
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors`}
    >
      {icon} {label}
    </button>
  );
}