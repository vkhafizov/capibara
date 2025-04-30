import React from 'react';

export default function StatBar({ label, value, icon, color }) {
  // Determine color based on value and passed color prop
  const getBarColor = () => {
    // Map of color prop values to actual tailwind classes
    const colorMap = {
      amber: {
        low: 'bg-amber-300 dark:bg-amber-400',
        medium: 'bg-amber-500 dark:bg-amber-500',
        high: 'bg-amber-600 dark:bg-amber-600'
      },
      red: {
        low: 'bg-red-300 dark:bg-red-400',
        medium: 'bg-red-500 dark:bg-red-500',
        high: 'bg-red-600 dark:bg-red-600'
      },
      green: {
        low: 'bg-green-300 dark:bg-green-400',
        medium: 'bg-green-500 dark:bg-green-500',
        high: 'bg-green-600 dark:bg-green-600'
      },
      blue: {
        low: 'bg-blue-300 dark:bg-blue-400',
        medium: 'bg-blue-500 dark:bg-blue-500',
        high: 'bg-blue-600 dark:bg-blue-600'
      },
      // Add other colors as needed
    };
    
    // Determine color level based on stat value
    let level = 'medium';
    if (value < 30) level = 'low';
    if (value >= 70) level = 'high';
    
    // Return the appropriate class from our map
    return colorMap[color]?.[level] || 'bg-gray-500 dark:bg-gray-600';
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0 text-amber-700 dark:text-amber-300">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getBarColor()}`} 
            style={{ width: `${value}%` ,
            transition: 'width 0.7s ease-in-out'
          }}
          ></div>
        </div>
      </div>
    </div>
  );
}