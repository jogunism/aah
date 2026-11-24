// 관리자 대시보드(/console): 상태별 건수, 지금 할 일, 단계별 진행, 최근 학생 활동, 운영자 활동 기록
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import { Card, buttonClass } from '@/components/console/ui';
import { consoleGet, getConsoleLang, getOperator } from '@/lib/console.server';
import { ct, consoleTime, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import { courseLabel, isTodo, statusTone, URGENT, type ApplicantSummary, type StepKey } from '@/lib/console.applicants';

export const dynamic = 'force-dynamic';

interface LogEntry {
  at: string;
  actor: string;
  action: string;
  target: string | null;
  detail: string | null;
}

const STEP_ORDER: StepKey[] = ['confirmation', 'payment', 'school', 'visaDocs', 'visaStatus', 'housing', 'complete'];
const STEP_COLOR: Record<string, string> = {
  confirmation: '#E0A030', payment: '#2C4F78', school: '#5B7FA8', visaDocs: '#8AA6C8', visaStatus: '#A9BCD6', housing: '#C7B8E0', complete: '#1F7A4D',
};
const DOT: Record<string, string> = { red: 'bg-[#D64545]', amber: 'bg-[#E0A030]', blue: 'bg-[#2C4F78]', green: 'bg-[#1F7A4D]' };

const name = (s: ApplicantSummary) => `${s.firstName} ${s.lastName}`;

function Kpi({ title, value, sub, alert }: { title: string; value: number; sub: string; alert?: boolean }) {
  return (
    <div className={`rounded-[14px] border px-4 py-3.5 ${alert && value > 0 ? 'border-[#F3C9C5] bg-[#FFF7F6]' : 'border-[#E3E7ED] bg-white'}`}>
      <p className="text-[13px] text-muted">{title}</p>
      <p className={`mt-1 text-[28px] leading-tight font-bold ${alert && value > 0 ? 'text-[#B3261E]' : 'text-[#1E2A3A]'}`}>{value}</p>
      <p className="mt-0.5 truncate text-xs text-muted">{sub}</p>
    </div>
  );
}

const todoLine = (lang: ConsoleLang, s: ApplicantSummary) =>
  s.login === 'locked' && s.turn !== 'aah' ? ct(lang, 'todo_locked') : ct(lang, `st_${s.status}` as ConsoleKey);

export default async function ConsoleHome() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const lang = await getConsoleLang();
  const [applicants, logRes] = await Promise.all([
    consoleGet<{ items: ApplicantSummary[] }>('applicants'),
    consoleGet<{ items: LogEntry[] }>('log'),
  ]);
  const all = applicants?.items ?? [];
  const log = (logRes?.items ?? []).slice(0, 15);

  const by = (...statuses: string[]) => all.filter((s) => statuses.includes(s.status));
  const fresh = by('new');
  const review = by('review');
  const reply = by('waiting_reply', 'returned', 'reply_overdue');
  const payment = by('invoice', 'waiting_payment', 'payment_overdue');
  const inKorea = all.filter((s) => ['school', 'visaDocs', 'visaStatus', 'housing'].includes(s.step));
  const todos = all.filter(isTodo).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const oldest = fresh.reduce<string | null>((m, s) => (!m || s.createdAt < m ? s.createdAt : m), null);
  const counts = STEP_ORDER.map((k) => ({ key: k, n: all.filter((s) => s.step === k).length })).filter((c) => c.n > 0);
  const recent = all.filter((s) => s.lastEvent).sort((a, b) => b.lastEvent!.at.localeCompare(a.lastEvent!.at)).slice(0, 8);
  const today = new Date().toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Seoul' });

  return (
    <ConsoleShell active="dashboard" operator={operator} lang={lang}>
      <h1 className="text-[22px] font-bold text-[#1E2A3A]">{ct(lang, 'dash_title')}</h1>
      <p className="mt-1 mb-5 text-muted">
        {ct(lang, todos.length ? 'dash_lead_todo' : 'dash_lead_none', { date: today, n: todos.length })}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <Kpi title={ct(lang, 'kpi_new')} value={fresh.length} alert
          sub={oldest ? ct(lang, 'kpi_oldest', { d: consoleTime(lang, oldest) }) : ct(lang, 'kpi_none')} />
        <Kpi title={ct(lang, 'kpi_review')} value={review.length} alert sub={review.length ? review.map(name).join(', ') : ct(lang, 'kpi_none')} />
        <Kpi title={ct(lang, 'kpi_reply')} value={reply.length}
          sub={ct(lang, 'kpi_overdue', { n: reply.filter((s) => s.status === 'reply_overdue').length })} />
        <Kpi title={ct(lang, 'kpi_payment')} value={payment.length}
          sub={ct(lang, 'kpi_overdue', { n: payment.filter((s) => s.status === 'payment_overdue').length })} />
        <Kpi title={ct(lang, 'kpi_school')} value={inKorea.length} sub={`${ct(lang, 'st_complete')} ${all.filter((s) => s.step === 'complete').length}`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <Card title={ct(lang, 'todo_title')} aside={ct(lang, 'todo_sub')}>
          {todos.length === 0 ? (
            <p className="py-1 text-sm text-muted">{ct(lang, 'todo_empty')}</p>
          ) : (
            <ul>
              {todos.map((s) => (
                <li key={s.id} className="flex items-center gap-3 border-t border-[#EEF0F3] py-3 first:border-t-0">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[URGENT.includes(s.status) || s.login === 'locked' ? 'red' : statusTone(s)]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{name(s)} · {todoLine(lang, s)}</p>
                    <p className="truncate text-[13px] text-muted">
                      {s.schoolName}, {courseLabel(lang, s)}
                      {s.due && <> · {ct(lang, 'until', { d: consoleTime(lang, s.due) })}</>}
                    </p>
                  </div>
                  <Link href={`/console/applicants/${s.id}`} className={buttonClass}>{ct(lang, 'open')}</Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="grid gap-4">
          <Card title={ct(lang, 'progress_title')} aside={ct(lang, 'progress_sub', { n: all.length })}>
            {all.length === 0 ? (
              <p className="py-1 text-sm text-muted">{ct(lang, 'recent_empty')}</p>
            ) : (
              <>
                <div className="flex h-2.5 overflow-hidden rounded-full bg-[#EEF0F3]">
                  {counts.map((c) => (
                    <span key={c.key} style={{ width: `${(c.n / all.length) * 100}%`, background: STEP_COLOR[c.key] }} />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted">
                  {counts.map((c) => (
                    <li key={c.key} className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: STEP_COLOR[c.key] }} />
                      {ct(lang, `step_${c.key}` as ConsoleKey)} {c.n}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>

          <Card title={ct(lang, 'recent_title')}>
            {recent.length === 0 ? (
              <p className="py-1 text-sm text-muted">{ct(lang, 'recent_empty')}</p>
            ) : (
              <ul>
                {recent.map((s) => (
                  <li key={s.id} className="flex gap-3 border-t border-[#EEF0F3] py-2.5 text-sm first:border-t-0">
                    <time className="w-[104px] shrink-0 text-muted">{consoleTime(lang, s.lastEvent!.at)}</time>
                    <Link href={`/console/applicants/${s.id}`} className="min-w-0 flex-1 hover:underline">
                      <b className="font-semibold">{name(s)}</b> · {ct(lang, `ev_${s.lastEvent!.code}` as ConsoleKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <div className="mt-4 max-w-[760px]">
        <Card title={ct(lang, 'log_title')} aside={ct(lang, 'log_sub')}>
          {log.length === 0 ? (
            <p className="py-1 text-sm text-muted">{ct(lang, 'log_empty')}</p>
          ) : (
            <ul>
              {log.map((e) => (
                <li key={`${e.at}${e.action}${e.actor}`} className="flex flex-wrap gap-x-4 gap-y-0.5 border-t border-[#EEF0F3] py-2.5 text-sm first:border-t-0">
                  <time className="w-[130px] shrink-0 text-muted">{consoleTime(lang, e.at)}</time>
                  <span className="min-w-0 flex-1">
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
