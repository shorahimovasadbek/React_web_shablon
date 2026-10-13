import type { AppLang } from '@core/i18n/i18n';

/** Backend xato javobining kutilgan shakli */
interface ErrorBody {
  message?: string | Partial<Record<AppLang, string>>;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  readonly status: number;
  readonly fields: Record<string, string[]>;

  constructor(status: number, message: string, fields: Record<string, string[]> = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

const FALLBACK: Record<AppLang, { offline: string; server: string }> = {
  ru: { offline: 'Нет соединения с интернетом', server: 'Ошибка сервера' },
  uz: { offline: 'Internet aloqasi yoʻq', server: 'Server xatosi' },
};

export function offlineError(lang: AppLang): ApiError {
  return new ApiError(0, FALLBACK[lang].offline);
}

export async function toApiError(res: Response, lang: AppLang): Promise<ApiError> {
  const body = (await res.json().catch(() => ({}))) as ErrorBody;
  const msg = typeof body.message === 'string' ? body.message : body.message?.[lang];
  return new ApiError(res.status, msg ?? FALLBACK[lang].server, body.errors ?? {});
}

/** Formada ko'rsatish uchun: ApiError matni yoki umumiy tarjima kaliti */
export function errorMessage(e: unknown): string {
  return e instanceof ApiError ? e.message : 'common.error';
}
