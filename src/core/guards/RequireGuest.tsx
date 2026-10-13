import { Navigate, Outlet } from 'react-router';
import { useIsAuthed } from '@core/auth/session.store';

export function RequireGuest() {
  return useIsAuthed() ? <Navigate to="/home" replace /> : <Outlet />;
}
