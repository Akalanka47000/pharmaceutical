import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';

const system = express.Router();

system.get('/health', tracedAsyncHandler(function healthCheck(_req, res) {
  return toSuccess({ res, message: 'Auth service up and running!' })
}));

export default system;