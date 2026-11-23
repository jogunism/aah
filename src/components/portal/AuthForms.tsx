'use client';
// 포털 계정 폼: 로그인, 처음 비밀번호 설정·비밀번호 찾기, 재설정(메일 링크), 비밀번호 변경

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, inputClass } from './fields';

const post = async (path: string, body: unknown) => {
  const res = await fetch(`/api/my/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
};

function Shell({ title, lead, children, footer }: { title: string; lead?: string; children: ReactNode; footer?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-[420px] mx-auto px-5 pt-12 pb-20">
      <p className="text-xs font-semibold tracking-[0.08em] uppercase text-aah-red">{t('MY_TITLE')}</p>
      <h1 className="mt-1 text-[30px] font-bold tracking-[-0.02em] text-ink">{title}</h1>
      {lead && <p className="mt-2 text-sm text-muted">{lead}</p>}
      <div className="mt-6 rounded-[18px] border border-line p-6">{children}</div>
      {footer && <p className="mt-5 text-center text-sm text-muted">{footer}</p>}
    </div>
  );
}

const MIN_PASSWORD = 10;

export function LoginForm({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { status, body } = await post('login', { email: email.trim(), password });
    setBusy(false);
    if (status === 200) {
      // First visit lands in the language of the billing country; the selector can change it.
      // Full load: the client translations switch language only on a fresh page
      window.location.assign(`/${body.lang ?? lang}/my`);
    } else if (status === 423) setError(t('MY_LOGIN_LOCKED'));
    else if (status === 401 || status === 400) setError(t('MY_LOGIN_WRONG'));
    else setError(t('APPLY_ERR_SERVER'));
  };

  return (
    <Shell
      title={t('MY_LOGIN_TITLE')}
      lead={t('MY_LOGIN_LEAD')}
      footer={
        <>
          {t('MY_LOGIN_NOT_APPLIED')}{' '}
          <Link href={`/${lang}/apply`} className="text-aah-blue underline underline-offset-2">{t('MY_LOGIN_APPLY')}</Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field id="email" label={t('APPLY_EMAIL')}>
          <input id="email" type="email" autoComplete="username" required className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field id="password" label={t('MY_PASSWORD')}>
          <input id="password" type="password" autoComplete="current-password" required className={inputClass()} value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <div className="text-right text-[13px]">
          <Link href={`/${lang}/my/forgot`} className="text-aah-blue underline underline-offset-2">{t('MY_FORGOT_LINK')}</Link>
        </div>
        {error && <Note tone="alert">{error}</Note>}
        <button type="submit" disabled={busy} className={buttonClass('dark', 'md', 'w-full')}>{t('MY_LOGIN_SUBMIT')}</button>
      </form>
      {/* Accounts start without a password: the applicant sets it by email link */}
      <div className="mt-5 border-t border-line pt-4 text-sm">
        <p className="font-semibold text-ink">{t('MY_LOGIN_FIRST_TITLE')}</p>
        <p className="mt-1 text-muted">{t('MY_LOGIN_FIRST_BODY')}</p>
        <Link href={`/${lang}/my/forgot?first=1`} className={buttonClass('outline', 'sm', 'mt-3 text-ink')}>{t('MY_LOGIN_FIRST_BUTTON')}</Link>
      </div>
    </Shell>
  );
}

export function ForgotForm({ lang, first }: { lang: string; first: boolean }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { status } = await post('forgot', { email: email.trim(), lang });
    if (status === 200) setSent(true);
    else setError(t(status === 400 ? 'APPLY_ERR_EMAIL' : 'APPLY_ERR_SERVER'));
  };

  return (
    <Shell title={t(first ? 'MY_FIRST_TITLE' : 'MY_FORGOT_TITLE')} lead={t(first ? 'MY_FIRST_LEAD' : 'MY_FORGOT_LEAD')}
      footer={<Link href={`/${lang}/my/login`} className="text-aah-blue underline underline-offset-2">{t('MY_BACK_TO_LOGIN')}</Link>}>
      {sent ? (
        <Note tone="success">{t('MY_FORGOT_SENT', { email: email.trim() })}</Note>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field id="email" label={t('APPLY_EMAIL')}>
            <input id="email" type="email" autoComplete="email" required className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          {error && <Note tone="alert">{error}</Note>}
          <button type="submit" className={buttonClass('dark', 'md', 'w-full')}>{t('MY_FORGOT_SUBMIT')}</button>
        </form>
      )}
    </Shell>
  );
}

/** New password + repeat; used by reset and change */
function NewPasswordFields({ password, repeat, setPassword, setRepeat }: {
  password: string; repeat: string; setPassword: (v: string) => void; setRepeat: (v: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      <Field id="newPassword" label={t('MY_NEW_PASSWORD')} hint={t('MY_PASSWORD_RULE', { n: MIN_PASSWORD })}>
        <input id="newPassword" type="password" autoComplete="new-password" required minLength={MIN_PASSWORD} className={inputClass()}
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      <Field id="repeatPassword" label={t('MY_REPEAT_PASSWORD')}>
        <input id="repeatPassword" type="password" autoComplete="new-password" required className={inputClass()}
          value={repeat} onChange={(e) => setRepeat(e.target.value)} />
      </Field>
    </>
  );
}

const passwordProblem = (password: string, repeat: string) =>
  password.length < MIN_PASSWORD ? 'MY_PASSWORD_TOO_SHORT' : password !== repeat ? 'MY_PASSWORD_MISMATCH' : null;

export function ResetForm({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const query = useSearchParams();
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);
  const first = query.get('first') === '1'; // link from the confirmation mail / "first time" form

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const problem = passwordProblem(password, repeat);
    if (problem) return setError(t(problem, { n: MIN_PASSWORD }));
    const { status, body } = await post('reset', { email: query.get('email'), token: query.get('token'), password });
    if (status === 200) window.location.assign(`/${body.lang ?? lang}/my`);
    else setError(t(status === 400 ? 'MY_RESET_INVALID' : 'APPLY_ERR_SERVER'));
  };

  return (
    <Shell title={t(first ? 'MY_FIRST_SET_TITLE' : 'MY_RESET_TITLE')} lead={first ? t('MY_FIRST_SET_LEAD') : undefined}
      footer={<Link href={`/${lang}/my/forgot${first ? '?first=1' : ''}`} className="text-aah-blue underline underline-offset-2">{t('MY_RESET_NEW_LINK')}</Link>}>
      <form onSubmit={submit} className="space-y-4">
        <NewPasswordFields password={password} repeat={repeat} setPassword={setPassword} setRepeat={setRepeat} />
        {error && <Note tone="alert">{error}</Note>}
        <button type="submit" className={buttonClass('dark', 'md', 'w-full')}>{t(first ? 'MY_FIRST_SET_SUBMIT' : 'MY_RESET_SUBMIT')}</button>
      </form>
    </Shell>
  );
}

export function PasswordForm({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const problem = passwordProblem(password, repeat);
    if (problem) return setError(t(problem, { n: MIN_PASSWORD }));
    const { status } = await post('password', { current, password });
    if (status === 200) {
      router.replace(`/${lang}/my?password=changed`);
      router.refresh();
    } else setError(t(status === 403 ? 'MY_CURRENT_WRONG' : 'APPLY_ERR_SERVER'));
  };

  return (
    <Shell title={t('MY_CHANGE_PASSWORD')}
      footer={<Link href={`/${lang}/my`} className="text-aah-blue underline underline-offset-2">{t('MY_BACK')}</Link>}>
      <form onSubmit={submit} className="space-y-4">
        <Field id="currentPassword" label={t('MY_CURRENT_PASSWORD')}>
          <input id="currentPassword" type="password" autoComplete="current-password" required className={inputClass()}
            value={current} onChange={(e) => setCurrent(e.target.value)} />
        </Field>
        <NewPasswordFields password={password} repeat={repeat} setPassword={setPassword} setRepeat={setRepeat} />
        {error && <Note tone="alert">{error}</Note>}
        <button type="submit" className={buttonClass('dark', 'md', 'w-full')}>{t('MY_CHANGE_PASSWORD')}</button>
      </form>
    </Shell>
  );
}
