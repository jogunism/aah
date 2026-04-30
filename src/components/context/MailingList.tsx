'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import ParallaxImage from '@common/parallaxImage';
import { subscribeMailingList } from '@/api';

const TOPIC_KEYS = [1, 2, 3, 4, 5, 6] as const;
const STEP_KEYS = [1, 2, 3] as const;

/**
 * Mailing list registration section
 */
export default function MailingList() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await subscribeMailingList(email, i18n.language);
    } catch (error) {
      console.error('Subscription error:', error);
    }

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="mailing-list" imagePath="/assets/image4.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('MAILING_MODAL_TITLE')}
          </h2>
          <div className="text-lg text-gray-800">
            {/* body */}
            <p
              className="mb-10 text-center"
              dangerouslySetInnerHTML={{ __html: t('MAILING_MODAL_DESCRIPTION') }}
            />

            {/* What we'll cover */}
            <div className="mb-10 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {t('MAILING_SECTION_TOPICS_TITLE')}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-base text-gray-700">
                {TOPIC_KEYS.map(n => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="text-aah-red mt-1 text-xl leading-none">•</span>
                    <span>{t(`MAILING_SECTION_TOPICS_${n}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div className="mb-10 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {t('MAILING_SECTION_HOW_TITLE')}
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {STEP_KEYS.map(n => (
                  <div
                    key={n}
                    className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col"
                  >
                    <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-aah-red text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {n}
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed mt-4">
                      {t(`MAILING_SECTION_HOW_${n}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {isSuccess ? (
              <div className="text-center py-4 max-w-md mx-auto">
                <FaCheck className="text-aah-red text-5xl mx-auto mb-4" />
                <p className="text-gray-700 font-medium">
                  {t('MAILING_MODAL_SUCCESS')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('MAILING_MODAL_EMAIL_PLACEHOLDER')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aah-red focus:border-transparent text-gray-700 placeholder:text-gray-400 bg-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-aah-red text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? t('MAILING_MODAL_SUBMITTING') : t('MAILING_MODAL_SUBMIT')}
                </button>
              </form>
            )}
            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
