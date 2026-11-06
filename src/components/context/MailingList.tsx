'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { Section } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/Button';
import SmoothScrollLink from './SmoothScrollLink';
import { subscribeMailingList } from '@/api/local';
import { trackInfoSessionSignup } from '@/lib/gtag';

const TOPIC_KEYS = [1, 2, 3, 4, 5, 6] as const;

/**
 * Mailing list registration section
 */
export default function MailingList() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await subscribeMailingList(email, i18n.language);
      setIsSuccess(true);
      trackInfoSessionSignup(i18n.language);
    } catch (error) {
      console.error('Subscription error:', error);
      setErrorMessage(t('MAILING_MODAL_ERROR'));
    }
    setIsSubmitting(false);
  };

  return (
    <Section id="final-cta">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center rounded-[28px] md:rounded-[32px] bg-aah-red text-white p-6 sm:p-10 lg:p-16">
        {/* Consultation */}
        <div className="min-w-0">
          <h2 className="text-[28px] md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em]">
            {t('FINAL_TITLE')}
          </h2>
          <p className="mt-4 mb-7 text-[17px] md:text-xl leading-relaxed text-white">{t('FINAL_LEAD')}</p>
          <SmoothScrollLink href="#contactus" className={buttonClass('white')}>
            {t('HERO_CTA_SECONDARY')}
          </SmoothScrollLink>
        </div>

        {/* Free online info sessions */}
        <div className="min-w-0 rounded-2xl bg-black/10 p-5 md:p-6">
          <h3 className="text-lg font-bold">{t('MAILING_MODAL_TITLE')}</h3>
          <p
            className="mt-1.5 text-sm leading-relaxed text-white"
            dangerouslySetInnerHTML={{ __html: t('MAILING_MODAL_DESCRIPTION') }}
          />

          {/* What we'll cover */}
          <p className="mt-4 text-sm font-semibold">{t('MAILING_SECTION_TOPICS_TITLE')}</p>
          <ul className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-white">
            {TOPIC_KEYS.map(n => (
              <li key={n} className="flex items-start gap-2">
                <span aria-hidden="true">•</span>
                <span>{t(`MAILING_SECTION_TOPICS_${n}`)}</span>
              </li>
            ))}
          </ul>

          {/* Form */}
          {isSuccess ? (
            <p className="mt-5 flex items-center gap-2 font-medium">
              <FaCheck aria-hidden="true" />
              {t('MAILING_MODAL_SUCCESS')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('MAILING_MODAL_EMAIL_PLACEHOLDER')}
                aria-label={t('MAILING_MODAL_EMAIL_PLACEHOLDER')}
                className="min-w-0 w-full sm:w-auto sm:flex-1 h-11 px-4 rounded-full bg-white text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                required
              />
              <button type="submit" disabled={isSubmitting} className={buttonClass('dark')}>
                {isSubmitting ? t('MAILING_MODAL_SUBMITTING') : t('MAILING_MODAL_SUBMIT')}
              </button>
            </form>
          )}
          {errorMessage && <p className="mt-3 text-sm text-white">{errorMessage}</p>}
        </div>
      </div>
    </Section>
  );
}
