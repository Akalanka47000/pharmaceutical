import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');
class Base {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      DB_URL: Joi.string().required(),
      PRODUCT_SERVICE_BASE_URL: Joi.string().required(),
      COMMISSION_PERCENTAGE: Joi.number().required(),
    };
  }
  static get values() {
    return {
      PORT: process.env.PORT ?? 2007,
      DB_URL: process.env.DB_URL,
      PRODUCT_SERVICE_BASE_URL: process.env.PRODUCT_SERVICE_BASE_URL,
      COMMISSION_PERCENTAGE: Number(process.env.COMMISSION_PERCENTAGE ?? 0),
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
