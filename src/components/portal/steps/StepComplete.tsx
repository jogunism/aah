'use client';
// 마지막 완료 단계: 모든 절차가 끝났다는 감사·응원 메시지와 서울 사무소 연락처(주소·전화·메일)
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { KOREA_OFFICE, KOREA_OFFICE_KO, KOREA_OFFICE_PHONE, stepsFor } from '@/lib/portal';
import { StepHeader, Sub } from './common';

export default function StepComplete({ app }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <StepHeader n={stepsFor(app).indexOf('complete') + 1} title={t('MY_STEP_COMPLETE')} tone="green" chip={t('MY_STEP_COMPLETE_DONE')} />

      <div className="mt-5 rounded-xl bg-[#E3F4EA] px-5 py-6 text-center sm:px-8 sm:py-8">
        <p aria-hidden="true" className="text-[34px] leading-none">🎉</p>
        <p className="mt-3 text-[22px] font-bold tracking-[-0.01em] text-ink">{t('MY_COMPLETE_TITLE', { name: app.firstName })}</p>
        <p className="mx-auto mt-2 max-w-[520px] text-[15px] leading-relaxed text-ink-2">{t('MY_COMPLETE_BODY')}</p>
        <p className="mx-auto mt-2 max-w-[520px] text-[15px] font-semibold leading-relaxed text-[#1E8E5A]">{t('MY_COMPLETE_CHEER')}</p>
      </div>

      <Sub>{t('MY_COMPLETE_CONTACT')}</Sub>
      <p className="-mt-1 mb-3 text-[14px] text-ink-2">{t('MY_COMPLETE_CONTACT_BODY')}</p>
      <div className="rounded-xl border border-line bg-soft p-4 text-[14px] leading-relaxed text-ink">
        {KOREA_OFFICE.map((line) => <p key={line}>{line}</p>)}
        <p className="mt-2 text-[13px] text-muted">{t('MY_COMPLETE_KOREAN_ADDRESS')}</p>
        <p lang="ko">{KOREA_OFFICE_KO}</p>
        <p className="mt-3">
          {t('MY_COMPLETE_PHONE')} <a href={`tel:${KOREA_OFFICE_PHONE.replace(/[^+\d]/g, '')}`} className="font-semibold text-aah-blue underline underline-offset-2">{KOREA_OFFICE_PHONE}</a>
        </p>
        <p>
          {t('MY_COMPLETE_EMAIL')} <a href={`mailto:contact@aah.education?subject=${app.id}`} className="font-semibold text-aah-blue underline underline-offset-2">contact@aah.education</a>
        </p>
      </div>
    </>
  );
}
