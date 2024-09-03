import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    // 로그인되지 않은 경우
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  if (
    (request.nextUrl.pathname.startsWith('/mypage/tutor') &&
      session.user.type !== 'seller') ||
    (request.nextUrl.pathname.startsWith('/new') &&
      session.user.type !== 'seller') ||
    (request.nextUrl.pathname.endsWith(`/edit`) &&
      session.user.type !== 'seller')
  ) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  }

  if (
    request.nextUrl.pathname.startsWith('/mypage/tutee') &&
    session.user.type !== 'user'
  ) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  }
}

export const config = {
  matcher: ['/mypage/:path*', '/order/:path*', '/new', '/:path/:path/edit'],
};
