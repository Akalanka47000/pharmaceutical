import serviceConnector from '@sliit-foss/service-connector';
import config from '../config';

const connector = serviceConnector({
  baseURL: config.PRODUCT_SERVICE_BASE_URL,
  service: 'Product-Service',
});

export const updateProductById = (id, payload, v = 'v1') => {
  return connector.patch(`/api/${v}/products/${id}`, payload).then(connector.resolve);
};
