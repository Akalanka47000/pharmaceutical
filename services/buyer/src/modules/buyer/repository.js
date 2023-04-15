import { Buyer } from './api/v1/models';

export const createBuyer = (buyer) => {
  return Buyer.create(buyer);
};

export const getSingleBuyer = (id) => {
  return Buyer.findById(id);
};

export const getAllBuyer = ({ filters = {}, sorts = {}, page, limit }) => {
  if (page && limit) {
    return Buyer.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Buyer.find(filters).sort(sorts).lean();
};

export const deleteSingleBuyer = (id) => {
  return Buyer.findByIdAndDelete(id);
};

export const updateSingleBuyer = (id, pr) => {
  return Buyer.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
