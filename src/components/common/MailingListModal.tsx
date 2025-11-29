'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import { getCookie, setCookie } from '@/lib/cookie';
import { subscribeMailingList } from '@/api';

export default function MailingListModal() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [dontShowFor24h, setDontShowFor24h] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // GDPR 동의 여부 확인
    const gdprConsent = getCookie('gdpr_consent');
    if (!gdprConsent) {
      return; // GDPR 동의 안했으면 표시 안함
    }

    // 24시간 내 닫기 여부 확인
    const dismissedUntil = getCookie('mailing_modal_dismissed');
    if (dismissedUntil) {
      const dismissedTime = parseInt(dismissedUntil, 10);
      if (Date.now() < dismissedTime) {
        return; // 아직 24시간 안 지났으면 표시 안함
      }
    }

    // 이미 구독한 경우 표시 안함
    const subscribed = getCookie('mailing_subscribed');
    if (subscribed) {
      return;
    }

    // 페이지 80% 정도 스크롤했을 때 모달 표시
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // 80% 이상 스크롤하면 모달 표시
      if (scrollPercent >= 80) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    if (dontShowFor24h) {
      // 24시간 후 timestamp 저장
      const dismissUntil = Date.now() + 24 * 60 * 60 * 1000;
      setCookie('mailing_modal_dismissed', dismissUntil.toString());
    }
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

    // 성공/실패 상관없이 구독 완료 처리 (사용자 경험 위해)
    setCookie('mailing_subscribed', 'true');
    setIsSuccess(true);
    setIsSubmitting(false);

    // 2초 후 모달 닫기
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
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

        {/* 24시간 동안 보지 않기 */}
        {!isSuccess && (
          <div className="px-6 pb-6">
            <label className="flex items-center justify-center text-sm text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowFor24h}
                onChange={e => setDontShowFor24h(e.target.checked)}
                className="mr-2 w-4 h-4 accent-aah-red"
              />
              {t('MAILING_MODAL_DONT_SHOW_24H')}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
