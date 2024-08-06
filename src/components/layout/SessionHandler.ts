'use client';

import { useEffect } from 'react';
import useUserStore from '@/zustand/userStore';
import { Session } from 'next-auth';

function SessionHandler({ session }: { session: Session | null }) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      clearUser();
    }
  }, [session, setUser, clearUser]);

  return null;
}

export default SessionHandler;