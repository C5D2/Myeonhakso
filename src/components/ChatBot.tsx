'use client';

import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import type { ChatCompletionMessageParam } from 'openai/resources/index';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from './Button';
import ImgButton from '@/components/ImgButton';
import Message, { MessageProps } from '@/components/Message';

async function sendMessage(
  url: string,
  { arg }: { arg: ChatCompletionMessageParam[] }
) {
  try {
    const res = await axios.post(url, {
      messages: arg,
    }, {
      validateStatus: (status) => status < 500,
    });
    
    if (!res.data) {
      console.error('Empty response');
      throw new Error('Empty response');
    }

    if (!res.data.messages) {
      console.error('Invalid response structure:', res.data);
      throw new Error('Invalid response structure');
    }
    
    return res.data.messages;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error('강의 정보를 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    throw error;
  }
}

const ChatBot = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [messageParams, setMessageParams] = useState<ChatCompletionMessageParam[]>([]);

  const { trigger, isMutating, data } = useSWRMutation(
    '/api/completions',
    sendMessage
  );

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messageParams]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessageParams(parsedMessages);
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
        localStorage.removeItem('messages');
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log('API Response data:', data);
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    }
  }, [data]);

  const handleReset = useCallback(() => {
    if (window.confirm('대화를 초기화 하시겠습니까?') === false) return;
    setMessageParams([]);
    localStorage.removeItem('messages');
  }, []);

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (isMutating || !inputRef.current) return;
      const nextMessages = [
        ...messageParams,
        {
          content: inputRef.current.value as string,
          role: 'user' as const,
        },
      ];

      setMessageParams(nextMessages);
      trigger(nextMessages);

      inputRef.current.value = '';
    },
    [isMutating, messageParams, trigger],
  );

  const formatMessage = (message: any): MessageProps => {
    return {
      content: Array.isArray(message.content) 
        ? message.content.map((part:any) => part.text).join('')
        : String(message.content || ''),
      role: message.role as MessageProps['role'],
      lectures: message.lectures || []
    };
  };
  
  const messagePropsList = useMemo(() => {
    let result: MessageProps[] = [];
    let currentLectures = [];
  
    messageParams.forEach((cur) => {
      if (cur.role === 'function' && cur.content) {
        try {
          const parsedContent = JSON.parse(cur.content);
          currentLectures.push(parsedContent);
        } catch (e) {
          console.error('Error parsing function call result:', e);
        }
      } else {
        result.push(formatMessage(cur));
      }
    });
  
    return result;
  }, [messageParams]);

  return (
    <div className="container flex flex-col overflow-hidden shadow-lg my-5 p-10 h-[calc(100vh-100px)]">
      <div ref={chatScrollRef} className="flex-1 overflow-y-auto">
      <Message content="안녕하세요. 여러분의 강의 추천 도우미, 면학봇입니다.✨ 입문자부터 전문가까지, 다양한 레벨의 강의를 찾아드립니다.🐣🐥🐓 IT, 외국어, 취미 등 관심 있는 분야나 배우고 싶으신 것을 말씀해주세요!" role="assistant" />
        {messagePropsList.map((props, index) => (
          <Message {...props} key={`message-${index}`} />
        ))}
        {isMutating && <Message content="생각 중..." role="assistant" />}
      </div>

      <div className="mt-auto py-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-md border"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-3 pl-4 focus:outline-none"
            placeholder="질문을 입력하세요."
            disabled={isMutating}
          />
          <ImgButton
            label="sendMessage"
            type="submit"
            imageSrc="/send.png"
            disabled={isMutating}
          />
        </form>
        <Button
          className="ml-auto mt-2 block px-3 py-1 bg-main-red/30 text-white rounded hover:bg-main-red/50 text-sm"
          type="button"
          onClick={handleReset}
        >
          대화 초기화
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;