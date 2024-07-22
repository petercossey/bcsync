import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

class ConfigFileNotFoundError extends Error {
  constructor(moduleName) {
    super(`Configuration file not found for module: ${moduleName}`);
    this.name = 'ConfigFileNotFoundError';
  }
}

class ConfigManager {
  constructor(configDir) {
    this.configDir = configDir;
  }

  async readConfig(moduleName) {
    const fileName = `${moduleName}.yml`;
    const filePath = path.join(this.configDir, fileName);

    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      return yaml.load(fileContents);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new ConfigFileNotFoundError(moduleName);
      }
      throw new Error(`Error reading config file for ${moduleName}: ${error.message}`);
    }
  }

  async writeConfig(moduleName, data) {
    const fileName = `${moduleName}.yml`;
    const filePath = path.join(this.configDir, fileName);

    try {
      const yamlStr = yaml.dump(data);
      await fs.writeFile(filePath, yamlStr, 'utf8');
    } catch (error) {
      throw new Error(`Error writing config file for ${moduleName}: ${error.message}`);
    }
  }
}

export { ConfigManager, ConfigFileNotFoundError };