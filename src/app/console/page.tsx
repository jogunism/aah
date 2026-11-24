// 관리자 대시보드(/console): 로그인 확인 후 운영자 활동 기록 (할 일·진행 현황은 신청자 관리와 함께 추가)
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import { consoleGet, getOperator } from '@/lib/console.server';

export const dynamic = 'force-dynamic';

interface LogEntry {
  at: string;
  actor: string;
  action: string;
  target: string | null;
  detail: string | null;
}

const when = (iso: string) =>
  new Date(iso).toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Seoul' });

export default async function ConsoleHome() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const log = (await consoleGet<{ items: LogEntry[] }>('log'))?.items ?? [];

  return (
    <ConsoleShell active="dashboard" email={operator.email}>
      <h1 className="text-[22px] font-bold text-[#1E2A3A]">대시보드</h1>
      <p className="mt-1 mb-5 text-muted">신청자 관리와 할 일 목록은 다음 단계에서 여기에 붙습니다.</p>
      <section className="max-w-[760px] rounded-[14px] border border-[#E3E7ED] bg-white px-5 py-4">
        <h2 className="mb-2 flex items-baseline justify-between text-[15px] font-bold">
          운영자 활동 기록 <span className="text-xs font-medium text-muted">최근 50건 · 한국 시간</span>
        </h2>
        {log.length === 0 ? (
          <p className="py-3 text-sm text-muted">아직 기록이 없습니다.</p>
        ) : (
          <ul>
            {log.map((e) => (
              <li key={`${e.at}${e.action}`} className="flex gap-4 border-t border-[#EEF0F3] py-2.5 text-sm first:border-t-0">
                <time className="w-[120px] shrink-0 text-muted">{when(e.at)}</time>
                <span className="flex-1">
                  <b className={`font-semibold ${/실패|잠김/.test(e.action) ? 'text-[#B3261E]' : ''}`}>{e.action}</b>
                  {e.target && <span className="text-muted"> · {e.target}</span>}
                  {e.detail && <span className="text-muted"> · {e.detail}</span>}
                </span>
                <span className="hidden sm:block text-muted">{e.actor === '-' ? '' : e.actor}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ConsoleShell>
  );
}
