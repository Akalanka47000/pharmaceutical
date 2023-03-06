import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: "SMS service",
  config
})