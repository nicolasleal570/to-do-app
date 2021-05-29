import React from 'react';
import User from '../types/User';

interface IUserContext {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = React.createContext<IUserContext>({});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = React.useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
