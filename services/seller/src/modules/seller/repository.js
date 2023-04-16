import mongoose from 'mongoose';
import Seller from './api/v1/models/seller.js';

// create seller
export const createSeller = async (business_name, license_number, email, phone, address, nic_Owner) => {
  const sellerRepo = new Seller({
    business_name,
    license_number,
    email,
    phone,
    address,
    nic_Owner,
  });
  await sellerRepo.save();
  return { msg: 'seller added' };
};

// get all sellers
export const getAllSeller = () => {
  return Seller.find().lean();
};

// get single seller
export const getSingleSeller = (id) => {
  return Seller.findById(mongoose.Types.ObjectId(id));
};

// delete single seller
export const deleteSingleSeller = (id) => {
  return Seller.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

// update single seller
export const updateSingleSeller = async (id, pr) => {
  const sellerUpdateRepo = await Seller.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return sellerUpdateRepo;
};
