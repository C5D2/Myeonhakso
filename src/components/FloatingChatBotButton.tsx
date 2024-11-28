import ChatModal from "@/components/ChatModal";
import ImgButton from "@/components/ImgButton";
import { useState } from "react";

export default function FloatingChatBotButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
  <>
    <div className="fixed bottom-12 right-10 bg-white p-4 sm:bottom-14 sm:right-5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-[200]"
    onClick={handleModalOpen}>
      <ImgButton label="chatbot button" imageSrc="/chatbot.png" width={60}imageAlt="chatbot button" />
    </div>
    {isModalOpen && (
      <ChatModal title="✨여러분의 면학봇✨" setModal={handleModalClose} />
    )}
  </>
  );
}