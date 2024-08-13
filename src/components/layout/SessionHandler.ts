'use client';

import { useEffect } from 'react';
import useUserStore from '@/zustand/userStore';
import { Session } from 'next-auth';

function SessionHandler({ session }: { session: Session | null }) {
  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id!,
        name: session.user.name!,
        email: session.user.email!,
        image: session.user.image,
        type: session.user.type,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      });
    }
    else {
      clearUser();
    }
  }, [session, setUser, clearUser]);

  return null;
}

export default SessionHandler;
