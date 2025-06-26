
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  audioUrl?: string; // For potential future playback of user/AI voice
}

export enum ChatMode {
  TEXT = 'text',
  VOICE = 'voice',
}

export enum AppView {
  HOME = 'home',
  SESSION = 'session',
  PROGRESS = 'progress',
  HELP = 'help',
  LOGIN = 'login',
  REGISTER = 'register',
}

export type Theme = 'light' | 'dark';

export type Language = 'cze' | 'eng';

export interface User {
  id: string;
  username: string;
  // Password is not stored here directly for security, handled by authService
}

// For UI string structure
export interface UIStrings {
  [key: string]: string | UIStrings | any[]; // Allow nested strings or arrays for lists like onboarding
}

export interface LocalizedUIStrings {
  cze: UIStrings;
  eng: UIStrings;
}
