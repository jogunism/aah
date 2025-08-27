'use client';

import { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@/lib/cookie';
import Modal from './Modal';

export default function GDPRPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('gdpr_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('gdpr_consent', 'true');
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
