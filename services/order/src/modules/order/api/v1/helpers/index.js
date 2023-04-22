import { Product } from '../../../../../../../product/src/modules/products/api/v1/models/product.model';
export const calculatePrice = (order) => {
  if (Product.selling_price) {
    order.price = Product.selling_price * order.quantity;
  }
};

export const calculateTotalPrice = (order) => {
  if (order.price) {
    order.total_value += order.price;
  }
};
