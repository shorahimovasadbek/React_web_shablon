import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useUser } from '@core/auth/session.store';
import { useMe } from '@core/auth/use-me';
import { type AppLang, LANGS } from '@core/i18n/i18n';
import { useLang } from '@core/i18n/use-lang';
import { Button } from '@shared/ui/Button';
import { formatPhone, phoneDigits } from '@shared/utils/format';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { lang, setLang } = useLang();
  const user = useUser();
  useMe();

  const changeLang = async (l: AppLang) => {
    await setLang(l);
    toast.success(t('profile.saved'));
  };

  return (
    <div className="flex max-w-xl flex-col gap-4">
      {user && (
        <section className="rounded-lg bg-white p-6">
          <p className="text-title text-ink">{user.name}</p>
          <p className="text-muted">+998 {formatPhone(phoneDigits(user.phone))}</p>
        </section>
      )}

      <section className="rounded-lg bg-white p-6">
        <p className="mb-3 text-label text-ink-2">{t('profile.lang')}</p>
        <div className="flex gap-2">
          {LANGS.map((l) => (
            <Button key={l} size="sm" variant={lang === l ? 'primary' : 'secondary'} onClick={() => changeLang(l)}>
              {t(`lang.${l}`)}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
