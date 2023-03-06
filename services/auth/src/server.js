import initializeServer from '@app/server';
import { authorizer } from './middleware';
import routes from './routes';
import config from './config';

initializeServer({
  service: "Auth service",
  routes,
  leadingMiddleware: [authorizer],
  config
})