import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@shared/utils/cn';
import { formatPhone, phoneDigits } from '@shared/utils/format';

export type InputKind = 'text' | 'phone' | 'email' | 'password';

/** Foydalanuvchi kiritgan matn → qiymat */
const PARSE: Record<InputKind, (s: string) => string> = {
  text: (s) => s,
  password: (s) => s,
  email: (s) => s.replace(/\s/g, ''),
  phone: phoneDigits,
};
/** Qiymat → ekranda ko'rinishi */
const FORMAT: Partial<Record<InputKind, (s: string) => string>> = { phone: formatPhone };

const AUTOCOMPLETE: Record<InputKind, string> = {
  text: 'off',
  email: 'email',
  phone: 'tel-national',
  password: 'current-password',
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  kind?: InputKind;
  label?: string;
  placeholder?: string;
  hint?: string;
  /** Tarjima kaliti yoki tayyor matn */
  error?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

/** react-hook-form bilan: <Controller render={({ field, fieldState }) => <Input {...field} error={fieldState.error?.message} />} /> */
export function Input({ value, onChange, kind = 'text', label, placeholder, hint, error, ...rest }: InputProps) {
  const { t } = useTranslation();
  const id = useId();
  const [showPw, setShowPw] = useState(false);

  const isPhone = kind === 'phone';
  const type = kind === 'password' ? (showPw ? 'text' : 'password') : isPhone ? 'tel' : kind;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-label text-ink-2">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex h-12 items-center gap-2.5 rounded-sm border bg-white px-3.5 transition-[border-color,box-shadow]',
          error
            ? 'border-danger'
            : 'border-line focus-within:border-brand focus-within:ring-3 focus-within:ring-brand-ring',
        )}
      >
        {isPhone && (
          <>
            <span className="font-semibold text-ink">+998</span>
            <span className="h-6 w-px bg-line" />
          </>
        )}
        <input
          id={id}
          type={type}
          value={FORMAT[kind]?.(value) ?? value}
          onChange={(e) => onChange(PARSE[kind](e.target.value))}
          placeholder={placeholder ?? (isPhone ? '90 123-45-67' : undefined)}
          inputMode={isPhone ? 'numeric' : undefined}
          autoComplete={AUTOCOMPLETE[kind]}
          aria-invalid={!!error || undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-ink tabular-nums outline-none placeholder:text-subtle"
          {...rest}
        />
        {kind === 'password' && (
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={t(showPw ? 'common.pw_hide' : 'common.pw_show')}
            className="-mr-3 grid size-11 cursor-pointer place-items-center text-subtle"
          >
            {showPw ? <EyeOff size={20} aria-hidden /> : <Eye size={20} aria-hidden />}
          </button>
        )}
      </div>

      {error ? (
        <span className="flex items-center gap-1.5 text-caption font-medium text-danger">
          <CircleAlert size={16} aria-hidden />
          {t(error)}
        </span>
      ) : (
        hint && <span className="text-caption text-muted">{hint}</span>
      )}
    </div>
  );
}
