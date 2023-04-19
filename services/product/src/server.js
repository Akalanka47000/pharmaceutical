import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Product service',
  database: true,
  enableCors: true,
  cors: true,
  config,
});
