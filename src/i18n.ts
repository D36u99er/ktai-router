import i18n from 'i18next';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Language resources
const resources = {
  en: {
    translation: {}
  },
  zh: {
    translation: {}
  }
};

// Try to load language files if they exist
const localesPath = join(__dirname, 'locales');
['en', 'zh'].forEach(lang => {
  const filePath = join(localesPath, `${lang}.json`);
  if (existsSync(filePath)) {
    try {
      resources[lang].translation = JSON.parse(readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error(`Failed to load language file: ${filePath}`, error);
    }
  }
});

// Determine the language to use
const determineLanguage = (): string => {
  // First check for explicit CLAUDE_ROUTER_LANG environment variable
  if (process.env.CLAUDE_ROUTER_LANG) {
    return process.env.CLAUDE_ROUTER_LANG;
  }
  // Then check system LANG environment variable
  if (process.env.LANG?.startsWith('zh')) {
    return 'zh';
  }
  // Default to English
  return 'en';
};

// Initialize i18next
i18n.init({
  lng: determineLanguage(),
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
export const t = i18n.t.bind(i18n);