import { UserData } from '@/types';
import { User } from 'next-auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  user: User | null | undefined;
  setUser: (user : User | undefined) => void ;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
			clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
