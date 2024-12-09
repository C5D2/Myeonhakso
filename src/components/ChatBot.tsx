'use client';

import useSWRMutation from 'swr/mutation';
import type { ChatCompletionMessageParam } from 'openai/resources/index';
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from './Button';
import ImgButton from '@/components/ImgButton';
import Message, { MessageProps } from '@/components/Message';
import { sendMessage } from '@/data/actions/completionActions';
import useModalStore from '@/zustand/useModalStore';

function ChatBot() {
  const inputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >([]);
  const openModal = useModalStore(state => state.openModal);

  const { trigger, isMutating, data } = useSWRMutation(
    '/api/completions',
    sendMessage,
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
      setMessageParams(data);
      localStorage.setItem('messages', JSON.stringify(data));
    }
  }, [data]);

  const handleReset = useCallback(() => {
    openModal({
      title: '로그인',
      content: '대화를 초기화하시겠습니까?',
      callbackButton: {
        확인: () => {
          setMessageParams([]);
          localStorage.removeItem('messages');
        },
        취소: () => {},
      },
    });
  }, [openModal]);

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
        ? message.content.map((part: any) => part.text).join('')
        : String(message.content || ''),
      role: message.role as MessageProps['role'],
      lectures: message.lectures || [],
    };
  };

  const messagePropsList = useMemo(() => {
    let result: MessageProps[] = [];
    let currentLectures = [];

    messageParams.forEach(cur => {
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
    <div className="flex flex-col h-full p-5">
      <div ref={chatScrollRef} className="flex-1 overflow-y-auto">
        <Message
          content={`안녕하세요. 여러분의 강의 추천 도우미, 면학봇입니다.✨\n입문자부터 전문가까지, 다양한 레벨의 강의를 찾아드립니다.🐣🐥🐓\nIT, 외국어, 취미 등 관심 있는 분야나 배우고 싶으신 것을 말씀해주세요!`}
          role="assistant"
        />
        {messagePropsList.map((props, index) => (
          <Message {...props} key={`message-${index}`} />
        ))}
        {isMutating && <Message content="생각 중..." role="assistant" />}
      </div>

      <div className="mt-auto py-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-md border-2 focus-within:border-main-yellow/50"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 rounded-md p-3 pl-4 focus:outline-none"
            placeholder="질문을 입력하세요."
            disabled={isMutating}
          />
          {/* 반응형 확인하기... */}
          <ImgButton
            label="sendMessage"
            type="submit"
            imageSrc="/send.png"
            disabled={isMutating}
            width={40}
            className="mr-3"
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
}

export default ChatBot;
