
import { User, Language } from '../types';
import { LOCAL_STORAGE_USERS_KEY, LOCAL_STORAGE_CURRENT_USER_KEY, UI_STRINGS } from '../constants';

// --- Helper Functions ---
const getStoredUsers = (): User[] => {
  const usersJson = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsers = (users: User[]): void => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

// **WARNING: This is NOT a secure way to handle passwords.**
// It's for demonstration purposes only in a client-side simulation.
// In a real application, use strong, salted hashing on the server-side.
const pseudoHashPassword = (password: string): string => {
  // Simple reversible transformation - DO NOT USE IN PRODUCTION
  return `hashed_${password.split('').reverse().join('')}_demo`;
};

// --- Public API ---
export const registerUser = (username: string, password_raw: string, confirmPassword_raw: string, language: Language): { success: boolean; user?: User; errorKey?: string } => {
  const currentStrings = UI_STRINGS[language];
  if (!username.trim()) return { success: false, errorKey: 'authUsernameRequired' };
  if (!password_raw) return { success: false, errorKey: 'authPasswordRequired' };
  if (password_raw.length < 6) return { success: false, errorKey: 'authErrorPasswordTooShort' };
  if (password_raw !== confirmPassword_raw) return { success: false, errorKey: 'authErrorPasswordMismatch' };

  const users = getStoredUsers();
  if (users.find(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
    return { success: false, errorKey: 'authErrorUserExists' };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    username: username.trim(),
    // Simulate password storage - in a real app, only store the hash
  };
  
  // Store the "hashed" password separately for this demo, not directly on user object for getCurrentUser()
  const userCredentials = {
    userId: newUser.id,
    username: newUser.username,
    hashedPassword: pseudoHashPassword(password_raw),
  };

  // In a real app, users and their credentials would be in a database.
  // Here, we'll store a separate list or augment the user object if we must,
  // but for getCurrentUser, we don't want to pass the hashed password around.
  // For simplicity, we'll store the "hashed" password along with users FOR THIS DEMO.
  // This is bad practice but simplifies localStorage simulation.
  const usersWithCredentials = users.map(u => {
      const cred = localStorage.getItem(`cred_${u.id}`);
      return {...u, hashedPassword: cred ? JSON.parse(cred).hashedPassword : undefined }
  });
  
  usersWithCredentials.push({ ...newUser, hashedPassword: userCredentials.hashedPassword });

  // Save users without exposing password hash directly on the default user list
  const usersToStore = usersWithCredentials.map(({ hashedPassword, ...user }) => user);
  saveUsers(usersToStore); 
  // Store "credentials" separately for this demo
  localStorage.setItem(`cred_${newUser.id}`, JSON.stringify({ hashedPassword: userCredentials.hashedPassword }));


  return { success: true, user: newUser };
};

export const loginUser = (username: string, password_raw: string, language: Language): { success: boolean; user?: User; errorKey?: string } => {
  const currentStrings = UI_STRINGS[language];
  if (!username.trim()) return { success: false, errorKey: 'authUsernameRequired' };
  if (!password_raw) return { success: false, errorKey: 'authPasswordRequired' };

  const users = getStoredUsers();
  const foundUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());

  if (!foundUser) {
    return { success: false, errorKey: 'authErrorUserNotFound' };
  }

  // Retrieve the "hashed" password for this demo
  const userCredJson = localStorage.getItem(`cred_${foundUser.id}`);
  if (!userCredJson) {
     // Should not happen if registration was correct
    return { success: false, errorKey: 'authErrorUserNotFound' }; 
  }
  const userCredentials = JSON.parse(userCredJson);
  
  if (userCredentials.hashedPassword !== pseudoHashPassword(password_raw)) {
    return { success: false, errorKey: 'authErrorInvalidPassword' };
  }

  localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(foundUser));
  return { success: true, user: foundUser };
};

export const logoutUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};
