import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

import {
  ApiResWithValidation,
  OAuthUser,
  RefreshTokenRes,
  SingleItem,
  UserData,
  UserLoginForm,
} from './types';
import { loginOAuth, signupWithOAuth } from './data/actions/authAction';
import { fetchAccessToken } from './data/actions/fetchUser';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const TOKEN_VALIDITY_PERIOD = 3600 * 1000; // 1시간(3600초) -> 밀리초로 변환

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  trustHost: true,
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
            address: user.address,
            notifications: user.notifications,
            accessToken: user.token?.accessToken!,
            refreshToken: user.token?.refreshToken!,
            accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
          };
        } else {
          throw new CredentialsSignin(resJson.message, { cause: resJson });
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
    // 로그인 처리를 계속 할지 여부 결정
    // true를 리턴하면 로그인 처리를 계속하고 false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
    // user: authorize()가 리턴한 값
    callbacks: {
      async signIn({ user, account, profile }) {
        console.log("USER: ", user, "Account: ", account, "Profile: ", profile);
      
        if (account?.provider === 'credentials') {
          return true;
        }
      
        if (!account?.providerAccountId) {
          console.error("Provider account ID is missing");
          return false;
        }
      
        let loginType: "email" | "kakao" | "google" | "naver";
        switch (account.provider) {
          case "kakao":
          case "google":
          case "naver":
            loginType = account.provider;
            break;
          default:
            console.error("지원하지 않는 provider입니다.:", account.provider);
            return false;
        }
      
        let email = user.email || (loginType === 'kakao' ? `${profile?.id}@kakao.com` : undefined);
      
        let data: OAuthUser = {
          type: "user",
          loginType: loginType,
          name: user.name || '',
          email: email || '',
          image: user.image || '',
          extra: {
            ...profile,
            providerAccountId: account.providerAccountId
          }
        };
      
        try {
          // 로그인 먼저 시도
          const loginRes = await loginOAuth(account.providerAccountId);
          if (loginRes.ok) {
            // 사용자 계정이 존재하는 경우, 로그인 데이터를 사용하여 객체 업데이트 진행
            Object.assign(user, {
              id: String(loginRes.item._id),
              type: loginRes.item.type,
              accessToken: loginRes.item.token?.accessToken,
              refreshToken: loginRes.item.token?.refreshToken,
              accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
            });
            return true;
          }
        } catch (error) {
          console.log("로그인 실패, 회원가입 시도");
        }
      
        // 로그인에 실패할 경우, 회원가입 시도
        try {
          const signupRes = await signupWithOAuth(data);
          if (signupRes.ok) {
            // 회원가입이 성공적으로 완료된 경우, 로그인 시도
            const loginRes = await loginOAuth(account.providerAccountId);
            if (loginRes.ok) {
              Object.assign(user, {
                id: String(loginRes.item._id),
                type: loginRes.item.type,
                accessToken: loginRes.item.token?.accessToken,
                refreshToken: loginRes.item.token?.refreshToken,
                accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
              });
              return true;
            }
          }
        } catch (error) {
          console.error("회원가입 실패:", error);
        }
      
        return false; // 모든 시도가 실패할 경우 false 반환
      },
  
      async jwt({ token, user, session, trigger }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
          token.type = user.type;
          token.address = user.address;
          token.notifications = user.notifications;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.accessTokenExpires = user.accessTokenExpires;
        }
  
        // 토큰 만료 여부 확인
        if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
          try {
            console.log('토큰이 만료되었습니다. 리프레시 토큰 발행 중...');
            const res = await fetchAccessToken(token.refreshToken);
            if (res.ok) {
              const resJson: RefreshTokenRes = await res.json();
              token.accessToken = resJson.accessToken;
              token.accessTokenExpires = Date.now() + TOKEN_VALIDITY_PERIOD;
            } else {
              console.log('토큰 갱신에 실패했습니다.');
              return { ...token, error: "액세스 토큰 갱신 오류" };
            }
          } catch (error) {
            console.error('엑세스 토큰 갱신 중 오류 발생:', error);
            return { ...token, error: "액세스 토큰 갱신 오류" };
          }
        }
  
        if (trigger === 'update' && session) {
          token.image = session.user.image;
          token.name = session.user.name;
          token.address = session.user.address;
        }
        
        return token;
      },
  
      async session({ session, token }) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.type = token.type as string;
        session.user.address = token.address as string;
        session.user.notifications = token.notifications as number;
  
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
  
        console.log('Session Callback:', { session, token });
        return session;
      },
    },
  });

export { auth as getSession, update as updateSession };
