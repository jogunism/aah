'use client';
// 숙소 단계(장기·단기): 한국 집 계약은 우리가 대신 하고 관리자가 계약 완료를 체크. 학생 화면은 안내만
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { formatDate, stepsFor } from '@/lib/portal';
import { Note } from '../fields';
import { StepHeader, Sub } from './common';

const TIPS = ['CONTRACT', 'TIMING', 'DEPOSIT', 'DATES', 'GUIDE'] as const;

export default function StepHousing({ app, lang }: StepProps) {
  const { t } = useTranslation();
  const h = app.housing;
  const contracted = h?.status === 'contracted';

  return (
    <>
      <StepHeader n={stepsFor(app).indexOf('housing') + 1} title={t('MY_STEP_HOUSING')} tone={contracted ? 'green' : 'blue'}
        chip={t(contracted ? 'MY_STEP_HOUSING_DONE' : 'MY_STEP_HOUSING_NOW')} lead={t('MY_HOUSING_LEAD')} />

      <div className="mt-5">
        {contracted ? (
          <Note tone="success">
            <strong>{t('MY_HOUSING_DONE_TITLE')}</strong>{' '}
            {h?.contractedAt ? t('MY_HOUSING_DONE_BODY', { date: formatDate(h.contractedAt, lang) }) : t('MY_HOUSING_DONE_BODY_NODATE')}
          </Note>
        ) : (
          <Note><strong>{t('MY_HOUSING_WAIT_TITLE')}</strong> {t('MY_HOUSING_WAIT_BODY')}</Note>
        )}
      </div>

      <Sub>{t('MY_HOUSING_TIPS')}</Sub>
      <ul className="ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
        {TIPS.map((k) => <li key={k}>{t(`MY_HOUSING_TIP_${k}`)}</li>)}
      </ul>
    </>
  );
}
