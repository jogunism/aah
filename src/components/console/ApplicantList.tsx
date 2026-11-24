'use client';
// 신청자 목록: 이름·이메일·번호 찾기, 탭(전체·내가 할 일·학생 차례·완료), 학기·단계·로그인 거르기. 넓은 화면은 표, 좁은 화면은 카드

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ct, consoleTime, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import {
  country, courseLabel, isTodo, LOGIN_TONE, statusTone, termLabel, TONES, type ApplicantSummary, type StepKey,
} from '@/lib/console.applicants';
import { buttonClass, inputClass } from './ui';

type Tab = 'all' | 'todo' | 'student' | 'done';
const STEPS: StepKey[] = ['confirmation', 'payment', 'school', 'visaDocs', 'visaStatus', 'housing', 'complete'];
const LOGINS = ['not_sent', 'not_used', 'active', 'locked'] as const;

const selectClass = 'rounded-[9px] border border-[#E3E7ED] bg-white px-2.5 py-2 text-[13px] font-semibold text-ink';

export function Chip({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}

export function Progress({ steps }: { steps: ApplicantSummary['steps'] }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {steps.map((s) => (
        <span key={s.key} className={`h-1.5 w-5 rounded-full ${s.state === 'done' ? 'bg-[#1F7A4D]' : s.state === 'current' ? 'bg-[#E0A030]' : 'bg-[#E3E7ED]'}`} />
      ))}
    </span>
  );
}

export default function ApplicantList({ lang, items }: { lang: ConsoleLang; items: ApplicantSummary[] }) {
  const t = (k: ConsoleKey, v?: Record<string, string | number>) => ct(lang, k, v);
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<Tab>('all');
  const [term, setTerm] = useState('');
  const [step, setStep] = useState('');
  const [login, setLogin] = useState('');

  const terms = useMemo(() => [...new Set(items.map((s) => s.term))].sort(), [items]);
  const inTab: Record<Tab, (s: ApplicantSummary) => boolean> = {
    all: () => true,
    todo: isTodo,
    student: (s) => s.turn === 'student',
    done: (s) => s.step === 'complete',
  };
  const needle = q.trim().toLowerCase();
  const rows = items.filter((s) =>
    inTab[tab](s) &&
    (!term || s.term === term) &&
    (!step || s.step === step) &&
    (!login || s.login === login) &&
    (!needle || `${s.firstName} ${s.lastName} ${s.email} ${s.id}`.toLowerCase().includes(needle)));

  const status = (s: ApplicantSummary) => (
    <Chip tone={statusTone(s)}>
      {t(`st_${s.status}` as ConsoleKey)}
      {s.due && ['waiting_reply', 'returned', 'waiting_payment'].includes(s.status) && ` · ${t('until', { d: consoleTime(lang, s.due) })}`}
    </Chip>
  );
  const loginChip = (s: ApplicantSummary) => <Chip tone={LOGIN_TONE[s.login]}>{t(`login_${s.login}` as ConsoleKey)}</Chip>;
  const last = (s: ApplicantSummary) => s.lastEvent && `${consoleTime(lang, s.lastEvent.at)} · ${t(`ev_${s.lastEvent.code}` as ConsoleKey)}`;

  return (
    <div className="space-y-3">
      <input className={`${inputClass} max-w-[520px]`} type="search" placeholder={t('search_ph')} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <div role="tablist" className="flex overflow-x-auto rounded-[11px] border border-[#E3E7ED] bg-white p-1 text-[13px] font-semibold">
          {(['all', 'todo', 'student', 'done'] as Tab[]).map((k) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`shrink-0 whitespace-nowrap rounded-[8px] px-3 py-1.5 ${tab === k ? 'bg-[#E6EEF7] text-[#2C4F78]' : 'text-muted hover:text-ink'}`}>
              {t(`tab_${k}` as ConsoleKey)} {items.filter(inTab[k]).length}
            </button>
          ))}
        </div>
        <select className={selectClass} value={term} onChange={(e) => setTerm(e.target.value)} aria-label={t('f_term_filter')}>
          <option value="">{t('f_term_filter')} · {t('f_all')}</option>
          {terms.map((x) => <option key={x} value={x}>{termLabel(lang, x)}</option>)}
        </select>
        <select className={selectClass} value={step} onChange={(e) => setStep(e.target.value)} aria-label={t('f_step_filter')}>
          <option value="">{t('f_step_filter')} · {t('f_all')}</option>
          {STEPS.map((x) => <option key={x} value={x}>{t(`step_${x}` as ConsoleKey)}</option>)}
        </select>
        <select className={selectClass} value={login} onChange={(e) => setLogin(e.target.value)} aria-label={t('f_login_filter')}>
          <option value="">{t('f_login_filter')} · {t('f_all')}</option>
          {LOGINS.map((x) => <option key={x} value={x}>{t(`login_${x}`)}</option>)}
        </select>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-[14px] border border-[#E3E7ED] bg-white px-5 py-6 text-sm text-muted">{t('apps_empty')}</p>
      ) : (
        <>
          {/* Wide screens: table */}
          <div className="hidden overflow-hidden rounded-[14px] border border-[#E3E7ED] bg-white lg:block">
            <table className="w-full text-sm">
              <thead className="bg-[#FAFBFC] text-left text-[13px] text-muted">
                <tr>
                  {(['col_id', 'col_name', 'col_school', 'col_progress', 'col_status', 'col_login', 'col_last'] as ConsoleKey[]).map((k) => (
                    <th key={k} className="px-4 py-2.5 font-semibold">{t(k)}</th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id} className="border-t border-[#EEF0F3] align-middle">
                    <td className="px-4 py-3 text-muted">{s.id}</td>
                    <td className="px-4 py-3"><b className="font-semibold">{s.firstName} {s.lastName}</b><br /><span className="text-[13px] text-muted">{country(lang, s.nationality)}</span></td>
                    <td className="px-4 py-3">{s.schoolName}<br /><span className="text-[13px] text-muted">{courseLabel(lang, s)}</span></td>
                    <td className="px-4 py-3"><Progress steps={s.steps} /></td>
                    <td className="px-4 py-3">{status(s)}</td>
                    <td className="px-4 py-3">{loginChip(s)}</td>
                    <td className="px-4 py-3 text-[13px] text-muted">{last(s)}</td>
                    <td className="px-4 py-3 text-right"><Link href={`/console/applicants/${s.id}`} className={buttonClass}>{t('open')}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones and tablets: cards */}
          <ul className="grid gap-2.5 md:grid-cols-2 lg:hidden">
            {rows.map((s) => (
              <li key={s.id}>
                <Link href={`/console/applicants/${s.id}`} className="block rounded-[14px] border border-[#E3E7ED] bg-white px-4 py-3.5 hover:border-[#C9D3E0]">
                  <div className="flex items-baseline justify-between gap-2">
                    <b className="font-semibold">{s.firstName} {s.lastName}</b>
                    <span className="text-xs text-muted">{s.id}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted">{s.schoolName} · {courseLabel(lang, s)}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">{status(s)}{loginChip(s)}</div>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <Progress steps={s.steps} />
                    <span className="truncate text-xs text-muted">{last(s)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
