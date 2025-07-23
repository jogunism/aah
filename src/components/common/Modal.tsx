import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  isParentBlur?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full'; // size 타입에 full 추가
  isScrollAllowed?: boolean; // 스크롤 허용 여부 추가
  position?: 'top' | 'middle' | 'bottom'; // 위치 조정 추가
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
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: 'items-start',
    middle: 'items-start pt-25',
    bottom: 'items-end',
  };

  const backdropClasses = `fixed inset-0 z-[9999] flex justify-center ${positionClasses[position]} ${isParentBlur ? 'backdrop-blur-sm backdrop-brightness-50' : ''}`;

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
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      if (!isScrollAllowed) {
        document.body.classList.add('overflow-hidden'); // 스크롤 막기
      }
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('overflow-hidden'); // 스크롤 허용
    }

    return () => {
      document.body.classList.remove('overflow-hidden'); // 컴포넌트 언마운트 시 스크롤 허용
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isScrollAllowed]);

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
          {title && <h2 className="text-xl font-bold text-gray-700 py-6 px-6">{title}</h2>}
          <div className="max-h-[80vh] overflow-y-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
