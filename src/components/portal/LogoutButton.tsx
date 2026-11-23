'use client';
// 로그아웃: 세션 쿠키를 지우고 로그인 화면으로

import { useRouter } from 'next/navigation';

export default function LogoutButton({ lang, label }: { lang: string; label: string }) {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/my/logout', { method: 'POST', body: '{}', headers: { 'Content-Type': 'application/json' } });
    router.replace(`/${lang}/my/login`);
    router.refresh();
  };
  return (
    <button type="button" onClick={logout} aria-label={label}
      className="flex h-8 w-8 sm:w-auto shrink-0 items-center justify-center rounded-full border border-line sm:px-3.5 text-[13px] text-ink-2 hover:bg-soft whitespace-nowrap">
      {/* Phones: icon only */}
      <svg aria-hidden="true" className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 16l-4-4 4-4M6 12h10" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
