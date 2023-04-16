import mongoose from 'mongoose';
import Buyer from './api/v1/models/buyer';

export const createBuyer = async (buyer_name, nic, email_address, mobileNumber, address, address_district, credentialID) => {
  const buyerRepo = new Buyer({
    buyer_name,
    nic,
    email_address,
    mobileNumber,
    address,
    address_district,
    credentialID,
  });
  await buyerRepo.save();
  return { msg: 'buyer added' };
};

export const getSingleBuyer = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { msg: 'No buyer is available with this id' };
  }
  try {
    // Check if Supplier exists
    if ((await Buyer.findById(mongoose.Types.ObjectId(id))) == null) {
      return { msg: 'No buyer is available with this id' };
    }
    return await Buyer.findById(mongoose.Types.ObjectId(id));
  } catch (error) {
    return { msg: 'Search Buyer by id failed' };
  }
};

export const getAllBuyer = async () => {
  return await Buyer.find().lean();
};

export const deleteSingleBuyer = (id) => {
  return Buyer.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

export const updateSingleBuyer = (id, pr) => {
  const buyerUpdateRepo = Buyer.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return buyerUpdateRepo;
};
