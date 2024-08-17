'use client';
import { useLogStore } from '@/zustand/logStore';

export default function RecentLecture() {
  const lecture = useLogStore(state => state.lecture);
  return <div>RecentLecture</div>;
}
