'use client';
// 헤더 메뉴·상담 버튼·모바일 메뉴를 담당하는 클라이언트 컴포넌트

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ScrollLink from '@/components/common/ScrollLink';
import { buttonClass } from '@/components/ui/Button';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import LanguageSelector from './languageSelector';
import CurrencySelector from './CurrencySelector';

export type NavItem = { section: string; label: string };

export default function HeaderNav({
  lang,
  items,
  ctaLabel,
  menuOpenLabel,
  menuCloseLabel,
  languageLabel,
  currencyLabel,
}: {
  lang: string;
  items: NavItem[];
  ctaLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  languageLabel: string;
  currencyLabel: string;
}) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    lockScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
    };
  }, [open]);

  return (
    <>
      {/* Desktop menu */}
      <nav aria-label="Main" className="hidden lg:block ml-6">
        <ul className="flex items-center gap-7 text-sm text-ink-2">
          {items.map((it) => (
            <li key={it.section}>
              <ScrollLink lang={lang} section={it.section} className="hover:text-ink transition-colors">
                {it.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2">
          <CurrencySelector lang={lang} />
          <LanguageSelector currentLang={lang} />
        </div>
        <ScrollLink lang={lang} section="contactus" className={buttonClass('primary', 'sm', 'ml-1')}>
          {ctaLabel}
        </ScrollLink>
        <button
          type="button"
          className="lg:hidden ml-1 -mr-2 w-10 h-10 inline-flex items-center justify-center rounded-full text-ink hover:bg-soft"
          aria-label={open ? menuCloseLabel : menuOpenLabel}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel. Rendered into <body>: the header's backdrop-filter would otherwise
          become the containing block of this fixed panel and squeeze it to the header's height. */}
      {open && createPortal(
        <div id="mobile-menu" className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-white z-[999] overflow-y-auto">
          <nav aria-label="Main" className="px-5 pt-4 pb-10">
            <ul className="divide-y divide-line">
              {items.map((it) => (
                <li key={it.section}>
                  <ScrollLink
                    lang={lang}
                    section={it.section}
                    className="block py-4 text-2xl font-bold tracking-tight text-ink"
                    onNavigate={() => setOpen(false)}
                  >
                    {it.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-muted">
              <div>
                <p className="mb-2">{languageLabel}</p>
                <LanguageSelector currentLang={lang} />
              </div>
              <div>
                <p className="mb-2">{currencyLabel}</p>
                <CurrencySelector lang={lang} />
              </div>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  );
}
