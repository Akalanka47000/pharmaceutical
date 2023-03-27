import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { serviceCreateOrder, serviceGetOrders, serviceGetOrderById } from './service';
import { createOrderSchema } from './schema';

const order = express.Router();

order.post(
  '/',
  celebrate({ [Segments.BODY]: createOrderSchema }),
  tracedAsyncHandler(async function controllerCreateOrder(req, res) {
    const data = await traced(serviceCreateOrder)(req.body);
    return toSuccess({ res, data, message: 'Order created successfully!' });
  }),
);

order.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function controllerGetOrders(req, res) {
    const data = await traced(serviceGetOrders)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({ res, data, message: 'Orders fetched successfully!' });
  }),
);

order.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerGetOrderById(req, res) {
    const data = await traced(serviceGetOrderById)(req.params.id);
    return toSuccess({ res, data, message: 'Order fetched successfully!' });
  }),
);

export default order;
