// 신청·포털 폼 공용 입력 요소(라벨, 필수/선택 표시, 안내, 오류 메시지)
import type { ReactNode } from 'react';

export const inputClass = (invalid = false) =>
  `w-full h-11 rounded-[10px] border bg-white px-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-[#A1A1A6] focus:border-ink ${
    invalid ? 'border-aah-red ring-3 ring-aah-red/15' : 'border-[#D2D2D7]'
  }`;

export const textareaClass = (invalid = false) => `${inputClass(invalid)} h-auto min-h-[92px] py-3 leading-relaxed`;

export function Field({
  id,
  label,
  required,
  optionalLabel,
  hint,
  error,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  hint?: ReactNode;
  error?: string | null;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-1.5 text-[13px] font-medium text-ink-2">
        {label}
        {required && <span className="text-aah-red"> *</span>}
        {!required && optionalLabel && <span className="font-normal text-muted"> ({optionalLabel})</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-aah-red">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

export function Note({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'success' | 'alert'; children: ReactNode }) {
  const tones = {
    info: 'bg-[#F2F6FB] border-[#DCE6F2] text-[#2C4F78]',
    warn: 'bg-[#FFF7EB] border-[#F4E0BD] text-[#7A4B00]',
    success: 'bg-[#EEF8F2] border-[#CDEBD9] text-[#16643F]',
    alert: 'bg-[#FCF1F1] border-[#F1D3D4] text-[#8E2A2E]',
  };
  return <div className={`rounded-xl border px-4 py-3 text-[13px] leading-relaxed ${tones[tone]}`}>{children}</div>;
}

export function SectionTitle({ n, children }: { n?: number; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-semibold text-ink">
      {n !== undefined && (
        <span className="inline-flex w-[26px] h-[26px] items-center justify-center rounded-full bg-ink text-white text-[13px]">
          {n}
        </span>
      )}
      {children}
    </h2>
  );
}
