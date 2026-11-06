// 문의 폼을 서버에서 API로 전달하는 프록시(API 토큰을 브라우저에 노출하지 않음)
import { forward } from '@/api/server';

export const POST = (req: Request) => forward(req, 'post', '/contact');
