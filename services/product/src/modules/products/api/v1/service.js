import { traced } from '@sliit-foss/functions';
import { createProduct, getAllProduct, getSingleProduct, deleteSingleProduct, updateSingleProduct } from '../../repository';
import { calculateSellingPrice } from './helpers';

export const createProductSrc = (product, userId) => {
  traced(calculateSellingPrice)(product);
  product.seller = userId;
  return traced(createProduct)(product);
};

export const getAllProductSrc = (filters, sorts, page, limit) => {
  return traced(getAllProduct)({ filters, sorts, page, limit });
};

export const getSingleProductSrc = (id) => {
  return traced(getSingleProduct)(id);
};

export const deleteSingleProductSrc = (id) => {
  return traced(deleteSingleProduct)(id);
};

export const updateSingleProductSrc = (id, payload) => {
  traced(calculateSellingPrice)(payload);
  return traced(updateSingleProduct)(id, payload);
};
