import { traced } from '@sliit-foss/functions';
import { createProduct, getAllProduct, getSingleProduct, deleteSingleProduct, updateSingleProduct, updateMultipleProducts } from '../../repository';
import { calculateSellingPrice, handleReviews } from './helpers';

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

export const serviceUpdateMultipleProducts = (filters, payload) => {
  traced(calculateSellingPrice)(payload);
  traced(handleReviews)(payload);
  return traced(updateMultipleProducts)(filters, payload);
};

export const updateSingleProductSrc = (id, payload) => {
  traced(calculateSellingPrice)(payload);
  traced(handleReviews)(payload);
  return traced(updateSingleProduct)(id, payload);
};
