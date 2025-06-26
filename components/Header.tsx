
import React from 'react';
import { AppView, Theme, User, Language, UIStrings } from '../types';
import HomeIcon from './icons/HomeIcon';
import SessionIcon from './icons/SessionIcon';
import ProgressIcon from './icons/ProgressIcon';
import HelpIcon from './icons/HelpIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import AIAvatar from './AIAvatar';
import LoginIcon from './icons/LoginIcon'; // Assuming you might want a specific login icon
import RegisterIcon from './icons/RegisterIcon'; // Assuming you might want a specific register icon
import LogoutIcon from './icons/LogoutIcon'; // Assuming you might want a specific logout icon


interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  currentUser: User | null;
  onLogout: () => void;
  currentStrings: UIStrings;
}

interface NavItemProps {
  view?: AppView;
  onClick?: () => void;
  onNavigate?: (view: AppView) => void; // Added onNavigate here
  currentView?: AppView;
  icon: React.ReactNode;
  label: string;
  theme: Theme;
  isActive?: boolean;
  className?: string;
}

const NavButton: React.FC<NavItemProps> = ({ 
  view, currentView, onClick, onNavigate, icon, label, theme, isActive: explicitActive, className = '' 
}) => {
  const isActive = explicitActive !== undefined ? explicitActive : (view && currentView === view);
  const activeClasses = theme === 'dark' ? 'bg-sky-700 text-white' : 'bg-sky-100 text-sky-600';
  const inactiveClasses = theme === 'dark' ? 'text-sky-300 hover:bg-sky-800 hover:text-sky-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (view && onNavigate) {
      onNavigate(view);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses} ${className}`}
      aria-current={isActive ? 'page' : undefined}
      title={label}
    >
      {icon}
      <span className={`text-xs sm:text-sm font-medium font-inter`}>{label}</span>
    </button>
  );
};


const Header: React.FC<HeaderProps> = ({ 
  currentView, onNavigate, theme, toggleTheme, language, toggleLanguage, currentUser, onLogout, currentStrings 
}) => {
  const headerBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-sky-100' : 'text-sky-700';
  const borderColor = theme === 'dark' ? 'border-sky-800' : 'border-sky-200';

  // Using more specific icons for Login, Register, Logout
  const loginIcon = <LoginIcon className="w-5 h-5" />;
  const registerIcon = <RegisterIcon className="w-5 h-5" />;
  const logoutIcon = <LogoutIcon className="w-5 h-5" />;


  return (
    <header className={`${headerBg} shadow-md sticky top-0 z-50 border-b ${borderColor}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-3 sm:mb-0 cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
            <AIAvatar size="small" theme={theme} />
            <h1 className={`text-2xl font-bold ${textColor} font-outfit`}>{currentStrings.appName as string}</h1>
          </div>
          
          <nav className="flex items-center space-x-1 sm:space-x-2 flex-wrap justify-center">
            {currentUser ? (
              <>
                <NavButton view={AppView.HOME} currentView={currentView} onNavigate={onNavigate} icon={<HomeIcon className="w-5 h-5" />} label={currentStrings.navHome as string} theme={theme} />
                <NavButton view={AppView.SESSION} currentView={currentView} onNavigate={onNavigate} icon={<SessionIcon className="w-5 h-5" />} label={currentStrings.navSession as string} theme={theme} />
                <NavButton view={AppView.PROGRESS} currentView={currentView} onNavigate={onNavigate} icon={<ProgressIcon className="w-5 h-5" />} label={currentStrings.navProgress as string} theme={theme} />
                <NavButton view={AppView.HELP} currentView={currentView} onNavigate={onNavigate} icon={<HelpIcon className="w-5 h-5" />} label={currentStrings.navHelp as string} theme={theme} />
                <NavButton onClick={onLogout} icon={logoutIcon} label={currentStrings.navLogout as string} theme={theme} className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-red-50' : 'bg-red-500 hover:bg-red-600 text-white'}`}/>
              </>
            ) : (
              <>
                <NavButton view={AppView.HOME} currentView={currentView} onNavigate={onNavigate} icon={<HomeIcon className="w-5 h-5" />} label={currentStrings.navHome as string} theme={theme} />
                <NavButton view={AppView.HELP} currentView={currentView} onNavigate={onNavigate} icon={<HelpIcon className="w-5 h-5" />} label={currentStrings.navHelp as string} theme={theme} />
                <NavButton view={AppView.LOGIN} currentView={currentView} onNavigate={onNavigate} icon={loginIcon} label={currentStrings.navLogin as string} theme={theme} />
                <NavButton view={AppView.REGISTER} currentView={currentView} onNavigate={onNavigate} icon={registerIcon} label={currentStrings.navRegister as string} theme={theme} />
              </>
            )}
            
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-full transition-colors duration-200 font-medium text-xs sm:text-sm ${theme === 'dark' ? 'text-sky-300 hover:bg-sky-800 hover:text-sky-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              title={currentStrings.languageToggle as string}
              aria-label={currentStrings.languageToggle as string}
            >
              {language === 'cze' ? 'ENG' : 'CZE'}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'text-yellow-400 hover:bg-sky-800' : 'text-slate-600 hover:bg-slate-100'}`}
              title={theme === 'dark' ? currentStrings.themeToggleLight as string : currentStrings.themeToggleDark as string}
              aria-label={currentStrings.themeToggleLight as string} // Generic label better
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
             {currentUser && (
                 <span className={`text-sm font-inter px-2 py-1 rounded hidden sm:inline-block ${theme === 'dark' ? 'text-sky-200 bg-sky-800' : 'text-sky-700 bg-sky-100'}`}>
                  {(currentStrings.welcomeUser as string).replace('{username}', currentUser.username)}
                </span>
            )}
          </nav>
        </div>
         {currentUser && (
            <div className="sm:hidden text-center mt-2"> {/* User welcome for small screens */}
                <span className={`text-xs font-inter px-2 py-1 rounded ${theme === 'dark' ? 'text-sky-200 bg-sky-800' : 'text-sky-700 bg-sky-100'}`}>
                  {(currentStrings.welcomeUser as string).replace('{username}', currentUser.username)}
                </span>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
