import express from 'express';
import serviceConnector from '@sliit-foss/service-connector';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { serviceHosts } from '../constants';
import { permittedRoles } from '../../../middleware';
import { routeGuards } from './middleware';

const orchestrator = express.Router();

const connector = serviceConnector({ service: 'Proxy' });

orchestrator.all('/:api_version/:module*', (req, res, next) => {
  switch (req.params.module) {
    case 'users':
      return routeGuards[req.params.module](req, res, next);
    case 'emails':
    case 'sms':
      return permittedRoles([])(req, res, next);
    default:
      return next();
  }
});

orchestrator.all(
  '/:api_version/:module*',
  tracedAsyncHandler(function redirect(req, res) {
    return connector.proxy(serviceHosts[req.params.module], req, res);
  }),
);

export default orchestrator;
