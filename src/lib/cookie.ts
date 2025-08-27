import Cookies from 'js-cookie';

interface CookieAttributes {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  [property: string]: any;
}

const isProduction = process.env.NEXT_NODE_ENV === 'production';

const productionOptions: CookieAttributes = {
  path: '/',
  secure: true,
  sameSite: 'lax',
  domain: '.aah.education',
};

/**
 * Sets a cookie with environment-aware options.
 * In production, it adds secure, cross-subdomain attributes automatically.
 */
export const setCookie = (name: string, value: string, options?: CookieAttributes) => {
  const defaultOptions: CookieAttributes = {
    expires: 365, // Default expiration of one year
  };

  const finalOptions = isProduction
    ? { ...defaultOptions, ...productionOptions, ...options }
    : { ...defaultOptions, ...options };

  Cookies.set(name, value, finalOptions);
};

/**
 * Gets a cookie value by its name.
 */
export const getCookie = (name: string) => {
  return Cookies.get(name);
};

/**
 * Removes a cookie by its name.
 */
export const removeCookie = (name: string, options?: CookieAttributes) => {
  const finalOptions = isProduction
    ? { ...productionOptions, ...options }
    : options;

  Cookies.remove(name, finalOptions);
};
