// S-curve (ease-in-out) scrolling shared by in-page links and programmatic jumps

const DEFAULT_DURATION = 1200;

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Scroll the window to `targetY` with an S-curve speed profile.
 * Resolves when the animation finishes.
 */
export const smoothScrollTo = (targetY: number, duration = DEFAULT_DURATION): Promise<void> =>
  new Promise(resolve => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const endY = Math.max(0, Math.min(targetY, maxY));
    const startY = window.scrollY;
    const distance = endY - startY;
    const startTime = performance.now();

    if (Math.abs(distance) < 1) {
      resolve();
      return;
    }

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
      else resolve();
    };

    requestAnimationFrame(step);
  });

/**
 * Scroll so that `element` sits `offset` px below the top of the viewport.
 */
export const smoothScrollToElement = (
  element: HTMLElement,
  offset = 0,
  duration = DEFAULT_DURATION,
): Promise<void> =>
  smoothScrollTo(element.getBoundingClientRect().top + window.scrollY - offset, duration);
