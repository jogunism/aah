// 브라우저용 가격 조회 프록시. 통화를 쿼리로 받아 API에 그 통화로 요청한다(쿠키·CORS에 의존하지 않음)
import { getPrices } from '@/api/server';
import { isCurrency } from '@/lib/currency';

export async function GET(req: Request) {
  const param = new URL(req.url).searchParams.get('currency');
  const currency = isCurrency(param) ? param : 'USD';
  const data = await getPrices(currency);
  const ok = Array.isArray(data) ? data.length > 0 : !!data;
  // Same for every visitor of a currency: let the CDN answer for 5 minutes (not when the API failed)
  return Response.json(data, ok ? { headers: { 'Cache-Control': 'public, s-maxage=300' } } : undefined);
}
