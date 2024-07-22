import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

export const storeLocaleSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    default_shopper_language: {
      type: "string",
      description: "The default language for shoppers"
    },
    shopper_language_selection_method: {
      type: "string",
      enum: ["browser", "default_shopper_language"],
      description: "The method for selecting the shopper's language"
    },
    store_country: {
      type: "string",
      description: "The country where the store is located"
    }
  },
  required: ["default_shopper_language", "shopper_language_selection_method"],
  additionalProperties: false
};

export const validateStoreLocale = ajv.compile(storeLocaleSchema);