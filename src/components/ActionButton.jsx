import React from 'react';

export default function ActionButton({ onClick, disabled, icon, label, color, active = false }) {
  // Generate button color classes based on props
  const getButtonClass = () => {
    if (disabled) return 'bg-gray-400 cursor-not-allowed';
    if (active) return `bg-${color}-700 hover:bg-${color}-800`;
    return `bg-${color}-500 hover:bg-${color}-600 active:bg-${color}-700`;
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