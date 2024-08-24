'use client';

import { useEffect, useRef } from 'react';
import useUserStore from '@/zustand/userStore';
import { Session } from 'next-auth';

function SessionHandler({ session }: { session: Session | null }) {
  const { user, setUser, clearUser } = useUserStore();
  const prevSessionRef = useRef<Session | null>(null);

  useEffect(() => {
    if (session?.user) {

        setUser({
          id: session.user.id!,
          name: session.user.name!,
          email: session.user.email!,
          image: session.user.image,
          type: session.user.type as string,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          address: session.user.address,
        });

      } else if (!session && user) {
      clearUser();
    }

    prevSessionRef.current = session;
  }, [session, setUser, clearUser]);

  return null;
}

export default SessionHandler;