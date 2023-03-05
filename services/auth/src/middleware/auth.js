import { tracedAsyncHandler } from '@sliit-foss/functions';
import { getUserByid } from '../services';
import { verify, errors } from '../utils';

export const whitelistedRoutes = ['/v1/auth', '/v1/auth/refresh', '/system/health'];

export const authorizer = tracedAsyncHandler(function authorizer(req, res) {
    if (whitelistedRoutes.includes(req.path)) {
        return next();
    }
    const token = req.headers.authorization?.replace('Bearer ', '')?.replace('null', '');
    if (!token) {
        throw errors.missing_token;
    }
    const decodedUser = verify(token);
    const user = await getUserByid(decodedUser._id);
    if (!user) {
        throw errors.invalid_token;
    }
    if (!user.is_active) {
        throw errors.user_deactivated;
    }
    req.user = user;
})