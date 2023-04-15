import { traced } from '@sliit-foss/functions';
import { createBuyer, getAllBuyer, getSingleBuyer, deleteSingleBuyer, updateSingleBuyer } from '../../repository';

export const createBuyerSrc = (buyer) => {
  return traced(createBuyer)(buyer);
};

export const getAllBuyerSrc = (filters, sorts, page, limit) => {
  return traced(getAllBuyer)({ filters, sorts, page, limit });
};

export const getSingleBuyerrSrc = (id) => {
  return traced(getSingleBuyer)(id);
};

export const deleteSingleBuyerSrc = (id) => {
  return traced(deleteSingleBuyer)(id);
};

export const updateSingleBuyerSrc = (id, body) => {
  return traced(updateSingleBuyer)(id, body);
};
