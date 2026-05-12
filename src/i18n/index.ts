import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import csCommon from '../locales/cs/common.json';
import csForm from '../locales/cs/form.json';
import csTax from '../locales/cs/tax.json';
import csDisclaimer from '../locales/cs/disclaimer.json';
import csFaq from '../locales/cs/faq.json';
import csMcp from '../locales/cs/mcp.json';

import enCommon from '../locales/en/common.json';
import enForm from '../locales/en/form.json';
import enTax from '../locales/en/tax.json';
import enDisclaimer from '../locales/en/disclaimer.json';
import enFaq from '../locales/en/faq.json';
import enMcp from '../locales/en/mcp.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cs: { common: csCommon, form: csForm, tax: csTax, disclaimer: csDisclaimer, faq: csFaq, mcp: csMcp },
      en: { common: enCommon, form: enForm, tax: enTax, disclaimer: enDisclaimer, faq: enFaq, mcp: enMcp },
    },
    fallbackLng: 'cs',
    defaultNS: 'common',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
