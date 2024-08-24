'use client'

import Submit from "@/components/Submit"
import { editUserInfo, uploadUserImage } from "@/data/actions/userAction"
import { UserForm } from "@/types"
import useModalStore from "@/zustand/useModalStore"
import useUserStore from "@/zustand/userStore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


function EditForm() {
  const { data: session, update, status} = useSession()
  const { setUser } = useUserStore()
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(session?.user?.image ||null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const openModal = useModalStore((state) => state.openModal);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<UserForm>(
   {
   defaultValues: {
     type: (session?.user?.type as 'user' | 'seller' | 'admin') || 'user',
     name: session?.user?.name || '',
     email: session?.user?.email || '',
     address: session?.user?.address || ''
   }
 }
)


useEffect(() => {
  if (status === "authenticated" && session?.user) {
    reset({
      type: session.user.type as 'user' | 'seller' | 'admin',
      name: session.user.name || '',
      email: session.user.email || '',
      address: session.user.address || '',
    });
    setSelectedImage(session.user.image || '');
  }
}, [session, status, reset]);

useEffect(() => {
  if (session?.user) {
    // useEffect를 통해 필드 값을 수동으로 업데이트
    setValue('type', session.user.type as 'user' | 'seller' | 'admin');
    setValue('name', session.user.name || '');
    setValue('email', session.user.email || '');
    setValue('address', session.user.address || '');
    setSelectedImage(session.user.image || '');
  }
}, [session, setValue]);

  useEffect(() => {
    if (isUpdated) {
      openModal({
        content: "회원 정보가 성공적으로 수정되었습니다.",
        callbackButton: {
          확인: () => {
            setIsUpdated(false);
          },
        },
      });
    }
  }, [isUpdated, openModal]);


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
    formData.append('address', data.address || '');

    try {
      const resData = await editUserInfo(formData, session);
      if (resData.ok === 1) {
       const updateData = {
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          image: imageUrl,
          address: data.address,
        }
      };
       await update(updateData)
       setUser({
        id: session?.user?.id!,
        name: data.name,
        email: session?.user?.email!,
        image: imageUrl,
        type: session?.user?.type as string,
        accessToken: session?.accessToken!,
        refreshToken: session?.refreshToken!,
        address: data.address,
      });
      setSelectedImage(imageUrl);
      setIsUpdated(true);
     
      } else {
        console.error('Error updating user:');
      }
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  if (status === "loading" || !session) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }

	return (
		<form
      onSubmit={handleSubmit(editUser)}
      className="max-w-4xl mx-4 "
    >
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
          placeholder="이미지를 선택하세요"
          className="w-full px-3 py-2 border rounded-lg"
          onChange={handleImageChange}
        />
        </div>   
      </div>
    </div>
    {session?.user?.type === 'seller' && (
        <div className="mb-8">
           <label
          className="block text-gray-500 mb-2 font-semibold"
          htmlFor="address"
        >
          자기소개
        </label>
        <div className="w-50 h-50 border rounded-md ">
          <textarea {...register('address', {required: '강사 소개는 필수입니다.'})}
          placeholder='강사님의 소개를 적어주세요'
          className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>
      )}
    <div className="mt-10 flex justify-center items-center">
      <Submit className="w-full px-3 py-4 bg-main-green hover:bg-main-yellow text-white font-semibold rounded-md">
        회원 정보 수정
      </Submit>
    </div>
  </form>
	)
}

export default EditForm