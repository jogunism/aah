'use client';
// 플랜 견적 링크를 복사하거나 메신저·SNS·메일로 보내는 공유 버튼과 메뉴

import { useEffect, useRef, useState } from 'react';
import { FaShareAlt, FaLink, FaCheck, FaWhatsapp, FaFacebookF, FaEnvelope, FaEllipsisH } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export type ShareMethod = 'copy' | 'whatsapp' | 'facebook' | 'x' | 'email' | 'native';

interface ShareMenuProps {
  url: string;
  title: string; // mail subject / native share title
  text: string; // message sent with the link
  t: (key: string) => string;
  placement?: 'up' | 'down'; // the mobile total bar sits at the bottom, so its menu opens upward
  showLabel?: boolean;
  onShare?: (method: ShareMethod) => void;
}

// navigator.clipboard needs a secure context; fall back to a hidden textarea
const copyText = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
};

export default function ShareMenu({ url, title, text, t, placement = 'down', showLabel = false, onShare }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false); // checked after mount (no SSR mismatch)
  // Touch devices go straight to the device share sheet (it has copy link too); desktops get our menu
  const [directShare, setDirectShare] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const native = typeof navigator.share === 'function';
    setCanNativeShare(native);
    setDirectShare(native && window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const message = `${text}\n${url}`;
  const links: { method: ShareMethod; label: string; href: string; icon: React.ReactNode }[] = [
    {
      method: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(message)}`,
      icon: <FaWhatsapp />,
    },
    {
      method: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <FaFacebookF />,
    },
    {
      method: 'x',
      label: 'X',
      href: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      icon: <FaXTwitter />,
    },
    {
      method: 'email',
      label: t('SHARE_EMAIL'),
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`,
      icon: <FaEnvelope />,
    },
  ];

  const handleCopy = async () => {
    if (await copyText(url)) {
      setCopied(true);
      onShare?.('copy');
    }
  };

  const handleNative = async () => {
    try {
      await navigator.share({ title, text, url });
      onShare?.('native');
      setOpen(false);
    } catch {
      // Cancelled by the user; keep the menu open
    }
  };

  const item = 'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-soft text-left';

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup={directShare ? undefined : 'menu'}
        aria-expanded={directShare ? undefined : open}
        aria-label={t('SHARE_PLAN')}
        onClick={() => (directShare ? handleNative() : setOpen(o => !o))}
        className={`inline-flex items-center justify-center gap-2 rounded-full text-ink-2 hover:text-ink transition-colors ${
          showLabel
            ? 'h-10 px-4 text-sm font-semibold border-[1.5px] border-line bg-white hover:border-ink-2'
            : // icon only: glyph about the height of the mobile total, 44px tap area that
              // negative margins keep from growing the bar
              'w-11 h-11 -my-1.5 -mr-2.5 text-[20px]'
        }`}
      >
        <FaShareAlt aria-hidden="true" />
        {showLabel && <span>{t('SHARE')}</span>}
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute right-0 z-[900] w-56 overflow-hidden rounded-[16px] border border-line bg-white py-1.5 shadow-lg ${
            placement === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <button type="button" role="menuitem" onClick={handleCopy} className={item}>
            <span aria-hidden="true" className="w-4 text-ink-2">{copied ? <FaCheck /> : <FaLink />}</span>
            <span aria-live="polite">{copied ? t('SHARE_COPIED') : t('SHARE_COPY_LINK')}</span>
          </button>
          {/* The device share sheet already lists these apps; show them only where it is missing */}
          {!canNativeShare && links.map(link => (
            <a
              key={link.method}
              role="menuitem"
              href={link.href}
              target={link.method === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              onClick={() => {
                onShare?.(link.method);
                setOpen(false);
              }}
              className={item}
            >
              <span aria-hidden="true" className="w-4 text-ink-2">{link.icon}</span>
              {link.label}
            </a>
          ))}
          {canNativeShare && (
            <button type="button" role="menuitem" onClick={handleNative} className={item}>
              <span aria-hidden="true" className="w-4 text-ink-2"><FaEllipsisH /></span>
              {t('SHARE_MORE')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
