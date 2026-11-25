'use client';
// 내 계정의 화면 설정: 화면 언어(한국어·일본어)와 시간대(처음엔 이 기기 시간대, 바꾸면 관리자 화면 모든 시각에 적용)

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LangSwitch from './LangSwitch';
import { Card, Label, buttonClass, consolePost, inputClass } from './ui';
import { browserTimeZone } from './TimeZone';
import { ct, consoleTime, errorText, type ConsoleLang } from '@/lib/console.i18n';

export interface ZoneOption { id: string; label: string }

export default function SettingsCard({ lang, zone, common, all }: {
  lang: ConsoleLang; zone: string; common: ZoneOption[]; all: ZoneOption[];
}) {
  const t = (k: Parameters<typeof ct>[1], v?: Record<string, string>) => ct(lang, k, v);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  // Read after mounting: the server renders in its own zone
  const [device, setDevice] = useState<string | null>(null);
  useEffect(() => setDevice(browserTimeZone()), []);

  const saveZone = async (next: string) => {
    if (next === zone) return;
    setBusy(true);
    setMsg(null);
    const { status, body } = await consolePost('settings', { timeZone: next });
    setBusy(false);
    if (status === 401) return window.location.assign('/console/login');
    if (status !== 200) return setMsg({ ok: false, text: errorText(lang, body.error) });
    setMsg({ ok: true, text: t('settings_saved') });
    router.refresh();
  };

  return (
    <Card title={t('settings_title')}>
      <div className="space-y-5">
        <div>
          <p className="mb-1.5 text-sm font-semibold text-ink">{t('settings_lang')}</p>
          <div className="inline-block"><LangSwitch lang={lang} label={t('settings_lang')} save /></div>
        </div>
        <Label text={t('settings_tz')} hint={t('settings_tz_lead')}>
          <select className={inputClass} value={zone} disabled={busy} onChange={(e) => saveZone(e.target.value)}>
            <optgroup label={t('settings_tz_common')}>
              {common.map((z) => <option key={`c-${z.id}`} value={z.id}>{z.label}</option>)}
            </optgroup>
            <optgroup label={t('settings_tz_all')}>
              {all.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
            </optgroup>
          </select>
        </Label>
        <p className="text-sm text-muted" suppressHydrationWarning>{t('settings_tz_now', { t: consoleTime(lang, new Date().toISOString(), zone) })}</p>
        {device && device !== zone && (
          <button type="button" className={buttonClass} disabled={busy} onClick={() => saveZone(device)}>
            {t('settings_tz_device', { z: device })}
          </button>
        )}
        {msg && (
          <p role={msg.ok ? 'status' : 'alert'} className={`rounded-[10px] px-3 py-2.5 text-sm ${msg.ok ? 'bg-[#E7F5EE] text-[#1F7A4D]' : 'bg-[#FDECEA] text-[#B3261E]'}`}>{msg.text}</p>
        )}
      </div>
    </Card>
  );
}
