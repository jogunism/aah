'use client';
// 내 비밀번호 바꾸기: 지금 비밀번호 확인 후 새 비밀번호 저장 (다른 기기 로그인은 끝남)

import { useState, type FormEvent } from 'react';
import { Label, consolePost, inputClass, primaryClass } from './ui';
import { ct, errorText, type ConsoleLang } from '@/lib/console.i18n';

const MIN_PASSWORD = 10;

export default function PasswordForm({ lang }: { lang: ConsoleLang }) {
  const t = (k: Parameters<typeof ct>[1]) => ct(lang, k);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [next2, setNext2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setDone(false);
    if (next.length < MIN_PASSWORD) return setError(t('err_weak_password'));
    if (next !== next2) return setError(t('err_mismatch'));
    setBusy(true);
    const { status, body } = await consolePost('password', { current, password: next });
    setBusy(false);
    if (status === 200) {
      setDone(true);
      setCurrent('');
      setNext('');
      setNext2('');
    } else if (status === 401) window.location.assign('/console/login');
    else setError(errorText(lang, body.error));
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-muted">{t('pw_lead')}</p>
      <Label text={t('pw_current')}>
        <input className={inputClass} type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
      </Label>
      <Label text={t('pw_new')}>
        <input className={inputClass} type="password" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} />
      </Label>
      <Label text={t('new_password_again')}>
        <input className={inputClass} type="password" autoComplete="new-password" required value={next2} onChange={(e) => setNext2(e.target.value)} />
      </Label>
      {error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>}
      {done && <p role="status" className="rounded-[10px] bg-[#E7F5EE] px-3 py-2.5 text-sm text-[#1F7A4D]">{t('pw_done')}</p>}
      <button className={primaryClass} disabled={busy}>{busy ? t('saving') : t('pw_btn')}</button>
    </form>
  );
}
