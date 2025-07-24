let lockCount = 0;

export const lockScroll = () => {
  if (typeof window !== 'undefined') {
    if (lockCount === 0) {
      document.body.style.overflow = 'hidden';
    }
    lockCount++;
  }
};

export const unlockScroll = () => {
  if (typeof window !== 'undefined') {
    lockCount--;
    if (lockCount <= 0) {
      // Use a timeout to defer the unlock. This handles rapid unmount/remount cycles
      // during things like router.refresh(), preventing the scrollbar from flickering.
      setTimeout(() => {
        if (lockCount <= 0) {
          document.body.style.overflow = 'auto';
          lockCount = 0; // Ensure count doesn't go negative
        }
      }, 0);
    }
  }
};
