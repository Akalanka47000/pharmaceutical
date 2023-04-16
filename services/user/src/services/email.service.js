import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.EMAIL_SERVICE_BASE_URL,
  service: 'Email-Service',
});

export const sendVerificationEmail = (payload, v = 'v1') => {
  return connector.post(`/api/${v}/emails`, payload).then(connector.resolve);
};
