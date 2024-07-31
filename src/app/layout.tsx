import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col h-lvh border-red-500 border">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
