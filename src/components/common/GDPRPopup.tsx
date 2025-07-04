'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Modal from './Modal'; // Modal 컴포넌트 임포트

export default function GDPRPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 쿠키를 확인하여 팝업을 표시할지 결정합니다.
    const consent = Cookies.get('gdpr_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // 쿠키를 설정하고 팝업을 숨깁니다.
    Cookies.set('gdpr_consent', 'true', { expires: 365 });
    setIsVisible(false);
  };

  return (
    <Modal
      isOpen={isVisible}
      isParentBlur={false}
      isScrollAllowed={true}
      position="bottom"
      size="full"
    >
      <div className="bg-gray-800 text-white text-center rounded-md p-6">
        <p className="mb-2">
          We use cookies to enhance your experience. By continuing to visit this site you agree to
          our use of cookies.
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Accept
        </button>
      </div>
    </Modal>
  );
}
