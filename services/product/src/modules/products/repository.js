import { Product } from './api/v1/models';

export const createProduct = (product) => {
  return Product.create(product);
};

export const getAllProduct = ({ filters = {}, sorts = {}, page, limit }) => {
  if (page && limit) {
    return Product.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Product.find(filters).sort(sorts).lean();
};

export const getSingleProduct = (id) => {
  return Product.findById(id).lean();
};

export const deleteSingleProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

export const updateSingleProduct = (id, pr) => {
  return Product.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
