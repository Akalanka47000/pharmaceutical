import { Order } from './api/v1/models';

//create Order
export const createOrder = async (product_ID, quantity, payment_method, delivery_type, delivery_cost, discounts, total_price, status) => {
  const productOrder = new Order({
    product_ID,
    quantity,
    payment_method,
    delivery_type,
    delivery_cost,
    discounts,
    total_price,
    status: 'pending',
  });
  await productOrder.save();
  return { msg: 'order added' };
};

export const getAllProduct = async () => {
  const products = await Product.find().lean();

  return products.map((product) => {
    let status = 'available';
    if (product.quantity === 0) {
      status = 'out of stock';
    } else if (product.quantity < 30) {
      status = 'few left';
    }
    return {
      ...product,
      status,
    };
  });
};

//get single product
export const getSingleProduct = async (id) => {
  const product = await Product.findById(mongoose.Types.ObjectId(id)).lean();

  let status = 'available';
  if (product.quantity === 0) {
    status = 'out of stock';
  } else if (product.quantity < 30) {
    status = 'few left';
  }

  return {
    ...product,
    status,
  };
};

//delete single product
export const deleteSingleProduct = async (id) => {
  return await Product.findByIdAndDelete(mongoose.Types.ObjectId(id));
};

//update single product
export const updateSingleProduct = async (id, pr) => {
  const productUpdateRepo = await Product.findByIdAndUpdate(id, pr, {
    new: true,
  });
  return productUpdateRepo;
};

//search products
export const searchProducts = async (key) => {
  const products = await Product.find({
    $or: [{ product_Name: { $regex: key, $options: 'i' } }, { type: { $regex: key, $options: 'i' } }, { seller_Name: { $regex: key, $options: 'i' } }],
  });
  return products;
};
