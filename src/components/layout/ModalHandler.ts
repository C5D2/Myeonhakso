'use client';

import { useEffect } from 'react';
import useModalStore from '@/zustand/useModalStore';
import useUserStore from '@/zustand/userStore';
import { useRouter } from 'next/navigation';

function ModalHandler() {
  const openModal = useModalStore((state) => state.openModal);
  const hasShownWelcomeModal = useUserStore((state) => state.hasShownWelcomeModal);
  const setHasShownWelcomeModal = useUserStore((state) => state.setHasShownWelcomeModal);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user && !hasShownWelcomeModal) {
      openModal({
        content: `${user.name}님, 환영합니다!`,
        callbackButton: {
          확인: () => {
            router.push('/');
          },
        },
      });

      setHasShownWelcomeModal(true);
    }
  }, [user, hasShownWelcomeModal, openModal, setHasShownWelcomeModal, router]);

  return null;
}

export default ModalHandler;
