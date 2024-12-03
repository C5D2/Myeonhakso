import ChatModal from '@/components/ChatModal';
import ImgButton from '@/components/ImgButton';
import classNames from 'classnames';
import { useState } from 'react';

export default function FloatingChatBotButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModalToggle = () => {
    setIsAnimating(!isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <>
      {isModalOpen && <ChatModal setModal={() => setIsModalOpen(false)} />}
      <div
        className={classNames(
          'fixed bottom-12 right-10 bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-[105]',
          isModalOpen && 'md:hidden',
          isAnimating ? 'animate-single-spin' : '',
        )}
        onClick={handleModalToggle}
        onAnimationEnd={handleAnimationEnd}
      >
        <ImgButton
          label={isModalOpen ? 'close chatbot' : 'open chatbot'}
          imageSrc={isModalOpen ? '/close.svg' : '/chatbot.png'}
          width={60}
          imageAlt={isModalOpen ? 'close chatbot' : 'open chatbot'}
        />
      </div>
    </>
  );
}
