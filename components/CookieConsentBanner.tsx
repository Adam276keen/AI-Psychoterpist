
import React, { useState, useEffect } from 'react';
import { Theme, UIStrings } from '../types';
import { LOCAL_STORAGE_COOKIE_CONSENT_KEY } from '../constants';

interface CookieConsentBannerProps {
  currentStrings: UIStrings;
  theme: Theme;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ currentStrings, theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(LOCAL_STORAGE_COOKIE_CONSENT_KEY);
    if (consent !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(LOCAL_STORAGE_COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const bannerBg = theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = theme === 'dark' ? 'text-slate-200' : 'text-slate-700';
  const buttonBg = theme === 'dark' ? 'bg-teal-600 hover:bg-teal-500' : 'bg-teal-500 hover:bg-teal-600';
  const buttonText = 'text-white';
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-slate-300';

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 p-4 md:p-5 ${bannerBg} border-t ${borderColor} shadow-lg z-50 transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      role="dialog"
      aria-live="polite"
      aria-labelledby="cookie-consent-message"
      aria-describedby="cookie-consent-message"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p id="cookie-consent-message" className={`text-sm ${textColor} font-inter flex-grow`}>
          {currentStrings.cookieConsentMessage as string}
        </p>
        <button
          onClick={handleAccept}
          className={`px-5 py-2.5 ${buttonBg} ${buttonText} font-medium rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-teal-500 focus:ring-offset-slate-800' : 'focus:ring-teal-600 focus:ring-offset-slate-100'} font-inter whitespace-nowrap`}
          aria-label={currentStrings.cookieConsentAccept as string}
        >
          {currentStrings.cookieConsentAccept as string}
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
