'use client';

import FloatingChatBotButton from "@/components/FloatingChatBotButton";
import { usePathname } from "next/navigation";

export default function WithChatBotLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();

  const withoutChatBot = pathname.includes('/edit') ||
  pathname.includes('new');

  return(
    <>
      {children}
      {!withoutChatBot && <FloatingChatBotButton />}
    </>
  )
}