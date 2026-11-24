'use client';
// 운영자 로그인 폼: 이메일·비밀번호·인증 앱 코드, 첫 로그인이면 새 비밀번호와 인증 앱 등록

import { useState, type FormEvent, type ReactNode } from 'react';

const post = async (path: string, body: unknown) => {
  const res = await fetch(`/api/console/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
};

const input =
  'w-full rounded-[10px] border border-[#D5DBE3] bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-[#2C4F78] focus:ring-3 focus:ring-[#2C4F78]/15';
const primary =
  'w-full rounded-[10px] bg-[#2C4F78] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#24425F] disabled:opacity-50';

function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-muted">{text}</span>
      {children}
    </label>
  );
}

interface Setup {
  setupToken: string;
  secret: string;
  otpauth: string;
}

const MIN_PASSWORD = 10;

export default function LoginForm() {
  const [email, setEmail] = useState('');
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
    const { status, body } = await post('login', { email: email.trim(), password, code: code.trim() || undefined });
    setBusy(false);
    if (status === 200 && body.setup) {
      setSetup(body.setup);
      setCode('');
    } else if (status === 200) done();
    else if (status === 423) setError('로그인을 여러 번 틀려 15분 동안 잠겼습니다. 잠시 뒤에 다시 해 주세요.');
    else if (status === 401 || status === 400) setError(body.message ?? '이메일, 비밀번호 또는 인증 코드가 맞지 않습니다.');
    else setError('서버에 연결하지 못했습니다. 잠시 뒤에 다시 해 주세요.');
  };

  const finish = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < MIN_PASSWORD) return setError(`새 비밀번호는 ${MIN_PASSWORD}자 이상이어야 합니다.`);
    if (newPassword !== newPassword2) return setError('새 비밀번호 두 칸이 서로 다릅니다.');
    setBusy(true);
    const { status, body } = await post('setup', { setupToken: setup!.setupToken, password: newPassword, code: code.trim() });
    setBusy(false);
    if (status === 200) done();
    else if (status === 401) {
      setSetup(null);
      setError(body.message ?? '설정 시간이 지났습니다. 처음부터 다시 로그인해 주세요.');
    } else setError(body.message ?? '서버에 연결하지 못했습니다. 잠시 뒤에 다시 해 주세요.');
  };

  const err = error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <p className="mb-5 flex items-center gap-2 text-[17px] font-bold text-[#1E2A3A]">
          aah<span className="text-aah-red">!</span> education
          <span className="rounded-md bg-[#1E2A3A] px-2 py-0.5 text-[11px] font-semibold text-white">운영</span>
        </p>
        <div className="rounded-[16px] border border-[#DDE2E8] bg-white p-6 shadow-sm">
          {!setup ? (
            <form onSubmit={login} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">운영자 로그인</h1>
              <Label text="이메일">
                <input className={input} type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Label>
              <Label text="비밀번호">
                <input className={input} type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Label>
              <Label text="인증 앱 코드 (6자리)">
                <input className={`${input} tracking-[0.3em]`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="처음 로그인이면 비워 두세요"
                  value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
              </Label>
              {err}
              <button className={primary} disabled={busy}>{busy ? '확인 중…' : '로그인'}</button>
            </form>
          ) : (
            <form onSubmit={finish} className="space-y-4">
              <h1 className="text-[21px] font-bold text-[#1E2A3A]">처음 로그인 설정</h1>
              <p className="text-sm text-ink-2">새 비밀번호를 정하고, 휴대폰 인증 앱(Google Authenticator, Microsoft Authenticator, 1Password 등)을 등록해 주세요. 다음부터는 로그인할 때 앱에 보이는 6자리 코드를 함께 넣습니다.</p>
              <div className="rounded-[12px] bg-[#E6EEF7] p-4 text-sm text-[#2C4F78]">
                <p className="font-semibold">1. 인증 앱에 등록하기</p>
                <p className="mt-1">앱에서 &quot;설정 키 입력&quot;을 고르고 아래 키를 넣어 주세요. 계정 이름은 aah! 운영으로 하면 됩니다.</p>
                <p className="mt-2 select-all break-all rounded-md bg-white px-3 py-2 font-mono text-[15px] tracking-wider text-ink">
                  {setup.secret.match(/.{1,4}/g)!.join(' ')}
                </p>
                <a href={setup.otpauth} className="mt-2 inline-block font-semibold underline">휴대폰에서 보고 있다면 여기를 눌러 앱으로 바로 등록</a>
              </div>
              <Label text="2. 앱에 보이는 6자리 코드">
                <input className={`${input} tracking-[0.3em]`} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required
                  value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
              </Label>
              <Label text={`3. 새 비밀번호 (${MIN_PASSWORD}자 이상)`}>
                <input className={input} type="password" autoComplete="new-password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Label>
              <Label text="새 비밀번호 한 번 더">
                <input className={input} type="password" autoComplete="new-password" required value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
              </Label>
              {err}
              <button className={primary} disabled={busy}>{busy ? '저장 중…' : '설정 마치고 들어가기'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
