import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect } from 'react';

export interface IContentModalProps {
  title?: string;
  setModal: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  position?: 'center' | 'right';
  titleIcon?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

function ContentModal({
  title,
  setModal,
  children,
  className,
  showCloseButton = true,
  position = 'center',
  titleIcon,
}: IContentModalProps) {
  // body 요소 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500/50 z-[100]"
      onClick={setModal}
    >
      <div
        className={classNames(
          'bg-white rounded-lg flex flex-col overflow-hidden',
          position === 'right' && 'absolute right-10 bottom-40',
          className,
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pt-5 px-5">
          <div className="flex items-center gap-3">
            {titleIcon && <Image {...titleIcon} />}
            <div className="text-gray-600 text-xl font-black">{title}</div>
          </div>
          {showCloseButton && (
            <button
              className="relative w-[14px] h-[14px] p-[33px]"
              onClick={setModal}
            >
              <Image
                src="/close.svg"
                alt="close"
                width={50}
                height={50}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default ContentModal;
