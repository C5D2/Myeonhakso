import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Lecture = {
  id: number | null | undefined;
  name: string | null | undefined;
};
type LectureState = {
  lecture: Lecture | undefined | null;
  setLecture: (lecture: Lecture | undefined) => void;
};

export const useLogStore = create<LectureState>()(
  persist(
    set => ({
      lecture: null,
      setLecture: lecture => set({ lecture }),
    }),
    {
      name: 'recentLecture-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
