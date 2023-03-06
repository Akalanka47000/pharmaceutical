import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { roles } from '@app/constants';
import { serviceHosts } from '../constants';
import { permittedRoles } from '../../../middleware';

const orchestrator = express.Router();

orchestrator.all('/:api_version/:module*', tracedAsyncHandler(function roleChecker(req, res, next) {
  switch (req.params.module) {
    case 'users': return permittedRoles([roles.admin])(req, res, next);
    default: return next();
  }
}));

orchestrator.all('/:api_version/:module*', tracedAsyncHandler(function redirect(req, res) {
  return res.redirect(307, `${serviceHosts[req.params.module]}${req.originalUrl}`);
}));

export default orchestrator;