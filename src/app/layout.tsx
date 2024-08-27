import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import './globals.css';
import { Metadata } from 'next';
import { NextAuthProvider } from './providers';
import Script from 'next/script';

import Modal from '@/components/Modal';
import ModalHandler from '@/components/layout/ModalHandler';

import KakaoScript from '@/components/KakaoScript';
import ToastProvider from '@/components/ToastProvider';

declare global {
  interface Window {
    Kakao: any;
  }
}
export const metadata: Metadata = {
  title: '면학소 Home',
  description: '면학소 초기 페이지입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-lvh">
              <Header />
              <Script src="https://cdn.iamport.kr/v1/iamport.js" />
              <div className="sm:pt-[50px] sm:pb-[60px]">{children}</div>
              <KakaoScript />
              <Footer />
            </div>
          </ToastProvider>
          <Modal />
          {/* <ModalHandler />/ */}
        </NextAuthProvider>
      </body>
    </html>
  );
}
