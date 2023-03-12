import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: "Delivery service",
  database: true,
  config
})