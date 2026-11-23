// 포털 요청 프록시: 세션 쿠키의 사용자 토큰을 API로 넘기고, API가 준 토큰은 httpOnly 쿠키로만 보관
import { cookies } from 'next/headers';
import http from '@/lib/http';
import { PORTAL_COOKIE, portalCookieOptions } from '@/lib/portal.server';

type Ctx = { params: Promise<{ path: string[] }> };

const handle = async (req: Request, { params }: Ctx, method: 'get' | 'post' | 'delete') => {
  const { path } = await params;
  const jar = await cookies();

  if (path.join('/') === 'logout') {
    jar.delete(PORTAL_COOKIE);
    return Response.json({ message: 'ok' });
  }

  let data: unknown;
  if (method === 'post') {
    try {
      data = await req.json();
    } catch {
      return Response.json({ message: 'Invalid JSON' }, { status: 400 });
    }
  }

  const token = jar.get(PORTAL_COOKIE)?.value;
  try {
    const res = await http.request({
      method,
      url: `/portal/${path.map(encodeURIComponent).join('/')}`,
      params: Object.fromEntries(new URL(req.url).searchParams),
      data,
      headers: {
        ...(token ? { 'X-User-Token': token } : {}),
        // For the agreement record: who confirmed, from where
        'X-Client-Ip': req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '',
        'X-Client-User-Agent': req.headers.get('user-agent')?.slice(0, 300) ?? '',
      },
      validateStatus: () => true,
    });
    const body = res.data && typeof res.data === 'object' ? { ...res.data } : res.data;
    // login / reset / password change return a fresh session token
    if (body && typeof body === 'object' && typeof body.token === 'string') {
      jar.set(PORTAL_COOKIE, body.token, portalCookieOptions);
      delete body.token;
    }
    if (res.status === 401 && token) jar.delete(PORTAL_COOKIE);
    return Response.json(body, { status: res.status });
  } catch (error) {
    console.error(`Portal proxy ${method.toUpperCase()} ${path.join('/')}:`, error);
    return Response.json({ message: 'Upstream error' }, { status: 502 });
  }
};

export const GET = (req: Request, ctx: Ctx) => handle(req, ctx, 'get');
export const POST = (req: Request, ctx: Ctx) => handle(req, ctx, 'post');
export const DELETE = (req: Request, ctx: Ctx) => handle(req, ctx, 'delete');
