// 관리자 화면(/console) 루트 레이아웃: 한국어·일본어, 운영자 전용 배경, 검색 제외 (사이트 헤더·푸터·분석 스크립트 없음)
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { getConsoleLang } from '@/lib/console.server';
import '../globals.css';

export const metadata: Metadata = {
  title: 'aah! console',
  robots: { index: false, follow: false, nocache: true },
};

export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const lang = await getConsoleLang();
  return (
    <html lang={lang}>
      <body
        // Inline colors: the site's global body rule (dark-mode foreground) would otherwise win over utility classes
        style={{
          background: '#EEF1F5',
          color: '#1D1D1F',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Hiragino Sans', 'Malgun Gothic', 'Meiryo', 'Segoe UI', Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
