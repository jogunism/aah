'use client';
// 운영자 로그인 폼: 아이디·비밀번호·인증 앱 코드, 첫 로그인이면 새 비밀번호와 인증 앱 등록

import { useState, type FormEvent } from 'react';
import LangSwitch from './LangSwitch';
import { Label, consolePost, inputClass, primaryClass } from './ui';
import { ct, errorText, type ConsoleLang } from '@/lib/console.i18n';

interface Setup {
  setupToken: string;
  secret: string;
  otpauth: string;
}

const MIN_PASSWORD = 10;

export default function LoginForm({ lang }: { lang: ConsoleLang }) {
  const t = (k: Parameters<typeof ct>[1]) => ct(lang, k);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [setup, setSetup] = useState<Setup | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const done = () => window.location.assign('/console');

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { status, body } = await consolePost('login', { id: id.trim(), password, code: code.trim() || undefined });
    setBusy(false);
    if (status === 200 && body.setup) {
      setSetup(body.setup);
      setCode('');
    } else if (status === 200) done();
    else setError(errorText(lang, body.error));
  };

  const finish = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < MIN_PASSWORD) return setError(t('err_weak_password'));
    if (newPassword !== newPassword2) return setError(t('err_mismatch'));
    setBusy(true);
    const { status, body } = await consolePost('setup', { setupToken: setup!.setupToken, password: newPassword, code: code.trim() });
    setBusy(false);
    if (status === 200) done();
    else {
      if (status === 401) setSetup(null);
      setError(errorText(lang, body.error));
    }
  };

  const err = error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>;
  const codeInput = (required: boolean, placeholder?: string) => (
    <input className={`${inputClass} tracking-[0.3em]`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required={required}
      placeholder={placeholder} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-5 flex items-center justify-between">
          <p className="flex items-center gap-2 text-[17px] font-bold text-[#1E2A3A]">
            aah<span className="text-aah-red">!</span> education
            <span className="rounded-md bg-[#1E2A3A] px-2 py-0.5 text-[11px] font-semibold text-white">{t('brand_tag')}</span>
          </p>
          <LangSwitch lang={lang} label={t('lang')} />
        </div>
        <div className="rounded-[16px] border border-[#DDE2E8] bg-white p-6 shadow-sm">
          {!setup ? (
            <form onSubmit={login} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">{t('login_title')}</h1>
              <Label text={t('id')}>
                <input className={inputClass} name="id" autoComplete="username" autoCapitalize="none" required value={id} onChange={(e) => setId(e.target.value)} />
              </Label>
              <Label text={t('password')}>
                <input className={inputClass} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Label>
              <Label text={t('code')}>{codeInput(false, t('code_ph'))}</Label>
              {err}
              <button className={primaryClass} disabled={busy}>{busy ? t('checking') : t('login_btn')}</button>
            </form>
          ) : (
            <form onSubmit={finish} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">{t('setup_title')}</h1>
              <p className="text-sm text-ink-2">{t('setup_lead')}</p>
              <div className="rounded-[12px] bg-[#E6EEF7] p-4 text-sm text-[#2C4F78]">
                <p className="font-semibold">{t('setup_step1')}</p>
                <p className="mt-1">{t('setup_step1_text')}</p>
                <p className="mt-2 select-all break-all rounded-md bg-white px-3 py-2 font-mono text-[15px] tracking-wider text-ink" data-secret>
                  {setup.secret.match(/.{1,4}/g)!.join(' ')}
                </p>
                <a href={setup.otpauth} className="mt-2 inline-block font-semibold underline">{t('setup_link')}</a>
              </div>
              <Label text={t('setup_step2')}>{codeInput(true)}</Label>
              <Label text={t('setup_step3')}>
                <input className={inputClass} type="password" autoComplete="new-password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Label>
              <Label text={t('new_password_again')}>
                <input className={inputClass} type="password" autoComplete="new-password" required value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
              </Label>
              {err}
              <button className={primaryClass} disabled={busy}>{busy ? t('saving') : t('setup_btn')}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
