import mongoose from 'mongoose';
import { head } from 'lodash';
import { aggregatePopulate } from '@app/mongoose';
import { Product } from './api/v1/models';

export const createProduct = (product) => {
  return Product.create(product);
};

export const getAllProduct = ({ filters = {}, sorts: sort = {}, page, limit }) => {
  if (page && limit) {
    return Product.paginate(filters, {
      page,
      limit,
      sort,
      lean: true,
    });
  }
  return Product.find(filters).sort(sort).lean();
};

export const getSingleProduct = async (id) => {
  return head(await Product.aggregate([{ $match: { _id: mongoose.Types.ObjectId(id) } }, ...aggregatePopulate(['users', 'seller'], ['reviews', 'reviews', true])]));
};

export const deleteSingleProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

export const updateSingleProduct = (id, pr) => {
  return Product.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
