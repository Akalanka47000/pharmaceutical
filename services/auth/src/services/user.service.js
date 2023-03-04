import serviceConnector from '@sliit-foss/service-connector';
import { head } from 'lodash';
import config from '../config';

const connector = serviceConnector({
    baseURL: config.USER_SERVICE_BASE_URL,
    service: 'User-Service',
});

export const createUser = (payload, v = "v1") => {
    return connector.post(`/api/${v}/users`, payload).then(connector.resolve);
};

export const getUserByEmail = async (email, v = "v1") => {
    const users = await connector.get(`/api/${v}/users?filter[email]=${email}`).then(connector.resolve);
    return head(users);
};

export const getUserById = (id, v = "v1") => {
    return connector.get(`/api/${v}/users/${id}`).then(connector.resolve);
};