import React from 'react';

export default function ActionButton({ onClick, disabled, icon, label, color, active = false }) {
  // Generate button color classes based on props
  const getButtonClass = () => {
    if (disabled) return 'bg-gray-400 cursor-not-allowed';
    
    // Map of color prop values to actual tailwind classes
    const colorMap = {
      amber: {
        default: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700',
        active: 'bg-amber-700 hover:bg-amber-800'
      },
      red: {
        default: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
        active: 'bg-red-700 hover:bg-red-800'
      },
      blue: {
        default: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
        active: 'bg-blue-700 hover:bg-blue-800'
      },
      green: {
        default: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
        active: 'bg-green-700 hover:bg-green-800'
      },
      indigo: {
        default: 'bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700',
        active: 'bg-indigo-700 hover:bg-indigo-800'  
      },
      // Add other colors as needed
    };
    
    // Return the appropriate class from our map
    const state = active ? 'active' : 'default';
    return colorMap[color]?.[state] || 'bg-gray-500 hover:bg-gray-600';
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