import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
export type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-hover active:bg-brand-active disabled:bg-brand-disabled',
  secondary: 'border-line bg-white text-ink-2 hover:bg-pressed disabled:opacity-40',
  danger: 'bg-danger text-white active:bg-danger-active disabled:bg-danger-disabled',
  text: 'h-auto! px-0! text-brand active:text-brand-active disabled:opacity-40',
};

const SIZE: Record<ButtonSize, string> = {
  lg: 'h-13 px-5',
  md: 'h-12 px-5',
  sm: 'h-10 px-3.5',
};

export function Button({
  variant = 'primary',
  size = 'lg',
  block = false,
  loading = false,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-transparent',
        'text-button whitespace-nowrap transition-colors disabled:cursor-not-allowed',
        VARIANT[variant],
        SIZE[size],
        block && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading && <LoaderCircle size={20} className="animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
