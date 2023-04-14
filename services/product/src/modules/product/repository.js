//repo

import mongoose from 'mongoose';
import Product from './api/v1/models/product.js';

//create product
export const createProduct = async (product_Name, type, measurement_unit, ageLimit, markupPrice, exp_date, manu_date, description, quantity, seller_Name, status, sell_price) => {
  const productRepo = new Product({
    product_Name,
    type,
    measurement_unit,
    ageLimit,
    markupPrice,
    exp_date,
    manu_date,
    description,
    quantity,
    seller_Name,
    status: 'available',
    sell_price: markupPrice + 0.25 * markupPrice,
  });
  await productRepo.save();
  return { msg: 'product added' };
};

//get all products
// export const getAllProduct = async () => {
//   return await Product.find().lean();
// };

export const getAllProduct = async () => {
  const products = await Product.find().lean();

  return products.map((product) => {
    let status = 'available';
    if (product.quantity === 0) {
      status = 'out of stock';
    } else if (product.quantity < 30) {
      status = 'few left';
    }
    return {
      ...product,
      status,
    };
  });
};

//get single product
export const getSingleProduct = async (id) => {
  const product = await Product.findById(mongoose.Types.ObjectId(id)).lean();

  let status = 'available';
  if (product.quantity === 0) {
    status = 'out of stock';
  } else if (product.quantity < 30) {
    status = 'few left';
  }

  return {
    ...product,
    status,
  };
};

//delete single product
export const deleteSingleProduct = async (id) => {
  return await Product.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

//update single product
export const updateSingleProduct = async (id, pr) => {
  const productUpdateRepo = await Product.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return productUpdateRepo;
};

//search products
export const searchProducts = async (key) => {
  const products = await Product.find({
    $or: [{ product_Name: { $regex: key, $options: 'i' } }, { type: { $regex: key, $options: 'i' } }, { seller_Name: { $regex: key, $options: 'i' } }],
  });
  return products;
};
