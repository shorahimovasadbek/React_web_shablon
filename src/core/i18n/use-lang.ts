import { useTranslation } from 'react-i18next';
import { type AppLang, currentLang, setLang } from './i18n';

export function useLang(): { lang: AppLang; setLang: (lang: AppLang) => Promise<void> } {
  useTranslation(); // til o'zgarganda komponentni qayta chizadi
  return { lang: currentLang(), setLang };
}
