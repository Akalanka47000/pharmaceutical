import { tracedAsyncHandler } from '@sliit-foss/functions';
import { getUserByid } from '../services';
import { blacklist, verify, errors } from '../utils';

export const whitelistedRoutes = ['/v1/auth', '/v1/auth/refresh', '/system/health'];

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
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
    if (await blacklist.has(token)) {
        throw errors.cancelled_token;
    }
    if (!user.is_active) {
        throw errors.user_deactivated;
    }
    req.user = user;
    req.token = token;
})