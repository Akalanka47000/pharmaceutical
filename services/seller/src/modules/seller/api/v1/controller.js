import express from 'express';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { toSuccess } from '@app/middleware';
import { createSellerSrc, getAllSellerSrc, getSingleSellerSrc, deleteSingleSellerSrc, updateSingleSellerSrc } from './service';

const seller = express.Router();

seller.post(
  '/',
  tracedAsyncHandler(async function createSeller(req, res) {
    const seller = await traced(createSellerSrc)(req.body);
    return toSuccess({
      res,
      status: 201,
      data: seller,
      message: 'Seller successfully created',
    });
  }),
);

seller.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllSellers(req, res) {
    const seller = await traced(getAllSellerSrc)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({
      res,
      data: seller,
      message: 'Sellers successfully fetched',
    });
  }),
);

seller.get(
  '/:id',
  tracedAsyncHandler(async function getSeller(req, res) {
    const seller = await traced(getSingleSellerSrc)(req.params.id);
    return toSuccess({
      res,
      data: seller,
      message: 'Seller successfully fetched',
    });
  }),
);

seller.delete(
  '/:id',
  tracedAsyncHandler(async function singleSellerDelete(req, res) {
    const seller = await traced(deleteSingleSellerSrc)(req.params.id);
    return toSuccess({
      res,
      data: seller,
      message: 'Seller successfully deleted',
    });
  }),
);

seller.patch(
  '/:id',
  tracedAsyncHandler(async function singleSellerUpdate(req, res) {
    const seller = await traced(updateSingleSellerSrc)(req.params.id, req.body);
    return toSuccess({
      res,
      data: seller,
      message: 'Seller successfully updated',
    });
  }),
);

export default seller;
