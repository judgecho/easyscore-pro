import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  username?: string;
  studentId?: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  className?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: (token: string, user: User) => {
        set({
          isAuthenticated: true,
          user,
          token,
        });
        
        // Set authorization header for future requests
        localStorage.setItem('auth-token', token);
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
        
        // Remove token from localStorage
        localStorage.removeItem('auth-token');
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'easyscore-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
); 