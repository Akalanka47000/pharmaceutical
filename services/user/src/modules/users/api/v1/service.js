import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createUserInDB, getAllUsers, getUserById, updateUserById, updateMultipleUsers, deleteUserById } from '../../repository';

export async function serviceCreateUser(user) {
    if (!user.password) user.password = crypto.randomBytes(20).toString('hex');
    if (!user.password.match(/^\$2[ayb]\$.{56}$/)) user.password = await bcrypt.hash(user.password, 10); // If password is not already hashed, hash it
    return createUserInDB(user)
}

export function serviceGetUsers(filters, sorts, page, limit) {
    return getAllUsers({ filters, sorts, page, limit });
}

export function serviceGetUserById(id) {
    return getUserById(id);
}

export function serviceUpdateUserById(id, data) {
    return updateUserById(id, data);
}

export function serviceUpdateMultipleUsers(filters, data) {
    return updateMultipleUsers(filters, data);
}

export function serviceDeleteUserById(id) {
    return deleteUserById(id);
}