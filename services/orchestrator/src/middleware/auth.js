import context from 'express-http-context';
import createError from 'http-errors';
import { asyncHandler, tracedAsyncHandler } from '@sliit-foss/functions';
import { moduleLogger } from '@sliit-foss/module-logger';
import { protectedRoutes } from '@app/constants';
import { getAuthUser } from '../services';

const logger = moduleLogger('Auth-middleware');

export const authorizer = tracedAsyncHandler(async function authorizer(req) {
  if (protectedRoutes.find((route) => req.path.match(new RegExp(route)))) {
    return;
  }
  context.set('headers', req.headers);
  const user = await getAuthUser();
  req.user = user;
});

export const permittedRoles = (roles) =>
  asyncHandler(function roleGuard(req) {
    if (roles && !roles.includes(req.user.role)) {
      logger.error(`Forbidden route - access denied - user_id: ${req.user._id} - role: ${req.user.role}`);
      throw createError(403, 'Route forbidden');
    }
  });
