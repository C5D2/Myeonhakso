'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  text: string;
  duration?: number;
}

function Toast({ text, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`fixed top-14 left-0 w-full flex justify-center items-center transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div
        // className="bg-gradient-to-br from-[#E8EFDD] via-[#def7b9] to-[#c3ec87]
        className="bg-main-green/60 text-white
                   px-6 py-3 rounded-md border-3 border-white/25
                   backdrop-blur-[1px] mb-6"
      >
        {text}
      </div>
    </div>
  );
}

export default Toast;
