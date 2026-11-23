'use client';
// 포털 본문: 인사·신청 번호, 진행 단계 표시(완료·현재·잠김), 선택한 단계 화면, 옆 안내 카드

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { buttonClass } from '@/components/ui/Button';
import { Note } from './fields';
import Dropdown from './Dropdown';
import type { Currency } from '@/lib/currency';
import type { Application, PortalData, StepKey } from '@/lib/portal';
import { currentStep, formatDate, stepStates } from '@/lib/portal';
import StepApplication from './steps/StepApplication';
import StepConfirmation from './steps/StepConfirmation';
import StepPayment from './steps/StepPayment';
import StepSchool from './steps/StepSchool';
import StepVisaDocs from './steps/StepVisaDocs';
import StepVisaStatus from './steps/StepVisaStatus';

export interface StepProps {
  app: Application;
  lang: string;
  bank: PortalData['bank'];
  rates: Record<Currency, number> | null; // EUR → currency, for the refund amounts
  onChange: (app: Application) => void;
}

const PANELS: Record<StepKey, (p: StepProps) => React.ReactNode> = {
  application: StepApplication,
  confirmation: StepConfirmation,
  payment: StepPayment,
  school: StepSchool,
  visaDocs: StepVisaDocs,
  visaStatus: StepVisaStatus,
};

