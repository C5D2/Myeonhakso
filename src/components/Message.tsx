import Image from 'next/image';
import classNames from 'classnames';
import { Ilecture } from '@/types/lecture';
import MiniCard from '@/components/MiniCard';

export type MessageProps = {
  content: string;
  role: 'user' | 'assistant' | 'system';
  lectures?: Ilecture[];
  className?: string;
};

function Message ({ content, role, lectures=[], className }: MessageProps ) {
  const cleanContent = content.replace(/\*\*(.*?)\*\*/g, '$1');

  return (
    <div className="py-2 w-full">
    <div
      className={classNames(
        "mx-auto flex items-start gap-3",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
      <div className="flex-shrink-0">
        {role === "assistant" && (
          <Image
            src="/chatbot.png"
            alt="chatbot image"
            width={50}
            height={50}
          />)}
        </div>

        <div className={classNames("flex flex-col max-w-[80%]",
          role === "user" ? "items-end" : "items-start"
        )}>
        <div className={classNames("px-6 py-4 rounded-2xl",
          role === "user" ? "bg-main-yellow/30 text-black" : "bg-main-light-green/30",
          className
        )}>
          <div className="whitespace-pre-wrap w-full">{cleanContent}</div>
          
          {lectures && lectures.length > 0 && (
            <div className="w-full mt-4">
            <div className="grid gap-3">
              {lectures.map((item, index) => (
                <MiniCard item={item} key={`${item._id}-${index}`} />
              ))}
            </div>
          </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;