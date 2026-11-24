// 신청자 목록(/console/applicants): 서버에서 요약을 받아 화면에서 찾기·거르기
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import ApplicantList from '@/components/console/ApplicantList';
import { consoleGet, getConsoleLang, getOperator } from '@/lib/console.server';
import { ct } from '@/lib/console.i18n';
import type { ApplicantSummary } from '@/lib/console.applicants';

export const dynamic = 'force-dynamic';

export default async function ApplicantsPage() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const lang = await getConsoleLang();
  const items = (await consoleGet<{ items: ApplicantSummary[] }>('applicants'))?.items ?? [];
  return (
    <ConsoleShell active="applicants" operator={operator} lang={lang}>
      <h1 className="text-[22px] font-bold text-[#1E2A3A]">{ct(lang, 'apps_title')}</h1>
      <p className="mt-1 mb-5 text-muted">{ct(lang, 'apps_lead', { n: items.length })}</p>
      <ApplicantList lang={lang} items={items} />
    </ConsoleShell>
  );
}
