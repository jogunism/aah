import { redirect } from 'next/navigation';

// 루트 경로(/)는 기본 언어(/en)로 리다이렉트
export default function RootPage() {
  redirect('/en');
}
