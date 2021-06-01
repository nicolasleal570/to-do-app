import { useContext, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { UserContext } from '../context/UserContext';
import User from '../types/User';
import useLocalStorage from './useLocalStorage';

interface UseUserReturnType {
  user: User;
  loading: boolean;
  isLoggedIn: boolean;
  registerUser: (data: { name: string }) => Promise<User>;
  updateUser: (data: User) => Promise<User>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const localStorageKey = 'USER';

export default function useUser(): UseUserReturnType {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addObject, getObject } = useLocalStorage();
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      const _user = getObject(localStorageKey) as User;
      setUser(_user);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const registerUser = ({ name }: { name: string }) =>
    new Promise<User>((resolve, reject) => {
      if (loading) return;

      setLoading(true);

      if (!name) {
        setTimeout(() => {
          addObject(localStorageKey, null);
          reject(
            new Error('Sorry! You have to enter a valid name before continue')
          );
          setLoading(false);
        }, 1000);
      }

      const _user: User = {
        id: uuid(),
        name,
        username: name.toLowerCase().replace(' ', '-'),
        tasks: [],
      };

      setTimeout(() => {
        addObject(localStorageKey, _user);
        setUser(_user);
        setLoading(false);
        resolve(_user);
      }, 1000);
    });

  const updateUser = (updatedUser: User): Promise<User> =>
    new Promise<User>((resolve) => {
      if (loading) return;

      setLoading(true);

      setTimeout(() => {
        addObject(localStorageKey, updatedUser);
        setUser(updatedUser);
        setLoading(false);
        resolve(updatedUser);
      }, 1000);
    });

  return { user, loading, isLoggedIn, registerUser, updateUser, setUser };
}
