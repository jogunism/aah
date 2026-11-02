'use client';

import { MouseEvent, ReactNode } from 'react';
import { smoothScrollToElement } from '@/lib/smoothScroll';

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
    // Scroll to the target itself (below the 60px header); the page no longer ends at the form
    smoothScrollToElement(target, 60);
    if (history.replaceState) history.replaceState(null, '', href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
