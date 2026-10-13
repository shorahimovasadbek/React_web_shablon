import { Navigate, createBrowserRouter } from 'react-router';
import { RequireAuth } from '@core/guards/RequireAuth';
import { RequireGuest } from '@core/guards/RequireGuest';
import { Shell } from '@layout/Shell';

/** Sahifa lazy yuklanadi — har biri alohida chunk */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const router = createBrowserRouter([
  {
    element: <RequireGuest />,
    children: [{ path: '/login', lazy: page(() => import('@features/auth/LoginPage')) }],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <Shell />,
        children: [
          { path: '/home', lazy: page(() => import('@features/home/HomePage')) },
          { path: '/profile', lazy: page(() => import('@features/profile/ProfilePage')) },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/home" replace /> },
]);
