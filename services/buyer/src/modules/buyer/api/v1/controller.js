import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { createBuyerSrc, getAllBuyerSrc, getSingleBuyerrSrc, updateSingleBuyerSrc, deleteSingleBuyerSrc } from './service';
import { createBuyerSchema, updateBuyerSchema } from './schema';

const buyer = express.Router();

buyer.post(
  '/',
  celebrate({ [Segments.BODY]: createBuyerSchema }),
  tracedAsyncHandler(async function createBuyerController(req, res) {
    const buyer = await traced(createBuyerSrc)(req.body);
    return toSuccess({
      res,
      status: 201,
      data: buyer,
      massage: 'buyer successfully created',
    });
  }),
);

//Get All Sellers
buyer.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllBuyers(req, res) {
    const buyer = await traced(getAllBuyerSrc)();
    return toSuccess({
      res,
      data: buyer,
      massage: 'buyer successfully fetched',
    });
  }),
);

//Get Single Seller
buyer.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function getABuyer(req, res) {
    const buyer = await getSingleBuyerrSrc(req.params.id);
    return toSuccess({
      res,
      data: buyer,
      massage: 'buyer successfully fetched',
    });
  }),
);

//Delete A Supplier
buyer.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function singleBuyerDelete(req, res) {
    const buyer = await deleteSingleBuyerSrc(req.params.id, res);
    return toSuccess({
      res,
      data: buyer,
      massage: 'buyer successfully deleted',
    });
  }),
);

//Update Supplier Data
buyer.patch(
  '/:id',
  filterQuery,
  celebrate({ [Segments.BODY]: updateBuyerSchema }),
  tracedAsyncHandler(async function singleBuyerUpdate(req, res) {
    const buyer = await updateSingleBuyerSrc(req.params.id, req.body);
    return toSuccess({
      res,
      data: buyer,
      massage: 'buyer successfully updated',
    });
  }),
);

export default buyer;
