'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { GA_TRACKING_ID, trackReferrer, trackTimeOnPage } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartTime = useRef<number>(Date.now());
  const isFirstLoad = useRef<boolean>(true);
  const previousPath = useRef<string>(pathname);

  useEffect(() => {
    if (GA_TRACKING_ID) {
      // page_view itself is sent by gtag config (first load) and GA4 enhanced
      // measurement (history changes); sending it here as well counted pages twice.

      if (isFirstLoad.current) {
        // Track referrer and UTM parameters only on first load
        trackReferrer();
        isFirstLoad.current = false;
      } else {
        // Time spent on the page we just left (not on the first load: nothing was left yet)
        trackTimeOnPage(Date.now() - pageStartTime.current, previousPath.current);
      }
      pageStartTime.current = Date.now();
      previousPath.current = pathname;
    }
  }, [pathname, searchParams]);

  // Track time on page when the window is closed (in-site navigation is handled above)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (GA_TRACKING_ID && pageStartTime.current) {
        const timeSpent = Date.now() - pageStartTime.current;
        trackTimeOnPage(timeSpent, pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
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
            // Consent mode: analytics cookies only after the visitor accepts the cookie notice
            gtag('consent', 'default', {
              analytics_storage: /(^|; )gdpr_consent=true/.test(document.cookie) ? 'granted' : 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            });
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}
