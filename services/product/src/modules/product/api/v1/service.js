//service

import { createProduct, getAllProduct, getSingleProduct, deleteSingleProduct, updateSingleProduct, searchProducts } from '../../repository.js';

export const createProductSrc = async ({ product_Name, type, measurement_unit, ageLimit, markupPrice, exp_date, manu_date, description, quantity, seller_Name, status, sell_price }) => {
  return await createProduct(product_Name, type, measurement_unit, ageLimit, markupPrice, exp_date, manu_date, description, quantity, seller_Name, status, sell_price);
};

export const getAllProductSrc = async () => {
  return await getAllProduct();
};

export const getSingleProductSrc = async (id) => {
  return await getSingleProduct(id);
};

export const deleteSingleProductSrc = async (id, body) => {
  return await deleteSingleProduct(id, body);
};

export const updateSingleProductSrc = async (id, body) => {
  return await updateSingleProduct(id, body);
};

export const searchProductSrc = async (key) => {
  return await searchProducts(key);
};
