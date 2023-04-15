export const calculateSellingPrice = (product) => {
  if (product.selling_price) {
    product.selling_price *= 1.25;
  }
};
