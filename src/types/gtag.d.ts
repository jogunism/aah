declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'consent' | 'js',
      targetIdOrAction: string | Date,
      params?: { [key: string]: unknown }
    ) => void;
  }
}

export {};
