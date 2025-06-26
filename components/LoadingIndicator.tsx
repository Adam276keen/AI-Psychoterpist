import React from 'react';

interface LoadingIndicatorProps {
  theme?: 'light' | 'dark';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ theme = 'light' }) => {
  const bgColor = theme === 'dark' ? 'bg-sky-400' : 'bg-sky-500';
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`w-2.5 h-2.5 ${bgColor} rounded-full animate-pulse delay-0`}></div>
      <div className={`w-2.5 h-2.5 ${bgColor} rounded-full animate-pulse delay-150`}></div>
      <div className={`w-2.5 h-2.5 ${bgColor} rounded-full animate-pulse delay-300`}></div>
    </div>
  );
};

export default LoadingIndicator;