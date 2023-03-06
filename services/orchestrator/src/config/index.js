import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');

class Base {
  static get schema() {
    return {
      HOST: Joi.string().optional(),
      PORT: Joi.number().optional(),
      AUTH_SERVICE_BASE_URL: Joi.string().required(),
      USER_SERVICE_BASE_URL: Joi.string().required(),
      REDIS_CONNECTION_STRING: Joi.string().required()
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? 'localhost',
      PORT: process.env.PORT ?? 2002,
      AUTH_SERVICE_BASE_URL: process.env.AUTH_SERVICE_BASE_URL,
      USER_SERVICE_BASE_URL: process.env.USER_SERVICE_BASE_URL,
      REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING
    };
  }
}

const config = Base.values;

const { error } = Joi.object(Base.schema).validate(config);

if (error) {
  logger.error(`Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`)
  process.exit(1);
}

export default config;