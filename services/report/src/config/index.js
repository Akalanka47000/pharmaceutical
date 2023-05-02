import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');
class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      DB_URL: Joi.string().required(),
      EMAIL_SERVICE_BASE_URL: Joi.string().required(),
      FIREBASE_SERVICE_ACCOUNT_KEY: Joi.string().required(),
      FIREBASE_STORAGE_BUCKET: Joi.string().required(),
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 2011,
      DB_URL: process.env.DB_URL,
      EMAIL_SERVICE_BASE_URL: process.env.EMAIL_SERVICE_BASE_URL,
      FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  logger.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`);
  process.exit(1);
}

export default config;
