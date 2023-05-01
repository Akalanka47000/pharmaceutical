import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.USER_SERVICE_BASE_URL,
  service: 'User-Service',
});

export const updateUserById = (id, payload, v = 'v1') => {
  return connector.patch(`/api/${v}/users/${id}`, payload).then(connector.resolve);
};
