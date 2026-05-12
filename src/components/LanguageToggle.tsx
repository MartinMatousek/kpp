import { useTranslation } from 'react-i18next';
import { LangToggle } from '../styles/AppHeader.styles';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('en') ? 'en' : 'cs';
  const next = current === 'en' ? 'cs' : 'en';

  const handleClick = () => {
    i18n.changeLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url.toString());
  };

  return (
    <LangToggle onClick={handleClick}>
      {next === 'en' ? 'EN' : 'CS'}
    </LangToggle>
  );
}
