import { http } from '@core/api/http';
import { queryClient } from '@core/api/query-client';
import type { LoginRequest, SessionResponse, User } from './auth.models';
import { useSession } from './session.store';

export const authApi = {
  async login(req: LoginRequest): Promise<void> {
    const res = await http.post<SessionResponse>('/auth/login', req);
    useSession.getState().setSession(res);
  },

  me: () => http.get<User>('/me'),

  logout(): void {
    useSession.getState().clear();
    queryClient.clear();
  },
};
