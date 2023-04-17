import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');
class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      DB_URL: Joi.string().required(),
      STRIPE_SECRET_KEY: Joi.string().required(),
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 3002,
      DB_URL: process.env.DB_URL,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
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
