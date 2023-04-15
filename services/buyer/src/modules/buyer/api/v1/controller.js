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
      message: 'Buyer successfully created',
    });
  }),
);

buyer.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllBuyers(req, res) {
    const buyer = await traced(getAllBuyerSrc)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({
      res,
      data: buyer,
      message: 'Buyers successfully fetched',
    });
  }),
);

buyer.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function getABuyer(req, res) {
    const buyer = await traced(getSingleBuyerrSrc)(req.params.id);
    return toSuccess({
      res,
      data: buyer,
      message: 'Buyer successfully fetched',
    });
  }),
);

buyer.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function singleBuyerDelete(req, res) {
    const buyer = await traced(deleteSingleBuyerSrc)(req.params.id);
    return toSuccess({
      res,
      data: buyer,
      message: 'Buyer successfully deleted',
    });
  }),
);

buyer.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateBuyerSchema }),
  tracedAsyncHandler(async function singleBuyerUpdate(req, res) {
    const buyer = await traced(updateSingleBuyerSrc)(req.params.id, req.body);
    return toSuccess({
      res,
      data: buyer,
      message: 'Buyer successfully updated',
    });
  }),
);

export default buyer;
