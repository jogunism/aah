'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { cancelSubscription } from '@/api';

export default function UnsubscribePage({ params }: { params: Promise<{ lang: string }> }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    params.then(p => setLang(p.lang));
  }, [params]);

  useEffect(() => {
    if (!lang) return; // lang이 로드될 때까지 대기

    const email = searchParams.get('email');

    if (!email) {
      setStatus('error');
      return;
    }

    const unsubscribe = async () => {
      try {
        await cancelSubscription(email, lang);
        setStatus('success');
      } catch (error) {
        console.error('Unsubscribe error:', error);
        setStatus('error');
      }
    };

    unsubscribe();
  }, [searchParams, lang]);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href={`/${lang || 'en'}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 px-2"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('BACK_TO_MAIN') || 'Back to Main'}
        </Link>
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-12 text-center">
            {status === 'loading' && (
              <div className="text-gray-500">
                <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-aah-red rounded-full mx-auto mb-4"></div>
                <p>{t('UNSUBSCRIBE_LOADING') || 'Processing...'}</p>
              </div>
            )}
            {status === 'success' && (
              <div>
                <FaCheckCircle className="text-aah-red text-5xl mx-auto mb-4" />
                <p className="text-gray-700 font-medium text-lg">
                  {t('UNSUBSCRIBE_SUCCESS')}
                </p>
              </div>
            )}
            {status === 'error' && (
              <div>
                <FaTimesCircle className="text-aah-red text-5xl mx-auto mb-4" />
                <p className="text-gray-700 font-medium text-lg">
                  {t('UNSUBSCRIBE_ERROR')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
