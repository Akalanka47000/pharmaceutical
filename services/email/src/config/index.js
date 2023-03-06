import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');
class Base {
  static get schema() {
    return {
      HOST: Joi.string().optional(),
      PORT: Joi.number().optional(),
      MAIL_HOST: Joi.string().required(),
      MAIL_USER: Joi.string().required(),
      MAIL_PASSWORD: Joi.string().required(),
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? 'localhost',
      PORT: process.env.PORT ?? 2000,
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_USER: process.env.MAIL_USER,
      MAIL_PASSWORD: process.env.MAIL_PASSWORD
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