
import React from 'react';
import ProgressIcon from '../components/icons/ProgressIcon';
import { Theme, UIStrings, Language } from '../types';

interface ProgressViewProps {
  theme: Theme;
  currentStrings: UIStrings;
  language: Language; // For potential language-specific display logic
}

const ProgressView: React.FC<ProgressViewProps> = ({ theme, currentStrings, language }) => {
  const cardBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-sky-100' : 'text-sky-800';
  const accentColor = theme === 'dark' ? 'text-teal-400' : 'text-teal-600';

  return (
    <div className={`p-6 md:p-10 rounded-xl shadow-xl text-center ${cardBg}`}>
      <ProgressIcon className={`w-16 h-16 mx-auto mb-6 ${accentColor}`} />
      <h2 className={`text-2xl md:text-3xl font-bold mb-4 font-outfit ${textColor}`}>
        {currentStrings.progressTitle as string}
      </h2>
      <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>
        {currentStrings.progressDescription as string}
      </p>
      <div className="animate-pulse">
        <div className={`h-48 ${theme === 'dark' ? 'bg-sky-800' : 'bg-slate-200'} rounded-lg flex items-center justify-center`}>
          <p className={`${theme === 'dark' ? 'text-sky-500' : 'text-slate-400'} font-inter`}>{currentStrings.progressGraphPlaceholder as string}</p>
        </div>
      </div>
       <p className={`mt-8 text-sm ${theme === 'dark' ? 'text-sky-400' : 'text-slate-500'} font-inter`}>
        {currentStrings.progressComingSoon as string}
      </p>
    </div>
  );
};

export default ProgressView;
