'use client';

import { MouseEvent, ReactNode } from 'react';

const DURATION = 1200;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const smoothScrollTo = (targetY: number, duration = DURATION) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function SmoothScrollLink({ href, className, children }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const targetY = document.documentElement.scrollHeight - window.innerHeight;
    smoothScrollTo(targetY);
    if (history.replaceState) history.replaceState(null, '', href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
