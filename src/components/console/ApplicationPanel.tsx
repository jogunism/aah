'use client';
// 1단계 신청서: 받은 내용 보기, 운영자 수정(학생 메일 없음, 기록에만), 안내 언어·통화 변경. 확인서 동의 뒤에는 학교·과정·학기·통화는 잠금

import { useState, type FormEvent, type ReactNode } from 'react';
import { ct, consoleTime, errorText, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import { country, courseLabel, dateOnly, langName, termLabel, type ApplicantDetail, type ApplicationData } from '@/lib/console.applicants';
import { COUNTRY_CODES, KOREAN_LEVELS, termOptions } from '@/lib/apply';
import { Card, Label, Rows, buttonClass, consolePost, inputClass, primaryClass } from './ui';

type Form = Pick<ApplicationData, 'firstName' | 'lastName' | 'phone' | 'birthDate' | 'nationality' | 'address' | 'education'
  | 'schoolId' | 'program' | 'term' | 'arrivalDate' | 'departureDate' | 'lang'> & { semesters: number; koreanLevel: string; message: string; currency: Currency };

type Currency = 'EUR' | 'USD' | 'GBP';
const LANGS = ['en', 'de', 'fr', 'es', 'it'];
/** Older applications have no currency: the confirmation uses the site language's default (as the API does) */
const currencyOf = (a: ApplicationData): Currency => a.currency ?? (a.lang === 'en' ? 'USD' : 'EUR');

const toForm = (a: ApplicationData): Form => ({
  firstName: a.firstName, lastName: a.lastName, phone: a.phone, birthDate: a.birthDate, nationality: a.nationality,
  address: { ...a.address }, education: a.education, schoolId: a.schoolId, program: a.program, term: a.term,
  semesters: a.semesters ?? 2, arrivalDate: a.arrivalDate, departureDate: a.departureDate,
  koreanLevel: a.koreanLevel ?? '', message: a.message ?? '', lang: a.lang, currency: currencyOf(a),
});

export default function ApplicationPanel({ lang, d, schools, onUpdate }: {
  lang: ConsoleLang; d: ApplicantDetail; schools: { id: string; title: string }[]; onUpdate: (d: ApplicantDetail) => void;
}) {
  const t = (k: ConsoleKey, v?: Record<string, string | number>) => ct(lang, k, v);
  const a = d.application;
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const locked = a.confirmation.status === 'agreed' || a.confirmation.status === 'approved';
  const countries = COUNTRY_CODES.map((c) => ({ c, n: country(lang, c) })).sort((x, y) => x.n.localeCompare(y.n, lang));
  const terms = termOptions().includes(a.term) ? termOptions() : [a.term, ...termOptions()];

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));
  const setAddr = (k: keyof Form['address'], v: string) => setForm((f) => (f ? { ...f, address: { ...f.address, [k]: v } } : f));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setError(null);
    const body = {
      ...form,
      ...(form.program === 'long' ? {} : { semesters: undefined }),
      koreanLevel: form.koreanLevel || undefined,
      message: form.message.trim() || undefined,
      // Older applications have no stored currency: only send one the operator actually chose
      currency: a.currency || form.currency !== currencyOf(a) ? form.currency : undefined,
    };
    const { status, body: res } = await consolePost(`applicants/${a.id}/application`, body);
    setBusy(false);
    if (status === 401) return window.location.assign('/console/login');
    if (status === 200) {
      onUpdate(res as ApplicantDetail);
      setForm(null);
      setSaved(true);
    } else {
      const field = typeof res.field === 'string' ? ` (${t(`f_${res.field.replace('address.', '')}` as ConsoleKey)})` : '';
      setError(errorText(lang, res.error) + field);
    }
  };

  const view: [string, ReactNode][] = [
    [t('f_firstName'), a.firstName],
    [t('f_lastName'), a.lastName],
    [t('f_email'), a.email],
    [t('f_phone'), a.phone],
    [t('f_birthDate'), dateOnly(lang, a.birthDate)],
    [t('f_nationality'), country(lang, a.nationality)],
    [t('f_address'), `${a.address.street}, ${a.address.postalCode} ${a.address.city}, ${country(lang, a.address.country)}`],
    [t('f_education'), t(`edu_${a.education}` as ConsoleKey)],
    [t('f_schoolId'), a.schoolName],
    [t('f_program'), courseLabel(lang, a)],
    [t('f_arrivalDate'), dateOnly(lang, a.arrivalDate)],
    [t('f_departureDate'), dateOnly(lang, a.departureDate)],
    [t('f_koreanLevel'), a.koreanLevel ? t(`lvl_${a.koreanLevel}` as ConsoleKey) : t('none_text')],
    [t('f_message'), a.message ? <span key="m" className="whitespace-pre-line">{a.message}</span> : t('none_text')],
    [t('f_lang'), langName(lang, a.lang)],
    [t('f_currency'), a.currency ?? `${currencyOf(a)} (${t('currency_default')})`],
  ];

  const select = (value: string, onChange: (v: string) => void, options: [string, string][], disabled = false) => (
    <select className={inputClass} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );

  return (
    <Card title={t('app_title')} aside={
      <span className="flex items-center gap-3">
        {t('app_received', { d: consoleTime(lang, a.createdAt) })}
        {!form && <button type="button" className={buttonClass} onClick={() => { setForm(toForm(a)); setSaved(false); }}>{t('edit')}</button>}
      </span>
    }>
      {saved && <p role="status" className="mb-3 rounded-[10px] bg-[#E7F5EE] px-3 py-2.5 text-sm text-[#1F7A4D]">{t('edit_saved')}</p>}
      {!form ? <Rows rows={view} /> : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Label text={t('f_firstName')}><input className={inputClass} required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} /></Label>
            <Label text={t('f_lastName')}><input className={inputClass} required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} /></Label>
            <Label text={t('f_phone')}><input className={inputClass} required value={form.phone} onChange={(e) => set('phone', e.target.value)} /></Label>
            <Label text={t('f_birthDate')}><input className={inputClass} type="date" required value={form.birthDate} onChange={(e) => set('birthDate', e.target.value)} /></Label>
            <Label text={t('f_nationality')}>{select(form.nationality, (v) => set('nationality', v), countries.map(({ c, n }) => [c, n]))}</Label>
            <Label text={t('f_education')}>{select(form.education, (v) => set('education', v as Form['education']), [['high_school', t('edu_high_school')], ['university', t('edu_university')]])}</Label>
          </div>
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-1.5 text-[13px] font-semibold text-muted">{t('f_address')}</legend>
            <Label text={t('f_street')}><input className={inputClass} required value={form.address.street} onChange={(e) => setAddr('street', e.target.value)} /></Label>
            <Label text={t('f_postalCode')}><input className={inputClass} required value={form.address.postalCode} onChange={(e) => setAddr('postalCode', e.target.value)} /></Label>
            <Label text={t('f_city')}><input className={inputClass} required value={form.address.city} onChange={(e) => setAddr('city', e.target.value)} /></Label>
            <Label text={t('f_country')}>{select(form.address.country, (v) => setAddr('country', v), countries.map(({ c, n }) => [c, n]))}</Label>
          </fieldset>
          {locked && <p className="rounded-[10px] bg-[#FFF4DE] px-3 py-2.5 text-sm text-[#8A5A00]">{t('edit_priced_note')}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <Label text={t('f_schoolId')}>{select(form.schoolId, (v) => set('schoolId', v), schools.map((s) => [s.id, s.title]), locked)}</Label>
            <Label text={t('f_program')}>{select(form.program, (v) => set('program', v as Form['program']), [['long', t('program_long')], ['short', t('program_short')]], locked)}</Label>
            <Label text={t('f_term')}>{select(form.term, (v) => set('term', v), terms.map((x) => [x, termLabel(lang, x)]), locked)}</Label>
            {form.program === 'long' && (
              <Label text={t('f_semesters')}>{select(String(form.semesters), (v) => set('semesters', Number(v)), Array.from({ length: 8 }, (_, i) => [String(i + 1), t('semesters_n', { n: i + 1 })]), locked)}</Label>
            )}
            <Label text={t('f_arrivalDate')}><input className={inputClass} type="date" required value={form.arrivalDate} onChange={(e) => set('arrivalDate', e.target.value)} /></Label>
            <Label text={t('f_departureDate')}><input className={inputClass} type="date" required value={form.departureDate} onChange={(e) => set('departureDate', e.target.value)} /></Label>
            <Label text={t('f_koreanLevel')}>{select(form.koreanLevel, (v) => set('koreanLevel', v), [['', t('none_text')], ...KOREAN_LEVELS.map((l) => [l, t(`lvl_${l}` as ConsoleKey)] as [string, string])])}</Label>
          </div>
          <Label text={t('f_message')}>
            <textarea className={inputClass} rows={3} maxLength={2000} value={form.message} onChange={(e) => set('message', e.target.value)} />
          </Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Label text={t('f_lang')}>{select(form.lang, (v) => set('lang', v), LANGS.map((l) => [l, langName(lang, l)]))}</Label>
            <Label text={t('f_currency')}>{select(form.currency, (v) => set('currency', v as Currency), [['EUR', 'EUR (€)'], ['USD', 'USD ($)'], ['GBP', 'GBP (£)']], locked)}</Label>
          </div>
          <p className="text-[13px] text-muted">{t('edit_lang_note')}</p>
          <p className="text-[13px] text-muted">{t('edit_note')}</p>
          {error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>}
          <div className="flex gap-2">
            <button className={`${primaryClass} sm:w-auto sm:px-6`} disabled={busy}>{busy ? t('saving') : t('save')}</button>
            <button type="button" className={`${buttonClass} px-5`} onClick={() => { setForm(null); setError(null); }}>{t('cancel')}</button>
          </div>
        </form>
      )}
    </Card>
  );
}
