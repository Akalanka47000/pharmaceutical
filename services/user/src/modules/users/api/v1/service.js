import crypto from 'crypto';
import { traced } from '@sliit-foss/functions';
import { createUserInDB, getAllUsers, getUserById, updateUserById, updateMultipleUsers, deleteUserById } from '../../repository';
import { hashPasswordIfProvided } from './helpers';

export const serviceCreateUser = async (user) => {
    if (!user.password) user.password = crypto.randomBytes(20).toString('hex');
    await hashPasswordIfProvided(user)
    return traced(createUserInDB)(user)
}

export const serviceGetUsers = (filters, sorts, page, limit) => {
    return traced(getAllUsers)({ filters, sorts, page, limit });
}

export const serviceGetUserById = (id) => {
    return traced(getUserById)(id);
}

export const serviceUpdateUserById = async (id, data) => {
    await hashPasswordIfProvided(data)
    return traced(updateUserById)(id, data);
}

export const serviceUpdateMultipleUsers = async (filters, data) => {
    await hashPasswordIfProvided(data)
    return traced(updateMultipleUsers)(filters, data);
}

export const serviceDeleteUserById = (id) => {
    return traced(deleteUserById)(id);
}