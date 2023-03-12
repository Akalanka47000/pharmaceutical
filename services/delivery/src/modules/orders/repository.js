import { Order } from "./api/v1/models";

export function createOrderInDB(order) {
    return Order.create(order);
}

export function getOrderById(id) {
    return Order.findById(id).lean();
}

export function getAllOrders({ filters = {}, sorts = {}, page, limit }) {
    if (page && limit) {
        return Order.paginate(filters, {
            page,
            limit,
            sorts,
            lean: true,
        })
    }
    return Order.find(filters).sort(sorts).lean();
}