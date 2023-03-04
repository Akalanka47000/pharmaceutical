import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { traced } from '@sliit-foss/functions';
import { createUserInDB, getAllUsers, getUserById, updateUserById, updateMultipleUsers, deleteUserById } from '../../repository';

export const serviceCreateUser = async (user) => {
    if (!user.password) user.password = crypto.randomBytes(20).toString('hex');
    if (!user.password.match(/^\$2[ayb]\$.{56}$/)) user.password = await bcrypt.hash(user.password, 10); // If password is not already hashed, hash it
    return traced(createUserInDB)(user)
}

export const serviceGetUsers = async (filters, sorts, page, limit) => {
    return traced(getAllUsers)({ filters, sorts, page, limit });
}

export function serviceGetUserById(id) {
    return traced(getUserById)(id);
}

export function serviceUpdateUserById(id, data) {
    return traced(updateUserById)(id, data);
}

export function serviceUpdateMultipleUsers(filters, data) {
    return traced(updateMultipleUsers)(filters, data);
}

export function serviceDeleteUserById(id) {
    return traced(deleteUserById)(id);
}