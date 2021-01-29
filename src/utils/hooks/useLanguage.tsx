import { useTranslation } from 'react-i18next';

function useLanguage() {
  const { t, i18n, ready } = useTranslation();

  return {
    t: ready ? t : () => 'loading',
    currentLang: i18n.language,
    changeLang: (locale: string) => i18n.changeLanguage(locale),
  };
}

export default useLanguage;
