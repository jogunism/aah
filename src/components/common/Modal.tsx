import React, { useEffect, useRef } from 'react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  isParentBlur?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  isScrollAllowed?: boolean;
  position?: 'top' | 'middle' | 'bottom';
  lockBodyScroll?: boolean; // 새로운 prop 추가
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  isParentBlur = true,
  size = 'sm',
  isScrollAllowed = false,
  position = 'middle',
  lockBodyScroll = true, // 기본값 true로 설정
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: 'items-start',
    middle: 'items-start pt-25',
    bottom: 'items-end',
  };

  const backdropClasses = `fixed inset-0 z-[999] flex justify-center ${positionClasses[position]} ${isParentBlur ? 'backdrop-blur-sm backdrop-brightness-50' : ''}`;

  // size prop에 따른 max-w-* 클래스 매핑
  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'md:max-w-3xl',
    lg: 'max-w-5xl',
    full: 'w-screen rounded-none shadow-none',
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && onClose) {
          onClose();
        }
      };

      if (lockBodyScroll) { // lockBodyScroll prop에 따라 스크롤 잠금
        lockScroll();
      }
      document.addEventListener('keydown', handleEscape);

      // This cleanup function will be called when the modal is closed or unmounted.
      return () => {
        if (lockBodyScroll) { // lockBodyScroll prop에 따라 스크롤 잠금 해제
          unlockScroll();
        }
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose, lockBodyScroll]); // 의존성 배열에 lockBodyScroll 추가

  /*******************************************************
   * render
   */
  if (!isOpen) return null;

  return (
    <div
      className={backdropClasses}
      onClick={e => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`relative bg-translate rounded-lg shadow-xl ${sizeClasses[size]} w-full`}
      >
        <div className="bg-white rounded-lg">
          {onClose && (
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl px-2 "
              onClick={onClose}
            >
              &times;
            </button>
          )}
          {title && <h2 className="text-xl font-bold text-gray-700 py-6 px-6 text-left">{title}</h2>}
          <div className={`${isScrollAllowed ? '' : 'max-h-[80vh] overflow-y-auto'}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
