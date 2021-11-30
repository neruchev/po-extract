import { en_US } from 'src/i18n/dictionaries/en_US';
import { ru_RU } from 'src/i18n/dictionaries/ru_RU';

/**
 * As keys are used BCP 47 locale identifiers
 * (see ECMAScript Intl standard)
 */
export const locales = {
  en_US: {
    title: 'English',
    dictionary: en_US,
  },
  ru_RU: {
    title: 'Русский',
    dictionary: ru_RU,
  },
} as const;

export const LOCALES: Locales[] = Object.keys(locales) as never[];

export const defaultLocale: Locales = 'ru_RU';
export const defaultDictionary = locales[defaultLocale].dictionary;

export type Locales = keyof typeof locales;
export type Dictionary = typeof defaultDictionary;
export type DictionaryKey = keyof Dictionary;
