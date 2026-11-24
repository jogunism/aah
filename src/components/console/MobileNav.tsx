'use client';
// 휴대폰·태블릿용 관리자 메뉴: 위쪽 메뉴 버튼으로 왼쪽 메뉴를 서랍처럼 열고, 다른 화면으로 가면 닫힘

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileNav({ label, closeLabel, children }: { label: string; closeLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={label} aria-expanded={open}
        className="-ml-1 flex h-10 w-10 items-center justify-center rounded-[9px] text-[#1E2A3A] hover:bg-[#F5F6F8] md:hidden">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label={label}>
          <button type="button" aria-label={closeLabel} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-y-0 left-0 w-[260px] max-w-[85vw] overflow-y-auto bg-[#1E2A3A] px-3.5 py-5 text-[#C9D3E0] shadow-xl">
            <button type="button" onClick={() => setOpen(false)} aria-label={closeLabel}
              className="absolute top-4 right-3 flex h-9 w-9 items-center justify-center rounded-[9px] text-[#C9D3E0] hover:bg-[#26364A]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
