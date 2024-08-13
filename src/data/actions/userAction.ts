
import { ApiResWithValidation, FileRes, MultiItem, SingleItem, UserData, UserForm } from '@/types';
import { Session } from 'next-auth';


const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function signup(formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {

	const userData = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    image: '',
  }

		const attach = formData.get('attach') as File;
    if (attach && attach.size > 0) {
      const fileFormData = new FormData();
      fileFormData.append('attach', attach);

    const fileRes = await fetch(`${SERVER}/files`, {
      method: 'POST',
      headers: {
        'client-id':  `${CLIENT_ID}`,
      },
      body: fileFormData,
    });

    if(!fileRes.ok){
      const errorMsg = await fileRes.text();
      console.error('File upload failed:', errorMsg);
      throw new Error(`파일 업로드 실패: ${errorMsg}`);
    }
    const fileData: MultiItem<FileRes> = await fileRes.json();
    
    userData.image = fileData.item[0].path;
  } 

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'client-id': `${CLIENT_ID}`
    },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  return data;
}


export async function uploadUserImage(attach: File, accessToken: string): Promise<string> {
  const fileFormData = new FormData();
  fileFormData.append('attach', attach);

  const fileRes = await fetch(`${SERVER}/files`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Authorization': `Bearer ${accessToken}`,
    },
    body: fileFormData,
  });

  if (!fileRes.ok) {
    const errorMsg = await fileRes.text();
    console.error('File upload failed:', errorMsg);
    throw new Error(`파일 업로드 실패: ${errorMsg}`);
  }

  const fileData: MultiItem<FileRes> = await fileRes.json();
  return fileData.item[0].path; 
}

export async function editUserInfo(
  formData: FormData,
  session: Session
): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {

  const userData = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image') || session?.user?.image || '',
  };

  const res = await fetch(`${SERVER}/users/${session?.user?.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      'Authorization': `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  return data;
}
