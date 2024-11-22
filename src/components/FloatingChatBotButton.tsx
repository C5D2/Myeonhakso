import ImgButton from "@/components/ImgButton";
import Link from "next/link";

export default function FloatingChatBotButton() {
  return (
    <div className="fixed bottom-12 right-10 bg-white p-4 sm:bottom-14 sm:right-5 sm:p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-[100]">
      <Link href="/chatbot">
      <ImgButton label="chatbot button" imageSrc="/chatbot.png" width={60}imageAlt="chatbot button" />
      </Link>
    </div>
  );
}