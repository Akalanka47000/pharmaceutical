import { Joi } from 'celebrate';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Config');
class Base {
  static get schema() {
    return {
      HOST: Joi.string().optional(),
      PORT: Joi.number().optional(),
      TWILIO_ACCOUNT_SID: Joi.string().required(),
      TWILIO_AUTH_TOKEN: Joi.string().required(),
      SMS_FROM: Joi.string().required(),
    };
  }
  static get values() {
    return {
      HOST: process.env.HOST ?? 'localhost',
      PORT: process.env.PORT ?? 2004,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      SMS_FROM: process.env.SMS_FROM,
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