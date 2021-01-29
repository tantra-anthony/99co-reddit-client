import { InitOptions } from 'i18next';

const i18nConfig: InitOptions = {
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
};

export default i18nConfig;
