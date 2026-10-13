import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authApi } from './auth.api';
import { useSession } from './session.store';

/** Profilni serverdan yangilab, sessiyadagi user'ni sinxronlaydi */
export function useMe() {
  const setUser = useSession((s) => s.setUser);
  const query = useQuery({ queryKey: ['me'], queryFn: authApi.me });

  useEffect(() => {
    if (query.data) setUser(query.data);
  }, [query.data, setUser]);

  return query;
}
