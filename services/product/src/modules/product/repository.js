import mongoose from 'mongoose';
import Product from './api/v1/models/product.js';

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

export const deleteSingleProduct = (id) => {
  return Product.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

export const updateSingleProduct = async (id, pr) => {
  const productUpdateRepo = await Product.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return productUpdateRepo;
};

export const searchProducts = async (key) => {
  const products = await Product.find({
    $or: [{ product_Name: { $regex: key, $options: 'i' } }, { type: { $regex: key, $options: 'i' } }, { seller_Name: { $regex: key, $options: 'i' } }],
  });
  return products;
};
