'use client';

import { MouseEvent, ReactNode } from 'react';
import { smoothScrollTo } from '@/lib/smoothScroll';

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
