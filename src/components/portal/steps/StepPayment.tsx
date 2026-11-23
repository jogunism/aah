'use client';
// 3단계: 서비스 비용·학비 납부. 금액, 입금 계좌(IBAN)·참조번호, 취소 안내, 입금 확인 후 인보이스
import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { formatDate } from '@/lib/portal';
import { fromEur } from '@/lib/currency';
import { Note } from '../fields';
import { openDocument } from '../api';
import { MoneyTable, StepHeader, Sub } from './common';

// Service fee refunds after the confirmation, in EUR (terms section 7): confirmed / from day 7 / after we apply to the school
const REFUNDS = { long: [380, 340, 310], short: [260, 210, 170] } as const;

function CopyRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value.replace(/\s/g, label === 'IBAN' ? '' : ' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line py-3 first:border-t-0 text-sm">
      <span className="w-[140px] text-muted">{label}</span>
      <span className={`flex-1 font-mono font-semibold break-all ${highlight ? 'text-aah-red' : 'text-ink'}`}>{value}</span>
      <button type="button" onClick={copy} className="rounded-lg border border-[#D2D2D7] bg-white px-2.5 py-1 text-xs text-ink-2 hover:bg-soft">
        {copied ? t('MY_COPIED') : t('MY_COPY')}
      </button>
    </div>
  );
}

export default function StepPayment({ app, lang, bank, rates }: StepProps) {
  const { t } = useTranslation();
  const p = app.payment;
  // Same conversion as the terms page; EUR when there are no rates
  const perEur = rates?.[p.currency as keyof typeof rates];
  const refund = (eur: number) =>
    new Intl.NumberFormat(lang, { style: 'currency', currency: perEur ? p.currency : 'EUR', maximumFractionDigits: 0 })
      .format(perEur ? fromEur(eur, perEur) : eur);
  const [r1, r2, r3] = REFUNDS[app.program];
  const invoice = app.documents.find((d) => d.type === 'invoice');
  const policyLinks = (
    <p className="mt-3 text-[13px] text-muted">
      {t('MY_PAY_POLICY_DETAILS')}{' '}
      <Link href={`/${lang}/terms`} target="_blank" className="text-aah-blue underline underline-offset-2">{t('POLICY_TERMS')}</Link>
      {' · '}
      <Link href={`/${lang}/privacy`} target="_blank" className="text-aah-blue underline underline-offset-2">{t('POLICY_PRIVACY')}</Link>
    </p>
  );

  if (p.status === 'confirmed') {
    return (
      <>
        <StepHeader n={3} title={t('MY_STEP_PAYMENT')} tone="green" chip={t('MY_PAY_CONFIRMED_CHIP')} />
        <div className="mt-5 flex flex-col gap-3 rounded-xl border border-[#CDEBD9] bg-[#EEF8F2] px-4 py-3 text-sm text-[#16643F] sm:flex-row sm:items-center">
          <p className="flex-1"><strong>{t('MY_PAY_CONFIRMED', { date: formatDate(p.confirmedAt!, lang) })}</strong> {t('MY_PAY_INVOICE_SENT')}</p>
          {invoice && (
            <button type="button" onClick={() => openDocument(app.id, invoice.id)}
              className="h-9 rounded-full bg-ink px-4 text-[13px] font-semibold text-white hover:bg-black">
              {t('MY_PAY_DOWNLOAD_INVOICE')}
            </button>
          )}
        </div>
        <Sub>{t('MY_PAY_AMOUNT')}</Sub>
        <MoneyTable items={p.items} currency={p.currency} lang={lang} totalLabel={t('MY_TOTAL')} />
        {policyLinks}
      </>
    );
  }

  return (
    <>
      <StepHeader n={3} title={t('MY_STEP_PAYMENT')} tone="amber" chip={t('MY_PAY_WAITING_CHIP')}
        lead={p.dueDate ? t('MY_PAY_LEAD_DUE', { date: formatDate(p.dueDate, lang) }) : t('MY_PAY_LEAD')} />
      <Sub>{t('MY_PAY_AMOUNT')}</Sub>
      <MoneyTable items={p.items} currency={p.currency} lang={lang} totalLabel={t('MY_TOTAL')} />
      <Sub>{t('MY_PAY_BANK')}</Sub>
      <div className="rounded-[14px] bg-soft px-4 py-1">
        <CopyRow label={t('MY_PAY_HOLDER')} value={bank.accountHolder} />
        <CopyRow label="IBAN" value={bank.iban} />
        <CopyRow label="BIC / SWIFT" value={bank.bic} />
        <CopyRow label={t('MY_PAY_BANK_NAME')} value={bank.bankName} />
        <CopyRow label={t('MY_PAY_REFERENCE')} value={app.id} highlight />
      </div>
      <div className="mt-4">
        <Note tone="warn"><strong>{t('MY_PAY_REFERENCE_NOTE_TITLE', { id: app.id })}</strong> {t('MY_PAY_REFERENCE_NOTE')}</Note>
      </div>
      <Sub>{t('MY_PAY_CANCEL')}</Sub>
      <ul className="ml-5 list-disc space-y-1.5 text-[14px] text-ink-2">
        <li>{t('MY_PAY_CANCEL_1', { amount: refund(r1) })}</li>
        <li>{t('MY_PAY_CANCEL_2', { amount: refund(r2) })}</li>
        <li>{t('MY_PAY_CANCEL_3', { amount: refund(r3) })}</li>
        <li>{t('MY_PAY_CANCEL_4')}</li>
      </ul>
      {policyLinks}
      <div className="mt-6"><Note>{t('MY_PAY_AFTER')}</Note></div>
    </>
  );
}
