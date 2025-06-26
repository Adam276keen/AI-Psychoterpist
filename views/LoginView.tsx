
import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { User, Language, UIStrings, Theme } from '../types';
import ErrorDisplay from '../components/ErrorDisplay';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
  language: Language;
  currentStrings: UIStrings;
  theme: Theme;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onNavigateToRegister, language, currentStrings, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const result = loginUser(username, password, language);
    setIsLoading(false);
    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else if (result.errorKey) {
      setError(currentStrings[result.errorKey] as string || currentStrings.errorGeneral as string);
    } else {
      setError(currentStrings.errorGeneral as string);
    }
  };
  
  const cardBg = theme === 'dark' ? 'bg-sky-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-sky-100' : 'text-sky-800';
  const inputBg = theme === 'dark' ? 'bg-sky-800' : 'bg-slate-100';
  const inputText = theme === 'dark' ? 'text-sky-100' : 'text-slate-800';
  const placeholderText = theme === 'dark' ? 'placeholder-sky-400' : 'placeholder-slate-500';
  const buttonBg = theme === 'dark' ? 'bg-teal-500 hover:bg-teal-400' : 'bg-teal-600 hover:bg-teal-700';
  const linkColor = theme === 'dark' ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700';


  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-8 md:p-10 rounded-xl shadow-2xl ${cardBg}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold font-outfit ${textColor}`}>
            {currentStrings.loginTitle as string}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorDisplay message={error} theme={theme} />}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username-login" className="sr-only">{currentStrings.loginUsernameLabel as string}</label>
              <input
                id="username-login"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${theme === 'dark' ? 'border-sky-700' : 'border-gray-300'} ${inputBg} ${inputText} ${placeholderText} focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-t-md font-inter`}
                placeholder={currentStrings.loginUsernameLabel as string}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password-login" className="sr-only">{currentStrings.loginPasswordLabel as string}</label>
              <input
                id="password-login"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${theme === 'dark' ? 'border-sky-700' : 'border-gray-300'} ${inputBg} ${inputText} ${placeholderText} focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm rounded-b-md font-inter`}
                placeholder={currentStrings.loginPasswordLabel as string}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-offset-sky-900 focus:ring-teal-400' : 'focus:ring-offset-white focus:ring-teal-500'} disabled:opacity-50 font-inter`}
            >
              {isLoading ? 'Přihlašování...' : currentStrings.loginButton as string}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <span className={`${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>{currentStrings.loginNoAccount as string} </span>
          <button onClick={onNavigateToRegister} className={`font-medium ${linkColor} font-inter`}>
            {currentStrings.loginRegisterLink as string}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
