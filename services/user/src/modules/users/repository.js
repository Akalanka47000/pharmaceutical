import { User } from './api/v1/models';

export function createUserInDB(user) {
  return User.create(user);
}

export function getUserByEmail(email) {
  return User.findOne({ email }).lean();
}

export function getUserById(id) {
  return User.findById(id).lean();
}

export function getUsersByRole(role) {
  return User.findOne({ role }).lean();
}

export function getAllUsers({ filters = {}, sorts = {}, page, limit }) {
  if (page && limit) {
    return User.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return User.find(filters).sort(sorts).lean();
}

export function updateUserById(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true }).lean();
}

export function updateMultipleUsers(filters, data) {
  return User.updateMany(filters, data, { new: true }).lean();
}

export function deleteUserById(id) {
  return User.findByIdAndDelete(id).lean();
}
