// 관리자 관리(/console/operators): 최고 관리자만, 관리자 추가와 임시 비밀번호 재발급
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import OperatorsPanel from '@/components/console/OperatorsPanel';
import { consoleGet, getConsoleLang, getOperator, type Operator } from '@/lib/console.server';
import { ct } from '@/lib/console.i18n';

export const dynamic = 'force-dynamic';

export default async function OperatorsPage() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  if (operator.role !== 'super') redirect('/console');
  const lang = await getConsoleLang();
  const items = (await consoleGet<{ items: Operator[] }>('operators'))?.items ?? [];
  return (
    <ConsoleShell active="operators" operator={operator} lang={lang}>
      <h1 className="text-[22px] font-bold text-[#1E2A3A]">{ct(lang, 'ops_title')}</h1>
      <p className="mt-1 mb-5 max-w-[760px] text-muted">{ct(lang, 'ops_lead')}</p>
      <OperatorsPanel lang={lang} me={operator.id} items={items} />
    </ConsoleShell>
  );
}
