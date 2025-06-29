import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppView, Theme, ChatMessage, User, Language, UIStrings } from './types';
import { UI_STRINGS, LOCAL_STORAGE_THEME_KEY, LOCAL_STORAGE_LANGUAGE_KEY, LOCAL_STORAGE_CURRENT_USER_KEY } from './constants';
import { resetChat as resetAiChatInstance, initializeChat as initializeAiChat, getAiChatResponse } from './services/geminiService';
import { getCurrentUser as authGetCurrentUser, logoutUser as authLogoutUser } from './services/authService';

import Header from './components/Header';
import HomeView from './views/HomeView';
import SessionView from './views/SessionView';
import ProgressView from './views/ProgressView';
import HelpView from './views/HelpView';
import Footer from './components/Footer';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import CookieConsentBanner from './components/CookieConsentBanner';
import AdSenseUnit from './components/AdSenseUnit';

// Client ID je nyní nastaveno. Ještě je třeba získat ID reklamních jednotek.
// 1. Jděte do svého účtu Google AdSense.
// 2. Vytvořte nové "Obsahové reklamní jednotky" (Display ad units).
// 3. Zkopírujte jejich 'ID reklamní jednotky' (ad slot ID) a vložte je níže.
const ADSENSE_CLIENT_ID = "ca-pub-3531487545757603"; // Toto je vaše Client ID z AdSense.
const ADSENSE_AD_SLOT_LEFT = "YYYYYYYYYY";         // << ZDE VLOŽTE ID REKLAMNÍ JEDNOTKY
const ADSENSE_AD_SLOT_RIGHT = "ZZZZZZZZZZ";        // << ZDE VLOŽTE ID REKLAMNÍ JEDNOTKY (může být stejné)

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('cze');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const currentStrings = useMemo(() => UI_STRINGS[language] as UIStrings, [language]);

  const initializeApp = useCallback(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme + '-mode';
    } else {
      document.body.className = 'light-mode';
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'light');
    }

    const storedLang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) as Language | null;
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, 'cze');
    }
    
    const user = authGetCurrentUser();
    if (user) {
      setCurrentUser(user);
      // If user is logged in, default to home or session based on preference
      // setCurrentView(AppView.HOME); // Or AppView.SESSION if you want to jump right in
    } else {
      setCurrentView(AppView.HOME); // Or AppView.LOGIN if you want to force login first
    }
    setIsAppInitialized(true);
  }, []);

  useEffect(() => {
    if (!isAppInitialized) {
      initializeApp();
    }
  }, [isAppInitialized, initializeApp]);


  const resetChatMessagesWithGreeting = useCallback(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        text: currentStrings.initialGreeting as string,
        sender: 'ai',
        timestamp: new Date(),
      }
    ]);
    resetAiChatInstance(); // Reset the Gemini chat instance
    if (currentUser) { // Only initialize new AI chat if user is logged in
        initializeAiChat(language);
    }
  }, [currentStrings, language, currentUser]);
  
  useEffect(() => {
    // This effect runs when language or currentUser changes,
    // to reset chat if a user is logged in.
    if (currentUser && isAppInitialized) { // Ensure app is initialized to prevent premature resets
        resetChatMessagesWithGreeting();
    } else if (!currentUser && isAppInitialized) {
        // If user logs out, clear messages and AI instance
        setMessages([]);
        resetAiChatInstance();
    }
  }, [language, currentUser, resetChatMessagesWithGreeting, isAppInitialized]);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme + '-mode';
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'cze' ? 'eng' : 'cze';
    setLanguage(newLanguage);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, newLanguage);
    // Chat will be reset by the useEffect watching `language` and `currentUser`
  };

  const handleNavigate = (view: AppView) => {
    if (!currentUser && (view === AppView.SESSION || view === AppView.PROGRESS)) {
      setCurrentView(AppView.LOGIN); // Force login for protected views
    } else {
      setCurrentView(view);
    }
  };
  
  const handleStartSession = () => {
    if (!currentUser) {
      setCurrentView(AppView.LOGIN);
      return;
    }
    // Ensure messages are set correctly if navigating directly or starting fresh
    if (messages.length === 0 || messages[0]?.text !== currentStrings.initialGreeting) {
        resetChatMessagesWithGreeting();
    }
    setCurrentView(AppView.SESSION);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    // Language might have been set before login, so we use the current `language` state
    // The useEffect for `currentUser` and `language` will handle chat reset.
    setCurrentView(AppView.HOME); // Or AppView.SESSION
  };

  const handleRegistrationSuccess = (user: User) => {
    setCurrentUser(user);
    // Similar to login, useEffect handles chat reset.
    setCurrentView(AppView.HOME); // Or AppView.SESSION
  };
  
  const handleLogout = () => {
    authLogoutUser();
    setCurrentUser(null);
    // Messages will be cleared and AI chat reset by useEffect watching `currentUser`
    setCurrentView(AppView.HOME);
  };

  const handleResetSessionView = useCallback(() => { // Renamed to avoid conflict
    if (currentUser) {
        resetChatMessagesWithGreeting();
    }
    // Optionally navigate, but usually stay in session view
    setCurrentView(AppView.SESSION); 
  }, [currentUser, resetChatMessagesWithGreeting, currentStrings]);


  const renderView = () => {
    if (!isAppInitialized) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>; // Or a proper loading spinner
    }

    if (!currentUser) {
      // Unauthenticated routes
      switch (currentView) {
        case AppView.LOGIN:
          return <LoginView 
                    onLoginSuccess={handleLoginSuccess} 
                    onNavigateToRegister={() => setCurrentView(AppView.REGISTER)} 
                    language={language}
                    currentStrings={currentStrings}
                    theme={theme}
                  />;
        case AppView.REGISTER:
          return <RegisterView 
                    onRegistrationSuccess={handleRegistrationSuccess} 
                    onNavigateToLogin={() => setCurrentView(AppView.LOGIN)}
                    language={language}
                    currentStrings={currentStrings}
                    theme={theme}
                  />;
        case AppView.HELP: // Help view might be accessible without login
          return <HelpView currentStrings={currentStrings} theme={theme} language={language} />;
        case AppView.HOME:
        default:
          return <HomeView 
                    currentStrings={currentStrings} 
                    onStartSession={handleStartSession} 
                    theme={theme} 
                    currentUser={currentUser}
                    language={language}
                  />;
      }
    }

    // Authenticated routes
    switch (currentView) {
      case AppView.HOME:
        return <HomeView 
                  currentStrings={currentStrings} 
                  onStartSession={handleStartSession} 
                  theme={theme} 
                  currentUser={currentUser}
                  language={language}
                />;
      case AppView.SESSION:
        return <SessionView 
                  initialMessages={messages} 
                  setMessages={setMessages} 
                  onResetSession={handleResetSessionView} 
                  theme={theme}
                  language={language}
                  currentStrings={currentStrings}
                  getAiResponse={getAiChatResponse} // Pass the actual AI function
                  // Make sure SessionView expects getAiResponse
                />;
      case AppView.PROGRESS:
        return <ProgressView currentStrings={currentStrings} theme={theme} language={language} />;
      case AppView.HELP:
        return <HelpView currentStrings={currentStrings} theme={theme} language={language} />;
      default: // Fallback for logged-in users, e.g. if currentView is LOGIN by mistake
        return <HomeView 
                  currentStrings={currentStrings} 
                  onStartSession={handleStartSession} 
                  theme={theme} 
                  currentUser={currentUser}
                  language={language}
                />;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark-mode bg-sky-950 text-sky-100' : 'light-mode bg-sky-50 text-sky-900'}`}>
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        theme={theme} 
        toggleTheme={toggleTheme}
        language={language}
        toggleLanguage={toggleLanguage}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentStrings={currentStrings}
      />
      <div className="flex-1 w-full flex justify-center">
        {/* Left Ad Placeholder */}
        <aside className="hidden lg:block w-48 xl:w-56 py-8 pr-4 flex-shrink-0">
            <div className="sticky top-28 h-[calc(100vh-10rem)]">
                <AdSenseUnit 
                  theme={theme}
                  adClient={ADSENSE_CLIENT_ID}
                  adSlot={ADSENSE_AD_SLOT_LEFT}
                />
            </div>
        </aside>

        {/* Main content area */}
        <main className="flex-grow px-4 py-8 w-full max-w-7xl">
            {renderView()}
        </main>

        {/* Right Ad Placeholder */}
        <aside className="hidden lg:block w-48 xl:w-56 py-8 pl-4 flex-shrink-0">
            <div className="sticky top-28 h-[calc(100vh-10rem)]">
                <AdSenseUnit 
                  theme={theme}
                  adClient={ADSENSE_CLIENT_ID}
                  adSlot={ADSENSE_AD_SLOT_RIGHT}
                />
            </div>
        </aside>
      </div>
      <Footer currentStrings={currentStrings} />
      <CookieConsentBanner currentStrings={currentStrings} theme={theme} />
    </div>
  );
};
