import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from './translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key, params = {}) => {
    return getTranslation(language, key, params);
  };
  
  return { t, language };
};
