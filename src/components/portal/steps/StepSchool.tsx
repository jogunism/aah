'use client';
// 4단계: 한국 학교 지원 진행 상황(서류 수집 → 제출 → 심사 → 결과), 학생 서류 업로드, 장기는 원본 서류 한국 사무소 우편 발송
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { KOREA_OFFICE, formatDate } from '@/lib/portal';
import { buttonClass } from '@/components/ui/Button';
import { Note } from '../fields';
import { UploadSlot } from '../Documents';
import { reportPosted } from '../api';
import { StepHeader, Sub, Timeline, type TimelineItem } from './common';

const REQUIRED = ['passport', 'photo', 'diploma'] as const;
const ORIGINALS = ['DIPLOMA', 'FUNDS', 'PHOTOS', 'PASSPORT'] as const;

export default function StepSchool({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const s = app.school.status;
  const has = (type: string) => app.documents.some((d) => d.owner === 'student' && d.type === type);
  const docsDone = REQUIRED.every(has);
  const sent = s !== 'not_started';
  const decided = s === 'admitted' || s === 'rejected';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const posted = async () => {
    setBusy(true);
    setError(null);
    try {
      onChange((await reportPosted(app.id)).application);
    } catch {
      setError(t('APPLY_ERR_SERVER'));
    } finally {
      setBusy(false);
    }
  };

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

      {app.program === 'long' && !decided && (
        <>
          <Sub>{t('MY_SCHOOL_POST_TITLE')}</Sub>
          <p className="text-[14px] text-ink-2">{t('MY_SCHOOL_POST_BODY')}</p>
          <ul className="mt-2 ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
            {ORIGINALS.map((k) => <li key={k}>{t(`MY_SCHOOL_POST_${k}`)}</li>)}
          </ul>
          <div className="mt-4 rounded-xl border border-line bg-soft p-4 text-[14px] leading-relaxed text-ink">
            <p className="mb-1 text-xs font-semibold tracking-[0.06em] uppercase text-muted">{t('MY_SCHOOL_POST_ADDRESS')}</p>
            {KOREA_OFFICE.map((line) => <p key={line}>{line}</p>)}
          </div>
          <p className="mt-2 text-[13px] text-muted">{t('MY_SCHOOL_POST_TRACKING', { id: app.id })}</p>
          {app.school.postedAt ? (
            <div className="mt-4"><Note tone="success">{t('MY_SCHOOL_POST_DONE', { date: formatDate(app.school.postedAt, lang) })}</Note></div>
          ) : (
            <>
              {error && <div className="mt-3"><Note tone="alert">{error}</Note></div>}
              <div className="mt-4 flex justify-end">
                <button type="button" onClick={posted} disabled={busy} className={buttonClass('primary', 'md')}>{t('MY_SCHOOL_POST_BUTTON')}</button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
