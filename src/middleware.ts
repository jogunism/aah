import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['en', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // public 파일, api, _next 등은 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.') // 정적 파일 (.ico, .png, .jpg 등)
  ) {
    return NextResponse.next();
  }

  // 이미 언어 prefix가 있는지 확인
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // 현재 언어를 헤더에 추가하여 서버 컴포넌트에서 접근 가능하게 함
    const locale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    response.headers.set('x-locale', locale);
    return response;
  }

  // 언어 prefix가 없으면 기본 언어로 리다이렉트
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|assets|.*\\..*).*)'],
};
