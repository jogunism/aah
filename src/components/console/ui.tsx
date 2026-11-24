// 관리자 화면 공용 UI 조각: 입력칸·버튼 클래스, 라벨, 카드, API 호출
import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-[10px] border border-[#D5DBE3] bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-[#2C4F78] focus:ring-3 focus:ring-[#2C4F78]/15';
export const primaryClass =
  'w-full rounded-[10px] bg-[#2C4F78] px-4 py-3 text-[15px] font-semibold text-white hover:bg-[#24425F] disabled:opacity-50';
export const buttonClass =
  'rounded-[9px] border border-[#E3E7ED] bg-white px-3 py-1.5 text-[13px] font-semibold text-ink hover:bg-[#F5F6F8] disabled:opacity-50';

export function Label({ text, hint, children }: { text: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-muted">
        {text}{hint && <span className="ml-1.5 font-normal">· {hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Card({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-[14px] border border-[#E3E7ED] bg-white px-5 py-4">
      <h2 className="mb-3 flex items-baseline justify-between gap-3 text-[15px] font-bold">
        {title}{aside && <span className="text-xs font-medium text-muted">{aside}</span>}
      </h2>
      {children}
    </section>
  );
}

export const consolePost = async (path: string, body: unknown) => {
  try {
    const res = await fetch(`/api/console/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { status: res.status, body: await res.json().catch(() => ({})) };
  } catch {
    return { status: 0, body: { error: 'server' } };
  }
};
