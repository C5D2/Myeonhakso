'use client';

import { postComment } from '@/data/actions/mypageAction';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

export type CommentData = {
  content: string;
};

export default function CommentNew() {
  const { id } = useParams();
  const router = useRouter();
  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentData>();

  const handleComment = async (formData: CommentData) => {
    const resData = await postComment(Number(id), formData);
    console.log(resData);
    router.refresh();
  };
  return (
    <div className="mx-auto w-[70%] sm:w-full mb-3">
      <form
        onSubmit={handleSubmit(handleComment)}
        className="flex gap-1 items-center"
      >
        <textarea
          className="p-2 outline-gray-30 resize-none border border-gray-30 rounded-md w-full"
          id="content"
          placeholder="내용을 입력하세요."
          {...register('content', {
            required: '내용을 입력하세요.',
            minLength: {
              value: 2,
              message: '내용은 2글자 이상 입력해주세요.',
            },
          })}
        />

        <button
          type="submit"
          className="sm:basis-1/6 h-fit basis-1/12 text-sm py-1  bg-main-green text-white rounded-lg"
        >
          입력
        </button>
      </form>
      {errors.content && (
        <p className="text-red-500 text-sm">2글자 이상 입력해주세요!</p>
      )}
    </div>
  );
}
