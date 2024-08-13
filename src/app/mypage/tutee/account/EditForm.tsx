'use client'

import Submit from "@/components/Submit"
import { editUserInfo, uploadUserImage } from "@/data/actions/userAction"
import { UserForm } from "@/types"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


function EditForm() {
  const { data: session, status, update} = useSession()
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(session?.user?.image ||null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue } = useForm<UserForm>({
    defaultValues: {
      type: (session?.user?.type as 'user' | 'seller' | 'admin') || 'user',
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    }
  })

  useEffect(() => {
    if (session?.user) {
      setValue('type', session.user.type as 'user' | 'seller' | 'admin');
      setValue('name', session.user.name || '');
      setValue('email', session.user.email || '');
      setSelectedImage(session.user.image || '');
    }
  }, [session, setValue]); 

  const handleEmailFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.blur()
    }

  const handleImageClick = () => {
    document.getElementById('attach')?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file); 
    }
  };

  const editUser = async (data: UserForm) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('type', data.type);

    if (!session || !session.accessToken) {
      console.error('User or accessToken is missing');
      return;
    }

    let imageUrl = session?.user?.image

    if (selectedFile) {
      try {
         imageUrl = await uploadUserImage(selectedFile, session.accessToken);
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }
    }
    formData.append('image', imageUrl || '');

    try {
      const resData = await editUserInfo(formData, session);
      if (resData.ok === 1) {
       const updateData = {
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          image: imageUrl,
        }
      };
       await update(updateData)
        window.location.reload();
        setSelectedImage(session.user?.image);
        // modal으로 변경되었다는 표시 남겨주기 

      } else {
        console.error('Error updating user:');
      }
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

	return (
		<form
      onSubmit={handleSubmit(editUser)}
      className="max-w-4xl mx-4 "
    >
    {/* <div className="mb-12 flex justify-center gap-14" id="type">
      <input
        id="type"
        type="hidden"
        {...register('type')}
      />
    </div> */}

    <div className="mb-4">
      <label
        className="block text-gray-500 mb-2 font-semibold"
        htmlFor="name"
      >
        이름
      </label>
      <input
        id="name"
        type="name"
        className="w-full px-3 py-2 border rounded-md"
        {...register('name', {
          required: '이름을 입력하세요.',
          minLength: {
            value: 2,
            message: '이름을 2글자 이상 입력해주세요.',
          },
        })}
      />
    </div>
    <div className="mb-8">
      <div className="flex justify-between ">
        <label
          className="block text-gray-500 mb-2 font-semibold pt-2"
          htmlFor="email"
        >
          이메일
        </label>
      </div>
      <input
        id="email"
        type="email"
        className="w-full px-3 py-2 border rounded-md text-gray-90"
        {...register('email')}
        onFocus={handleEmailFocus}
        // readOnly
       />
    </div>

    <div className="mb-8">
      <label
        className="block text-gray-500 mb-2 font-semibold"
        htmlFor="attach"
      >
        프로필 이미지
      </label>
      <div className="flex flex-col gap-4 my-4">
        <div className="overflow-hidden" onClick={handleImageClick}>
          {selectedImage  && (
            <Image
              className="object-cover rounded-md"
              src={selectedImage}
              width="300"
              height="300"
              alt="프로필 이미지"
            />
          )}
            <input
            type="file"
            id="attach"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {/* 이미지가 없는 사용자일때 */}
        <input
          type="file"
          id="attach"
          accept="image/*"
          placeholder="이미지를 선택하세요"
          className="w-full px-3 py-2 border rounded-lg"
          onChange={handleImageChange}
        />
      </div>
    </div>
    <div className="mt-10 flex justify-center items-center">
      <Submit className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md">
        회원 정보 수정
      </Submit>
    </div>
  </form>
	)
}

export default EditForm