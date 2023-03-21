import express from 'express';
import { celebrate, Segments } from 'celebrate'
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { serviceLogin, serviceRegister, serviceRefreshToken, serviceVerifyUser, serviceLogout } from './service';
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
    const data = await traced(serviceRefreshToken)(req.body.refresh_token);
    return toSuccess({ res, data, message: 'Token refresh successfull!' })
}));

auth.get('/verify/:code', tracedAsyncHandler(async function controllerVerifyUser(req, res) {
    await traced(serviceVerifyUser)(req.params.code);
    return toSuccess({ res, message: 'User verified successfully!' })
}));

auth.get('/current', tracedAsyncHandler(function controllerGetAuthUser(req, res) {
    delete req.user.password;
    return toSuccess({ res, data: req.user, message: 'Auth user fetched successfully!' })
}));

auth.post('/logout', tracedAsyncHandler(async function controllerLogout(req, res) {
    await traced(serviceLogout)(req.token);
    return toSuccess({ res, message: 'Logout successfull!' })
}));

export default auth;