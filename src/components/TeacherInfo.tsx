import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Dispatch, SetStateAction } from 'react';
import { ITeacher } from '@/types';
import { IBookmark } from '@/types/lecture';
import { ICardItem } from '@/components/TeacherCard'; // ICardItem을 import

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface TeacherInfoProps {
  item: (ITeacher | IBookmark) & ICardItem;
  buttonState: boolean;
  setButtonState: Dispatch<SetStateAction<boolean>>;
}

export default function TeacherInfo({
  item,
  buttonState,
  setButtonState,
}: TeacherInfoProps) {
  if (!buttonState) return null;

  const content = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-1/3 min-w-[200px] mx-4">
        <div className="flex justify-between place-content-center items-center mb-8 min-w-full">
          <h4 className="font-bold text-2xl">선생님 정보</h4>
          <button
            className="bg-[url('/exit.svg')] w-6 h-6 bg-contain bg-no-repeat"
            onClick={() => setButtonState(false)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-full mb-4"
            src={
              `${SERVER}/${
                (item as IBookmark)?.user?.image || (item as ITeacher)?.image
              }` || '/teacher_detail.svg'
            }
            width={120}
            height={120}
            alt="선생님 사진"
          />
          <div className="rounded-lg bg-main-light-green p-3 flex flex-col items-center">
            <h3 className="rounded-md bg-light-yellow p-1 text-xl font-semibold mb-2">
              {(item as IBookmark)?.user?.name || (item as ITeacher)?.name}
            </h3>
            <p className="text-center">
              {(item as IBookmark)?.user?.address ||
                (item as ITeacher)?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined'
    ? createPortal(content, document.body)
    : null;
}
