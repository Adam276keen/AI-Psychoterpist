import React from 'react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  theme: 'light' | 'dark';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme }) => {
  const isUser = message.sender === 'user';

  // Define colors based on theme
  const userBubbleBg = theme === 'dark' ? 'bg-sky-700' : 'bg-sky-200';
  const userBubbleText = theme === 'dark' ? 'text-sky-50' : 'text-sky-800';
  const aiBubbleBg = theme === 'dark' ? 'bg-slate-700' : 'bg-emerald-100'; // Using emerald for AI in light mode
  const aiBubbleText = theme === 'dark' ? 'text-slate-100' : 'text-emerald-800';
  
  const timeClasses = isUser 
    ? (theme === 'dark' ? 'text-sky-400' : 'text-sky-600')
    : (theme === 'dark' ? 'text-slate-400' : 'text-emerald-600');


  const bubbleClasses = isUser 
    ? `${userBubbleBg} ${userBubbleText} self-end rounded-l-2xl rounded-tr-2xl` 
    : `${aiBubbleBg} ${aiBubbleText} self-start rounded-r-2xl rounded-tl-2xl`;

  // Both user and AI messages will use Inter font
  const fontClass = "font-inter";

  return (
    <div className={`flex flex-col mb-4 max-w-3xl w-fit ${isUser ? 'items-end ml-auto' : 'items-start mr-auto'}`}>
      <div 
        className={`px-5 py-3 shadow-md ${bubbleClasses} ${fontClass}`}
        style={{
          boxShadow: theme === 'dark' 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        }}
      >
        <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{message.text}</p>
      </div>
      <span className={`text-xs mt-1.5 px-1 ${timeClasses} font-inter`}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

export default MessageBubble;