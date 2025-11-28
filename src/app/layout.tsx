import { ReactNode } from 'react';

// 루트 레이아웃 - html/body는 [lang]/layout.tsx에서 처리
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
