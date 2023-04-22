import mongoose from 'mongoose';
import { head } from 'lodash';
import { aggregatePopulate } from '@app/mongoose';
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

export const getSingleProduct = async (id) => {
  return head(await Product.aggregate([{ $match: { _id: mongoose.Types.ObjectId(id) } }, ...aggregatePopulate(['users', 'seller'])]));
};

export const deleteSingleProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

export const updateSingleProduct = (id, pr) => {
  return Product.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
