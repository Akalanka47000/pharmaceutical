import mongoose from 'mongoose';
import Buyer from './api/v1/models/buyer';

//create buyer
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

//Get Data Of One buyer
export const getSingleBuyer = async (id) => {
  //check for valid objectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { msg: 'No supplier is available with this id' };
  }
  try {
    //Check if Supplier exists
    if ((await Buyer.findById(mongoose.Types.ObjectId(id))) == null) {
      return { msg: 'No buyer is available with this id' };
    }
    return await Buyer.findById(mongoose.Types.ObjectId(id));
  } catch (error) {
    return { msg: 'Search Buyer by id failed' };
  }
};

//get all buyers
export const getAllBuyer = async () => {
  return await Buyer.find().lean();
};

//get single seller
// export const getSingleBuyer = async (id) => {
//   return await Seller.findById(mongoose.Types.ObjectId(id));
// };

//delete single seller
export const deleteSingleBuyer = async (id) => {
  return await Buyer.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

//update single seller
export const updateSingleBuyer = async (id, pr) => {
  const buyerUpdateRepo = await Buyer.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return buyerUpdateRepo;
};
