// 관리자 화면 서버 전용: 운영자 세션 쿠키 설정과 서버 렌더링용 운영자 정보·API 조회
import { cookies } from 'next/headers';
import http from '@/lib/http';

export const CONSOLE_COOKIE = 'aah_console';

export const consoleCookieOptions = {
  httpOnly: true,
  secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
  sameSite: 'strict' as const, // operator actions never start from another site
  path: '/',
  maxAge: 12 * 60 * 60, // same as the API token lifetime
};

export interface Operator {
  email: string;
  lastLoginAt: string | null;
}

/** GET from the console API as the signed-in operator; null = not signed in (or the session expired) */
export const consoleGet = async <T,>(path: string): Promise<T | null> => {
  const token = (await cookies()).get(CONSOLE_COOKIE)?.value;
  if (!token) return null;
  const res = await http.get<T>(`/console/${path}`, { headers: { 'X-Console-Token': token }, validateStatus: () => true });
  if (res.status === 200) return res.data;
  if (res.status === 401) return null;
  throw new Error(`Console API ${res.status}`);
};

export const getOperator = () => consoleGet<Operator>('me');
