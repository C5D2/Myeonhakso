'use client';

import { useState } from 'react';
import MypageModal from './MypageModal';
import Image from 'next/image';

export default function MobileMypageButton({
  type,
}: {
  type: string | undefined;
}) {
  const [modalActive, setModalActive] = useState(false);
  console.log('modalActive', modalActive);
  return (
    <li>
      <button type="button" onClick={() => setModalActive(!modalActive)}>
        <Image
          src="/footer-mypage.svg"
          alt="내강의실 아이콘"
          width={25}
          height={25}
          style={{ margin: '0 auto' }}
        />
        <p className="text-[10px]">내강의실</p>
      </button>
      {modalActive && (
        <MypageModal
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      )}
    </li>
  );
}
