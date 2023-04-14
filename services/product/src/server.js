import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'product service',
  database: true,
  config,
});
