import { orderStatuses } from '@app/constants';
import { Order } from './api/v1/models';

export const createOrder = (order) => {
  return Order.create(order);
};

export const getSingleOrder = (id) => {
  return Order.findById(id).lean();
};

export const findUserLatestOrder = (userId) => {
  return Order.findOne({ user: userId, status: orderStatuses.confirmed }).sort({ created_at: -1 }).lean();
};

export const getAllOrders = ({ filters = {}, sorts = {}, page, limit }) => {
  if (page && limit) {
    return Order.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Order.find(filters).sort(sorts).lean();
};

export const deleteSingleOrder = (id) => {
  return Order.findByIdAndDelete(id);
};

export const updateSingleOrder = (id, pr) => {
  return Order.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
