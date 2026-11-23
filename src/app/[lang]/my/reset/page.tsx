// 비밀번호 재설정 화면(/my/reset?email=&token=): 메일 링크로 들어와 새 비밀번호 설정
import { Suspense } from 'react';
import { ResetForm } from '@/components/portal/AuthForms';

export default async function ResetPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <Suspense>
      <ResetForm lang={lang} />
    </Suspense>
  );
}
