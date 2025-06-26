
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { User, Language, UIStrings, Theme } from '../types';
import ErrorDisplay from '../components/ErrorDisplay';

interface RegisterViewProps {
  onRegistrationSuccess: (user: User) => void;
  onNavigateToLogin: () => void;
  language: Language;
  currentStrings: UIStrings;
  theme: Theme;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onRegistrationSuccess, onNavigateToLogin, language, currentStrings, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError(currentStrings.authErrorPasswordMismatch as string);
      return;
    }
    setIsLoading(true);
    const result = registerUser(username, password, confirmPassword, language);
    setIsLoading(false);
    if (result.success && result.user) {
      onRegistrationSuccess(result.user);
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
            {currentStrings.registerTitle as string}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorDisplay message={error} theme={theme} />}
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="username-register" className="sr-only">{currentStrings.registerUsernameLabel as string}</label>
              <input
                id="username-register"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${theme === 'dark' ? 'border-sky-700' : 'border-gray-300'} ${inputBg} ${inputText} ${placeholderText} focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-inter`}
                placeholder={currentStrings.registerUsernameLabel as string}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password-register" className="sr-only">{currentStrings.registerPasswordLabel as string}</label>
              <input
                id="password-register"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${theme === 'dark' ? 'border-sky-700' : 'border-gray-300'} ${inputBg} ${inputText} ${placeholderText} focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-inter`}
                placeholder={currentStrings.registerPasswordLabel as string}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password-register" className="sr-only">{currentStrings.registerConfirmPasswordLabel as string}</label>
              <input
                id="confirm-password-register"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-3 border ${theme === 'dark' ? 'border-sky-700' : 'border-gray-300'} ${inputBg} ${inputText} ${placeholderText} focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm font-inter`}
                placeholder={currentStrings.registerConfirmPasswordLabel as string}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'focus:ring-offset-sky-900 focus:ring-teal-400' : 'focus:ring-offset-white focus:ring-teal-500'} disabled:opacity-50 font-inter`}
            >
              {isLoading ? 'Registrace...' : currentStrings.registerButton as string}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <span className={`${theme === 'dark' ? 'text-sky-300' : 'text-slate-600'} font-inter`}>{currentStrings.registerHasAccount as string} </span>
          <button onClick={onNavigateToLogin} className={`font-medium ${linkColor} font-inter`}>
            {currentStrings.registerLoginLink as string}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
