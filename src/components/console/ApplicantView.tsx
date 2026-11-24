'use client';
// 신청자 상세 화면: 머리말, 단계 띠, 고른 단계의 내용, 오른쪽 로그인 계정(보내기·잠금 풀기)·운영 메모·기록

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ct, consoleTime, errorText, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import {
  country, courseLabel, dateOnly, langName, LOGIN_TONE, money, statusTone,
  type ApplicantDetail, type StepKey,
} from '@/lib/console.applicants';
import { Card, Rows, buttonClass, consolePost, primaryClass } from './ui';
import { Chip } from './ApplicantList';
import ApplicationPanel from './ApplicationPanel';

type T = (k: ConsoleKey, v?: Record<string, string | number>) => string;

const Note = ({ children }: { children: ReactNode }) => (
  <p className="rounded-[12px] bg-[#E6EEF7] px-4 py-3 text-sm text-[#2C4F78]">{children}</p>
);

function ConfirmationPanel({ d, lang, t }: { d: ApplicantDetail; lang: ConsoleLang; t: T }) {
  const c = d.application.confirmation;
  const r = c.reply;
  const time = (iso: string | null) => (iso ? consoleTime(lang, iso) : t('none_text'));
  // After the reply only the plan the student chose matters; the others fold away
  const optionCard = (o: ApplicantDetail['application']['confirmation']['options'][number], chosen: boolean) => {
    const sum = o.items.reduce((s, i) => s + i.amount, 0);
    return (
      <Card key={o.id} title={`${t(chosen ? 'conf_chosen_option' : 'conf_options')} ${o.id} · ${o.label}`}>
        <ul className="text-sm">
          {o.items.map((i, n) => (
            <li key={n} className="flex justify-between gap-3 border-t border-[#EEF0F3] py-2 first:border-t-0">
              <span>{i.label}</span><span className="shrink-0 tabular-nums">{money(i.amount, c.currency)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-3 border-t border-[#D5DBE3] py-2 font-semibold">
            <span>{t('conf_total')}</span><span className="tabular-nums">{money(sum, c.currency)}</span>
          </li>
        </ul>
        {o.course && <p className="mt-1 text-[13px] text-muted">{t('conf_course')} · {dateOnly(lang, o.course.start)} – {dateOnly(lang, o.course.end)}</p>}
      </Card>
    );
  };
  return (
    <div className="space-y-4">
      <Note>{t('conf_actions_soon')}</Note>
      <Card title={t('conf_title')} aside={t(`conf_${c.status}` as ConsoleKey)}>
        <Rows rows={[
          [t('conf_sent_at'), time(c.sentAt)],
          [t('conf_reply_by'), time(c.replyBy)],
          ...(c.returned ? [[t('conf_returned'), `${consoleTime(lang, c.returned.at)} · ${c.returned.message}`] as [string, ReactNode]] : []),
          ...(c.message ? [[t('conf_message'), <span key="m" className="whitespace-pre-line">{c.message}</span>] as [string, ReactNode]] : []),
        ]} />
      </Card>
      {(r ? c.options.filter((o) => o.id === r.optionId) : c.options).map((o) => optionCard(o, !!r))}
      {r && (
        <Card title={t('conf_reply')}>
          {d.warnings.length > 0 && (
            <div className="mb-3 rounded-[10px] bg-[#FDECEA] px-3.5 py-3 text-sm text-[#B3261E]">
              <p className="font-semibold">{t('conf_warnings')}</p>
              <ul className="mt-1 list-disc pl-5">{d.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          )}
          <Rows rows={[
            [t('conf_chosen'), r.optionId],
            [t('conf_signed'), r.signedName],
            [t('conf_agreed_at'), consoleTime(lang, r.agreedAt)],
            [t('conf_passport'), r.checks.passport.has ? t('passport_yes', { d: r.checks.passport.expiry ? dateOnly(lang, r.checks.passport.expiry) : '-' }) : t('passport_no')],
            [t('conf_health'), r.checks.health.declared ? r.checks.health.details : t('health_none')],
            ...(r.checks.residence ? [[t('conf_residence'), country(lang, r.checks.residence)] as [string, ReactNode]] : []),
            ...(r.remarks ? [[t('conf_remarks'), r.remarks] as [string, ReactNode]] : []),
          ]} />
        </Card>
      )}
      {r && c.options.length > 1 && (
        <details className="rounded-[14px] border border-[#E3E7ED] bg-white px-5 py-3">
          <summary className="cursor-pointer text-sm font-semibold text-muted">{t('conf_other_options', { n: c.options.length - 1 })}</summary>
          <div className="mt-3 space-y-3">{c.options.filter((o) => o.id !== r.optionId).map((o) => optionCard(o, false))}</div>
        </details>
      )}
    </div>
  );
}

function StatusPanel({ d, step, lang, t }: { d: ApplicantDetail; step: StepKey; lang: ConsoleLang; t: T }) {
  const a = d.application;
  const time = (iso: string | null | undefined) => (iso ? consoleTime(lang, iso) : t('none_text'));
  const v = (x: string) => t(`v_${x}` as ConsoleKey);
  const rows: Partial<Record<StepKey, [string, ReactNode][]>> = {
    payment: [
      [t('pay_status'), v(a.payment.status)],
      [t('pay_invoice'), a.payment.invoiceNo ? `${a.payment.invoiceNo} · ${time(a.payment.invoiceIssuedAt)}` : t('none_text')],
      [t('pay_due'), time(a.payment.dueDate)],
      [t('conf_total'), money(a.payment.items.reduce((s, i) => s + i.amount, 0), a.confirmation.currency)],
      [t('pay_confirmed'), time(a.payment.confirmedAt)],
    ],
    school: [
      [t('school_status'), v(a.school.status)],
      [t('ev_originals_posted'), time(a.school.postedAt)],
    ],
    visaDocs: [[t('visa_status'), v(a.visa.status)], [t('visa_mission'), a.visa.mission ?? t('none_text')], [t('ev_visa_submitted'), time(a.visa.submittedAt)]],
    visaStatus: [[t('visa_status'), v(a.visa.status)], [t('ev_visa_issued'), time(a.visa.issuedAt)]],
    housing: [[t('housing_status'), v(a.housing?.status ?? 'arranging')], [t('ev_housing_contracted'), time(a.housing?.contractedAt)]],
  };
  return (
    <div className="space-y-4">
      <Note>{t('step_soon')}</Note>
      {rows[step] && <Card title={t(`step_${step}` as ConsoleKey)}><Rows rows={rows[step]!} /></Card>}
      <Card title={t('docs_title')}>
        {a.documents.length === 0 ? <p className="text-sm text-muted">{t('docs_empty')}</p> : (
          <ul className="text-sm">
            {a.documents.map((doc) => (
              <li key={doc.id} className="flex flex-wrap justify-between gap-x-3 border-t border-[#EEF0F3] py-2 first:border-t-0">
                <span><b className="font-semibold">{t(`doc_${doc.type}` as ConsoleKey)}</b> · {doc.fileName}</span>
                <span className="text-muted">{consoleTime(lang, doc.uploadedAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function LoginCard({ d, lang, t, onUpdate }: { d: ApplicantDetail; lang: ConsoleLang; t: T; onUpdate: (d: ApplicantDetail) => void }) {
  const acc = d.account;
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  if (!acc) return null;
  const preparing = d.application.confirmation.status === 'preparing';
  const run = async (path: string, done: ConsoleKey) => {
    setBusy(true);
    setMsg(null);
    const { status, body } = await consolePost(`applicants/${d.application.id}/${path}`, {});
    setBusy(false);
    setConfirming(false);
    if (status === 401) return window.location.assign('/console/login');
    if (status === 200) {
      onUpdate(body as ApplicantDetail);
      setMsg({ ok: true, text: t(done) });
    } else setMsg({ ok: false, text: errorText(lang, body.error) });
  };
  const time = (iso: string | null) => (iso ? consoleTime(lang, iso) : t('none_text'));
  return (
    <Card title={t('acct_card')}>
      <Rows rows={[
        [t('id'), acc.email],
        [t('acct_state'), <Chip key="s" tone={LOGIN_TONE[acc.state]}>{t(`login_${acc.state}` as ConsoleKey)}</Chip>],
        [t('acct_sent'), time(acc.loginSentAt)],
        [t('acct_first'), time(acc.firstLoginAt)],
        [t('acct_last'), time(acc.lastLoginAt)],
        ...(acc.state === 'locked' && acc.lockedUntil ? [[t('login_locked'), t('locked_until', { d: consoleTime(lang, acc.lockedUntil) })] as [string, ReactNode]] : []),
      ]} />
      <div className="mt-3 space-y-2.5 border-t border-[#EEF0F3] pt-3">
        {acc.state === 'locked' && (
          <button type="button" className={`${buttonClass} w-full py-2.5`} disabled={busy} onClick={() => run('unlock', 'unlock_done')}>{t('unlock_btn')}</button>
        )}
        {confirming ? (
          <div className="rounded-[10px] border border-[#D5DBE3] p-3">
            <p className="text-sm font-semibold break-all">{t('send_login_confirm', { email: acc.email })}</p>
            <div className="mt-2.5 flex gap-2">
              <button type="button" className={`${primaryClass} py-2`} disabled={busy} onClick={() => run('send-login', 'send_login_done')}>{busy ? t('checking') : t('send')}</button>
              <button type="button" className={`${buttonClass} px-4`} onClick={() => setConfirming(false)}>{t('cancel')}</button>
            </div>
          </div>
        ) : (
          <button type="button" className={primaryClass} disabled={busy || preparing} onClick={() => setConfirming(true)}>
            {t(acc.state === 'not_sent' ? 'send_login_btn' : 'resend_login_btn')}
          </button>
        )}
        <p className="text-[13px] text-muted">
          {preparing ? t('send_login_wait') : t('send_login_note', { l: langName(lang, d.application.lang) })}
        </p>
        {msg && <p role="status" className={`rounded-[10px] px-3 py-2.5 text-sm ${msg.ok ? 'bg-[#E7F5EE] text-[#1F7A4D]' : 'bg-[#FDECEA] text-[#B3261E]'}`}>{msg.text}</p>}
      </div>
    </Card>
  );
}

function MemoCard({ d, lang, t, onUpdate }: { d: ApplicantDetail; lang: ConsoleLang; t: T; onUpdate: (d: ApplicantDetail) => void }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const memos = [...(d.application.memos ?? [])].reverse();
  const save = async () => {
    if (!text.trim()) return;
    setBusy(true);
    setError(null);
    const { status, body } = await consolePost(`applicants/${d.application.id}/memo`, { text });
    setBusy(false);
    if (status === 401) return window.location.assign('/console/login');
    if (status === 200) {
      onUpdate(body as ApplicantDetail);
      setText('');
    } else setError(errorText(lang, body.error));
  };
  return (
    <Card title={t('memo_title')} aside={t('memo_sub')}>
      <textarea className="w-full rounded-[10px] border border-[#D5DBE3] bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-[#2C4F78]"
        rows={3} maxLength={2000} placeholder={t('memo_ph')} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-2 flex justify-end">
        <button type="button" className={buttonClass} disabled={busy || !text.trim()} onClick={save}>{busy ? t('saving') : t('memo_btn')}</button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-[#B3261E]">{error}</p>}
      {memos.length > 0 && (
        <ul className="mt-2 text-sm">
          {memos.map((m) => (
            <li key={m.at} className="border-t border-[#EEF0F3] py-2.5">
              <p className="text-[13px] text-muted"><b className="font-semibold text-ink">{m.by}</b> {consoleTime(lang, m.at)}</p>
              <p className="mt-0.5 whitespace-pre-line">{m.text}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function TimelineCard({ d, lang, t }: { d: ApplicantDetail; lang: ConsoleLang; t: T }) {
  return (
    <Card title={t('tl_title')}>
      <ol className="relative ml-1 border-l border-[#E3E7ED]">
        {d.timeline.map((e, i) => (
          <li key={`${e.at}${e.code}${i}`} className="relative pb-3 pl-4 last:pb-0">
            <span className={`absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full ${e.by === 'aah' ? 'bg-[#2C4F78]' : 'bg-[#E0A030]'}`} />
            <p className="text-sm">
              {t(`ev_${e.code}` as ConsoleKey)}
              {e.actor && <span className="text-muted"> ({e.actor})</span>}
              {e.detail && <span className="text-muted"> · {e.code.endsWith('_edit') ? e.detail.split(', ').map((f) => t(`f_${f}` as ConsoleKey)).join(', ') : e.detail}</span>}
            </p>
            <p className="text-xs text-muted">{consoleTime(lang, e.at)}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default function ApplicantView({ lang, initial, schools }: {
  lang: ConsoleLang; initial: ApplicantDetail; schools: { id: string; title: string }[];
}) {
  const t: T = (k, v) => ct(lang, k, v);
  const [d, setD] = useState(initial);
  const a = d.application;
  const s = d.summary;
  const [step, setStep] = useState<StepKey>(s.step === 'confirmation' || s.step === 'application' ? s.step : 'application');

  return (
    <>
      <p className="mb-1 text-[13px] text-muted">
        <Link href="/console/applicants" className="hover:text-ink">{t('nav_applicants')}</Link> › {a.firstName} {a.lastName}
      </p>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-[22px] font-bold text-[#1E2A3A]">{a.firstName} {a.lastName}</h1>
        <span className="text-muted">{a.id}</span>
        <Chip tone={statusTone(s)}>{t(`st_${s.status}` as ConsoleKey)}</Chip>
      </div>
      <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium text-[#3A4654]">
        <span>{a.schoolName}</span>
        <span>{courseLabel(lang, a)}</span>
        <span>{t('nationality_of', { c: country(lang, a.nationality) })}</span>
        <span>{t('guide_lang', { l: langName(lang, a.lang) })}</span>
        {s.total > 0 && <span>{money(s.total, s.currency)}</span>}
      </p>

      <div className="-mx-4 mt-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <ol className="flex min-w-max overflow-hidden rounded-[14px] border border-[#E3E7ED] bg-white md:min-w-0">
          {s.steps.map((x, i) => (
            <li key={x.key} className="flex-1 border-l border-[#EEF0F3] first:border-l-0">
              <button type="button" onClick={() => setStep(x.key)} aria-pressed={step === x.key}
                className={`block h-full w-full min-w-[112px] px-3.5 py-3 text-left ${step === x.key ? 'bg-[#EEF3F9] shadow-[inset_0_-3px_0_#2C4F78]' : 'hover:bg-[#FAFBFC]'}`}>
                <span className="block text-xs text-muted">{t('step_n', { n: i + 1 })}</span>
                <span className="block text-sm font-semibold">{t(`step_${x.key}` as ConsoleKey)}</span>
                <span className="mt-1.5 inline-block">
                  <Chip tone={x.state === 'done' ? 'green' : x.state === 'current' ? 'amber' : 'gray'}>{t(`state_${x.state}` as ConsoleKey)}</Chip>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0">
          {step === 'application' ? <ApplicationPanel lang={lang} d={d} schools={schools} onUpdate={setD} />
            : step === 'confirmation' ? <ConfirmationPanel d={d} lang={lang} t={t} />
            : <StatusPanel d={d} step={step} lang={lang} t={t} />}
        </div>
        <div className="grid gap-4">
          <LoginCard d={d} lang={lang} t={t} onUpdate={setD} />
          <MemoCard d={d} lang={lang} t={t} onUpdate={setD} />
          <TimelineCard d={d} lang={lang} t={t} />
        </div>
      </div>
    </>
  );
}
