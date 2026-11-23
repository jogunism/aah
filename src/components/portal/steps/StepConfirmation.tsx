'use client';
// 2단계: 신청 접수 확인서. 검토 중 → 확인서 도착(옵션 선택·건강·비고·서명·동의) → 동의 완료
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { formatDate, formatMoney, total } from '@/lib/portal';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, inputClass, textareaClass } from '../fields';
import { agreeConfirmation } from '../api';
import { KV, MoneyTable, StepHeader, Sub } from './common';

const NOTES = ['CONTRACT', 'PRICES', 'DORM', 'DOCS', 'PAYMENT', 'VISA', 'INSURANCE'] as const;

export default function StepConfirmation({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const c = app.confirmation;
  const [optionId, setOptionId] = useState(c.options.length === 1 ? c.options[0].id : '');
  const [health, setHealth] = useState('');
  const [remarks, setRemarks] = useState('');
  const [signedName, setSignedName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [startNow, setStartNow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (c.status === 'preparing') {
    return (
      <>
        <StepHeader n={2} title={t('MY_STEP_CONFIRMATION')} chip={t('MY_CONF_PREPARING_CHIP')} tone="blue" />
        <div className="mt-5"><Note>{t('MY_CONF_PREPARING')}</Note></div>
      </>
    );
  }

  const noteKeys = NOTES.filter((n) => n !== 'VISA' || app.program === 'long');
  const notes = (
    <>
      <Sub>{t('MY_CONF_NOTES')}</Sub>
      <ol className="ml-5 list-decimal space-y-2 text-[14px] text-ink-2">
        {noteKeys.map((n) => <li key={n}>{t(`MY_CONF_NOTE_${n}`)}</li>)}
      </ol>
    </>
  );

  if (c.status === 'agreed' && c.reply) {
    const chosen = c.options.find((o) => o.id === c.reply!.optionId);
    return (
      <>
        <StepHeader n={2} title={t('MY_STEP_CONFIRMATION')} tone="green"
          chip={t('MY_CONF_AGREED_CHIP', { date: formatDate(c.reply.agreedAt, lang) })} lead={t('MY_CONF_AGREED_LEAD')} />
        <Sub>{t('MY_CONF_YOUR_REPLY')}</Sub>
        <KV rows={[
          [t('MY_CONF_OPTION'), chosen ? `${chosen.label} · ${formatMoney(total(chosen.items), c.currency, lang)}` : c.reply.optionId],
          [t('MY_CONF_HEALTH'), c.reply.health || t('MY_CONF_NONE')],
          [t('MY_CONF_REMARKS'), c.reply.remarks || '–'],
          [t('MY_CONF_SIGNED'), `${c.reply.signedName} · ${formatDate(c.reply.agreedAt, lang)}`],
        ]} />
        {c.message && (<><Sub>{t('MY_CONF_MESSAGE')}</Sub><p className="whitespace-pre-line text-[14px] text-ink-2">{c.message}</p></>)}
        {notes}
      </>
    );
  }

  const overdue = !!c.replyBy && Date.parse(c.replyBy) < Date.now();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!optionId) return setError(t('MY_CONF_ERR_OPTION'));
    if (!signedName.trim()) return setError(t('MY_CONF_ERR_NAME'));
    if (!agreeTerms || !startNow) return setError(t('MY_CONF_ERR_AGREE'));
    setBusy(true);
    try {
      const res = await agreeConfirmation({
        applicationId: app.id, optionId, health, remarks, signedName, agreeTerms, startNow,
        notes: noteKeys.map((n) => t(`MY_CONF_NOTE_${n}`)), // kept in the agreement record as the student read them
      });
      onChange(res.application);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(t('APPLY_ERR_SERVER'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StepHeader n={2} title={t('MY_STEP_CONFIRMATION')} tone={overdue ? 'red' : 'amber'}
        chip={t(overdue ? 'MY_CONF_OVERDUE_CHIP' : 'MY_CONF_WAITING_CHIP')}
        lead={t('MY_CONF_LEAD', { date: c.replyBy ? formatDate(c.replyBy, lang) : '' })} />

      {c.message && (
        <>
          <Sub>{t('MY_CONF_MESSAGE')}</Sub>
          <div className="whitespace-pre-line rounded-xl bg-soft px-4 py-3 text-[14px] text-ink-2">{c.message}</div>
        </>
      )}
      {notes}

      <form onSubmit={submit}>
        <Sub>{t('MY_CONF_CHOOSE')}</Sub>
        <div className="space-y-3" role="radiogroup" aria-label={t('MY_CONF_CHOOSE')}>
          {c.options.map((o) => (
            <label key={o.id} className={`block cursor-pointer rounded-xl border p-4 ${optionId === o.id ? 'border-ink ring-1 ring-ink' : 'border-[#D2D2D7]'}`}>
              <span className="flex items-center gap-3">
                <input type="radio" name="option" value={o.id} checked={optionId === o.id} onChange={() => setOptionId(o.id)} className="accent-ink" />
                <span className="flex-1 font-semibold text-ink">{o.label}</span>
                <span className="font-semibold text-ink">{formatMoney(total(o.items), c.currency, lang)}</span>
              </span>
              <span className="mt-3 block pl-7">
                <MoneyTable items={o.items} currency={c.currency} lang={lang} totalLabel={t('MY_TOTAL')} />
              </span>
            </label>
          ))}
        </div>

        <Sub>{t('MY_CONF_YOUR_REPLY')}</Sub>
        <div className="space-y-4">
          <Field id="health" label={t('MY_CONF_HEALTH')} optionalLabel={t('APPLY_OPTIONAL')} hint={t('MY_CONF_HEALTH_HINT')}>
            <textarea id="health" maxLength={1000} className={textareaClass()} value={health} onChange={(e) => setHealth(e.target.value)} />
          </Field>
          <Field id="remarks" label={t('MY_CONF_REMARKS')} optionalLabel={t('APPLY_OPTIONAL')}>
            <textarea id="remarks" maxLength={1000} className={textareaClass()} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          </Field>
          <Field id="signedName" label={t('MY_CONF_SIGN_NAME')} required hint={t('MY_CONF_SIGN_HINT')}>
            <input id="signedName" autoComplete="name" className={inputClass()} value={signedName} onChange={(e) => setSignedName(e.target.value)} />
          </Field>
          <label className="flex items-start gap-3 text-sm text-ink-2">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] accent-ink" />
            <span>
              {t('MY_CONF_AGREE_TERMS_BEFORE')}{' '}
              <Link href={`/${lang}/terms`} target="_blank" className="text-aah-blue underline underline-offset-2">{t('POLICY_TERMS')}</Link>{' '}
              {t('MY_CONF_AGREE_TERMS_AFTER')}
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-ink-2">
            <input type="checkbox" checked={startNow} onChange={(e) => setStartNow(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] accent-ink" />
            <span>{t('MY_CONF_START_NOW')}</span>
          </label>
          {error && <Note tone="alert">{error}</Note>}
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className={buttonClass('primary', 'md')}>{t('MY_CONF_SUBMIT')}</button>
          </div>
        </div>
      </form>
    </>
  );
}
