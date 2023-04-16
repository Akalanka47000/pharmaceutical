import { createBuyer, getAllBuyer, getSingleBuyer, deleteSingleBuyer, updateSingleBuyer } from '../../repository';

export const createBuyerSrc = ({ buyer_name, nic, email_address, mobileNumber, address, address_district, credentialID }) => {
  return createBuyer(buyer_name, nic, email_address, mobileNumber, address, address_district, credentialID);
};

export const getAllBuyerSrc = () => {
  return getAllBuyer();
};

export const getSingleBuyerrSrc = (id) => {
  return getSingleBuyer(id);
};

export const deleteSingleBuyerSrc = (id, body) => {
  return deleteSingleBuyer(id, body);
};

export const updateSingleBuyerSrc = (id, body) => {
  return updateSingleBuyer(id, body);
};
