import { House, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router';
import { authApi } from '@core/auth/auth.api';
import { cn } from '@shared/utils/cn';

const NAV = [
  { to: '/home', label: 'nav.home', icon: House },
  { to: '/profile', label: 'nav.profile', icon: User },
] as const;

const linkClass =
  'inline-flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 font-medium text-muted transition-colors hover:bg-surface hover:text-ink';

/** Avtorizatsiyadan keyingi sahifalar karkasi: header + navigatsiya + kontent */
export function Shell() {
  const { t } = useTranslation();

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 h-16 border-b border-line bg-white">
        <div className="mx-auto flex h-full max-w-280 items-center gap-6 px-4">
          <Link to="/home" className="text-title text-ink">
            Template
          </Link>

          <nav className="flex gap-1">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => cn(linkClass, isActive && 'bg-brand-soft! text-brand!')}
              >
                <Icon size={20} aria-hidden />
                {t(label)}
              </NavLink>
            ))}
          </nav>

          <button type="button" className={cn(linkClass, 'ml-auto')} onClick={authApi.logout}>
            <LogOut size={20} aria-hidden />
            {t('profile.logout')}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-280 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
