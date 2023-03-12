import crypto from 'crypto';
import { traced } from '@sliit-foss/functions';
import { createOrderInDB, getAllOrders, getOrderById } from '../../repository';

export const serviceCreateOrder = (order) => {
    order.waybill_number = crypto.randomBytes(20).toString('hex');
    return traced(createOrderInDB)(order)
}

export const serviceGetOrders = (filters, sorts, page, limit) => {
    return traced(getAllOrders)({ filters, sorts, page, limit });
}

export const serviceGetOrderById = (id) => {
    return traced(getOrderById)(id);
}