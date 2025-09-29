'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GA_TRACKING_ID, pageview, trackReferrer, trackTimeOnPage } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartTime = useRef<number>(Date.now());
  const isFirstLoad = useRef<boolean>(true);

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = new URL(pathname, window.location.origin);
      searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
      pageview(url);

      // Track referrer and UTM parameters only on first load
      if (isFirstLoad.current) {
        trackReferrer();
        isFirstLoad.current = false;
      }

      // Track time on previous page when navigating
      const previousPageStartTime = pageStartTime.current;
      pageStartTime.current = Date.now();

      if (previousPageStartTime && !isFirstLoad.current) {
        const timeSpent = Date.now() - previousPageStartTime;
        trackTimeOnPage(timeSpent, pathname);
      }
    }
  }, [pathname, searchParams]);

  // Track time on page when component unmounts or window unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (GA_TRACKING_ID && pageStartTime.current) {
        const timeSpent = Date.now() - pageStartTime.current;
        trackTimeOnPage(timeSpent, pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [pathname]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
