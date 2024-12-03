'use client';

import ResponsiveModal from '@/components/ResponsiveModal';
import ChatBot from '@/components/ChatBot';
import classNames from 'classnames';

interface IChatModalProps {
  title?: string;
  setModal: () => void;
}

function ChatModal({ setModal }: IChatModalProps) {
  return (
    <ResponsiveModal
      title="✨여러분의 면학봇✨"
      setModal={setModal}
      className={classNames('w-[650px] h-[80vh]', 'animate-bottom-sheet-up')}
      // showCloseButton={false}
      position="right"
      titleIcon={{
        src: '/chatbot.png',
        alt: 'chatbot Icon',
        width: 50,
        height: 50,
      }}
    >
      <ChatBot />
    </ResponsiveModal>
  );
}

export default ChatModal;
