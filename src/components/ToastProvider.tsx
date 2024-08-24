'use client';

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, Slide, ToastContainer } from 'react-toastify';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    default: 'bg-main-light-green',
    success: 'bg-main-green',
    error: 'bg-main-yellow',
    info: 'bg-main-gray',
    warning: 'bg-main-red/60',
    dark: 'bg-white-600 font-gray-300',
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={context =>
          contextClass[context?.type || 'default'] +
          ' relative flex p-1 m-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm text-black font-bold block p-3'}
        autoClose={3000}
        transition={Bounce || Slide}
        hideProgressBar={true}
      />
    </>
  );
}
