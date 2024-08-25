'use client';

import useModalStore from '@/zustand/useModalStore';

const Modal: React.FC = () => {
  const { content, callbackButton, isOpen, closeModal } = useModalStore();

  const buttons = Object.entries(callbackButton).map(
    ([buttonName, callback], index) => (
      <button
        key={index}
        onClick={() => {
          closeModal();
          callbackButton[buttonName]?.();
        }}
      >
        {buttonName}
      </button>
    ),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-100 flex flex-col min-h-[10rem] overflow-hidden">
        <div className="flex-grow flex flex-col justify-end items-center p-12 pb-8">
          <p className="text-center">{content}</p>
        </div>
        <div className="flex justify-evenly mt-4 bg-main-green text-white h-12 font-semibold">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default Modal;
