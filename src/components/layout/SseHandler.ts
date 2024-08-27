'use client';

import { useEffect } from 'react';
import useUserStore from "@/zustand/userStore";

export function SSEHandler({ userId }: { userId: string }) {
  const { setUser } = useUserStore();

  useEffect(() => {
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'user-updated' && data.userId === userId) {
        fetch(`/api/user/${userId}`)
          .then(res => res.json())
          .then(userData => {
            setUser(userData);
          });
      }
    };

    return () => {
      eventSource.close();
    };
  }, [userId, setUser]);

  return null;
}