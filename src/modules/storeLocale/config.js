import { validateStoreLocale } from './schema.js';

export const MODULE_NAME = 'settings.store.locale';

export const validateConfig = (config) => {
  if (!config) {
    throw new Error('Invalid configuration: config is empty');
  }

  const valid = validateStoreLocale(config);

  if (!valid) {
    const errors = validateStoreLocale.errors.map(error => `${error.instancePath} ${error.message}`).join('; ');
    throw new Error(`Invalid configuration: ${errors}`);
  }
};

export const getDefaultConfig = () => ({
  default_shopper_language: "en",
  shopper_language_selection_method: "default_shopper_language",
  store_country: "United States"
});