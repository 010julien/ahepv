export const getLocalized = (value, language) => {
  if (value && typeof value === 'object') {
    return value[language] || value.fr || value.en || value.de || '';
  }
  return value ?? '';
};

export const localeFromLang = (language) => {
  switch (language) {
    case 'fr':
      return 'fr-FR';
    case 'de':
      return 'de-DE';
    default:
      return 'en-US';
  }
};

export const mapEventCategoryKey = (rawCategory = '') => {
  const c = (rawCategory || '').toString().toLowerCase();
  if (c.includes('fund') || c.includes('collecte')) return 'fundraising';
  if (c.includes('vol') || c.includes('béné')) return 'volunteering';
  if (c.includes('don')) return 'donation';
  return 'donation';
};
