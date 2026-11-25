// 내 계정(/console/account): 아이디·이름·권한·마지막 로그인, 화면 설정(언어·시간대), 비밀번호 변경, 2단계 인증 켜기·끄기
import { redirect } from 'next/navigation';
import ConsoleShell from '@/components/console/ConsoleShell';
import PasswordForm from '@/components/console/PasswordForm';
import TwoStepCard from '@/components/console/TwoStepCard';
import SettingsCard, { type ZoneOption } from '@/components/console/SettingsCard';
import { Card } from '@/components/console/ui';
import { getConsoleLang, getOperator, zoneOf } from '@/lib/console.server';
import { ct, consoleTime, zoneOffset, type ConsoleLang } from '@/lib/console.i18n';

export const dynamic = 'force-dynamic';

// Where the operators and the students are: shown first in the list
const COMMON_ZONES = ['Asia/Seoul', 'Asia/Tokyo', 'Europe/Berlin', 'Europe/Paris', 'Europe/London', 'Europe/Madrid', 'Europe/Rome', 'America/New_York', 'America/Los_Angeles', 'UTC'];

const zoneOption = (lang: ConsoleLang, id: string): ZoneOption => {
  let name = '';
  try {
    name = new Intl.DateTimeFormat(lang, { timeZone: id, timeZoneName: 'longGeneric' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value ?? '';
  } catch { /* unknown to this runtime: id only */ }
  return { id, label: `${id}${name && name !== id ? ` · ${name}` : ''} (${zoneOffset(id)})` };
};

export default async function AccountPage() {
  const operator = await getOperator();
  if (!operator) redirect('/console/login');
  const lang = await getConsoleLang();
  const zone = zoneOf(operator);
  const ids = Intl.supportedValuesOf('timeZone');
  const common = COMMON_ZONES.map((id) => zoneOption(lang, id));
  const all = [...new Set([...ids, zone])].sort().map((id) => zoneOption(lang, id));
  const rows: [string, string][] = [
    [ct(lang, 'id'), operator.id],
    [ct(lang, 'name'), operator.name],
    [ct(lang, 'role'), ct(lang, operator.role === 'super' ? 'role_super' : 'role_admin')],
    [ct(lang, 'last_login'), operator.lastLoginAt ? consoleTime(lang, operator.lastLoginAt, zone) : ct(lang, 'never')],
  ];
  return (
    <ConsoleShell active="account" operator={operator} lang={lang}>
      <h1 className="mb-5 text-[22px] font-bold text-[#1E2A3A]">{ct(lang, 'acct_title')}</h1>
      <div className="grid max-w-[880px] gap-4 md:grid-cols-2 md:items-start">
        <Card title={ct(lang, 'acct_title')}>
          <dl className="grid grid-cols-[110px_1fr] text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="border-t border-[#EEF0F3] py-2.5 text-muted [&:nth-child(1)]:border-t-0">{k}</dt>
                <dd className="border-t border-[#EEF0F3] py-2.5">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <SettingsCard lang={lang} zone={zone} common={common} all={all} />
        <Card title={ct(lang, 'pw_title')}>
          <PasswordForm lang={lang} />
        </Card>
        <TwoStepCard lang={lang} enabled={operator.totpEnabled} />
      </div>
    </ConsoleShell>
  );
}
