'use client';
// 모바일 하단에 고정되는 프로그램/상담 CTA 바

import { useEffect, useState } from 'react';
import ScrollLink from '@/components/common/ScrollLink';
import { buttonClass } from '@/components/ui/Button';

/**
 * Mobile-only bottom bar with the two main actions.
 * Appears after the visitor scrolls past the hero and hides near the contact form.
 */
export default function MobileCtaBar({
  lang,
  programsLabel,
  ctaLabel,
}: {
  lang: string;
  programsLabel: string;
  ctaLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contactus');
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > 480 && !nearContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-[900] bg-white/95 backdrop-blur border-t border-line px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] flex gap-2.5 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      inert={!visible}
    >
      <ScrollLink lang={lang} section="programs" className={buttonClass('outline', 'md', 'flex-1 text-ink')}>
        {programsLabel}
      </ScrollLink>
      <ScrollLink lang={lang} section="contactus" className={buttonClass('primary', 'md', 'flex-1')}>
        {ctaLabel}
      </ScrollLink>
    </div>
  );
}
