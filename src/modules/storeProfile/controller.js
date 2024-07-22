import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import { MODULE_NAME, validateConfig } from './config.js';
import ApiClient from '../../api/apiClient.js';

export const moduleName = MODULE_NAME;

export const readStoreProfile = async (configManager) => {
  const config = await configManager.readConfig(moduleName);
  validateConfig(config);
  return yaml.dump(config);
};

export const updateStoreProfile = async (configManager, newData) => {
  validateConfig(newData);
  await configManager.writeConfig(moduleName, newData);
  return yaml.dump(newData);
};

export const exportStoreProfile = async (configManager) => {
  const apiClient = new ApiClient();
  const storeProfile = await apiClient.getStoreProfile();

  // Extract relevant data from the API response
  const profileData = {
    store_name: storeProfile.data.store_name,
    store_address: storeProfile.data.store_address,
    store_address_type: storeProfile.data.store_address_type,
    store_phone: storeProfile.data.store_phone,
    store_email: storeProfile.data.store_email,
  };

  // Validate the data
  validateConfig(profileData);

  // Save the data to disk
  const yamlData = yaml.dump(profileData);
  const filePath = path.join(configManager.configDir, `${moduleName}.yml`);
  await fs.writeFile(filePath, yamlData, 'utf8');

  return yamlData;
};

export const importStoreProfile = async (configManager) => {
  try {
    const config = await configManager.readConfig(moduleName);
    validateConfig(config);

    const apiClient = new ApiClient();
    const result = await apiClient.updateStoreProfile(config);

    // Extract relevant data from the API response
    const profileData = {
      store_name: result.data.store_name,
      store_address: result.data.store_address,
      store_address_type: result.data.store_address_type,
      store_phone: result.data.store_phone,
      store_email: result.data.store_email,
    };

    // Validate the data
    validateConfig(profileData);

    // Update the local configuration file with the response from the API
    await configManager.writeConfig(moduleName, profileData);

    return yaml.dump(profileData);
  } catch (error) {
    throw new Error(`Failed to import store profile: ${error.message}`);
  }
};