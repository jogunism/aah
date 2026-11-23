// 사용자 포털(/my) 공통 레이아웃: 포털 헤더 + 사이트 푸터, 검색 제외
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import Footer from '@/components/context/Footer';
import PortalHeader from '@/components/portal/PortalHeader';
import { PORTAL_COOKIE } from '@/lib/portal.server';
import { isSupportedLocale, DEFAULT_LOCALE } from '@/lib/locales';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MyLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const signedIn = !!(await cookies()).get(PORTAL_COOKIE)?.value;
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PortalHeader lang={lang} signedIn={signedIn} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
