import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TUser } from '../types/user';

type userStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  clearUser: () => void;
};

const useUserStore = create(
  persist<userStore>(
    set => ({
      user: null,
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'userLocalStorage', //localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), //localStorage를 사용
    }
  )
);

export default useUserStore;
