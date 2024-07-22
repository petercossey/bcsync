# bcsync

bcsync is a CLI application for managing BigCommerce store configurations.

## Description

bcsync allows users to read, update, export, and import store profile settings for a BigCommerce store. It uses the BigCommerce API to interact with store data and manages local configuration files in YAML format.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm link` to make the `bcsync` command available globally

## Configuration

Create a `.env` file in the root directory with the following variables:

```
STORE_HASH=your_store_hash
ACCESS_TOKEN=your_access_token
```

## Usage

Run the CLI application using:

```
bcsync [command]
```

Available commands:

- `store-profile:read`: Display store profile in YAML format
- `store-profile:update`: Update store profile with new YAML data (input via stdin)
- `store-profile:export`: Export store profile from BigCommerce API and save locally
- `store-profile:import`: Import store profile from local YAML file to BigCommerce API

For help, use:

```
bcsync --help
```

## Technical Details

- Built with Node.js
- Uses Commander.js for CLI interface
- Manages configuration files using YAML (js-yaml)
- Interacts with BigCommerce API using Axios
- Uses dotenv for environment variable management
- Implements JSON Schema validation using Ajv

## Project Structure

- Configuration files are stored in the `data` directory
- The main CLI logic is in `src/index.js`
- Modular structure with separate modules for different functionalities

## Dependencies

- commander: ^12.1.0
- js-yaml: ^4.1.0
- axios: ^1.7.2
- dotenv: ^16.4.5
- ajv: ^8.17.1
- ajv-formats: ^3.0.1