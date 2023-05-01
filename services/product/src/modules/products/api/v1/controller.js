import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { createProductSrc, getAllProductSrc, getSingleProductSrc, deleteSingleProductSrc, updateSingleProductSrc, serviceUpdateMultipleProducts } from './service';
import { createProductSchema, updateProductSchema } from './schema';

const product = express.Router();

product.post(
  '/',
  celebrate({ [Segments.BODY]: createProductSchema }),
  tracedAsyncHandler(async function createProductController(req, res) {
    const product = await traced(createProductSrc)(req.body, req.headers['x-user-id']);
    return toSuccess({
      res,
      data: product,
      message: 'Product successfully added',
    });
  }),
);

product.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllProductsController(req, res) {
    console.log(getAllProductSrc, req.query.filter);
    const product = await traced(getAllProductSrc)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({
      res,
      data: product,
      message: 'Products fetched successfully',
    });
  }),
);

product.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function getSingleProductController(req, res) {
    const product = await traced(getSingleProductSrc)(req.params.id);
    return toSuccess({
      res,
      data: product,
      message: 'Product successfully fetched',
    });
  }),
);

product.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function singleProductDeleteController(req, res) {
    const product = await traced(deleteSingleProductSrc)(req.params.id);
    return toSuccess({
      res,
      data: product,
      message: 'Product successfully deleted',
    });
  }),
);

product.patch(
  '/',
  filterQuery,
  celebrate({ [Segments.BODY]: updateProductSchema }),
  tracedAsyncHandler(async function controllerUpdateMultipleProducts(req, res) {
    const data = await traced(serviceUpdateMultipleProducts)(req.query.filter, req.body);
    return toSuccess({ res, data, message: 'Products updated successfully!' });
  }),
);

product.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateProductSchema }),
  tracedAsyncHandler(async function singleProductUpdateController(req, res) {
    const product = await traced(updateSingleProductSrc)(req.params.id, req.body);
    return toSuccess({
      res,
      data: product,
      message: 'Product successfully updated',
    });
  }),
);

export default product;
