import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { toSuccess } from '@app/middleware';
import { createSellerSrc, getAllSellerSrc, getSingleSellerSrc, deleteSingleSellerSrc, updateSingleSellerSrc } from './service';

const seller = express.Router();

const asyncHandler = () => {};

// Create a new seller
seller.post(
  '/',
  tracedAsyncHandler(async (_req, res) => {
    const seller = await createSellerSrc(_req.body);
    return toSuccess({
      res,
      status: 201,
      data: seller,
      massage: 'Seller successfully created',
    });
  }),
);

//Get All Sellers
seller.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllSellers(req, res) {
    const seller = await getAllSellerSrc();
    return toSuccess({
      res,
      status: 200,
      data: seller,
      massage: 'Sellers successfully fetched',
    });
  }),
);

//Get Single Seller
seller.get(
  '/:id',
  tracedAsyncHandler(async function getAseller(req, res) {
    const seller = await getSingleSellerSrc(req.params.id);
    return toSuccess({
      res,
      status: 200,
      data: seller,
      massage: 'Seller successfully fetched',
    });
  }),
);

//Delete A Supplier
seller.delete(
  '/:id',
  tracedAsyncHandler(async function singleSellerdelete(req, res) {
    const seller = await deleteSingleSellerSrc(req.params.id, res);
    return toSuccess({
      res,
      status: 200,
      data: seller,
      massage: 'Seller successfully deleted',
    });
  }),
);

//Update Supplier Data
seller.patch(
  '/:id',
  tracedAsyncHandler(async function singleSellerUpdate(req, res) {
    const seller = await updateSingleSellerSrc(req.params.id, req.body);
    return toSuccess({
      res,
      status: 200,
      data: seller,
      massage: 'Seller successfully updated',
    });
  }),
);

export default seller;
