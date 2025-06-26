
import React from 'react';
import { UIStrings } from '../types';

interface FooterProps {
  currentStrings: UIStrings;
}

const Footer: React.FC<FooterProps> = ({ currentStrings }) => {
  return (
    <footer className="py-6 text-center">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">{currentStrings.privacyGuarantee as string}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-inter">
        {currentStrings.footerDisclaimer as string}
      </p>
       <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-inter">
        {currentStrings.footerApiWarning as string}
      </p>
    </footer>
  );
};

export default Footer;
