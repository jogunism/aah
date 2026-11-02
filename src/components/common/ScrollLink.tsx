'use client';

import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import { smoothScrollToElement } from '@/lib/smoothScroll';

const HEADER_OFFSET = 64;

/**
 * Link to a home-page section (`/${lang}#id`).
 * If the section is on the current page, scroll there smoothly instead of navigating.
 */
export default function ScrollLink({
  lang,
  section,
  className,
  children,
  onNavigate,
}: {
  lang: string;
  section: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const href = `/${lang}#${section}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    const target = document.getElementById(section);
    if (!target) return; // not on this page → let Next navigate to the home page anchor
    e.preventDefault();
    smoothScrollToElement(target, HEADER_OFFSET, 900);
    history.replaceState?.(null, '', `#${section}`);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
