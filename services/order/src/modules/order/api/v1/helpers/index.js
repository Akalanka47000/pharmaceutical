import config from '../../../../../config';
import { getProductsByIds } from '../../../../../services';

export const calculateTotals = async (order) => {
  if (order.products) {
    const products = await getProductsByIds(order.products.map((product) => product._id));
    order.total += products.reduce((total, product, index) => {
      total += product.selling_price * order.products[index].quantity ?? 1;
      return total;
    }, 0);
    order.commision = (order.total * config.COMMISSION_PERCENTAGE).toFixed(2);
    order.net_total = order.total - order.commision;
  }
};
