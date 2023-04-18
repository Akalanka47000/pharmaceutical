import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Product service',
  database: true,
  config,
});
