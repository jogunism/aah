'use client';
// 내부 링크를 누르는 즉시 상단 진행 표시줄을 띄워, 다음 페이지가 준비되는 동안 반응을 보여주는 컴포넌트

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  // Start on a click that leaves the current page (same-site links only)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // in-page anchor
      setActive(true);
    };
    // Capture phase: next/link calls preventDefault() before a bubbling listener would run
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Finish when the new page is shown; give up after a while in any case
  useEffect(() => setActive(false), [pathname]);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(false), 10000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;
  return (
    <div role="progressbar" aria-label="Loading" className="fixed inset-x-0 top-0 z-[2000] h-[3px] overflow-hidden">
      <div className="h-full w-1/3 bg-aah-red animate-[nav-progress_1.1s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:w-full" />
    </div>
  );
}
