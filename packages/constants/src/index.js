import { Joi } from 'celebrate';

export const correlationId = 'x-correlation-id';
export const hostName = 'x-host-name';

export const protectedRoutes = ['/v1/auth/login', '/v1/auth/register', '/v1/auth/refresh-token', '/v1/auth/verify/*', '/v1/system/health'];

export const roles = ['admin', 'seller', 'buyer'].reduce((acc, role) => {
  acc[role] = role;
  return acc;
}, {});

export const objectIdSchema = (name = 'id') =>
  Joi.object({
    [name]: Joi.string().hex().length(24).required(),
  });
