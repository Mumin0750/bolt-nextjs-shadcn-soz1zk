import { User } from './types';

const USERS: Record<string, { password: string; role: 'admin' | 'show'; showNumber?: number }> = {
  'Admin': { password: 'password123', role: 'admin' },
  ...Array.from({ length: 13 }, (_, i) => ({
    [`Show${i + 1}`]: { 
      password: 'password123', 
      role: 'show', 
      showNumber: i + 1 
    }
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
};

export const authenticate = (username: string, password: string): User | null => {
  const user = USERS[username];
  
  if (!user || user.password !== password) {
    return null;
  }

  return {
    username,
    role: user.role,
    showNumber: user.showNumber
  };
};