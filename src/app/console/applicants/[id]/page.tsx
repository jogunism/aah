// 신청자 상세(/console/applicants/[id]): 단계별 화면(1단계 신청서, 2단계 확인서, 이후 단계 상태), 로그인 계정, 운영 메모, 기록
import { notFound, redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import ApplicantView from '@/components/console/ApplicantView';
import { consoleGet, getConsoleLang, getOperator } from '@/lib/console.server';
import { getApplySchools } from '@/lib/applySchools.server';
import type { ApplicantDetail } from '@/lib/console.applicants';

export const dynamic = 'force-dynamic';

export default async function ApplicantPage({ params }: { params: Promise<{ id: string }> }) {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const { id } = await params;
  if (!/^AEE\d{7}$/.test(id)) notFound();
  const lang = await getConsoleLang();
  const detail = await consoleGet<ApplicantDetail>(`applicants/${id}`).catch(() => null);
  if (!detail) notFound();
  // Schools for the edit form; a school that is hidden now still shows when the student picked it
  const schools = (await getApplySchools('en')).map((s) => ({ id: s.id, title: s.title }));
  if (!schools.some((s) => s.id === detail.application.schoolId)) {
    schools.unshift({ id: detail.application.schoolId, title: detail.application.schoolName });
  }
  return (
    <ConsoleShell active="applicants" operator={operator} lang={lang}>
      <ApplicantView lang={lang} initial={detail} schools={schools} />
    </ConsoleShell>
  );
}
