import React from 'react';

interface IconProps { className?: string; }

const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 1.774a5.25 5.25 0 00-1.622-3.39m3.388 1.621a15.994 15.994 0 001.622-3.39m-5.043-.025a15.998 15.998 0 013.388-1.622m-5.043-.025a15.998 15.998 0 00-3.388-1.621m10.086 5.043a15.994 15.994 0 01-1.622 3.39m-5.043.025a15.998 15.998 0 01-3.388 1.622m5.043.025a15.998 15.998 0 003.388 1.621m3.421-1.774a5.25 5.25 0 001.622 3.39m-5.043-.025a15.994 15.994 0 01-1.622 3.389M19.5 9.75A2.25 2.25 0 0017.25 7.5h-4.5A2.25 2.25 0 0010.5 9.75v4.5A2.25 2.25 0 0012.75 16.5h4.5A2.25 2.25 0 0019.5 14.25v-4.5z" />
  </svg>
);

export default BrainIcon;
