

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
  address?: string;
}

type UserState = {
  user: UserType | null ;
  hasShownWelcomeModal: boolean; // 모달 표시 여부를 추적하는 상태
  setUser: (user : UserType | undefined) => void ;
  setHasShownWelcomeModal: (value: boolean) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hasShownWelcomeModal: false, // 기본값은 false
      setUser: (user) => set({ user: user || null }),
			clearUser: () => set({ user: null ,  hasShownWelcomeModal: false}),
      setHasShownWelcomeModal: (value: boolean) => set({ hasShownWelcomeModal: value }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
