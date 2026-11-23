'use client';
// 공식 신청서 폼: 필수·선택 항목 입력, 검증, 전송 후 완료 화면

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, SectionTitle, inputClass, textareaClass } from './fields';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import { KOREAN_LEVELS, birthYears, countryOptions, monthNames, pinnedCountries, termOptions } from '@/lib/apply';

export interface ApplySchool {
  id: string;
  title: string;
  long: boolean;
  short: boolean;
}

type Form = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  nationality: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  education: '' | 'high_school' | 'university';
  program: '' | 'long' | 'short';
  schoolId: string;
  term: string;
  semesters: string; // long-term only
  arrivalDate: string;
  departureDate: string;
  koreanLevel: string;
  message: string;
  privacyConsent: boolean;
  website: string; // honeypot
};

const EMPTY: Form = {
  email: '', firstName: '', lastName: '', phone: '', birthDay: '', birthMonth: '', birthYear: '', nationality: '',
  street: '', postalCode: '', city: '', country: '', education: '', program: '', schoolId: '',
  term: '', semesters: '', arrivalDate: '', departureDate: '', koreanLevel: '', message: '', privacyConsent: false, website: '',
};

const EMAIL_RE = /^[^\s@,;<>"()]+@[^\s@,;<>"'()]+\.[^\s@,;<>"'()]+$/;
const PHONE_RE = /^\+?[0-9 ()./-]{6,25}$/;

/** YYYY-MM-DD from the three date-of-birth dropdowns, or null if incomplete or impossible (31 February) */
const birthDate = (f: Form): string | null => {
  if (!f.birthDay || !f.birthMonth || !f.birthYear) return null;
  const iso = `${f.birthYear}-${f.birthMonth.padStart(2, '0')}-${f.birthDay.padStart(2, '0')}`;
  return new Date(`${iso}T00:00:00Z`).getUTCDate() === Number(f.birthDay) ? iso : null;
};

const validate = (f: Form): Partial<Record<keyof Form, string>> => {
  const e: Partial<Record<keyof Form, string>> = {};
  const req: (keyof Form)[] = ['firstName', 'lastName', 'nationality', 'street', 'postalCode', 'city',
    'country', 'education', 'program', 'schoolId', 'term', 'arrivalDate', 'departureDate'];
  req.forEach((k) => {
    if (!String(f[k]).trim()) e[k] = 'APPLY_ERR_REQUIRED';
  });
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'APPLY_ERR_EMAIL';
  if (!PHONE_RE.test(f.phone.trim())) e.phone = 'APPLY_ERR_PHONE';
  if (!f.birthDay || !f.birthMonth || !f.birthYear) e.birthDay = 'APPLY_ERR_REQUIRED';
  else if (!birthDate(f)) e.birthDay = 'APPLY_ERR_BIRTHDATE';
  if (f.program === 'long' && !f.semesters) e.semesters = 'APPLY_ERR_REQUIRED';
  if (f.arrivalDate && f.departureDate && f.departureDate < f.arrivalDate) e.departureDate = 'APPLY_ERR_DATES';
  if (!f.privacyConsent) e.privacyConsent = 'APPLY_ERR_CONSENT';
  return e;
};

// API field names → form keys (server-side validation errors)
const API_FIELD: Record<string, keyof Form> = {
  birthDate: 'birthDay', 'address.street': 'street', 'address.postalCode': 'postalCode', 'address.city': 'city', 'address.country': 'country',
};

