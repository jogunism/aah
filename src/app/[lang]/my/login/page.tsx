// 포털 로그인 화면(/my/login). 세션이 살아 있으면 포털로 이동
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/portal/AuthForms';
import { getPortalData } from '@/lib/portal.server';

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Check the session itself, not just the cookie: an expired cookie would bounce between /my and here
  if (await getPortalData()) redirect(`/${lang}/my`);
  return <LoginForm lang={lang} />;
}
