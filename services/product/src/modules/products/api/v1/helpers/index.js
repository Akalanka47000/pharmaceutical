import config from '../../../../../config';

export const calculateSellingPrice = (product) => {
  if (product.markup_price) {
    product.selling_price = product.markup_price * (1 + config.COMMISSION_PERCENTAGE / 100);
  }
};

export const handleReviews = (product) => {
  if (product.review) {
    product['$push'] = { reviews: product.review };
    delete product.review;
  }
};
