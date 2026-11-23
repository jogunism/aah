// 포털 서버 전용: 세션 쿠키 설정과 서버 렌더링용 신청 현황 조회
import { cookies } from 'next/headers';
import http from '@/lib/http';
import type { PortalData } from '@/lib/portal';

export const PORTAL_COOKIE = 'aah_portal';

export const portalCookieOptions = {
  httpOnly: true,
  secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // same as the API token lifetime
};

/** null = not signed in (or the session expired) */
export const getPortalData = async (applicationId?: string): Promise<PortalData | null> => {
  const token = (await cookies()).get(PORTAL_COOKIE)?.value;
  if (!token) return null;
  const res = await http.get<PortalData>('/portal/me', {
    params: applicationId ? { id: applicationId } : undefined,
    headers: { 'X-User-Token': token },
    validateStatus: () => true,
  });
  if (res.status === 200) return res.data;
  if (res.status === 401 || res.status === 404) return null;
  throw new Error(`Portal API ${res.status}`);
};
