import context from 'express-http-context';
import createError from 'http-errors';
import { asyncHandler, tracedAsyncHandler } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { getAuthUser } from '../services';

const logger = moduleLogger('Auth-middleware');

export const whitelistedRoutes = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh', '/v1/system/health'];

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
    if (whitelistedRoutes.includes(req.path)) {
        return;
    }
    context.set('headers', req.headers);
    const user = await getAuthUser();
    req.user = user;
})

export const permittedRoles = (roles) => asyncHandler(function roleChecker(req) {
    if (roles && !roles.includes(req.user.role)) {
        logger.error(`Forbidden route - access denied - user_id: ${req.user._id} - role: ${req.user.role}`);
        throw createError(403, 'Route forbidden');
    }
})