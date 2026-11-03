// 브라우저용 학교 목록(가격 포함) 조회 프록시. 통화를 쿼리로 받아 그 통화로 요청한다
import { getSchools } from '@/api/server';

export async function GET(req: Request) {
  const currency = new URL(req.url).searchParams.get('currency') === 'EUR' ? 'EUR' : 'USD';
  return Response.json(await getSchools(currency));
}
