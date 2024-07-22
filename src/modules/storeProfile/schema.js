import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

export const storeProfileSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    store_name: {
      type: "string",
      description: "The name of the store"
    },
    store_address: {
      type: "string",
      description: "The physical address of the store"
    },
    store_address_type: {
      type: "string",
      enum: ["Home Office", "Commercial Office", "Retail", "Warehouse"],
      default: "Home Office",
      description: "The type of address"
    },
    store_phone: {
      type: "string",
      description: "The store's phone number"
    },
    store_email: {
      type: "string",
      format: "email",
      description: "The store's email address"
    }
  },
  required: ["store_name", "store_address", "store_address_type", "store_phone", "store_email"],
  additionalProperties: false
};

export const validateStoreProfile = ajv.compile(storeProfileSchema);