export default function ApplyForm({ lang, schools }: { lang: string; schools: ApplySchool[] }) {
  const { t } = useTranslation();
  const [f, setF] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [done, setDone] = useState<{ id: string } | null>(null);

  const countries = useMemo(() => countryOptions(lang).map((c) => ({ value: c.code, label: c.name })), [lang]);
  const pinned = useMemo(() => pinnedCountries(lang), [lang]);
  const today = useMemo(() => new Date().toLocaleDateString('sv-SE'), []); // YYYY-MM-DD, local
  const months = useMemo(() => monthNames(lang).map((m, i) => ({ value: String(i + 1), label: m })), [lang]);
  const years = useMemo(() => birthYears().map((y) => ({ value: String(y), label: String(y) })), []);
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })), []);
  const terms = useMemo(() => termOptions(), []);
  const visibleSchools = schools.filter((s) => !f.program || s[f.program]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setF((prev) => {
      const next = { ...prev, [key]: value };
      // A school that doesn't offer the chosen program is cleared
      if (key === 'program' && value && prev.schoolId) {
        const school = schools.find((s) => s.id === prev.schoolId);
        if (school && !school[value as 'long' | 'short']) next.schoolId = '';
      }
      return next;
    });
    // The three date-of-birth dropdowns share one error (shown under the day)
    const errorKey = key === 'birthMonth' || key === 'birthYear' ? 'birthDay' : key;
    if (errors[errorKey]) setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
  };

  const err = (key: keyof Form) => (errors[key] ? t(errors[key]!) : null);
  const aria = (key: keyof Form) => ({
    'aria-invalid': !!errors[key] || undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setFailure(null);
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: f.email.trim(),
          firstName: f.firstName.trim(),
          lastName: f.lastName.trim(),
          phone: f.phone.trim(),
          birthDate: birthDate(f),
          nationality: f.nationality,
          address: { street: f.street.trim(), postalCode: f.postalCode.trim(), city: f.city.trim(), country: f.country },
          education: f.education,
          schoolId: f.schoolId,
          program: f.program,
          term: f.term,
          semesters: f.program === 'long' ? Number(f.semesters) : undefined,
          arrivalDate: f.arrivalDate,
          departureDate: f.departureDate,
          koreanLevel: f.koreanLevel || undefined,
          message: f.message.trim() || undefined,
          privacyConsent: f.privacyConsent,
          lang,
          website: f.website,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setDone({ id: body.id });
        window.scrollTo({ top: 0 });
      } else if (res.status === 429) {
        setFailure(t('APPLY_ERR_DUPLICATE'));
      } else if (res.status === 400 && body.field) {
        const key = API_FIELD[body.field] ?? (body.field as keyof Form);
        setErrors({ [key]: key === 'birthDay' ? 'APPLY_ERR_BIRTHDATE' : 'APPLY_ERR_INVALID' });
        document.getElementById(key)?.focus();
      } else {
        setFailure(t('APPLY_ERR_SERVER'));
      }
    } catch {
      setFailure(t('APPLY_ERR_SERVER'));
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-[620px] mx-auto text-center">
        <div className="mx-auto flex w-16 h-16 items-center justify-center rounded-full bg-[#E3F4EA] text-[#1E8E5A] text-3xl" aria-hidden="true">
          ✓
        </div>
        <h1 className="mt-5 text-[30px] md:text-[34px] font-bold tracking-[-0.02em] text-ink">{t('APPLY_DONE_TITLE')}</h1>
        <p className="mt-2 text-muted">{t('APPLY_DONE_LEAD', { name: f.firstName.trim(), id: done.id })}</p>
        <div className="mt-7 rounded-[18px] border border-line p-6 text-left">
          <h2 className="font-semibold text-ink">{t('APPLY_DONE_NEXT')}</h2>
          <ul className="mt-3 ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
            <li>{t('APPLY_DONE_STEP_MAIL', { email: f.email.trim() })}</li>
            <li>{t('APPLY_DONE_STEP_SPAM')}</li>
            <li>{t('APPLY_DONE_STEP_REVIEW')}</li>
          </ul>
          <Link href={`/${lang}`} className={buttonClass('dark', 'sm', 'mt-5')}>
            {t('APPLY_DONE_HOME')}
          </Link>
        </div>
      </div>
    );
  }

  const optional = t('APPLY_OPTIONAL');

  return (
    <div className="max-w-[760px] mx-auto">
      <p className="text-xs font-semibold tracking-[0.08em] uppercase text-aah-red">{t('APPLY_EYEBROW')}</p>
      <h1 className="mt-1 text-[30px] md:text-[38px] leading-tight font-bold tracking-[-0.02em] text-ink">{t('APPLY_TITLE')}</h1>
      <p className="mt-2 text-[16px] text-muted">{t('APPLY_LEAD')}</p>

      <form noValidate onSubmit={submit} className="mt-7 rounded-[18px] border border-line p-5 md:p-7 space-y-7">
        {/* honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} />
        </div>

        <section className="space-y-4">
          <div>
            <SectionTitle n={1}>{t('APPLY_SEC_ABOUT')}</SectionTitle>
            <p className="mt-1 text-[13px] text-muted">{t('APPLY_SEC_ABOUT_HINT')}</p>
          </div>
          <Field id="email" label={t('APPLY_EMAIL')} required hint={t('APPLY_EMAIL_HINT')} error={err('email')}>
            <input id="email" type="email" autoComplete="email" className={inputClass(!!errors.email)} value={f.email}
              onChange={(e) => set('email', e.target.value)} {...aria('email')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label={t('APPLY_FIRST_NAME')} required error={err('firstName')}>
              <input id="firstName" autoComplete="given-name" className={inputClass(!!errors.firstName)} value={f.firstName}
                onChange={(e) => set('firstName', e.target.value)} {...aria('firstName')} />
            </Field>
            <Field id="lastName" label={t('APPLY_LAST_NAME')} required error={err('lastName')}>
              <input id="lastName" autoComplete="family-name" className={inputClass(!!errors.lastName)} value={f.lastName}
                onChange={(e) => set('lastName', e.target.value)} {...aria('lastName')} />
            </Field>
            <Field id="phone" label={t('APPLY_PHONE')} required hint={t('APPLY_PHONE_HINT')} error={err('phone')}>
              <input id="phone" type="tel" autoComplete="tel" className={inputClass(!!errors.phone)}
                value={f.phone} onChange={(e) => set('phone', e.target.value)} {...aria('phone')} />
            </Field>
            <Field id="birthDay" label={t('APPLY_BIRTHDATE')} required error={err('birthDay')}>
              <div className="grid grid-cols-[1fr_1.6fr_1.2fr] gap-2">
                <Dropdown id="birthDay" value={f.birthDay} onChange={(v) => set('birthDay', v)} options={days}
                  placeholder={t('APPLY_DAY')} invalid={!!errors.birthDay} describedBy={errors.birthDay ? 'birthDay-error' : undefined} />
                <Dropdown id="birthMonth" value={f.birthMonth} onChange={(v) => set('birthMonth', v)} options={months}
                  placeholder={t('APPLY_MONTH')} invalid={!!errors.birthDay} />
                <Dropdown id="birthYear" value={f.birthYear} onChange={(v) => set('birthYear', v)} options={years}
                  placeholder={t('APPLY_YEAR')} invalid={!!errors.birthDay} />
              </div>
            </Field>
          </div>
          <Field id="nationality" label={t('APPLY_NATIONALITY')} required error={err('nationality')}>
            <Dropdown id="nationality" value={f.nationality} onChange={(v) => set('nationality', v)} searchPlaceholder={t('APPLY_SEARCH')} noMatch={t('APPLY_NO_MATCH')} pinned={pinned} options={countries} placeholder={t('APPLY_SELECT')}
              invalid={!!errors.nationality} describedBy={errors.nationality ? 'nationality-error' : undefined} />
          </Field>
        </section>

        <hr className="border-line" />
        <section className="space-y-4">
          <div>
            <SectionTitle n={2}>{t('APPLY_SEC_ADDRESS')}</SectionTitle>
            <p className="mt-1 text-[13px] text-muted">{t('APPLY_SEC_ADDRESS_HINT')}</p>
          </div>
          <Field id="street" label={t('APPLY_STREET')} required error={err('street')}>
            <input id="street" autoComplete="street-address" className={inputClass(!!errors.street)} value={f.street}
              onChange={(e) => set('street', e.target.value)} {...aria('street')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="postalCode" label={t('APPLY_POSTAL_CODE')} required error={err('postalCode')}>
              <input id="postalCode" autoComplete="postal-code" className={inputClass(!!errors.postalCode)} value={f.postalCode}
                onChange={(e) => set('postalCode', e.target.value)} {...aria('postalCode')} />
            </Field>
            <Field id="city" label={t('APPLY_CITY')} required error={err('city')}>
              <input id="city" autoComplete="address-level2" className={inputClass(!!errors.city)} value={f.city}
                onChange={(e) => set('city', e.target.value)} {...aria('city')} />
            </Field>
          </div>
          <Field id="country" label={t('APPLY_COUNTRY')} required error={err('country')}>
            <Dropdown id="country" value={f.country} onChange={(v) => set('country', v)} searchPlaceholder={t('APPLY_SEARCH')} noMatch={t('APPLY_NO_MATCH')} pinned={pinned} options={countries} placeholder={t('APPLY_SELECT')}
              invalid={!!errors.country} describedBy={errors.country ? 'country-error' : undefined} />
          </Field>
        </section>

        <hr className="border-line" />
        <fieldset className="space-y-3" aria-describedby={errors.education ? 'education-error' : undefined}>
          <legend>
            <SectionTitle n={3}>{t('APPLY_SEC_EDUCATION')}</SectionTitle>
          </legend>
          <p className="text-[13px] text-muted">{t('APPLY_SEC_EDUCATION_HINT')} <span className="text-aah-red">*</span></p>
          <div id="education" tabIndex={-1} className="grid gap-2.5 sm:grid-cols-2">
            {(['high_school', 'university'] as const).map((v) => (
              <label key={v} className={`flex gap-3 rounded-xl border p-4 cursor-pointer ${
                f.education === v ? 'border-ink ring-1 ring-ink' : errors.education ? 'border-aah-red' : 'border-[#D2D2D7]'}`}>
                <input type="radio" name="education" value={v} checked={f.education === v}
                  onChange={() => set('education', v)} className="mt-1 accent-ink" />
                <span>
                  <span className="block text-sm font-semibold text-ink">{t(`APPLY_EDU_${v.toUpperCase()}`)}</span>
                  <span className="block text-[13px] text-muted">{t(`APPLY_EDU_${v.toUpperCase()}_HINT`)}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.education && <p id="education-error" className="text-xs text-aah-red">{t(errors.education)}</p>}
        </fieldset>

        <hr className="border-line" />
        <section className="space-y-4">
          <SectionTitle n={4}>{t('APPLY_SEC_PLAN')}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="program" label={t('APPLY_PROGRAM')} required error={err('program')}>
              <Dropdown id="program" value={f.program} onChange={(v) => set('program', v as Form['program'])} placeholder={t('APPLY_SELECT')}
                options={[{ value: 'long', label: t('APPLY_PROGRAM_LONG') }, { value: 'short', label: t('APPLY_PROGRAM_SHORT') }]}
                invalid={!!errors.program} describedBy={errors.program ? 'program-error' : undefined} />
            </Field>
            <Field id="term" label={t('APPLY_TERM')} required error={err('term')}>
              <Dropdown id="term" value={f.term} onChange={(v) => set('term', v)} placeholder={t('APPLY_SELECT')}
                options={terms.map((term) => {
                  const [y, season] = term.split('-');
                  return { value: term, label: t(`APPLY_SEASON_${season.toUpperCase()}`, { year: y }) };
                })}
                invalid={!!errors.term} describedBy={errors.term ? 'term-error' : undefined} />
            </Field>
          </div>
          {f.program === 'long' && (
            <Field id="semesters" label={t('APPLY_SEMESTERS')} required hint={t('APPLY_SEMESTERS_HINT')} error={err('semesters')}>
              <Dropdown id="semesters" value={f.semesters} onChange={(v) => set('semesters', v)} placeholder={t('APPLY_SELECT')}
                options={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ value: String(n), label: t('APPLY_SEMESTER_COUNT', { count: n }) }))}
                invalid={!!errors.semesters} describedBy={errors.semesters ? 'semesters-error' : undefined} />
            </Field>
          )}
          <Field id="schoolId" label={t('APPLY_SCHOOL')} required error={err('schoolId')}>
            <Dropdown id="schoolId" value={f.schoolId} onChange={(v) => set('schoolId', v)} placeholder={t('APPLY_SELECT')}
              searchPlaceholder={t('APPLY_SEARCH')} noMatch={t('APPLY_NO_MATCH')}
              options={visibleSchools.map((sc) => ({ value: sc.id, label: sc.title }))}
              invalid={!!errors.schoolId} describedBy={errors.schoolId ? 'schoolId-error' : undefined} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="arrivalDate" label={t('APPLY_ARRIVAL')} required error={err('arrivalDate')}>
              <DatePicker id="arrivalDate" lang={lang} value={f.arrivalDate} onChange={(v) => set('arrivalDate', v)} min={today}
                placeholder={t('APPLY_SELECT_DATE')} prevLabel={t('APPLY_PREV_MONTH')} nextLabel={t('APPLY_NEXT_MONTH')}
                invalid={!!errors.arrivalDate} describedBy={errors.arrivalDate ? 'arrivalDate-error' : undefined} />
            </Field>
            <Field id="departureDate" label={t('APPLY_DEPARTURE')} required error={err('departureDate')}>
              <DatePicker id="departureDate" lang={lang} value={f.departureDate} onChange={(v) => set('departureDate', v)}
                min={f.arrivalDate || today} placeholder={t('APPLY_SELECT_DATE')} prevLabel={t('APPLY_PREV_MONTH')} nextLabel={t('APPLY_NEXT_MONTH')}
                invalid={!!errors.departureDate} describedBy={errors.departureDate ? 'departureDate-error' : undefined} />
            </Field>
          </div>
          <Note>
            <strong>{t('APPLY_NOT_EXACT_TITLE')}</strong> {t('APPLY_NOT_EXACT_BODY')}
          </Note>
        </section>

        <hr className="border-line" />
        <section className="space-y-4">
          <SectionTitle n={5}>
            {t('APPLY_SEC_MORE')} <span className="text-sm font-normal text-muted">({optional})</span>
          </SectionTitle>
          <Field id="koreanLevel" label={t('APPLY_KOREAN_LEVEL')} optionalLabel={optional}>
            <Dropdown id="koreanLevel" value={f.koreanLevel} onChange={(v) => set('koreanLevel', v)} placeholder={t('APPLY_SELECT')}
              options={KOREAN_LEVELS.map((l) => ({ value: l, label: t(`APPLY_LEVEL_${l.toUpperCase()}`) }))} />
          </Field>
          <Field id="message" label={t('APPLY_MESSAGE')} optionalLabel={optional}>
            <textarea id="message" maxLength={2000} placeholder={t('APPLY_MESSAGE_PLACEHOLDER')} className={textareaClass()}
              value={f.message} onChange={(e) => set('message', e.target.value)} />
          </Field>
        </section>

        <hr className="border-line" />
        <div>
          <label className="flex gap-3 items-start text-sm text-ink-2 cursor-pointer">
            <input id="privacyConsent" type="checkbox" checked={f.privacyConsent} onChange={(e) => set('privacyConsent', e.target.checked)}
              className="mt-0.5 w-[18px] h-[18px] accent-ink" {...aria('privacyConsent')} />
            <span>
              {t('APPLY_CONSENT_BEFORE')}
              {/* no space after an elision such as Italian “nell’” */}
              {t('APPLY_CONSENT_BEFORE').endsWith('’') ? '' : ' '}
              <Link href={`/${lang}/privacy`} target="_blank" className="text-aah-blue underline underline-offset-2">
                {t('POLICY_PRIVACY')}
              </Link>
              {t('APPLY_CONSENT_AFTER')} <span className="text-aah-red">*</span>
            </span>
          </label>
          {errors.privacyConsent && <p id="privacyConsent-error" className="mt-1 ml-[30px] text-xs text-aah-red">{t(errors.privacyConsent)}</p>}
          <p className="mt-2 ml-[30px] text-xs text-muted">{t('APPLY_CONSENT_NOTE')}</p>
        </div>

        {failure && <Note tone="alert">{failure}</Note>}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-muted">
            <span className="text-aah-red">*</span> {t('APPLY_REQUIRED_NOTE')}
          </span>
          <button type="submit" disabled={sending} className={buttonClass('primary', 'md')}>
            {sending ? t('APPLY_SENDING') : t('APPLY_SUBMIT')}
          </button>
        </div>
      </form>
    </div>
  );
}
