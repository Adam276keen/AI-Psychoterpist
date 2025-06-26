import React from 'react';

interface IconProps { className?: string; }

const ChatIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.027-1.02 0l-.736-.058c-.518-.041-1.02-.095-1.488-.172a46.044 46.044 0 00-7.036 0c-.468.077-.97.131-1.488.172l-.736.058c-1.134-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097L6.75 8.25m.75 3h6M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export default ChatIcon;
