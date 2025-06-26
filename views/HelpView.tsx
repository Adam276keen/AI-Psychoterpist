
import React from 'react';
// ONBOARDING_STEPS will be taken from currentStrings
import HelpIcon from '../components/icons/HelpIcon';
import ChatIcon from '../components/icons/ChatIcon';
import BrainIcon from '../components/icons/BrainIcon';
import HeartIcon from '../components/icons/HeartIcon';
import { Theme, UIStrings, Language } from '../types';

interface StepIconProps {
  stepNum: number;
  theme: Theme;
}

const StepIconDisplay: React.FC<StepIconProps> = ({ stepNum, theme }) => {
  const iconColor = theme === 'dark' ? 'text-teal-400' : 'text-teal-600';
  const iconClasses = `w-10 h-10 mb-3 ${iconColor}`;

  if (stepNum === 1) return <ChatIcon className={iconClasses} />;
  if (stepNum === 2) return <BrainIcon className={iconClasses} />;
  if (stepNum === 3) return <HeartIcon className={iconClasses} />;
  return <HelpIcon className={iconClasses} />; // Fallback
};

interface HelpViewProps {
  theme: Theme;
  currentStrings: UIStrings;
  language: Language; // For potential language-specific display logic
}

const HelpView: React.FC<HelpViewProps> = ({ theme, currentStrings, language }) => {
  const cardBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-sky-100' : 'text-sky-800';
  const titleColor = theme === 'dark' ? 'text-teal-300' : 'text-teal-700';
  const stepCardBg = theme === 'dark' ? 'bg-sky-800' : 'bg-sky-50';
  const stepTextColor = theme === 'dark' ? 'text-sky-200' : 'text-slate-700';

  const onboardingSteps = currentStrings.onboardingSteps as Array<{title: string; description: string}>;

  return (
    <div className={`p-6 md:p-10 rounded-xl shadow-xl ${cardBg}`}>
      <div className="text-center mb-10">
        <HelpIcon className={`w-16 h-16 mx-auto mb-4 ${titleColor}`} />
        <h2 className={`text-3xl md:text-4xl font-bold font-outfit ${textColor}`}>
          {currentStrings.helpWelcomeTitle as string}
        </h2>
        <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>
          {currentStrings.helpWelcomeSubtitle as string}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {onboardingSteps.map((step, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg shadow-lg text-center ${stepCardBg} transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex justify-center items-center mb-4">
              <StepIconDisplay stepNum={index + 1} theme={theme} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 font-outfit ${titleColor}`}>
              {step.title}
            </h3>
            <p className={`text-sm ${stepTextColor} font-inter`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <p className={`mt-12 text-center text-md ${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>
        {currentStrings.helpReminder as string}
      </p>
    </div>
  );
};

export default HelpView;
