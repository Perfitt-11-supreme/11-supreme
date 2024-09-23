import { getAuth } from 'firebase/auth';

export const TextUpload = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? user.uid : null;
};
