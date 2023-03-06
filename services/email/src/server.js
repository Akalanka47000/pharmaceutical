import initializeServer from '@app/server';
import routes from './routes';
import config from './config';

initializeServer({
  service: "Email service",
  routes,
  config
})