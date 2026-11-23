'use client';
// 1단계: 제출한 신청 내용 다시 보기. 확인서 동의 전까지는 같은 신청 폼으로 수정(이메일 제외)
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { canEditApplication, countryName, formatDate } from '@/lib/portal';
import { buttonClass } from '@/components/ui/Button';
import ApplyForm from '../ApplyForm';
import { Note } from '../fields';
import { KV, StepHeader, Sub } from './common';

export default function StepApplication({ app, lang, schools, onChange }: StepProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [year, season] = app.term.split('-');
  const editable = canEditApplication(app);
  const header = (
    <StepHeader n={1} title={t('MY_STEP_APPLICATION')} tone="green"
      chip={t('MY_SUBMITTED_ON', { date: formatDate(app.createdAt, lang) })}
      lead={t(editing ? 'MY_APP_EDIT_LEAD' : editable ? 'MY_APP_LEAD_EDITABLE' : 'MY_APP_LEAD')} />
  );

  if (editing) {
    // A school that is no longer listed stays selectable for this application
    const list = schools.some((s) => s.id === app.schoolId)
      ? schools
      : [...schools, { id: app.schoolId, title: app.schoolName, long: true, short: true }];
    return (
      <>
        {header}
        {app.confirmation.status === 'sent' && <div className="mt-5"><Note>{t('MY_APP_EDIT_PRICED')}</Note></div>}
        <ApplyForm lang={lang} schools={list} edit={{
          app,
          onCancel: () => setEditing(false),
          onSaved: (next) => {
            onChange(next);
            setEditing(false);
            setSaved(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
        }} />
      </>
    );
  }

  return (
    <>
      {header}
      {saved && <div className="mt-5"><Note tone="success">{t('MY_APP_SAVED')}</Note></div>}
      {editable && (
        <div className="mt-5">
          <button type="button" onClick={() => { setSaved(false); setEditing(true); }} className={buttonClass('outline', 'sm', 'text-ink')}>
            {t('MY_APP_EDIT')}
          </button>
        </div>
      )}
      <Sub>{t('APPLY_SEC_ABOUT')}</Sub>
      <KV rows={[
        [t('MY_APP_NAME'), `${app.firstName} ${app.lastName}`],
        [t('APPLY_EMAIL'), app.email],
        [t('APPLY_PHONE'), app.phone],
        [t('APPLY_BIRTHDATE'), formatDate(app.birthDate, lang)],
        [t('APPLY_NATIONALITY'), countryName(app.nationality, lang)],
      ]} />
      <Sub>{t('APPLY_SEC_ADDRESS')}</Sub>
      <KV rows={[[t('MY_APP_ADDRESS'), (
        <>
          {app.address.street}<br />{app.address.postalCode} {app.address.city}, {countryName(app.address.country, lang)}
        </>
      )]]} />
      <Sub>{t('APPLY_SEC_EDUCATION')}</Sub>
      <KV rows={[[t('MY_APP_DIPLOMA'), t(`APPLY_EDU_${app.education.toUpperCase()}`)]]} />
      <Sub>{t('APPLY_SEC_PLAN')}</Sub>
      <KV rows={[
        [t('APPLY_SCHOOL'), app.schoolName],
        [t('MY_APP_PROGRAM_TERM'), [
          t(app.program === 'long' ? 'APPLY_PROGRAM_LONG' : 'APPLY_PROGRAM_SHORT'),
          t(`APPLY_SEASON_${season.toUpperCase()}`, { year }),
          ...(app.semesters ? [t('APPLY_SEMESTER_COUNT', { count: app.semesters })] : []),
        ].join(' · ')],
        [t('MY_APP_DATES'), <>{formatDate(app.arrivalDate, lang)} → {formatDate(app.departureDate, lang)} <span className="text-muted">({t('MY_APP_PLANNED')})</span></>],
        [t('APPLY_KOREAN_LEVEL'), app.koreanLevel ? t(`APPLY_LEVEL_${app.koreanLevel.toUpperCase()}`) : '–'],
        ...(app.message ? [[t('APPLY_MESSAGE'), <span key="m" className="whitespace-pre-line">{app.message}</span>] as [string, React.ReactNode]] : []),
      ]} />
    </>
  );
}
