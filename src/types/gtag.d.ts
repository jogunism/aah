declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetIdOrAction: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

export {};
