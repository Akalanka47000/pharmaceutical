import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess } from '../../../../utils';
import { serviceLogin } from './service';

const system = express.Router();

system.get('/login', tracedAsyncHandler(async function controllerLogin(req, res) {
    const { email, password } = req.body
    const data = await serviceLogin({ email, password })
    return toSuccess({ res, data, message: 'Authentication successfull!' })
}));

export default system;