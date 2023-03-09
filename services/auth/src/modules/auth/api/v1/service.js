/* eslint-disable import/named */

import bcrypt from 'bcryptjs';
import createError from "http-errors";
import { traced } from '@sliit-foss/functions';
import { createUser, getUserByEmail, getUserById } from '../../../../services'
import { errors, verify, generateTokens, Blacklist } from '../../../../utils';

export const serviceLogin = async ({ email, password }) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw errors.invalid_email;
    }
    if (!user.is_active) {
        throw errors.user_deactivated;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw errors.invalid_password;
    }
    return traced(generateTokens)(user);
}

export const serviceRegister = async ({ name, email, password, address }) => {
    const user = await getUserByEmail(email);
    if (user) {
        throw createError(400, "User already exists")
    }
    return createUser({ name, email, password, address });
}

export const serviceRefreshToken = async (token) => {
    const decodedRefreshToken = verify(token);
    const decodedUser = verify(decodedRefreshToken.access_token, true);
    const user = await getUserById(decodedUser._id);
    if (!user) {
        throw errors.invalid_token;
    }
    if (!user.is_active) {
        throw errors.user_deactivated;
    }
    return traced(generateTokens)(user);
}

export const serviceLogout = (token) => {
    return Blacklist.add(token)
}