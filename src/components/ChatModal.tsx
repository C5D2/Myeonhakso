'use client';

import ChatBot from "@/components/ChatBot";
import ImgButton from "@/components/ImgButton";
import Image from "next/image";
import { useEffect } from "react";

interface ChatModalProps {
  title?: string;
  setModal: () => void;
}

function ChatModal({title, setModal}: ChatModalProps) {
  const preventCloseModal =(event: React.MouseEvent) => {
    event.stopPropagation();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);

  return (
  <div className="fixed inset-0 flex justify-center items-center w-full h-full bg-gray-500/50 z-[200]" onClick={setModal}>
    <div className="bg-white w-[800px] h-[80vh] rounded-lg flex flex-col overflow-hidden" onClick={preventCloseModal}>
      <div className="flex items-center justify-between p-3 border-b">
        <div className="w-[40px]" />
        <div className="flex items-center gap-2"> 
          <Image src="/chatbot.png" alt="chatbot" width={50} height={50}/>
          <div className="text-gray-600 text-xl font-black">{title}</div>
        </div>
        <div className="mr-3"> 
          <ImgButton label="close modal" imageSrc="/close.svg" width={50} onClick={setModal} />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <ChatBot />
      </div>
    </div>
  </div>
  );
}

export default ChatModal;