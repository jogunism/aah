// 리뉴얼 공통 버튼 스타일과 Button/ButtonLink 컴포넌트
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'dark' | 'blue' | 'outline' | 'outline-light' | 'white';
type Size = 'sm' | 'md';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors border-[1.5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aah-red disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
};

const variants: Record<Variant, string> = {
  primary: 'bg-aah-red text-white border-transparent hover:bg-aah-red-dark',
  dark: 'bg-ink text-white border-transparent hover:bg-black',
  blue: 'bg-aah-blue text-white border-transparent hover:brightness-110',
  outline: 'bg-transparent border-current hover:bg-black/5',
  'outline-light': 'bg-transparent text-white border-white/80 hover:bg-white/10',
  white: 'bg-white text-ink border-transparent hover:bg-soft',
};

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `${base} ${sizes[size]} ${variants[variant]} ${extra}`;

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Link styled as a button (internal routes or in-page anchors). */
export function ButtonLink({
  variant,
  size,
  className = '',
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, 'className'>) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/** Native button with the shared styles. */
export function Button({
  variant,
  size,
  className = '',
  children,
  type = 'button',
  ...props
}: CommonProps & Omit<ComponentProps<'button'>, 'className'>) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  );
}
