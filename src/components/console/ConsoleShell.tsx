// 관리자 화면 공통 틀: 남색 왼쪽 메뉴(공식 로고, 휴대폰·태블릿은 메뉴 버튼으로 여는 서랍), 위쪽 언어 선택·운영자 표시·로그아웃, 본문
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import LogoutButton from './LogoutButton';
import LangSwitch from './LangSwitch';
import MobileNav from './MobileNav';
import { ct, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import type { Operator } from '@/lib/console.server';

export type NavKey = 'dashboard' | 'applicants' | 'inbox' | 'tools' | 'operators' | 'account';

// href null = not built yet (shown dimmed so the operator sees what is coming)
const NAV: { key: NavKey; label: ConsoleKey; href: string | null; section?: ConsoleKey; superOnly?: boolean }[] = [
  { key: 'dashboard', label: 'nav_dashboard', href: '/console' },
  { key: 'applicants', label: 'nav_applicants', href: '/console/applicants' },
  { key: 'inbox', label: 'nav_inbox', href: null, section: 'nav_other' },
  { key: 'tools', label: 'nav_tools', href: null },
  { key: 'operators', label: 'nav_operators', href: '/console/operators', section: 'nav_settings', superOnly: true },
  { key: 'account', label: 'nav_account', href: '/console/account', section: 'nav_settings' },
];

export default function ConsoleShell({ active, operator, lang, children }: {
  active: NavKey; operator: Operator; lang: ConsoleLang; children: ReactNode;
}) {
  const items = NAV.filter((n) => !n.superOnly || operator.role === 'super');
  const brand = (
    <Link href="/console" className="flex items-center gap-2 px-2.5 pb-5">
      <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" priority className="h-auto w-[132px]" />
      <span className="rounded-md bg-[#3A4C63] px-1.5 py-0.5 text-[11px] font-semibold text-[#C9D3E0]">{ct(lang, 'brand_tag')}</span>
    </Link>
  );
  const nav = (
    <nav className="space-y-0.5">
      {items.map((item, i) => {
        // A section heading shows above the first visible item of that section
        const heading = item.section && items[i - 1]?.section !== item.section ? item.section : null;
        return (
          <div key={item.key}>
            {heading && <p className="px-3 pt-4 pb-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#7F90A6]">{ct(lang, heading)}</p>}
            {item.href ? (
              <Link href={item.href} aria-current={active === item.key ? 'page' : undefined}
                className={`flex items-center rounded-[9px] px-3 py-2.5 font-medium md:py-2 ${active === item.key ? 'bg-[#33475F] text-white' : 'hover:bg-[#26364A]'}`}>
                {ct(lang, item.label)}
              </Link>
            ) : (
              <span className="flex items-center justify-between rounded-[9px] px-3 py-2.5 font-medium text-[#6F8096] md:py-2">
                {ct(lang, item.label)}<span className="text-[11px]">{ct(lang, 'soon')}</span>
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block w-[232px] shrink-0 bg-[#1E2A3A] px-3.5 py-5 text-[#C9D3E0]">
        {brand}
        {nav}
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex h-[60px] items-center justify-between gap-3 border-b border-[#E3E7ED] bg-white px-4 md:px-7">
          <div className="flex items-center gap-1.5 md:hidden">
            <MobileNav label={ct(lang, 'menu')} closeLabel={ct(lang, 'close')}>
              {brand}
              {nav}
            </MobileNav>
            <Link href="/console" aria-label="aah! education">
              <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" className="h-auto w-[104px]" />
            </Link>
          </div>
          <span className="hidden md:block" />
          <div className="flex items-center gap-3 text-sm text-muted">
            <LangSwitch lang={lang} label={ct(lang, 'lang')} />
            <Link href="/console/account" className="hidden sm:inline hover:text-ink">
              {operator.name} <span className="text-xs">({operator.id})</span>
            </Link>
            <LogoutButton label={ct(lang, 'logout')} />
          </div>
        </header>
        <main className="px-4 py-6 md:px-7">{children}</main>
      </div>
    </div>
  );
}
