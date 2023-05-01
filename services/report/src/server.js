import initializeServer from '@app/server';
import config from './config';

initializeServer({
  service: 'Report service',
  database: true,
  config,
});
