import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { JWT } from 'next-auth/jwt';

import {
  ApiResWithValidation,
  SingleItem,
  UserData,
  UserLoginForm,
} from './types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const TOKEN_VALIDITY_PERIOD = 3600 * 1000; // 1시간(3600초) -> 밀리초로 변환

const refreshAccessToken = async (token: JWT) => {
  try {
    const res = await fetch(`${SERVER}/auth/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    const refreshedTokens = await res.json();

    if (!res.ok || refreshedTokens.ok !== 1) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
      refreshToken: token.refreshToken, // 기존 리프레시 토큰 사용
    };
  } catch (error) {
    console.error('Error refreshing access token', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${SERVER}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': `${CLIENT_ID}`,
          },
          body: JSON.stringify(credentials),
        });

        const resJson: ApiResWithValidation<
          SingleItem<UserData>,
          UserLoginForm
        > = await res.json();

        if (resJson.ok) {
          console.log('resJson', resJson.item);
          const user = resJson.item;

          return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            image: user.image && SERVER + user.image,
            type: user.type,
            notifications: user.notifications,
            accessToken: user.token?.accessToken!,
            refreshToken: user.token?.refreshToken!,
            accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
          };
        } else {
          return null;
          // throw new Error();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // 로그인 처리를 계속 할지 여부 결정
    // true를 리턴하면 로그인 처리를 계속하고 false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
    // user: authorize()가 리턴한 값
    async signIn({ user }) {
      return true;

      // user에 들어있는 사용자 정보를 이용해서 우리쪽 DB에 저장 (회원가입) 절차 필요

      // 가입된 회원의 경우 자동으로 로그인 처리
    },

    // 로그인 성공한 회원 정보로 token 객체 설정

    // 최초 로그인시 user 객체 전달,

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.type = user.type;
        token.notifications = user.notifications;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      if (trigger === 'update' && session) {
        token.image = SERVER + session.user.image;
        token.name = session.user.name;
      }
      // 토큰 만료 체크, refreshToken으로 accessToken 갱신

      // refreshToken도 만료되었을 경우 로그아웃 처리
      // if (user?.accessToken) {
      //   token.accessToken = user.accessToken;
      //   token.refreshToken = user.refreshToken;
      // }

      // 토큰 만료 체크, refreshToken으로 accessToken 갱신
      if (Date.now() < token.accessTokenExpires!) {
        return token;
      }

      return refreshAccessToken(token);
      // return token
    },

    // 클라이언트에서 세션 정보 요청시 호출
    // token 객체 정보로 session 객체 설정
    async session({ session, token }) {
      // console.log('Session Callback:', { session, token });
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.type = token.type as string;
      session.user.notifications = token.notifications as number;

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;

      // console.log('Session Callback:', { session, token });

      // return session;
    },
  },
});

export { auth as getSession, update as updateSession };
