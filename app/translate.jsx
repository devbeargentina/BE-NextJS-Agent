import { Language } from './language';
import { useLanguage } from './LanguageContext';

export const Trans = (key) => {
  const { language } = useLanguage();
  const lang = Language;
debugger;
  return lang[key] !== undefined ? lang[key][language] !== undefined ? lang[key][language] : key : key;
};