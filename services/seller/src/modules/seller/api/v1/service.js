import { createSeller, getAllSeller, getSingleSeller, deleteSingleSeller, updateSingleSeller } from './repository.js';

export const createSellerSrc = async ({ business_name, license_number, email, phone, address, nic_Owner }) => {
  return await createSeller(business_name, license_number, email, phone, address, nic_Owner);
};

export const getAllSellerSrc = async () => {
  return await getAllSeller();
};

export const getSingleSellerSrc = async (id) => {
  return await getSingleSeller(id);
};

export const deleteSingleSellerSrc = async (id, body) => {
  return await deleteSingleSeller(id, body);
};

export const updateSingleSellerSrc = async (id, body) => {
  return await updateSingleSeller(id, body);
};
