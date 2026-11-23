// 비밀번호 찾기 화면(/my/forgot): 재설정 링크를 메일로 받음
import { ForgotForm } from '@/components/portal/AuthForms';

export default async function ForgotPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <ForgotForm lang={lang} />;
}