export default function Portal({ lang, initial, rates, passwordChanged }: {
  lang: string; initial: PortalData; rates: Record<Currency, number> | null; passwordChanged: boolean;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const [app, setApp] = useState(initial.application);
  const [view, setView] = useState<StepKey>(currentStep(initial.application));
  const states = stepStates(app);

  const onChange = (next: Application) => {
    // Jump to the new current step when an action finishes the one being viewed
    if (currentStep(next) !== currentStep(app)) setView(currentStep(next));
    setApp(next);
  };

  const Panel = PANELS[view];

  return (
    <div className="max-w-[1180px] mx-auto px-5 md:px-6 pt-8 md:pt-10 pb-16">
      {initial.account.mustChangePassword && (
        <div className="mb-7 flex flex-col gap-3 rounded-[14px] border border-[#F4E0BD] bg-[#FFF7EB] px-4 py-3 text-sm text-[#7A4B00] sm:flex-row sm:items-center">
          <p className="flex-1">
            <strong>{t('MY_TEMP_BANNER_TITLE')}</strong> {t('MY_TEMP_BANNER_BODY')}
          </p>
          <Link href={`/${lang}/my/password`} className={buttonClass('dark', 'sm', 'self-start sm:self-auto')}>
            {t('MY_CHANGE_PASSWORD')}
          </Link>
        </div>
      )}
      {passwordChanged && (
        <div className="mb-7">
          <Note tone="success">{t('MY_PASSWORD_CHANGED')}</Note>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-aah-red">{t('MY_TITLE')}</p>
          <h1 className="mt-1 text-[30px] md:text-[34px] font-bold tracking-[-0.02em] text-ink">{t('MY_HELLO', { name: app.firstName })}</h1>
        </div>
        <div className="text-[13px] text-muted sm:text-right">
          {initial.applications.length > 1 ? (
            <Dropdown id="applicationSwitch" value={app.id} placeholder={t('MY_APPLICATION_ID')} className="w-[300px] max-w-full text-left"
              options={initial.applications.map((a) => ({ value: a.id, label: `${a.id} · ${a.schoolName}` }))}
              onChange={(id) => router.push(`/${lang}/my?id=${id}`)} />
          ) : (
            <>
              {t('MY_APPLICATION_ID')} <b className="font-semibold text-ink">{app.id}</b>
            </>
          )}
          <span> · {t('MY_SUBMITTED_ON', { date: formatDate(app.createdAt, lang) })}</span>
        </div>
      </div>

      {/* Stepper */}
      <nav aria-label={t('MY_STEPS')} className="mt-8 mb-7 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ol className="flex min-w-[600px] md:min-w-0">
          {states.map(({ key, state }, i) => {
            const selected = view === key;
            const label = t(`MY_STEP_${key.toUpperCase()}`);
            const sub = state === 'locked' ? t('MY_STATE_LOCKED')
              : key === 'confirmation' && app.confirmation.status === 'preparing' ? t('MY_STEP_CONFIRMATION_PREP')
                : t(`MY_STEP_${key.toUpperCase()}_${state === 'done' ? 'DONE' : 'NOW'}`);
            return (
              <li key={key} className="relative flex-1 text-center">
                {i > 0 && (
                  <span aria-hidden="true" className={`absolute top-[19px] right-1/2 w-full h-0.5 ${state === 'locked' ? 'bg-line' : 'bg-ink'}`} />
                )}
                <button type="button" disabled={state === 'locked'} onClick={() => setView(key)}
                  aria-current={selected ? 'step' : undefined}
                  className="relative z-10 mx-auto flex flex-col items-center px-1 disabled:cursor-not-allowed group">
                  <span className={`flex w-10 h-10 items-center justify-center rounded-full border-2 text-[15px] font-semibold ${
                    state === 'done' ? 'border-ink bg-ink text-white'
                      : state === 'current' ? 'border-aah-red bg-aah-red text-white ring-6 ring-aah-red/15'
                        : 'border-line bg-white text-[#A1A1A6]'}`}>
                    {state === 'done' ? '✓' : i + 1}
                  </span>
                  <span className={`mt-2.5 text-[13px] leading-tight ${
                    state === 'current' ? 'font-bold text-ink' : state === 'done' ? 'font-medium text-ink-2 group-hover:text-ink' : 'font-medium text-[#A1A1A6]'}`}>
                    {label}
                  </span>
                  <span className={`mt-0.5 text-[11px] ${
                    state === 'current' ? 'font-semibold text-aah-red' : state === 'done' ? 'text-[#1E8E5A]' : 'text-[#A1A1A6]'}`}>
                    {sub}
                  </span>
                  <span aria-hidden="true" className={`mt-2 h-[3px] w-9 rounded ${selected ? (state === 'current' ? 'bg-aah-red' : 'bg-ink') : 'bg-transparent'}`} />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <section className="rounded-[18px] border border-line p-5 md:p-7">
          <Panel app={app} lang={lang} bank={initial.bank} rates={rates} onChange={onChange} />
        </section>
        <aside className="space-y-4">
          <div className="rounded-[18px] border border-line p-5">
            <h2 className="text-[15px] font-semibold text-ink">{t('MY_SIDE_PLAN')}</h2>
            <p className="mt-2 text-[13px] text-muted">
              {app.schoolName}
              <br />
              {t(`APPLY_SEASON_${app.term.split('-')[1].toUpperCase()}`, { year: app.term.split('-')[0] })} ·{' '}
              {t(app.program === 'long' ? 'APPLY_PROGRAM_LONG' : 'APPLY_PROGRAM_SHORT')}
            </p>
            <p className="mt-2 text-[13px] text-muted">
              {t('MY_ARRIVAL')} ~ {formatDate(app.arrivalDate, lang)}
              <br />
              {t('MY_DEPARTURE')} ~ {formatDate(app.departureDate, lang)}
            </p>
          </div>
          <div className="rounded-[18px] border border-line p-5">
            <h2 className="text-[15px] font-semibold text-ink">{t('MY_SIDE_HELP')}</h2>
            <p className="mt-2 text-[13px] text-muted">
              {t('MY_SIDE_HELP_BODY_1')}{' '}
              <a href={`mailto:contact@aah.education?subject=${app.id}`} className="text-aah-blue underline underline-offset-2">contact@aah.education</a>{' '}
              {t('MY_SIDE_HELP_BODY_2', { id: app.id })}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
