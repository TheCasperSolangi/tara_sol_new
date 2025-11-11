import { useLocalization } from '../context/LocalizationContext';

export function useTranslation() {
  const { t, language, setLanguage, availableLanguages } = useLocalization();
  
  return {
    t,
    language,
    setLanguage,
    availableLanguages,
  };
}