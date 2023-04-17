export const calculateSellingPrice = (product) => {
  if (product.markup_price) {
    product.selling_price = product.markup_price * 1.25;
  }
};
