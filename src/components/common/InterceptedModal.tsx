'use client';

import React, { useEffect, useRef, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface InterceptedModalProps {
  children: ReactNode;
  title?: string;
  titleKey?: string;
}

const InterceptedModal: React.FC<InterceptedModalProps> = ({ children, title, titleKey }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  const displayTitle = titleKey ? t(titleKey) : title;

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    lockScroll();
    document.addEventListener('keydown', handleEscape);

    return () => {
      unlockScroll();
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const backdropClasses = 'fixed inset-0 z-[999] flex justify-center items-start pt-25 backdrop-blur-sm backdrop-brightness-50';

  return (
    <div
      className={backdropClasses}
      onClick={e => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative bg-translate rounded-lg shadow-xl max-w-5xl w-full"
      >
        <div className="bg-white rounded-lg">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2"
            onClick={onClose}
          >
            &times;
          </button>
          {displayTitle && <h2 className="text-xl font-bold text-gray-700 py-6 px-6 text-left">{displayTitle}</h2>}
          <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InterceptedModal;
