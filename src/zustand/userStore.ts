
import { UserData } from '@/types';
// import { User } from 'next-auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  type: string;
  accessToken: string;
  refreshToken: string;
}

type UserState = {
  user: UserType | null | undefined;
  setUser: (user : UserType | undefined) => void ;
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
