import { useState } from 'react';
import uuid from 'react-uuid';
import User from '../../types/User';
import useLocalStorage from '../useLocalStorage';

interface UseCreateUserReturnType {
  loading: boolean;
  createUser: (name: string) => Promise<User>;
}

export default function useCreateUser(): UseCreateUserReturnType {
  const [loading, setLoading] = useState(false);
  const { addObject } = useLocalStorage();

  const createUser = (name: string) =>
    new Promise<User>((resolve, reject) => {
      if (loading) return;

      setLoading(true);

      if (!name) {
        setTimeout(() => {
          addObject('user', null);
          reject(
            new Error('Sorry! You have to enter a valid name before continue')
          );
          setLoading(false);
        }, 1000);
      }

      const user: User = {
        id: uuid(),
        name,
        tasks: [],
      };

      setTimeout(() => {
        addObject('user', user);
        resolve(user);
        setLoading(false);
      }, 1000);
    });

  return { loading, createUser };
}
