'use client';
// 1단계: 제출한 신청 내용 다시 보기
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { countryName, formatDate } from '@/lib/portal';
import { KV, StepHeader, Sub } from './common';

export default function StepApplication({ app, lang }: StepProps) {
  const { t } = useTranslation();
  const [year, season] = app.term.split('-');
  return (
    <>
      <StepHeader n={1} title={t('MY_STEP_APPLICATION')} tone="green"
        chip={t('MY_SUBMITTED_ON', { date: formatDate(app.createdAt, lang) })} lead={t('MY_APP_LEAD')} />
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
