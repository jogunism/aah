'use client';
// 6단계(장기): 비자 진행 상황. 영사관 연락은 학생에게 직접 오므로 바로 알려 달라는 안내와 신고 버튼
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { formatDate } from '@/lib/portal';
import { Field, Note, textareaClass } from '../fields';
import { UploadSlot } from '../Documents';
import { reportVisa } from '../api';
import { StepHeader, Sub, Timeline } from './common';

const TIPS = ['FLIGHTS', 'EXPIRY', 'EXTRA_DOCS', 'ARC', 'INSURANCE', 'REFUSED'] as const;

export default function StepVisaStatus({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  const v = app.visa;
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const issued = v.status === 'issued';

  const report = async (action: 'contacted' | 'issued') => {
    setBusy(action);
    setError(null);
    try {
      onChange((await reportVisa(app.id, action, { note: note.trim() })).application);
      setSent(action);
      setNote('');
    } catch {
      setError(t('APPLY_ERR_SERVER'));
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <StepHeader n={6} title={t('MY_STEP_VISASTATUS')} tone={issued ? 'green' : v.status === 'refused' ? 'red' : 'blue'}
        chip={t(issued ? 'MY_STEP_VISASTATUS_DONE' : v.status === 'refused' ? 'MY_VS_REFUSED_CHIP' : 'MY_STEP_VISASTATUS_NOW')}
        lead={v.submittedAt ? t('MY_VS_LEAD', { date: formatDate(v.submittedAt, lang), where: v.mission || t('MY_VS_CONSULATE') }) : undefined} />

      {!issued && (
        <div className="mt-5 rounded-xl border border-[#F1D3D4] bg-[#FCF1F1] p-4 text-[#8E2A2E]">
          <p className="text-[15px] font-bold">☎ {t('MY_VS_CONTACT_TITLE')}</p>
          <p className="mt-1 text-sm">{t('MY_VS_CONTACT_BODY')}</p>
          <div className="mt-3">
            <Field id="visaNote" label={t('MY_VS_NOTE')} optionalLabel={t('APPLY_OPTIONAL')}>
              <textarea id="visaNote" maxLength={2000} className={textareaClass()} value={note} onChange={(e) => setNote(e.target.value)}
                placeholder={t('MY_VS_NOTE_PLACEHOLDER')} />
            </Field>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <button type="button" disabled={!!busy} onClick={() => report('contacted')}
              className="h-10 rounded-full bg-aah-red px-5 text-sm font-semibold text-white hover:bg-aah-red-dark disabled:opacity-50">
              {t('MY_VS_CONTACTED_BUTTON')}
            </button>
            <button type="button" disabled={!!busy} onClick={() => report('issued')}
              className="h-10 rounded-full border border-[#D2D2D7] bg-white px-5 text-sm font-semibold text-ink hover:bg-soft disabled:opacity-50">
              {t('MY_VS_ISSUED_BUTTON')}
            </button>
          </div>
          {sent === 'contacted' && <p className="mt-2 text-sm font-semibold">{t('MY_VS_THANKS')}</p>}
          {error && <p className="mt-2 text-sm">{error}</p>}
        </div>
      )}
      {issued && <div className="mt-5"><Note tone="success"><strong>{t('MY_VS_ISSUED_TITLE')}</strong> {t('MY_VS_ISSUED_BODY')}</Note></div>}

      <Timeline items={[
        { title: t('MY_VS_TL_SUBMITTED'), detail: v.submittedAt ? `${formatDate(v.submittedAt, lang)}${v.mission ? ` · ${v.mission}` : ''}` : undefined, state: 'done' },
        { title: t('MY_VS_TL_REVIEW'), detail: v.contactedAt ? t('MY_VS_TL_CONTACTED', { date: formatDate(v.contactedAt, lang) }) : t('MY_VS_TL_REVIEW_DETAIL'), state: issued ? 'done' : 'current' },
        { title: t('MY_VS_TL_ISSUED'), detail: issued && v.issuedAt ? formatDate(v.issuedAt, lang) : t('MY_VS_TL_ISSUED_DETAIL'), state: issued ? 'done' : 'todo' },
      ]} />

      <Sub>{t('MY_VS_UPLOAD_TITLE')}</Sub>
      <UploadSlot app={app} lang={lang} type="visa" onChange={onChange} title={t('MY_DOC_VISA')} hint={t('MY_DOC_VISA_HINT')} />

      <Sub>{t('MY_VS_TIPS')}</Sub>
      <ul className="ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
        {TIPS.map((k) => <li key={k}>{t(`MY_VS_TIP_${k}`)}</li>)}
      </ul>
    </>
  );
}
