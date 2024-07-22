#!/usr/bin/env node
import { program } from "commander";
import {
  readStoreProfile,
  updateStoreProfile,
  exportStoreProfile,
  importStoreProfile,
  moduleName as storeProfileModuleName,
} from "./modules/storeProfile/index.js";
import {
  readStoreLocale,
  updateStoreLocale,
  exportStoreLocale,
  importStoreLocale,
  moduleName as storeLocaleModuleName,
} from "./modules/storeLocale/index.js";
import {
  ConfigManager,
  ConfigFileNotFoundError,
} from "./utils/configManager.js";
import yaml from "js-yaml";
import path from "path";

const configPath = "data";
const configManager = new ConfigManager(path.resolve(configPath));

program
  .name("bcsync")
  .description("CLI to manage BigCommerce store configurations")
  .version("0.1.0");

program
  .command("store-profile:read")
  .description("Display store profile in YAML format")
  .action(async () => {
    try {
      const yamlOutput = await readStoreProfile(configManager);
      console.log(yamlOutput);
    } catch (error) {
      if (error instanceof ConfigFileNotFoundError) {
        console.error(`Error: ${error.message}`);
        console.error(
          "Please run the export command to fetch and save your store profile.",
        );
      } else {
        console.error(`Error: ${error.message}`);
      }
      process.exit(1);
    }
  });

program
  .command("store-profile:update")
  .description("Update store profile with new YAML data")
  .action(async () => {
    try {
      const stdin = process.openStdin();
      let data = "";

      stdin.on("data", (chunk) => {
        data += chunk;
      });

      stdin.on("end", async () => {
        try {
          const newConfig = yaml.load(data);
          const updatedYaml = await updateStoreProfile(
            configManager,
            newConfig,
          );
          console.log("Store profile updated successfully:");
          console.log(updatedYaml);
        } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1);
        }
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("store-profile:export")
  .description("Export store profile from BigCommerce API and save locally")
  .action(async () => {
    try {
      const exportedYaml = await exportStoreProfile(configManager);
      console.log("Store profile exported and saved successfully:");
      console.log(exportedYaml);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("store-profile:import")
  .description("Import store profile from local YAML file to BigCommerce API")
  .action(async () => {
    try {
      const importedYaml = await importStoreProfile(configManager);
      console.log("Store profile imported successfully:");
      console.log(importedYaml);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("store-locale:read")
  .description("Display store locale in YAML format")
  .action(async () => {
    try {
      const yamlOutput = await readStoreLocale(configManager);
      console.log(yamlOutput);
    } catch (error) {
      if (error instanceof ConfigFileNotFoundError) {
        console.error(`Error: ${error.message}`);
        console.error(
          "Please run the export command to fetch and save your store locale.",
        );
      } else {
        console.error(`Error: ${error.message}`);
      }
      process.exit(1);
    }
  });

program
  .command("store-locale:update")
  .description("Update store locale with new YAML data")
  .action(async () => {
    try {
      const stdin = process.openStdin();
      let data = "";

      stdin.on("data", (chunk) => {
        data += chunk;
      });

      stdin.on("end", async () => {
        try {
          const newConfig = yaml.load(data);
          const updatedYaml = await updateStoreLocale(configManager, newConfig);
          console.log("Store locale updated successfully:");
          console.log(updatedYaml);
        } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exit(1);
        }
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("store-locale:export")
  .description("Export store locale from BigCommerce API and save locally")
  .action(async () => {
    try {
      const exportedYaml = await exportStoreLocale(configManager);
      console.log("Store locale exported and saved successfully:");
      console.log(exportedYaml);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command("store-locale:import")
  .description("Import store locale from local YAML file to BigCommerce API")
  .action(async () => {
    try {
      const importedYaml = await importStoreLocale(configManager);
      console.log("Store locale imported successfully:");
      console.log(importedYaml);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
