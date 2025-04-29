import React from 'react';

export default function StatBar({ label, value, icon, color }) {
  // Determine color based on value and passed color prop
  const getBarColor = () => {
    if (value < 30) return `bg-${color}-300`;
    if (value < 70) return `bg-${color}-500`;
    return `bg-${color}-600`;
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between text-xs text-gray-700 mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getBarColor()}`} 
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}