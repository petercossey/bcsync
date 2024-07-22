import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import { MODULE_NAME, validateConfig } from './config.js';
import ApiClient from '../../api/apiClient.js';

export const moduleName = MODULE_NAME;

export const readStoreLocale = async (configManager) => {
  const config = await configManager.readConfig(moduleName);
  validateConfig(config);
  return yaml.dump(config);
};

export const updateStoreLocale = async (configManager, newData) => {
  validateConfig(newData);
  await configManager.writeConfig(moduleName, newData);
  return yaml.dump(newData);
};

export const exportStoreLocale = async (configManager) => {
  const apiClient = new ApiClient();
  const storeLocale = await apiClient.getStoreLocale();

  // Extract relevant data from the API response
  const localeData = {
    default_shopper_language: storeLocale.data.default_shopper_language,
    shopper_language_selection_method: storeLocale.data.shopper_language_selection_method,
    store_country: storeLocale.data.store_country,
  };

  // Validate the data
  validateConfig(localeData);

  // Save the data to disk
  const yamlData = yaml.dump(localeData);
  const filePath = path.join(configManager.configDir, `${moduleName}.yml`);
  await fs.writeFile(filePath, yamlData, 'utf8');

  return yamlData;
};

export const importStoreLocale = async (configManager) => {
  try {
    const config = await configManager.readConfig(moduleName);
    validateConfig(config);

    const apiClient = new ApiClient();
    const result = await apiClient.updateStoreLocale(config);

    // Extract relevant data from the API response
    const localeData = {
      default_shopper_language: result.data.default_shopper_language,
      shopper_language_selection_method: result.data.shopper_language_selection_method,
      store_country: result.data.store_country,
    };

    // Validate the data
    validateConfig(localeData);

    // Update the local configuration file with the response from the API
    await configManager.writeConfig(moduleName, localeData);

    return yaml.dump(localeData);
  } catch (error) {
    throw new Error(`Failed to import store locale: ${error.message}`);
  }
};