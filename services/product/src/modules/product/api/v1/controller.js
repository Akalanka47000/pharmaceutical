import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { createProductSrc, getAllProductSrc, getSingleProductSrc, deleteSingleProductSrc, updateSingleProductSrc, searchProductSrc } from './service.js';
import { createProductSchema, updateProductSchema } from './schema';

const product = express.Router();

// Create a new product
product.post(
  '/',
  celebrate({ [Segments.BODY]: createProductSchema }),
  tracedAsyncHandler(async function createProductController(req, res) {
    const product = await traced(createProductSrc)(req.body);
    return toSuccess({
      res,
      data: product,
      message: 'Product successfully created',
    });
  }),
);

//GET all products
product.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function getAllProduct(req, res) {
    const product = await getAllProductSrc();
    return toSuccess({
      res,
      data: product,
      message: 'products fetched',
    });
  }),
);

//Get Single product
product.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function getAproduct(req, res) {
    const product = await getSingleProductSrc(req.params.id);
    return toSuccess({
      res,
      data: product,
      massage: 'product successfully fetched',
    });
  }),
);

//Delete single product
product.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function singleProductDelete(req, res) {
    const product = await deleteSingleProductSrc(req.params.id, res);
    return toSuccess({
      res,
      data: product,
      massage: 'product successfully deleted',
    });
  }),
);

//Update single product
product.patch(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateProductSchema }),
  tracedAsyncHandler(async function singleProductUpdate(req, res) {
    const product = await updateSingleProductSrc(req.params.id, req.body);
    return toSuccess({
      res,
      data: product,
      massage: 'product successfully updated',
    });
  }),
);

//search products
product.get(
  '/search/:key',
  tracedAsyncHandler(async function searchProductCntrl(req, res) {
    const key = req.params.key;
    const product = await searchProductSrc(key);
    return toSuccess({
      res,
      data: product,
      massage: 'product(s) available',
    });
  }),
);

export default product;
