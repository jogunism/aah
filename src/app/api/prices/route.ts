// 브라우저용 가격 조회 프록시. 통화를 쿼리로 받아 API에 그 통화로 요청한다(쿠키·CORS에 의존하지 않음)
import { getPrices } from '@/api/server';

export async function GET(req: Request) {
  const currency = new URL(req.url).searchParams.get('currency') === 'EUR' ? 'EUR' : 'USD';
  return Response.json(await getPrices(currency));
}
