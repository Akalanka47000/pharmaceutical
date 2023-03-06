/* eslint-disable import/named */

import { tracedAsyncHandler } from '@sliit-foss/functions';
import { getUserById } from '../services';
import { Blacklist, verify, errors } from '../utils';

export const whitelistedRoutes = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh', '/v1/system/health'];

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
    if (whitelistedRoutes.includes(req.path)) {
        return;
    }
    const token = req.headers.authorization?.replace('Bearer ', '')?.replace('null', '');
    if (!token) {
        throw errors.missing_token;
    }
    const decodedUser = verify(token);
    const user = await getUserById(decodedUser._id);
    if (!user) {
        throw errors.invalid_token;
    }
    const blacklist = await Blacklist.getInstance();
    if (await blacklist.has(token)) {
        throw errors.cancelled_token;
    }
    if (!user.is_active) {
        throw errors.user_deactivated;
    }
    req.user = user;
    req.token = token;
})