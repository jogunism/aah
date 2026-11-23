// 사용자 포털(/my): 로그인한 신청자의 진행 단계와 단계별 화면
import { redirect } from 'next/navigation';
import { getTranslation } from '@/lib/i18n.server';
import { getPortalData } from '@/lib/portal.server';
import { getEurRates } from '@/api/server';
import { getApplySchools } from '@/lib/applySchools.server';
import Portal from '@/components/portal/Portal';
import { isSupportedLocale, DEFAULT_LOCALE } from '@/lib/locales';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { t } = await getTranslation(isSupportedLocale(lang) ? lang : DEFAULT_LOCALE);
  return { title: t('MY_TITLE') };
}

export default async function MyPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ id?: string; password?: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE;
  const { id, password } = await searchParams;
  const [data, rates, schools] = await Promise.all([getPortalData(id), getEurRates(), getApplySchools(lang)]);
  if (!data) redirect(`/${lang}/my/login`);
  return <Portal lang={lang} initial={data} rates={rates} schools={schools} passwordChanged={password === 'changed'} />;
}
