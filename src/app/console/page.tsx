// 관리자 대시보드(/console): 로그인 확인 후 운영자 활동 기록 (할 일·진행 현황은 신청자 관리와 함께 추가)
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import { Card } from '@/components/console/ui';
import { consoleGet, getConsoleLang, getOperator } from '@/lib/console.server';
import { ct, consoleTime, type ConsoleKey } from '@/lib/console.i18n';

export const dynamic = 'force-dynamic';

interface LogEntry {
  at: string;
  actor: string;
  action: string;
  target: string | null;
  detail: string | null;
}

export default async function ConsoleHome() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const lang = await getConsoleLang();
  const log = (await consoleGet<{ items: LogEntry[] }>('log'))?.items ?? [];

  return (
    <ConsoleShell active="dashboard" operator={operator} lang={lang}>
      <h1 className="text-[22px] font-bold text-[#1E2A3A]">{ct(lang, 'dash_title')}</h1>
      <p className="mt-1 mb-5 text-muted">{ct(lang, 'dash_lead')}</p>
      <div className="max-w-[760px]">
        <Card title={ct(lang, 'log_title')} aside={ct(lang, 'log_sub')}>
          {log.length === 0 ? (
            <p className="py-1 text-sm text-muted">{ct(lang, 'log_empty')}</p>
          ) : (
            <ul>
              {log.map((e) => (
                <li key={`${e.at}${e.action}${e.actor}`} className="flex gap-4 border-t border-[#EEF0F3] py-2.5 text-sm first:border-t-0">
                  <time className="w-[130px] shrink-0 text-muted">{consoleTime(lang, e.at)}</time>
                  <span className="flex-1">
                    <b className={`font-semibold ${/failed|locked/.test(e.action) ? 'text-[#B3261E]' : ''}`}>{ct(lang, `act_${e.action}` as ConsoleKey)}</b>
                    {e.target && <span className="text-muted"> · {e.target}</span>}
                    {e.detail && <span className="text-muted"> · {e.action === 'login_locked' ? ct(lang, 'minutes', { n: e.detail }) : e.detail}</span>}
                  </span>
                  <span className="hidden sm:block text-muted">{e.actor === '-' ? '' : e.actor}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </ConsoleShell>
  );
}
