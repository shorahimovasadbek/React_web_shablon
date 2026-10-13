import { create } from 'zustand';
import { appStorage } from '@core/storage/app-storage';
import type { SessionResponse, User } from './auth.models';

interface SessionState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setSession: (res: SessionResponse) => void;
  setTokens: (access: string, refresh: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
}

/** Sessiya holati — yagona manba. Har o'zgarish localStorage bilan sinxronlanadi. */
export const useSession = create<SessionState>()((set) => ({
  token: appStorage.get('token'),
  refreshToken: appStorage.get('refresh'),
  user: appStorage.getJson<User>('user'),

  setSession: ({ access_token, refresh_token, user }) => {
    appStorage.set('token', access_token);
    appStorage.set('refresh', refresh_token);
    appStorage.setJson('user', user);
    set({ token: access_token, refreshToken: refresh_token, user });
  },

  setTokens: (access, refresh) => {
    appStorage.set('token', access);
    appStorage.set('refresh', refresh);
    set({ token: access, refreshToken: refresh });
  },

  setUser: (user) => {
    appStorage.setJson('user', user);
    set({ user });
  },

  clear: () => {
    appStorage.remove('token', 'refresh', 'user');
    set({ token: null, refreshToken: null, user: null });
  },
}));

export const useIsAuthed = () => useSession((s) => s.token !== null);
export const useUser = () => useSession((s) => s.user);
