'use server';

import { ApiResWithValidation, FileRes, MultiItem, SingleItem, UserData, UserForm } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

console.log("SERVER", SERVER)

export async function signup(formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {

	const userData = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    profileImage: '',
  }
    console.log("userData", userData)

	  // 이미지 먼저 업로드
		const attach = formData.get('attach') as File;

   if (attach && attach.size > 0) {
    // 프로필 이미지를 추가한 경우
    const fileRes = await fetch(`${SERVER}/files`, {
      method: 'POST',
      headers: {
        'client-id': '07-myeonhakso',
      },
      body: attach,
    });

    if(!fileRes.ok){
      const errorMsg = await fileRes.text();
      console.error('File upload failed:', errorMsg);
      throw new Error(`파일 업로드 실패: ${errorMsg}`);
    }
    const fileData: MultiItem<FileRes> = await fileRes.json();
    // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
    userData.profileImage = fileData.item[0].path;
  } 

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'client-id': '07-myeonhakso'
    },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  console.log('data', data);
  return data;
}