import React from 'react';
import { Theme } from '../types';

interface AIAvatarProps {
  size?: 'small' | 'medium' | 'large';
  theme: Theme;
  className?: string;
}

const AIAvatar: React.FC<AIAvatarProps> = ({ size = 'medium', theme, className }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16 md:w-24 md:h-24',
    large: 'w-32 h-32 md:w-48 md:h-48',
  }[size];

  const bgColor = theme === 'dark' ? 'bg-sky-700' : 'bg-sky-200';
  const iconColor = theme === 'dark' ? 'text-sky-300' : 'text-sky-600';

  return (
    <div className={`${sizeClasses} ${bgColor} rounded-full flex items-center justify-center overflow-hidden shadow-lg ${className}`}>
      {/* Simple brain/wave icon as placeholder */}
      <svg className={`w-3/5 h-3/5 ${iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.692-.026 1.038 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5c0 1.135-.845 2.098-1.976 2.192a48.424 48.424 0 00-1.038-.019c-1.13.094-1.976 1.057-1.976 2.192V15M15.75 7.5c0 1.135.845 2.098 1.976 2.192a48.424 48.424 0 011.038-.019c1.13.094 1.976 1.057 1.976 2.192V15M12 18.75c1.035 0 2.06-.245 2.986-.717L12 12.586l-2.986 5.447A10.278 10.278 0 0012 18.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a9.75 9.75 0 01-8.636-5.447c-.09-.288-.09-.596 0-.884A9.75 9.75 0 0112 3.75c2.548 0 4.908.984 6.696 2.67.14.127.27.26.392.398M3.75 9.75c0 .351.022.699.064 1.042" />
      </svg>
    </div>
  );
};

export default AIAvatar;
