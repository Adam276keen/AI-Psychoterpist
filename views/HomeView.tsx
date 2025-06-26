
import React from 'react';
import AIAvatar from '../components/AIAvatar';
import { Theme, UIStrings, User, Language } from '../types';

interface HomeViewProps {
  currentStrings: UIStrings;
  onStartSession: () => void;
  theme: Theme;
  currentUser: User | null; // Not directly used in this version but good for consistency
  language: Language; // For potential language-specific display logic if needed
}

const HomeView: React.FC<HomeViewProps> = ({ currentStrings, onStartSession, theme, currentUser, language }) => {
  const cardBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-sky-100' : 'text-sky-800';
  const sloganColor = theme === 'dark' ? 'text-sky-200' : 'text-sky-700';
  const buttonBg = theme === 'dark' ? 'bg-teal-500 hover:bg-teal-400' : 'bg-teal-600 hover:bg-teal-700';
  const buttonText = 'text-white';

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
      <div className={`${cardBg} p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl w-full`}>
        <AIAvatar size="large" theme={theme} className="mx-auto mb-8" />
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} font-outfit mb-4`}>
          {currentStrings.homeWelcome as string}
        </h2>
        <p className={`text-lg md:text-xl ${sloganColor} mb-10 font-inter`}>
          {currentStrings.appSlogan as string}
        </p>
        <button
          onClick={onStartSession}
          className={`px-10 py-4 ${buttonBg} ${buttonText} font-semibold rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-teal-400 focus:ring-offset-sky-900' : 'focus:ring-teal-500 focus:ring-offset-white'} font-inter`}
          aria-label={currentStrings.startSessionButton as string}
        >
          {currentStrings.startSessionButton as string}
        </button>
        <p className={`mt-10 text-sm ${theme === 'dark' ? 'text-sky-400' : 'text-slate-500'} font-inter`}>
          {currentStrings.homeTagline as string}
        </p>
      </div>
    </div>
  );
};

export default HomeView;
