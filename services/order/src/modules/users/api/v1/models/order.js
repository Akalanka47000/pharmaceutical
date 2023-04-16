import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    product_ID: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    delivery_type: {
      type: String,
      required: true,
    },
    delivery_cost: {
      type: Number,
      required: true,
    },
    discounts: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
