'use client';
// 운영자 로그인 폼: 아이디·비밀번호(2단계 인증을 켠 사람은 다음 화면에서 앱 코드), 첫 로그인이면 새 비밀번호 정하기

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import LangSwitch from './LangSwitch';
import { Label, consolePost, inputClass, primaryClass } from './ui';
import { ct, errorText, type ConsoleLang } from '@/lib/console.i18n';

const MIN_PASSWORD = 10;

type Step = 'password' | 'code' | 'setup';

export default function LoginForm({ lang }: { lang: ConsoleLang }) {
  const t = (k: Parameters<typeof ct>[1]) => ct(lang, k);
  const [step, setStep] = useState<Step>('password');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [setupToken, setSetupToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const done = () => window.location.assign('/console');

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { status, body } = await consolePost('login', { id: id.trim(), password, code: step === 'code' ? code.trim() : undefined });
    setBusy(false);
    if (status === 200 && body.setup) {
      setSetupToken(body.setup.setupToken);
      setStep('setup');
    } else if (status === 200 && body.needCode) setStep('code');
    else if (status === 200) done();
    else {
      if (status === 423) setStep('password');
      setError(errorText(lang, body.error));
    }
  };

  const finish = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < MIN_PASSWORD) return setError(t('err_weak_password'));
    if (newPassword !== newPassword2) return setError(t('err_mismatch'));
    setBusy(true);
    const { status, body } = await consolePost('setup', { setupToken, password: newPassword });
    setBusy(false);
    if (status === 200) done();
    else {
      if (status === 401) setStep('password');
      setError(errorText(lang, body.error));
    }
  };

  const err = error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-5 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" priority className="h-auto w-[132px]" />
            <span className="rounded-md bg-[#1E2A3A] px-2 py-0.5 text-[11px] font-semibold text-white">{t('brand_tag')}</span>
          </p>
          <LangSwitch lang={lang} label={t('lang')} />
        </div>
        <div className="rounded-[16px] border border-[#DDE2E8] bg-white p-6 shadow-sm">
          {step === 'setup' ? (
            <form onSubmit={finish} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">{t('setup_title')}</h1>
              <p className="text-sm text-ink-2">{t('setup_lead')}</p>
              <Label text={t('pw_new')}>
                <input className={inputClass} type="password" autoComplete="new-password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Label>
              <Label text={t('new_password_again')}>
                <input className={inputClass} type="password" autoComplete="new-password" required value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
              </Label>
              {err}
              <button className={primaryClass} disabled={busy}>{busy ? t('saving') : t('setup_btn')}</button>
            </form>
          ) : (
            <form onSubmit={login} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">{t('login_title')}</h1>
              {step === 'password' ? (
                <>
                  <Label text={t('id')}>
                    <input className={inputClass} name="id" autoComplete="username" autoCapitalize="none" required value={id} onChange={(e) => setId(e.target.value)} />
                  </Label>
                  <Label text={t('password')}>
                    <input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Label>
                </>
              ) : (
                <>
                  <p className="text-sm text-ink-2">{t('code_lead')}</p>
                  <Label text={t('code')}>
                    <input className={`${inputClass} tracking-[0.3em]`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required autoFocus
                      value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
                  </Label>
                </>
              )}
              {err}
              <button className={primaryClass} disabled={busy}>{busy ? t('checking') : t('login_btn')}</button>
              {step === 'code' && (
                <button type="button" className="w-full text-sm text-muted underline" onClick={() => { setStep('password'); setCode(''); setError(null); }}>
                  {t('back')}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
