'use client';

import { useState } from 'react';
import MypageModal from './MypageModal';

export default function MobileMypageButton({
  type,
}: {
  type: string | undefined;
}) {
  const [modalActive, setModalActive] = useState(false);
  console.log('modalActive', modalActive);
  return (
    <>
      <button type="button" onClick={() => setModalActive(!modalActive)}>
        <img src="/footer-mypage.svg" alt="" className="mx-auto" />
        <p className="text-[10px]">내강의실</p>
      </button>
      {modalActive && (
        <MypageModal
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </>
  );
}
