export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean | undefined | null>;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, custom_parameters }: GTagEvent) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });
  }
};

// Referrer and UTM tracking
export const trackReferrer = () => {
  if (typeof window !== 'undefined') {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);

    const utmData = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      referrer: referrer || 'direct',
    };

    // Only track if there's meaningful data
    if (referrer || utmData.utm_source) {
      event({
        action: 'traffic_source',
        category: 'acquisition',
        label: utmData.utm_source || 'referral',
        custom_parameters: utmData,
      });
    }
  }
};

// Currency change tracking
export const trackCurrencyChange = (newCurrency: string, previousCurrency?: string) => {
  event({
    action: 'currency_change',
    category: 'user_preference',
    label: newCurrency,
    custom_parameters: {
      new_currency: newCurrency,
      previous_currency: previousCurrency,
    },
  });
};

// Language/Country change tracking
export const trackLanguageChange = (newLanguage: string, previousLanguage?: string) => {
  event({
    action: 'language_change',
    category: 'user_preference',
    label: newLanguage,
    custom_parameters: {
      new_language: newLanguage,
      previous_language: previousLanguage,
    },
  });
};

// Tuition calculation popup events
export const trackTuitionCalculationOpen = (source?: string) => {
  event({
    action: 'tuition_popup_open',
    category: 'engagement',
    label: source || 'unknown',
    custom_parameters: {
      source,
    },
  });
};

export const trackTuitionCalculationSubmit = (formData: Record<string, string | number | boolean | undefined | null>) => {
  event({
    action: 'tuition_calculation_submit',
    category: 'conversion',
    label: 'form_submission',
    custom_parameters: {
      ...formData,
    },
  });
};

export const trackTuitionCalculationClose = (method: 'close_button' | 'backdrop' | 'escape') => {
  event({
    action: 'tuition_popup_close',
    category: 'engagement',
    label: method,
    custom_parameters: {
      close_method: method,
    },
  });
};

// Program interactions
export const trackProgramView = (programName: string, programType?: string) => {
  event({
    action: 'program_view',
    category: 'content',
    label: programName,
    custom_parameters: {
      program_name: programName,
      program_type: programType,
    },
  });
};

export const trackProgramDetailsOpen = (programName: string, detailsType: 'short' | 'long') => {
  event({
    action: 'program_details_open',
    category: 'engagement',
    label: programName,
    custom_parameters: {
      program_name: programName,
      details_type: detailsType,
    },
  });
};

// Contact form tracking
export const trackContactFormSubmit = (formType: string, formData?: Record<string, string | number | boolean | undefined | null>) => {
  event({
    action: 'contact_form_submit',
    category: 'conversion',
    label: formType,
    custom_parameters: {
      form_type: formType,
      ...formData,
    },
  });
};

// Navigation tracking
export const trackNavigationClick = (linkText: string, destination: string) => {
  event({
    action: 'navigation_click',
    category: 'navigation',
    label: linkText,
    custom_parameters: {
      link_text: linkText,
      destination,
    },
  });
};

// File downloads
export const trackFileDownload = (fileName: string, fileType: string) => {
  event({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
    },
  });
};

// Search functionality (if exists)
export const trackSiteSearch = (searchTerm: string, resultsCount?: number) => {
  event({
    action: 'site_search',
    category: 'engagement',
    label: searchTerm,
    custom_parameters: {
      search_term: searchTerm,
      results_count: resultsCount,
    },
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string, page?: string) => {
  event({
    action: 'error',
    category: 'technical',
    label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      page: page || window.location.pathname,
    },
  });
};

// Time on page tracking
export const trackTimeOnPage = (timeSpent: number, pagePath: string) => {
  event({
    action: 'time_on_page',
    category: 'engagement',
    label: pagePath,
    value: Math.round(timeSpent / 1000), // Convert to seconds
    custom_parameters: {
      time_spent_ms: timeSpent,
      page_path: pagePath,
    },
  });
};
