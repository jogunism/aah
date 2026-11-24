'use client';
// 내 계정의 2단계 인증: 켜기(QR 코드·설정 키 → 앱 코드 확인), 끄기(비밀번호 확인). QR은 브라우저에서 직접 그림(설정 키를 외부로 보내지 않음)

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import { Card, Label, buttonClass, consolePost, inputClass, primaryClass } from './ui';
import { ct, errorText, type ConsoleLang } from '@/lib/console.i18n';

export default function TwoStepCard({ lang, enabled }: { lang: ConsoleLang; enabled: boolean }) {
  const t = (k: Parameters<typeof ct>[1]) => ct(lang, k);
  const router = useRouter();
  const [pending, setPending] = useState<{ secret: string; otpauth: string; qr: string } | null>(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [turningOff, setTurningOff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const call = async (path: string, body: unknown) => {
    setError(null);
    setNotice(null);
    setBusy(true);
    const res = await consolePost(path, body);
    setBusy(false);
    if (res.status === 401) window.location.assign('/console/login');
    else if (res.status !== 200) setError(errorText(lang, res.body.error));
    return res;
  };

  const start = async () => {
    const { status, body } = await call('totp/start', {});
    if (status !== 200) return;
    const qr = await QRCode.toDataURL(body.otpauth, { margin: 1, width: 200, errorCorrectionLevel: 'M' });
    setPending({ secret: body.secret, otpauth: body.otpauth, qr });
    setCode('');
  };

  const confirm = async (e: FormEvent) => {
    e.preventDefault();
    if ((await call('totp/confirm', { code: code.trim() })).status === 200) {
      setPending(null);
      setNotice(t('totp_on_done'));
      router.refresh();
    }
  };

  const turnOff = async (e: FormEvent) => {
    e.preventDefault();
    if ((await call('totp/disable', { password })).status === 200) {
      setTurningOff(false);
      setPassword('');
      setNotice(t('totp_off_done'));
      router.refresh();
    }
  };

  const badge = enabled
    ? <span className="rounded-full bg-[#E7F5EE] px-2 py-0.5 text-xs font-semibold text-[#1F7A4D]">{t('totp_state_on')}</span>
    : <span className="rounded-full bg-[#EEF0F3] px-2 py-0.5 text-xs font-semibold text-[#555]">{t('totp_state_off')}</span>;

  return (
    <Card title={t('totp_title')} aside={badge}>
      <div className="space-y-4">
        <p className="text-sm text-muted">{t('totp_lead')}</p>
        {notice && <p role="status" className="rounded-[10px] bg-[#E7F5EE] px-3 py-2.5 text-sm text-[#1F7A4D]">{notice}</p>}
        {error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>}

        {!enabled && !pending && (
          <button type="button" className={primaryClass} disabled={busy} onClick={start}>{t('totp_turn_on')}</button>
        )}

        {pending && (
          <form onSubmit={confirm} className="space-y-4">
            <div className="rounded-[12px] bg-[#E6EEF7] p-4 text-sm text-[#2C4F78]">
              <p className="font-semibold">{t('totp_step1')}</p>
              <p className="mt-1">{t('totp_step1_text')}</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- data URL drawn in the browser */}
              <img src={pending.qr} alt={t('totp_qr_alt')} width={200} height={200} className="mx-auto mt-3 rounded-md bg-white p-2" data-qr />
              <p className="mt-3">{t('totp_key_text')}</p>
              <p className="mt-1 select-all break-all rounded-md bg-white px-3 py-2 font-mono text-[15px] tracking-wider text-ink" data-secret>
                {pending.secret.match(/.{1,4}/g)!.join(' ')}
              </p>
              <a href={pending.otpauth} className="mt-2 inline-block font-semibold underline">{t('setup_link')}</a>
            </div>
            <Label text={t('totp_step2')}>
              <input className={`${inputClass} tracking-[0.3em]`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required
                value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
            </Label>
            <div className="flex gap-2">
              <button className={primaryClass} disabled={busy}>{t('totp_confirm')}</button>
              <button type="button" className={buttonClass} onClick={() => setPending(null)}>{t('cancel')}</button>
            </div>
          </form>
        )}

        {enabled && !turningOff && (
          <button type="button" className={buttonClass} onClick={() => setTurningOff(true)}>{t('totp_turn_off')}</button>
        )}
        {enabled && turningOff && (
          <form onSubmit={turnOff} className="space-y-3">
            <Label text={t('pw_current')}>
              <input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Label>
            <div className="flex gap-2">
              <button className={`${buttonClass} border-[#F2C7C3] text-[#B3261E]`} disabled={busy}>{t('totp_turn_off')}</button>
              <button type="button" className={buttonClass} onClick={() => setTurningOff(false)}>{t('cancel')}</button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}
