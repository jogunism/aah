'use client';
// 2단계: 신청 접수 확인서. 검토 중 → 확인서 도착(옵션 선택, 여권·질환·거주국·확인 체크, 비고·서명·동의) → 우리가 회신 확인 → 승인(3단계) 또는 보완 요청
import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import {
  ACKS_ALL, ACKS_LONG, countryName, formatDate, formatMoney, passportNeededUntil, total,
  type AckKey, type ConfirmationReply,
} from '@/lib/portal';
import { countryOptions, monthNames, pinnedCountries } from '@/lib/apply';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, inputClass, textareaClass } from '../fields';
import Dropdown from '../Dropdown';
import { agreeConfirmation } from '../api';
import { KV, MoneyTable, StepHeader, Sub } from './common';

const NOTES = ['CONTRACT', 'PRICES', 'DORM', 'DOCS', 'PAYMENT', 'VISA', 'INSURANCE'] as const;

function Choice({ name, value, checked, onChange, children }: {
  name: string; value: string; checked: boolean; onChange: () => void; children: ReactNode;
}) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${checked ? 'border-ink ring-1 ring-ink' : 'border-[#D2D2D7]'}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="accent-ink" />
      <span className="text-ink">{children}</span>
    </label>
  );
}

export default function StepConfirmation({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const c = app.confirmation;
  const long = app.program === 'long';
  const ackKeys: AckKey[] = [...ACKS_ALL, ...(long ? ACKS_LONG : [])];
  // Only after our request for corrections does the form start with the previous answers
  const prev: ConfirmationReply | undefined = c.returned ? c.history?.[c.history.length - 1] : undefined;
  const [optionId, setOptionId] = useState(prev?.optionId ?? (c.options.length === 1 ? c.options[0].id : ''));
  const [hasPassport, setHasPassport] = useState<boolean | null>(prev?.checks?.passport.has ?? null);
  // Expiry as day / month / year dropdowns: passports run for years, a month-by-month calendar is too slow
  const [prevY, prevM, prevD] = (prev?.checks?.passport.expiry ?? '--').split('-');
  const [expDay, setExpDay] = useState(prevD ? String(Number(prevD)) : '');
  const [expMonth, setExpMonth] = useState(prevM ? String(Number(prevM)) : '');
  const [expYear, setExpYear] = useState(prevY ?? '');
  const [declared, setDeclared] = useState<boolean | null>(prev?.checks?.health.declared ?? null);
  const [health, setHealth] = useState(prev?.checks?.health.details ?? '');
  const [residence, setResidence] = useState(prev?.checks?.residence ?? app.address.country);
  const [acks, setAcks] = useState<Set<AckKey>>(new Set());
  const [remarks, setRemarks] = useState(prev?.remarks ?? '');
  const [signedName, setSignedName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [startNow, setStartNow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const countries = useMemo(() => countryOptions(lang).map((o) => ({ value: o.code, label: o.name })), [lang]);
  const months = useMemo(() => monthNames(lang).map((m, i) => ({ value: String(i + 1), label: m })), [lang]);
  const years = useMemo(() => Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + i)).map((y) => ({ value: y, label: y })), []);
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })), []);
  const neededUntil = passportNeededUntil(app.arrivalDate);
  // YYYY-MM-DD, or '' while incomplete or impossible (31 April)
  const expiry = (() => {
    if (!expDay || !expMonth || !expYear) return '';
    const iso = `${expYear}-${expMonth.padStart(2, '0')}-${expDay.padStart(2, '0')}`;
    return new Date(`${iso}T00:00:00Z`).getUTCDate() === Number(expDay) ? iso : '';
  })();

  if (c.status === 'preparing') {
    return (
      <>
        <StepHeader n={2} title={t('MY_STEP_CONFIRMATION')} chip={t('MY_CONF_PREPARING_CHIP')} tone="blue" />
        <div className="mt-5"><Note>{t('MY_CONF_PREPARING')}</Note></div>
      </>
    );
  }

  const noteKeys = NOTES.filter((n) => n !== 'VISA' || long);
  const notes = (
    <>
      <Sub>{t('MY_CONF_NOTES')}</Sub>
      <ol className="ml-5 list-decimal space-y-2 text-[14px] text-ink-2">
        {noteKeys.map((n) => <li key={n}>{t(`MY_CONF_NOTE_${n}`)}</li>)}
      </ol>
    </>
  );

  if ((c.status === 'agreed' || c.status === 'approved') && c.reply) {
    const r = c.reply;
    const chosen = c.options.find((o) => o.id === r.optionId);
    const approved = c.status === 'approved';
    const checkRows: [string, ReactNode][] = r.checks ? [
      [t('MY_CONF_PASSPORT'), r.checks.passport.has && r.checks.passport.expiry
        ? t('MY_CONF_PASSPORT_VALID_UNTIL', { date: formatDate(r.checks.passport.expiry, lang) }) : t('MY_CONF_PASSPORT_NONE')],
      ...(r.checks.residence ? [[t('MY_CONF_RESIDENCE'), countryName(r.checks.residence, lang)] as [string, ReactNode]] : []),
    ] : [];
    return (
      <>
        <StepHeader n={2} title={t('MY_STEP_CONFIRMATION')} tone={approved ? 'green' : 'blue'}
          chip={approved ? t('MY_CONF_AGREED_CHIP', { date: formatDate(r.agreedAt, lang) }) : t('MY_CONF_CHECKING_CHIP')}
          lead={t(approved ? 'MY_CONF_AGREED_LEAD' : 'MY_CONF_CHECKING_LEAD')} />
        <Sub>{t('MY_CONF_YOUR_REPLY')}</Sub>
        <KV rows={[
          [t('MY_CONF_OPTION'), chosen ? `${chosen.label} · ${formatMoney(total(chosen.items), c.currency, lang)}` : r.optionId],
          ...checkRows,
          [t('MY_CONF_HEALTH'), r.health || t('MY_CONF_NONE')],
          [t('MY_CONF_REMARKS'), r.remarks || '–'],
          [t('MY_CONF_SIGNED'), `${r.signedName} · ${formatDate(r.agreedAt, lang)}`],
        ]} />
        {c.message && (<><Sub>{t('MY_CONF_MESSAGE')}</Sub><p className="whitespace-pre-line text-[14px] text-ink-2">{c.message}</p></>)}
        {notes}
      </>
    );
  }

  const overdue = !!c.replyBy && Date.parse(c.replyBy) < Date.now();
  const toggleAck = (k: AckKey, on: boolean) =>
    setAcks((before) => {
      const next = new Set(before);
      if (on) next.add(k);
      else next.delete(k);
      return next;
    });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!optionId) return setError(t('MY_CONF_ERR_OPTION'));
    if (hasPassport === null || (hasPassport && !expiry)) return setError(t('MY_CONF_ERR_PASSPORT'));
    if (declared === null || (declared && !health.trim())) return setError(t('MY_CONF_ERR_HEALTH'));
    if (long && !residence) return setError(t('MY_CONF_ERR_RESIDENCE'));
    if (ackKeys.some((k) => !acks.has(k))) return setError(t('MY_CONF_ERR_ACKS'));
    if (!signedName.trim()) return setError(t('MY_CONF_ERR_NAME'));
    if (!agreeTerms || !startNow) return setError(t('MY_CONF_ERR_AGREE'));
    setBusy(true);
    try {
      const res = await agreeConfirmation({
        applicationId: app.id, optionId, remarks, signedName, agreeTerms, startNow,
        checks: {
          passport: { has: hasPassport, expiry: hasPassport ? expiry : null },
          health: { declared, details: declared ? health.trim() : '' },
          residence: long ? residence : null,
          acks: ackKeys,
        },
        // kept in the agreement record as the student read them
        notes: noteKeys.map((n) => t(`MY_CONF_NOTE_${n}`)),
        acks: ackKeys.map((k) => t(`MY_CONF_ACK_${k}`)),
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

      {c.returned && (
        <div className="mt-5">
          <Note tone="warn">
            <strong>{t('MY_CONF_RETURNED')}</strong>
            <span className="mt-1 block whitespace-pre-line">{c.returned.message}</span>
          </Note>
        </div>
      )}

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

        <Sub>{t('MY_CONF_CHECKS')}</Sub>
        <p className="-mt-1 mb-4 text-[13px] text-muted">{t('MY_CONF_CHECKS_LEAD')}</p>
        <div className="space-y-6">
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-semibold text-ink">{t('MY_CONF_PASSPORT')} <span className="text-aah-red">*</span></legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <Choice name="passport" value="yes" checked={hasPassport === true} onChange={() => setHasPassport(true)}>{t('MY_CONF_PASSPORT_HAVE')}</Choice>
              <Choice name="passport" value="no" checked={hasPassport === false} onChange={() => setHasPassport(false)}>{t('MY_CONF_PASSPORT_NONE')}</Choice>
            </div>
            {hasPassport && (
              <div className="pt-2">
                <Field id="passportExpiry" label={t('MY_CONF_PASSPORT_EXPIRY')} required
                  hint={t('MY_CONF_PASSPORT_EXPIRY_HINT', { date: formatDate(neededUntil, lang) })}>
                  <div className="grid max-w-[420px] grid-cols-[1fr_1.6fr_1.2fr] gap-2">
                    <Dropdown id="passportExpiry" value={expDay} onChange={setExpDay} options={days} placeholder={t('APPLY_DAY')} />
                    <Dropdown id="passportExpiryMonth" value={expMonth} onChange={setExpMonth} options={months} placeholder={t('APPLY_MONTH')} />
                    <Dropdown id="passportExpiryYear" value={expYear} onChange={setExpYear} options={years} placeholder={t('APPLY_YEAR')} />
                  </div>
                </Field>
                {expiry && expiry < neededUntil && (
                  <div className="mt-3"><Note tone="warn">{t('MY_CONF_PASSPORT_SHORT', { date: formatDate(neededUntil, lang) })}</Note></div>
                )}
              </div>
            )}
            {hasPassport === false && <Note tone="warn">{t('MY_CONF_PASSPORT_NONE_HINT')}</Note>}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="mb-1 text-sm font-semibold text-ink">{t('MY_CONF_HEALTH')} <span className="text-aah-red">*</span></legend>
            <p className="mb-2 text-[13px] text-muted">{t('MY_CONF_HEALTH_HINT')}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Choice name="health" value="no" checked={declared === false} onChange={() => setDeclared(false)}>{t('MY_CONF_HEALTH_NO')}</Choice>
              <Choice name="health" value="yes" checked={declared === true} onChange={() => setDeclared(true)}>{t('MY_CONF_HEALTH_YES')}</Choice>
            </div>
            {declared && (
              <div className="pt-2">
                <Field id="health" label={t('MY_CONF_HEALTH_DETAILS')} required hint={t('MY_CONF_HEALTH_DETAILS_HINT')}>
                  <textarea id="health" maxLength={1000} className={textareaClass()} value={health} onChange={(e) => setHealth(e.target.value)} />
                </Field>
              </div>
            )}
          </fieldset>

          {long && (
            <Field id="residence" label={t('MY_CONF_RESIDENCE')} required hint={t('MY_CONF_RESIDENCE_HINT')}>
              <div className="max-w-[320px]">
                <Dropdown id="residence" value={residence} onChange={setResidence} options={countries} pinned={pinnedCountries(lang)}
                  placeholder={t('APPLY_SELECT')} searchPlaceholder={t('APPLY_SEARCH')} noMatch={t('APPLY_NO_MATCH')} />
              </div>
            </Field>
          )}

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-ink">{t('MY_CONF_ACKS')} <span className="text-aah-red">*</span></legend>
            <div className="space-y-3">
              {ackKeys.map((k) => (
                <label key={k} className="flex items-start gap-3 text-sm text-ink-2">
                  <input type="checkbox" checked={acks.has(k)} onChange={(e) => toggleAck(k, e.target.checked)} className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-ink" />
                  <span>{t(`MY_CONF_ACK_${k}`)}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <Sub>{t('MY_CONF_YOUR_REPLY')}</Sub>
        <div className="space-y-4">
          <Field id="remarks" label={t('MY_CONF_REMARKS')} optionalLabel={t('APPLY_OPTIONAL')}>
            <textarea id="remarks" maxLength={1000} className={textareaClass()} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          </Field>
          <Field id="signedName" label={t('MY_CONF_SIGN_NAME')} required hint={t('MY_CONF_SIGN_HINT')}>
            <input id="signedName" autoComplete="name" className={inputClass()} value={signedName} onChange={(e) => setSignedName(e.target.value)} />
          </Field>
          <label className="flex items-start gap-3 text-sm text-ink-2">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-ink" />
            <span>
              {t('MY_CONF_AGREE_TERMS_BEFORE')}{' '}
              <Link href={`/${lang}/terms`} target="_blank" className="text-aah-blue underline underline-offset-2">{t('POLICY_TERMS')}</Link>{' '}
              {t('MY_CONF_AGREE_TERMS_AFTER')}
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-ink-2">
            <input type="checkbox" checked={startNow} onChange={(e) => setStartNow(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-ink" />
            <span>{t('MY_CONF_START_NOW')}</span>
          </label>
          {error && <Note tone="alert">{error}</Note>}
          <p className="text-[13px] text-muted">{t('MY_CONF_AFTER_SUBMIT')}</p>
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className={buttonClass('primary', 'md')}>{t('MY_CONF_SUBMIT')}</button>
          </div>
        </div>
      </form>
    </>
  );
}
