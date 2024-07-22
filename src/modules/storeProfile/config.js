import { validateStoreProfile } from './schema.js';

export const MODULE_NAME = 'settings.store.profile';

export const validateConfig = (config) => {
  if (!config) {
    throw new Error('Invalid configuration: config is empty');
  }

  const valid = validateStoreProfile(config);

  if (!valid) {
    const errors = validateStoreProfile.errors.map(error => `${error.instancePath} ${error.message}`).join('; ');
    throw new Error(`Invalid configuration: ${errors}`);
  }
};

export const getDefaultConfig = () => ({
  store_name: "",
  store_address: "",
  store_address_type: "Commercial Office",
  store_phone: "",
  store_email: ""
});