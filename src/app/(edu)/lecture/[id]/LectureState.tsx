'use client';
import { useLogStore } from '@/zustand/logStore';
import { useEffect } from 'react';

export default function LectureState({ id }: { id: number }) {
  const setLectureId = useLogStore(state => state.setLecture);

  useEffect(() => setLectureId({'여기에 id와 강의제목값 세팅'}), [id]);
  return <div>LectureState</div>;
}
