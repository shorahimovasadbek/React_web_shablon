import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appStorage } from '@core/storage/app-storage';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

export type AppLang = 'ru' | 'uz';
export const LANGS: readonly AppLang[] = ['ru', 'uz'];
export const DEFAULT_LANG: AppLang = 'ru';

export function isLang(v: string | null): v is AppLang {
  return LANGS.includes(v as AppLang);
}

export function currentLang(): AppLang {
  return isLang(i18n.language) ? i18n.language : DEFAULT_LANG;
}

export async function setLang(lang: AppLang): Promise<void> {
  await i18n.changeLanguage(lang);
  appStorage.set('lang', lang);
}

const saved = appStorage.get('lang');

void i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, uz: { translation: uz } },
  lng: isLang(saved) ? saved : DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => (document.documentElement.lang = lng));
document.documentElement.lang = i18n.language;

export default i18n;
