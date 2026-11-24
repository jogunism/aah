// 관리자 화면 공통 틀: 남색 왼쪽 메뉴, 위쪽 운영자 표시·로그아웃, 본문
import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from './LogoutButton';

type NavKey = 'dashboard' | 'applicants' | 'inbox' | 'tools';

// href null = not built yet (shown dimmed so the operator sees what is coming)
const NAV: { key: NavKey; label: string; href: string | null; section?: string }[] = [
  { key: 'dashboard', label: '대시보드', href: '/console' },
  { key: 'applicants', label: '신청자', href: null },
  { key: 'inbox', label: '문의 · 구독', href: null, section: '기타 운영' },
  { key: 'tools', label: '학비 · 환율', href: null },
];

export default function ConsoleShell({ active, email, children }: { active: NavKey; email: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-[232px] shrink-0 bg-[#1E2A3A] px-3.5 py-5 text-[#C9D3E0]">
        <p className="flex items-center gap-2 px-2.5 pb-5 text-[17px] font-bold text-white">
          aah<span className="text-[#FF8A8E]">!</span> education
          <span className="rounded-md bg-[#3A4C63] px-1.5 py-0.5 text-[11px] font-semibold text-[#C9D3E0]">운영</span>
        </p>
        <nav className="space-y-0.5">
          {NAV.map((item) => (
            <div key={item.key}>
              {item.section && <p className="px-3 pt-4 pb-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#7F90A6]">{item.section}</p>}
              {item.href ? (
                <Link href={item.href}
                  className={`flex items-center rounded-[9px] px-3 py-2 font-medium ${active === item.key ? 'bg-[#33475F] text-white' : 'hover:bg-[#26364A]'}`}>
                  {item.label}
                </Link>
              ) : (
                <span className="flex items-center justify-between rounded-[9px] px-3 py-2 font-medium text-[#6F8096]">
                  {item.label}<span className="text-[11px]">준비 중</span>
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-[60px] items-center justify-between border-b border-[#E3E7ED] bg-white px-4 md:px-7">
          <p className="font-bold text-[#1E2A3A] md:hidden">aah! 운영</p>
          <span className="hidden md:block" />
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="hidden sm:inline">{email}</span>
            <LogoutButton />
          </div>
        </header>
        <main className="px-4 py-6 md:px-7">{children}</main>
      </div>
    </div>
  );
}
