// 리뉴얼 섹션 레이아웃(Section)과 섹션 제목(SectionHeading) 컴포넌트
import type { ReactNode } from 'react';

/** Page section with consistent vertical rhythm and max width. */
export function Section({
  id,
  className = '',
  innerClassName = '',
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`w-full py-16 md:py-24 scroll-mt-16 ${className}`}>
      <div className={`max-w-[1180px] mx-auto px-5 md:px-6 ${innerClassName}`}>{children}</div>
    </section>
  );
}

/** Section title block: optional eyebrow, big heading, optional lead text and right-side action. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  center = false,
  as: Tag = 'h2',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div
      className={`mb-10 md:mb-12 flex gap-4 ${
        center ? 'flex-col items-center text-center' : 'flex-col md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={center ? 'max-w-3xl' : 'max-w-3xl'}>
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-wide text-aah-red mb-3">{eyebrow}</p>
        )}
        <Tag className="text-[30px] md:text-[44px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">
          {title}
        </Tag>
        {lead && <p className="mt-3 text-[17px] md:text-xl leading-relaxed text-ink-2">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
