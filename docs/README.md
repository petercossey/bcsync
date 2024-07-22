# bcsync Technical Documentation

## Overview

bcsync is a Node.js CLI application designed to manage BigCommerce store configurations. It provides a modular and extensible framework for interacting with various BigCommerce API endpoints, allowing users to read, update, export, and import store settings.

## Key Technical Design Concepts

### 1. Modular Architecture

The application is built with a modular structure, where each module represents a specific BigCommerce API endpoint or configuration area. This design allows for easy extension and maintenance of the codebase.

Key components of a module:
- `config.js`: Defines module constants and validation functions
- `schema.js`: Defines the JSON schema for data validation
- `controller.js`: Implements the core logic for CRUD operations
- `index.js`: Exports the module's public interface

### 2. Command-Line Interface

The CLI is implemented using the Commander.js library, providing a user-friendly interface for interacting with the application. Each command corresponds to a specific operation (read, update, export, import) for a module.

### 3. Configuration Management

The application uses YAML files for configuration storage, located in the `data/` directory. The `ConfigManager` class handles reading and writing these configuration files.

### 4. API Client

The `ApiClient` class encapsulates the logic for making HTTP requests to the BigCommerce API, using axios for HTTP communications.

### 5. Data Validation

JSON Schema validation is implemented using Ajv (Another JSON Schema Validator) to ensure data integrity and consistency between the local configurations and the BigCommerce API.

## Design Patterns

1. **Module Pattern**: Each functionality set is encapsulated in its own module, promoting code organization and reusability.
2. **Dependency Injection**: The `ConfigManager` is injected into module controllers, allowing for flexible configuration management.
3. **API Client Pattern**: The `ApiClient` class encapsulates all API communication logic, providing a centralized and consistent interface for interacting with the BigCommerce API.

## Data Models

Each module defines its own data model through its JSON schema. For example:

- Store Profile:
  - store_name
  - store_address
  - store_address_type
  - store_phone
  - store_email

- Store Locale:
  - default_shopper_language
  - shopper_language_selection_method
  - store_country

## Vision and Future Milestones

The vision for bcsync is to become a comprehensive tool for managing BigCommerce store configurations, allowing developers and store administrators to version control their store settings and streamline the process of managing multiple stores or environments.

Potential future milestones:

1. **Expanded Module Coverage**: Implement modules for all available BigCommerce settings endpoints.
1. **Batch Operations**: Allow users to perform operations on multiple modules at once.
1. **Diff and Merge Capabilities**: Implement the ability to compare configurations between environments and merge changes.
1. **GUI Interface**: Develop a graphical user interface as an alternative to the CLI.
1. **Plugins System**: Implement a plugin architecture to allow third-party developers to extend the functionality of bcsync.
1. **Multi-Store Management**: Add support for managing multiple BigCommerce stores from a single bcsync instance.
1. **Scheduled Sync**: Implement automated, scheduled synchronization between local configs and BigCommerce.

## Contributing

Contributions to bcsync are welcome! When adding new features or modules, please follow the existing patterns and conventions:

1. Create a new module in the `src/modules/` directory following the established structure.
2. Update the `ApiClient` class to include methods for the new BigCommerce API endpoints.
3. Add new CLI commands in `src/index.js` for the new module's operations.
4. Implement proper error handling and data validation.
5. Update this documentation to reflect new features or changes in the application structure.

By adhering to these guidelines and the established patterns, we can ensure that bcsync remains maintainable and extensible as it grows.