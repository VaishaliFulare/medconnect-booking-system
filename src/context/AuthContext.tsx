
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, user: null, token: null, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Mock API calls - In real app, these would call your backend
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock login logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin login check
      if (email === 'admin@medconnect.com' && password === 'admin123') {
        const adminUser: User = {
          _id: 'admin-1',
          name: 'Admin User',
          email: 'admin@medconnect.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };
        const token = 'mock-admin-token';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(adminUser));
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: adminUser, token } });
        return;
      }
      
      // Patient login
      const mockUser: User = {
        _id: 'user-1',
        name: 'John Doe',
        email: email,
        role: 'patient',
        createdAt: new Date().toISOString(),
      };
      const token = 'mock-patient-token';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw new Error('Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        _id: 'user-' + Date.now(),
        name,
        email,
        phone,
        role: 'patient',
        createdAt: new Date().toISOString(),
      };
      const token = 'mock-token-' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
