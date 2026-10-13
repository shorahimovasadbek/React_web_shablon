import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { errorMessage } from '@core/api/api-error';
import { authApi } from '@core/auth/auth.api';
import { LANGS } from '@core/i18n/i18n';
import { useLang } from '@core/i18n/use-lang';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { type LoginForm, loginSchema } from './login.schema';

export default function LoginPage() {
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const navigate = useNavigate();

  const { control, handleSubmit, setError, formState } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async ({ phone, password }) => {
    try {
      await authApi.login({ phone: '998' + phone, password });
      navigate('/home', { replace: true });
    } catch (e) {
      setError('password', { message: errorMessage(e) });
    }
  });

  return (
    <div className="grid min-h-full place-items-center p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-8 flex justify-end gap-1.5">
          {LANGS.map((l) => (
            <Button key={l} size="sm" variant={lang === l ? 'primary' : 'secondary'} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </Button>
          ))}
        </div>

        <h1 className="mb-2 text-[28px] leading-[34px] font-extrabold text-ink">{t('auth.title')}</h1>
        <p className="mb-7 text-muted">{t('auth.sub')}</p>

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Input {...field} kind="phone" label={t('auth.phone')} error={fieldState.error?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                kind="password"
                label={t('auth.pw')}
                placeholder={t('auth.pw_ph')}
                error={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" size="md" block loading={formState.isSubmitting}>
            {t('auth.btn')}
          </Button>
        </form>
      </div>
    </div>
  );
}
