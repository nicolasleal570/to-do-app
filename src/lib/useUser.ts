import User from '../types/User';

interface UseUserReurnType {
  user: User;
}

export default function useUser(): UseUserReurnType {
  const user: User = null;

  return { user };
}
