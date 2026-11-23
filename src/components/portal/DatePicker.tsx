'use client';
// 사이트 모양의 날짜 선택(입국·출국 예정일): 브라우저 기본 달력 대신 큰 월 달력, 페이지 언어의 월·요일, 최소 날짜, 키보드 이동

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (s: string, n: number) => {
  const d = parse(s);
  d.setDate(d.getDate() + n);
  return iso(d);
};

export default function DatePicker({
  id,
  value,
  onChange,
  lang,
  min,
  placeholder,
  invalid = false,
  describedBy,
  prevLabel,
  nextLabel,
}: {
  id: string;
  value: string; // YYYY-MM-DD or ''
  onChange: (value: string) => void;
  lang: string;
  min?: string; // earliest selectable day
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => (value || min || iso(new Date())).slice(0, 7)); // YYYY-MM shown
  const [focus, setFocus] = useState(value || min || iso(new Date()));
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const gridId = useId();

  const fmtLong = useMemo(() => new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }), [lang]);
  const fmtMonth = useMemo(() => new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }), [lang]);
  // Monday-first weekday initials in the page language (2024-01-01 was a Monday)
  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2024, 0, 1 + i))),
    [lang],
  );

  const first = parse(`${month}-01`);
  const lead = (first.getDay() + 6) % 7; // empty cells before the 1st (Monday-first)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const today = iso(new Date());
  const disabled = (d: string) => !!min && d < min;

  const shiftMonth = (n: number) => {
    const d = new Date(first.getFullYear(), first.getMonth() + n, 1);
    setMonth(iso(d).slice(0, 7));
  };

  const openPicker = () => {
    const start = value || (min && min > today ? min : today);
    setMonth(start.slice(0, 7));
    setFocus(start);
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) button.current?.focus();
  };
  const choose = (d: string) => {
    if (disabled(d)) return;
    onChange(d);
    close();
  };

  useEffect(() => {
    if (!open) return;
    grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focus}"]`)?.focus();
  }, [open, focus, month]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const move = (n: number) => {
    const next = addDays(focus, n);
    setFocus(next);
    if (next.slice(0, 7) !== month) setMonth(next.slice(0, 7));
  };
  const onGridKey = (e: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowLeft: () => move(-1),
      ArrowRight: () => move(1),
      ArrowUp: () => move(-7),
      ArrowDown: () => move(7),
      PageUp: () => shiftMonth(-1),
      PageDown: () => shiftMonth(1),
      Enter: () => choose(focus),
      ' ': () => choose(focus),
      Escape: () => close(),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  };

  const minMonth = min?.slice(0, 7);
  const cells = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${pad(i + 1)}`)];

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={gridId}
        aria-describedby={describedBy}
        onClick={() => (open ? close(false) : openPicker())}
        className={`flex w-full h-11 items-center justify-between gap-2 rounded-[10px] border bg-white px-3.5 text-left text-[15px] outline-none transition-colors focus-visible:border-ink ${
          invalid ? 'border-aah-red ring-3 ring-aah-red/15' : open ? 'border-ink' : 'border-[#D2D2D7]'
        }`}
      >
        <span className={value ? 'text-ink' : 'text-[#A1A1A6]'}>{value ? fmtLong.format(parse(value)) : placeholder}</span>
        <svg aria-hidden="true" className="w-[18px] h-[18px] shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
          <path strokeLinecap="round" d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </button>

      {open && (
        <div role="dialog" aria-label={placeholder} className="absolute z-20 mt-2 w-[320px] max-w-[calc(100vw-40px)] rounded-xl border border-gray-200 bg-white p-4 text-ink shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={() => shiftMonth(-1)} disabled={!!minMonth && month <= minMonth} aria-label={prevLabel}
              className="flex w-9 h-9 items-center justify-center rounded-full text-ink hover:bg-soft disabled:opacity-30">
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <p className="text-[15px] font-semibold capitalize" aria-live="polite">{fmtMonth.format(first)}</p>
            <button type="button" onClick={() => shiftMonth(1)} aria-label={nextLabel}
              className="flex w-9 h-9 items-center justify-center rounded-full text-ink hover:bg-soft">
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-[12px] font-medium text-muted">
            {weekdays.map((w) => <span key={w} className="py-1">{w}</span>)}
          </div>
          <div id={gridId} ref={grid} role="grid" onKeyDown={onGridKey} className="mt-1 grid grid-cols-7 gap-y-1 text-center">
            {cells.map((d, i) =>
              d ? (
                <button key={d} type="button" data-day={d} tabIndex={d === focus ? 0 : -1} disabled={disabled(d)}
                  aria-pressed={d === value} aria-label={fmtLong.format(parse(d))} onClick={() => choose(d)}
                  className={`mx-auto flex w-10 h-10 items-center justify-center rounded-full text-[14px] outline-none transition-colors disabled:text-[#C7C7CC] disabled:cursor-not-allowed ${
                    d === value ? 'bg-ink font-semibold text-white'
                      : d === today ? 'font-semibold text-aah-red hover:bg-soft'
                        : 'text-ink hover:bg-soft'} focus-visible:ring-2 focus-visible:ring-aah-red/40`}>
                  {Number(d.slice(8))}
                </button>
              ) : (
                <span key={`e${i}`} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
