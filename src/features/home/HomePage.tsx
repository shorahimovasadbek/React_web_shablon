import { useTranslation } from 'react-i18next';
import { useUser } from '@core/auth/session.store';

export default function HomePage() {
  const { t } = useTranslation();
  const user = useUser();

  return (
    <section className="rounded-lg bg-white p-6">
      <h1 className="text-title text-ink">{t('home.hello', { name: user?.name ?? '' })}</h1>
      <p className="mt-1 text-muted">{t('home.sub')}</p>
    </section>
  );
}
