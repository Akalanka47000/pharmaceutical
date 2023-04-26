import { Order } from './api/v1/models';

export const createOrder = (order) => {
  return Order.create(order);
};

export const getSingleOrder = (id) => {
  return Order.findById(id);
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
