// 관리자 화면 요청 프록시: 세션 쿠키의 운영자 토큰을 API로 넘기고, API가 준 토큰은 httpOnly 쿠키로만 보관
import { cookies } from 'next/headers';
import http from '@/lib/http';
import { CONSOLE_COOKIE, consoleCookieOptions } from '@/lib/console.server';

type Ctx = { params: Promise<{ path: string[] }> };

const handle = async (req: Request, { params }: Ctx, method: 'get' | 'post' | 'delete') => {
  const { path } = await params;
  const jar = await cookies();

  if (path.join('/') === 'logout') {
    jar.delete(CONSOLE_COOKIE);
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

  const token = jar.get(CONSOLE_COOKIE)?.value;
  try {
    const res = await http.request({
      method,
      url: `/console/${path.map(encodeURIComponent).join('/')}`,
      params: Object.fromEntries(new URL(req.url).searchParams),
      data,
      headers: token ? { 'X-Console-Token': token } : {},
      validateStatus: () => true,
    });
    const body = res.data && typeof res.data === 'object' ? { ...res.data } : res.data;
    // login / setup return the session token: keep it out of the browser's JavaScript
    if (body && typeof body === 'object' && typeof body.token === 'string') {
      jar.set(CONSOLE_COOKIE, body.token, consoleCookieOptions);
      delete body.token;
    }
    if (res.status === 401 && token) jar.delete(CONSOLE_COOKIE);
    return Response.json(body, { status: res.status });
  } catch (error) {
    console.error(`Console proxy ${method.toUpperCase()} ${path.join('/')}:`, error);
    return Response.json({ message: 'Upstream error' }, { status: 502 });
  }
};

export const GET = (req: Request, ctx: Ctx) => handle(req, ctx, 'get');
export const POST = (req: Request, ctx: Ctx) => handle(req, ctx, 'post');
export const DELETE = (req: Request, ctx: Ctx) => handle(req, ctx, 'delete');
