// 비밀번호 찾기·처음 비밀번호 설정 화면(/my/forgot, ?first=1): 설정 링크를 메일로 받음
import { ForgotForm } from '@/components/portal/AuthForms';

export default async function ForgotPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ first?: string }>;
}) {
  const { lang } = await params;
  const { first } = await searchParams;
  return <ForgotForm lang={lang} first={first === '1'} />;
}
