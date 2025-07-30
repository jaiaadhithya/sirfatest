import { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'adult' | 'kid' | 'parent' | undefined;

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserType>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ userType, setUserType, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};