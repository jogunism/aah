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
    <button type="button" onClick={logout} className="h-8 rounded-full border border-line px-3.5 text-[13px] text-ink-2 hover:bg-soft whitespace-nowrap">
      {label}
    </button>
  );
}
