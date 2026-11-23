'use client';
// 4단계: 한국 학교 지원 진행 상황(서류 수집 → 제출 → 심사 → 결과)과 학생 서류 업로드
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { Note } from '../fields';
import { UploadSlot } from '../Documents';
import { StepHeader, Sub, Timeline, type TimelineItem } from './common';

const REQUIRED = ['passport', 'photo', 'diploma'] as const;

export default function StepSchool({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const s = app.school.status;
  const has = (type: string) => app.documents.some((d) => d.owner === 'student' && d.type === type);
  const docsDone = REQUIRED.every(has);
  const sent = s !== 'not_started';
  const decided = s === 'admitted' || s === 'rejected';

  const items: TimelineItem[] = [
    { title: t('MY_SCHOOL_TL_DOCS'), detail: t('MY_SCHOOL_TL_DOCS_DETAIL'), state: docsDone || sent ? 'done' : 'current' },
    { title: t('MY_SCHOOL_TL_SUBMIT', { school: app.schoolName }), state: sent ? 'done' : docsDone ? 'current' : 'todo' },
    { title: t('MY_SCHOOL_TL_REVIEW'), detail: t('MY_SCHOOL_TL_REVIEW_DETAIL'), state: decided ? 'done' : sent ? 'current' : 'todo' },
    { title: t('MY_SCHOOL_TL_DECISION'), detail: t(app.program === 'long' ? 'MY_SCHOOL_TL_DECISION_LONG' : 'MY_SCHOOL_TL_DECISION_SHORT'), state: s === 'admitted' ? 'done' : 'todo' },
  ];

  const chip = s === 'admitted' ? ['MY_SCHOOL_CHIP_ADMITTED', 'green'] : s === 'rejected' ? ['MY_SCHOOL_CHIP_REJECTED', 'red']
    : sent ? ['MY_SCHOOL_CHIP_PROGRESS', 'blue'] : ['MY_SCHOOL_CHIP_DOCS', 'amber'];

  return (
    <>
      <StepHeader n={4} title={t('MY_STEP_SCHOOL')} chip={t(chip[0])} tone={chip[1] as 'green'} lead={t('MY_SCHOOL_LEAD')} />
      {s === 'admitted' && (
        <div className="mt-5">
          <Note tone="success">
            <strong>{t('MY_SCHOOL_ADMITTED', { school: app.schoolName })}</strong>{' '}
            {t(app.program === 'long' ? 'MY_SCHOOL_ADMITTED_LONG' : 'MY_SCHOOL_ADMITTED_SHORT')}
          </Note>
        </div>
      )}
      {s === 'rejected' && <div className="mt-5"><Note tone="alert">{t('MY_SCHOOL_REJECTED')}</Note></div>}
      <Timeline items={items} />

      <Sub>{t('MY_SCHOOL_DOCS')}</Sub>
      <p className="-mt-1 mb-2 text-[13px] text-muted">{t('MY_SCHOOL_DOCS_HINT')}</p>
      {REQUIRED.map((type) => (
        <UploadSlot key={type} app={app} lang={lang} type={type} onChange={onChange}
          title={t(`MY_DOC_${type.toUpperCase()}`)} hint={t(`MY_DOC_${type.toUpperCase()}_HINT`)} />
      ))}
      <UploadSlot app={app} lang={lang} type="other" onChange={onChange} title={t('MY_DOC_OTHER')} hint={t('MY_DOC_OTHER_HINT')} />
    </>
  );
}
