import { roles } from '@app/constants';
import { authorizer, permittedRoles } from '../../../../../middleware';

const guard = async (req, res, next) => {
  if (req.method === 'GET') return next();
  await authorizer(req, res, () => {});
  return permittedRoles([roles.admin, roles.seller])(req, res, next);
};

export default guard;
