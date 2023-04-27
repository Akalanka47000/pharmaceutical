import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Review service',
  database: true,
  config,
});
