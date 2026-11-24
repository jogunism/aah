// 운영자 로그인 화면(/console/login). 세션이 살아 있으면 대시보드로 이동
import { redirect } from 'next/navigation';
import LoginForm from '@/components/console/LoginForm';
import { getOperator } from '@/lib/console.server';

export default async function ConsoleLoginPage() {
  if (await getOperator()) redirect('/console');
  return <LoginForm />;
}
