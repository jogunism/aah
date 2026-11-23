'use client';
// 사이트 드롭다운(문의 폼 프로그램 선택과 같은 모양)을 폼용으로: 검색, 상단 고정 항목, 키보드 선택 지원

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

export default function Dropdown({
  id,
  value,
  onChange,
  options,
  pinned = [],
  placeholder,
  invalid = false,
  searchPlaceholder,
  noMatch,
  describedBy,
  className = '',
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  pinned?: string[]; // values shown first, above a divider
  placeholder: string;
  invalid?: boolean;
  searchPlaceholder?: string; // shows a search box when set
  noMatch?: string;
  describedBy?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const listId = useId();

  // Pinned options first (in the given order), then the rest; the search filters both
  const items = useMemo(() => {
    const q = fold(query.trim());
    const match = (o: DropdownOption) => !q || fold(o.label).includes(q);
    const top = pinned.map((v) => options.find((o) => o.value === v)).filter((o): o is DropdownOption => !!o && match(o));
    const rest = options.filter((o) => !pinned.includes(o.value) && match(o));
    return { all: [...top, ...rest], dividerAfter: top.length && rest.length ? top.length - 1 : -1 };
  }, [options, pinned, query]);

  const selected = options.find((o) => o.value === value);

  const openList = () => {
    setQuery('');
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) button.current?.focus();
  };
  const choose = (v: string) => {
    onChange(v);
    close();
  };

  // On open: highlight the selected option and bring it into view; focus the search box
  useEffect(() => {
    if (!open) return;
    const i = items.all.findIndex((o) => o.value === value);
    setActive(i >= 0 ? i : 0);
    if (searchPlaceholder) search.current?.focus();
    else list.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const onListKey = (e: KeyboardEvent) => {
    const last = items.all.length - 1;
    if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, last));
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(last);
    else if (e.key === 'Enter' && items.all[active]) choose(items.all[active].value);
    else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') setOpen(false);
    else if (!searchPlaceholder && e.key.length === 1) {
      // Without a search box, typing jumps to the first option starting with that letter
      const i = items.all.findIndex((o) => fold(o.label).startsWith(fold(e.key)));
      if (i >= 0) setActive(i);
      return;
    } else return;
    e.preventDefault();
  };

  const onButtonKey = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  };

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        ref={button}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onButtonKey}
        className={`flex w-full h-11 items-center justify-between gap-2 rounded-[10px] border bg-white px-3.5 text-left text-[15px] outline-none transition-colors focus-visible:border-ink ${
          invalid ? 'border-aah-red ring-3 ring-aah-red/15' : open ? 'border-ink' : 'border-[#D2D2D7]'
        }`}
      >
        <span className={`truncate ${selected ? 'text-ink' : 'text-[#A1A1A6]'}`}>{selected?.label ?? placeholder}</span>
        <svg aria-hidden="true" className={`w-4 h-4 shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {searchPlaceholder && (
            <div className="border-b border-gray-100 p-2">
              <input
                ref={search}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onListKey}
                placeholder={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={items.all[active] ? `${listId}-${active}` : undefined}
                className="h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-ink placeholder:text-[#A1A1A6] outline-none focus:border-ink"
              />
            </div>
          )}
          <ul
            ref={list}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={id}
            aria-activedescendant={items.all[active] ? `${listId}-${active}` : undefined}
            onKeyDown={onListKey}
            className="max-h-72 overflow-y-auto py-1 text-sm outline-none"
          >
            {items.all.length === 0 && <li className="px-4 py-2 text-muted">{noMatch}</li>}
            {items.all.map((o, i) => (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={o.value === value}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`cursor-pointer px-4 py-2 text-gray-700 ${o.value === value ? 'bg-gray-200' : i === active ? 'bg-gray-100' : ''} ${
                  i === items.dividerAfter ? 'mb-1 border-b border-gray-200 pb-2.5' : ''
                }`}
              >
                <span className="block truncate">{o.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
