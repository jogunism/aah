// 브라우저용 학교 목록(가격 포함) 조회 프록시. 통화를 쿼리로 받아 그 통화로 요청한다
import { getSchools } from '@/api/server';
import { isCurrency } from '@/lib/currency';

export async function GET(req: Request) {
  const param = new URL(req.url).searchParams.get('currency');
  const currency = isCurrency(param) ? param : 'USD';
  return Response.json(await getSchools(currency));
}
