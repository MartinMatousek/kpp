import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useDocumentMeta() {
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'cs';
    document.title = t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
  }, [i18n.language, t]);
}
