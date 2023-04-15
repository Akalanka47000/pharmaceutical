import { Seller } from './api/v1/models';

export const createSeller = (seller) => {
  return Seller.create(seller);
};

export const getAllSeller = ({ filters = {}, sorts = {}, page, limit }) => {
  if (page && limit) {
    return Seller.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Seller.find(filters).sort(sorts).lean();
};

export const getSingleSeller = (id) => {
  return Seller.findById(id).lean();
};

export const deleteSingleSeller = (id) => {
  return Seller.findByIdAndDelete(id);
};

export const updateSingleSeller = (id, pr) => {
  return Seller.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
