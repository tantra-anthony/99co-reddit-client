import enTranslation from './common/en.json';

export function generateLocalResources() {
  return {
    en: {
      translation: enTranslation,
    },
  };
}

export function getSupportedLocales(): string[] {
  return ['en'];
}
