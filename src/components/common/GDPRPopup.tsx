'use client';

import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@/lib/cookie';
import { useClientTranslation } from '@/lib/useClientTranslation';

/**
 * Compact cookie notice: a small card in the bottom-left on desktop, a slim bar on mobile.
 * Does not block the page or dim the background.
 */
export default function GDPRPopup() {
  const { t, ready } = useClientTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!getCookie('gdpr_consent')) setIsVisible(true);
  }, []);

  const handleAccept = () => {
    setCookie('gdpr_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible || !ready) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed z-[1100] inset-x-3 bottom-3 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-sm bg-ink/95 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-4"
    >
      <p className="text-xs leading-relaxed text-white/85">{t('COOKIE_TEXT')}</p>
      <button
        type="button"
        onClick={handleAccept}
        className="shrink-0 h-9 px-4 rounded-full bg-white text-ink text-sm font-semibold hover:bg-soft"
      >
        {t('COOKIE_ACCEPT')}
      </button>
    </div>
  );
}
