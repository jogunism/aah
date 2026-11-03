'use client';
// 페이지 섹션별 체류 시간과 링크·버튼 클릭(어느 섹션에서 눌렀는지)을 GA로 보내는 추적 컴포넌트

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackSectionEngagement, trackUiClick } from '@/lib/gtag';

// Sections to measure: page-level <section id> blocks plus the programs block and contact form (divs)
const SECTION_SELECTOR = 'main section[id], main #programs, main #contactus';
const MIN_SECONDS = 1; // ignore sections that only flashed by while scrolling

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Section dwell time for the current page
  useEffect(() => {
    const visibleSince = new Map<string, number>();
    const total = new Map<string, number>();

    const stop = (id: string) => {
      const since = visibleSince.get(id);
      if (since === undefined) return;
      total.set(id, (total.get(id) ?? 0) + (Date.now() - since));
      visibleSince.delete(id);
    };

    // A section counts as viewed while it fills at least half of the screen
    // (or half of itself, for sections shorter than that)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          const needed = Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.5;
          const visible = entry.isIntersecting && entry.intersectionRect.height >= needed;
          if (visible && !visibleSince.has(id) && document.visibilityState === 'visible') {
            visibleSince.set(id, Date.now());
          } else if (!visible) {
            stop(id);
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    // Sections render on the client too; observe once the new page is in the DOM
    const timer = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((el) => observer.observe(el));
    }, 300);

    const flush = () => {
      [...visibleSince.keys()].forEach(stop);
      total.forEach((ms, id) => {
        const seconds = Math.round(ms / 1000);
        if (seconds >= MIN_SECONDS) trackSectionEngagement(id, seconds, pathname);
      });
      total.clear();
    };

    // Pause while the tab is hidden; send when the page is left or hidden
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
      flush(); // navigating to another page inside the site
    };
  }, [pathname]);

  // Clicks on links and buttons
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest('a, button');
      if (!el) return;
      // Card links: use the card title rather than the whole card text
      const label = el.getAttribute('aria-label') || el.querySelector('h2, h3, h4, .font-bold')?.textContent || el.textContent || '';
      const text = label.replace(/\s+/g, ' ').trim().slice(0, 80);
      const section =
        el.closest(SECTION_SELECTOR)?.id ??
        (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : el.closest('#mobile-menu') ? 'mobile-menu' : 'other');
      const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') : null;
      trackUiClick(text || '(no text)', section, href, location.pathname);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
