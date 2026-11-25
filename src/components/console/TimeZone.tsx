'use client';
// 관리자 화면 시간대: 화면의 모든 시각을 운영자가 고른 시간대로 보여 주고, 처음 들어오면 기기(브라우저) 시간대를 저장

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_TIME_ZONE } from '@/lib/console.i18n';
import { consolePost } from './ui';

const ZoneContext = createContext(DEFAULT_TIME_ZONE);

export const useTimeZone = () => useContext(ZoneContext);

export const browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
};

export default function TimeZoneProvider({ zone, saved, children }: { zone: string; saved: boolean; children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (saved) return;
    const detected = browserTimeZone();
    if (!detected) return;
    consolePost('settings', { timeZone: detected }).then(({ status }) => {
      if (status === 200) router.refresh();
    });
  }, [saved, router]);
  return <ZoneContext.Provider value={zone}>{children}</ZoneContext.Provider>;
}
