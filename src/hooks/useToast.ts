'use client';

import { useEffect, useState, useCallback } from 'react';

const useToast = () => {
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showToast = useCallback((message: string, duration = 3000) => {
    setMessage(message);
    setDuration(duration);
    setToast(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toast) {
      timer = setTimeout(() => {
        setToast(false);
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toast, duration]);

  return { toast, message, showToast };
};

export default useToast;
