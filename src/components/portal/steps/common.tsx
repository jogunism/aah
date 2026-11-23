// 단계 화면 공용 요소: 제목·상태 칩, 항목/값 표, 소제목, 진행 타임라인, 금액 표
import type { ReactNode } from 'react';
import type { LineItem } from '@/lib/portal';
import { formatMoney, total } from '@/lib/portal';

type Tone = 'amber' | 'green' | 'blue' | 'gray' | 'red';
const CHIP: Record<Tone, string> = {
  amber: 'bg-[#FFF1DA] text-[#B26A00]',
  green: 'bg-[#E3F4EA] text-[#1E8E5A]',
  blue: 'bg-[#E6EEF7] text-[#2C4F78]',
  gray: 'bg-soft text-muted',
  red: 'bg-[#FCE8E8] text-[#A1262B]',
};

export function StepHeader({ n, title, chip, tone, lead }: { n: number; title: string; chip?: string; tone?: Tone; lead?: ReactNode }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[22px] font-bold tracking-[-0.01em] text-ink">
          {n} · {title}
        </h2>
        {chip && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${CHIP[tone ?? 'gray']}`}>{chip}</span>}
      </div>
      {lead && <p className="mt-1.5 text-[14px] text-muted">{lead}</p>}
    </div>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return <h3 className="mt-7 mb-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">{children}</h3>;
}

export function KV({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[200px_1fr] text-[14px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="border-t border-line pt-2.5 sm:py-2.5 text-muted">{k}</dt>
          <dd className="pb-2.5 sm:border-t sm:border-line sm:pt-2.5 text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export type TimelineItem = { title: string; detail?: ReactNode; state: 'done' | 'current' | 'todo' };

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="mt-5">
      {items.map((it, i) => (
        <li key={it.title} className="relative flex gap-4 pb-5 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden="true" className={`absolute left-[11px] top-[26px] bottom-0 w-0.5 ${it.state === 'done' ? 'bg-ink' : 'bg-line'}`} />
          )}
          <span aria-hidden="true" className={`relative z-10 flex w-6 h-6 shrink-0 items-center justify-center rounded-full text-xs text-white ${
            it.state === 'done' ? 'bg-ink' : it.state === 'current' ? 'border-[7px] border-aah-red bg-white' : 'border-2 border-line bg-white'}`}>
            {it.state === 'done' ? '✓' : ''}
          </span>
          <div>
            <p className={`text-sm font-semibold ${it.state === 'todo' ? 'text-[#A1A1A6]' : 'text-ink'}`}>{it.title}</p>
            {it.detail && <p className="text-[13px] text-muted">{it.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MoneyTable({ items, currency, lang, totalLabel }: { items: LineItem[]; currency: string; lang: string; totalLabel: string }) {
  return (
    <div className="text-[14px]">
      {items.map((i) => (
        <div key={i.label} className="flex justify-between gap-4 border-t border-line py-2.5">
          <span className="text-ink-2">{i.label}</span>
          <span className="whitespace-nowrap text-ink">{formatMoney(i.amount, currency, lang)}</span>
        </div>
      ))}
      <div className="flex justify-between gap-4 border-t-2 border-ink py-3 text-[17px] font-bold text-ink">
        <span>{totalLabel}</span>
        <span className="whitespace-nowrap">{formatMoney(total(items), currency, lang)}</span>
      </div>
    </div>
  );
}
