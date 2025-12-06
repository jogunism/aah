'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';
import { getCookie } from '@/lib/cookie';
import { subscribeMailingList } from '@/api';
import { trackMailingToastClick } from '@/lib/gtag';

export default function MailingListModal() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toastShownRef = useRef(false);

  useEffect(() => {
    // GDPR 동의 여부 확인
    const gdprConsent = getCookie('gdpr_consent');
    if (!gdprConsent) {
      return;
    }

    // 페이지 80% 정도 스크롤했을 때 토스트 표시
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // 80% 이상 스크롤하면 토스트 표시
      if (scrollPercent >= 80 && !toastShownRef.current) {
        toastShownRef.current = true;
        window.removeEventListener('scroll', handleScroll);

        toast(
          <div
            onClick={() => {
              trackMailingToastClick();
              setIsVisible(true);
              toast.dismiss();
            }}
            className="cursor-pointer"
          >
            <span className="font-semibold">{t('MAILING_TOAST_MESSAGE')}</span>
            <br />
            <span className="underline">{t('MAILING_TOAST_CLICK')}</span>
          </div>,
          {
            autoClose: 10000,
            closeOnClick: false,
            style: {
              background: '#D8484D',
              color: 'white',
            },
          }
        );
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [t]);

  const handleClose = () => {
    setIsVisible(false);
  };

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

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* 헤더 배경 */}
        <div className="bg-aah-red px-6 py-4 text-white text-center">
          <h2 className="text-xl font-bold">
            {t('MAILING_MODAL_TITLE')}
          </h2>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          &times;
        </button>

        {/* 본문 */}
        <div className="px-6 py-6">
          {isSuccess ? (
            <div className="text-center py-4">
              <FaCheck className="text-aah-red text-5xl mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                {t('MAILING_MODAL_SUCCESS')}
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-gray-600 text-center mb-6"
                dangerouslySetInnerHTML={{ __html: t('MAILING_MODAL_DESCRIPTION') }}
              />

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('MAILING_MODAL_EMAIL_PLACEHOLDER')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aah-red focus:border-transparent text-gray-500 placeholder:text-gray-400"
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
            </>
          )}
        </div>

      </div>
    </div>
  );
}
