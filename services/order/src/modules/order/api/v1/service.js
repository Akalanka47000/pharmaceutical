import { traced } from '@sliit-foss/functions';
import { createOrder, getAllOrders, getSingleOrder, deleteSingleOrder, updateSingleOrder } from '../../repository';
import { calculateTotals } from './helpers/index';

export const serviceCreateOrder = async (order) => {
  await traced(calculateTotals)(order);
  return traced(createOrder)(order);
};

export const serviceGetAllOrders = (filters, sorts, page, limit) => {
  return traced(getAllOrders)({ filters, sorts, page, limit });
};

export const serviceGetSingleOrder = (id) => {
  return traced(getSingleOrder)(id);
};

export const serviceDeleteSingleOrder = (id) => {
  return traced(deleteSingleOrder)(id);
};

export const serviceUpdateSingleOrder = async (id, payload) => {
  await traced(calculateTotals)(payload);
  return traced(updateSingleOrder)(id, payload);
};
