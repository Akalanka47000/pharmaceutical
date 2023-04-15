import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'buyer service',
  database: true,
  config,
});
