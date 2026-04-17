import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import { type User } from '../types';
import { type SignUpp } from '../types/signup';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: User;
  setUser: (user: User) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  isSignedUp: SignUpp;
  setIsSignedUp: (val: SignUpp) => void;
  isAdmin: boolean; 
  setIsAdmin: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<SignUpp>({ email: '', password: '' });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, setIsLoggedIn,
        user, setUser,
        showModal, setShowModal,
        isSignedUp, setIsSignedUp,
        isAdmin, setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};