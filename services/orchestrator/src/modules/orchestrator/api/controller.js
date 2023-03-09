import express from 'express';
import serviceConnector from '@sliit-foss/service-connector';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { roles } from '@app/constants';
import { serviceHosts } from '../constants';
import { permittedRoles } from '../../../middleware';

const orchestrator = express.Router();

const connector = serviceConnector({ service: "Proxy" })

orchestrator.all('/:api_version/:module*', tracedAsyncHandler(function attachMiddleware(req, res, next) {
  switch (req.params.module) {
    case 'users': return permittedRoles([roles.admin])(req, res, next);
    case 'emails':
    case 'sms':
      return permittedRoles([])(req, res, next);
    default: return;
  }
}));

orchestrator.all('/:api_version/:module*', tracedAsyncHandler(function redirect(req, res) {
  return connector.proxy(serviceHosts[req.params.module], req, res)
}));

export default orchestrator;