import express from 'express';
import { celebrate, Segments } from 'celebrate'
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '../../../../utils';
import { serviceLogin, serviceRegister, serviceRefreshToken, serviceLogout } from './service';
import { loginSchema, registerSchema, refreshTokenSchema } from './schema';

const auth = express.Router();

auth.post('/login', celebrate({ [Segments.BODY]: loginSchema }), tracedAsyncHandler(async function controllerLogin(req, res) {
    const data = await traced(serviceLogin)(req.body);
    return toSuccess({ res, data, message: 'Login successfull!' })
}));

auth.post('/register', celebrate({ [Segments.BODY]: registerSchema }), tracedAsyncHandler(async function controllerRegister(req, res) {
    const data = await traced(serviceRegister)(req.body);
    return toSuccess({ res, data, message: 'Registration successfull!' })
}));

auth.post('/refresh-token', celebrate({ [Segments.BODY]: refreshTokenSchema }), tracedAsyncHandler(async function controllerRefreshToken(req, res) {
    const data = await traced(serviceRefreshToken)(req.body);
    return toSuccess({ res, data, message: 'Token refresh successfull!' })
}));

auth.get('/current', tracedAsyncHandler(async function controllerGetAuthUser(req, res) {
    return toSuccess({ res, data: req.user, message: 'Auth user fetched successfully!' })
}));

auth.post('/logout', tracedAsyncHandler(async function controllerLogout(req, res) {
    await traced(serviceLogout)(req.user);
    return toSuccess({ res, message: 'Logout successfull!' })
}));

export default auth;