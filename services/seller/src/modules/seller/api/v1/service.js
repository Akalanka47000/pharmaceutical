import { traced } from '@sliit-foss/functions';
import { createSeller, getAllSeller, getSingleSeller, deleteSingleSeller, updateSingleSeller } from './repository.js';

export const createSellerSrc = (seller) => {
  return traced(createSeller)(seller);
};

export const getAllSellerSrc = (filters, sorts, page, limit) => {
  return traced(getAllSeller)({ filters, sorts, page, limit });
};

export const getSingleSellerSrc = (id) => {
  return traced(getSingleSeller)(id);
};

export const deleteSingleSellerSrc = (id) => {
  return traced(deleteSingleSeller)(id);
};

export const updateSingleSellerSrc = (id, body) => {
  return traced(updateSingleSeller)(id, body);
};
