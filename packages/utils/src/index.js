export const getProductAvailability = (product) => {
  if (product.quantity === 0) {
    return 'Out of stock';
  } else if (product.quantity < 30) {
    return 'Few left';
  }
  return 'Available';
};
