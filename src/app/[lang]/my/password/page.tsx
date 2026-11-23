// 비밀번호 변경 화면(/my/password)
import { redirect } from 'next/navigation';
import { PasswordForm } from '@/components/portal/AuthForms';
import { getPortalData } from '@/lib/portal.server';

export default async function PasswordPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const data = await getPortalData();
  if (!data) redirect(`/${lang}/my/login`);
  return <PasswordForm lang={lang} />;
}
