import React from 'react';

interface IconProps {
  className?: string;
}

const SunIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25c0 1.242 1.008 2.25 2.25 2.25s2.25-1.008 2.25-2.25c0-1.242-1.008-2.25-2.25-2.25z" />
    </svg>
  );
};

export default SunIcon;