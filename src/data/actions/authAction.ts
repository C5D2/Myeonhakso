"use server";

import { signIn } from "@/auth";
import { ApiRes, ApiResWithValidation, OAuthUser, SingleItem, UserData, UserForm, UserLoginForm } from "@/types";
import { redirect } from "next/navigation";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID

if (!CLIENT_ID) {
  throw new Error("Client ID is not defined");
}

const headers = {
  'Content-Type': 'application/json',
  'client-id': CLIENT_ID ,
};

// email/password 로그인
export async function signInWithCredentials(formData: FormData) {

  try {
    const result = await signIn('credentials',{
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      redirect: false
    });
    console.log(result);
  } catch (err) {
    console.error(err);
    
  }
  redirect('/')
}

export async function signUpWithGoogle() {
  await signIn('google', {redirectTo: '/'})
}

export async function signUpWithKaKao() {
  await signIn('kakao', {redirectTo: '/'})
}

export async function signUpWithNaver() {
  await signIn('naver', {redirectTo: '/'})
}


// auth provider 인증 후 자동 회원 가입
export async function signupWithOAuth(user: OAuthUser): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const res = await fetch(`${SERVER}/users/signup/oauth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
  });

  return res.json();
}

// 아이디/패스워드 로그인
export async function login(userObj: UserLoginForm): Promise<ApiResWithValidation<SingleItem<UserData>, UserLoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userObj),
  });
  return res.json();
}

// auth provider로 인증된 사용자 로그인
export async function loginOAuth(providerAccountId: string): Promise<ApiRes<SingleItem<UserData>>> {
  const res = await fetch(`${SERVER}/users/login/with`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}


