import { Navigate, Outlet, useLocation } from 'react-router';
import { useIsAuthed } from '@core/auth/session.store';

export function RequireAuth() {
  const location = useLocation();
  return useIsAuthed() ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}
