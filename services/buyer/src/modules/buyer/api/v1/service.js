import { createBuyer, getAllBuyer, getSingleBuyer, deleteSingleBuyer, updateSingleBuyer } from '../../repository';

export const createBuyerSrc = async ({ buyer_name, nic, email_address, mobileNumber, address, address_district, credentialID }) => {
  return await createBuyer(buyer_name, nic, email_address, mobileNumber, address, address_district, credentialID);
};

export const getAllBuyerSrc = async () => {
  return await getAllBuyer();
};

export const getSingleBuyerrSrc = async (id) => {
  return await getSingleBuyer(id);
};

export const deleteSingleBuyerSrc = async (id, body) => {
  return await deleteSingleBuyer(id, body);
};

export const updateSingleBuyerSrc = async (id, body) => {
  return await updateSingleBuyer(id, body);
};
