'use client';
// 6단계(장기): 비자 결과 대기. 영사관은 학생에게만 연락하므로 발급되면 알려 달라는 안내와 발급 신고 버튼, 발급 뒤 출국 안내
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { formatDate } from '@/lib/portal';
import { buttonClass } from '@/components/ui/Button';
import { Note } from '../fields';
import { reportVisa } from '../api';
import { StepHeader, Sub } from './common';

const TIPS = ['FLIGHTS', 'EXPIRY', 'EXTRA_DOCS', 'ARC', 'INSURANCE', 'REFUSED'] as const;

export default function StepVisaStatus({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const v = app.visa;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const issued = v.status === 'issued';

  const report = async () => {
    setBusy(true);
    setError(null);
    try {
      onChange((await reportVisa(app.id, 'issued')).application);
    } catch {
      setError(t('APPLY_ERR_SERVER'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StepHeader n={6} title={t('MY_STEP_VISASTATUS')} tone={issued ? 'green' : v.status === 'refused' ? 'red' : 'blue'}
        chip={t(issued ? 'MY_STEP_VISASTATUS_DONE' : v.status === 'refused' ? 'MY_VS_REFUSED_CHIP' : 'MY_STEP_VISASTATUS_NOW')}
        lead={v.submittedAt ? t('MY_VS_LEAD', { date: formatDate(v.submittedAt, lang), where: v.mission || t('MY_VS_CONSULATE') }) : undefined} />

      {issued ? (
        <div className="mt-5">
          <Note tone="success"><strong>{t('MY_VS_ISSUED_TITLE')}</strong> {t('MY_VS_ISSUED_BODY')}</Note>
        </div>
      ) : (
        <>
          <div className="mt-5"><Note><strong>{t('MY_VS_WAIT_TITLE')}</strong> {t('MY_VS_WAIT_BODY')}</Note></div>
          {error && <div className="mt-3"><Note tone="alert">{error}</Note></div>}
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={report} disabled={busy} className={buttonClass('primary', 'md')}>{t('MY_VS_ISSUED_BUTTON')}</button>
          </div>
        </>
      )}

      <Sub>{t('MY_VS_TIPS')}</Sub>
      <ul className="ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
        {TIPS.map((k) => <li key={k}>{t(`MY_VS_TIP_${k}`)}</li>)}
      </ul>
    </>
  );
}
